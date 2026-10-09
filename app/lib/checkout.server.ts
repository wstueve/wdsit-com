import { Resend } from "resend";
import Stripe from "stripe";
import {
  COURSE_FOUNDING_CENTS,
  COURSE_REGULAR_CENTS,
  SESSION_CENTS,
  SESSION_MAX,
  SESSION_MIN,
  formatUsd,
} from "./offers";

const emailedSessionIds = new Set<string>();
const attempts = new Map<string, { count: number; resetAt: number }>();

export function activeCourseCents() {
  const configured = Number(process.env.COURSE_PRICE_CENTS ?? COURSE_FOUNDING_CENTS);
  if (configured === COURSE_REGULAR_CENTS) return COURSE_REGULAR_CENTS;
  return COURSE_FOUNDING_CENTS;
}

export type CheckoutOffer = "course" | "sessions";

export type CheckoutRequest = {
  offer: CheckoutOffer;
  sessions: number;
  name: string;
  email: string;
  role: string;
  task: string;
};

export function tooManyAttempts(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "local";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

export function readCheckoutForm(
  formData: FormData,
): { ok: true; value: CheckoutRequest } | { ok: false; message: string } {
  const offerRaw = String(formData.get("offer") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const task = String(formData.get("task") ?? "").trim();
  const sessions = Number(formData.get("sessions") ?? SESSION_MIN);

  if (offerRaw !== "course" && offerRaw !== "sessions") {
    return { ok: false, message: "Choose the course or a block of sessions." };
  }
  if (!name || name.length > 200) return { ok: false, message: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, message: "Enter a valid email." };
  }
  if (!role || role.length > 200) return { ok: false, message: "Enter your role." };
  if (!task || task.length > 2000) {
    return { ok: false, message: "Tell us the task you want help with." };
  }
  if (
    offerRaw === "sessions" &&
    (!Number.isInteger(sessions) || sessions < SESSION_MIN || sessions > SESSION_MAX)
  ) {
    return { ok: false, message: "Choose 2 to 5 sessions." };
  }

  return {
    ok: true,
    value: {
      offer: offerRaw,
      sessions: offerRaw === "sessions" ? sessions : 2,
      name,
      email,
      role,
      task,
    },
  };
}

function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export async function createCheckoutSession(request: Request, value: CheckoutRequest) {
  const stripe = stripeClient();
  if (!stripe) return { error: "payment_unavailable" as const };

  const origin = new URL(request.url).origin;
  const courseCents = activeCourseCents();
  const isCourse = value.offer === "course";
  const unitAmount = isCourse ? courseCents : SESSION_CENTS;
  const quantity = isCourse ? 1 : value.sessions;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: value.email,
    success_url: `${origin}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/enroll`,
    metadata: {
      offer: value.offer,
      sessions: String(isCourse ? 2 : value.sessions),
      name: value.name.slice(0, 200),
      role: value.role.slice(0, 200),
      task: value.task.slice(0, 450),
    },
    line_items: [
      {
        quantity,
        price_data: {
          currency: "usd",
          unit_amount: unitAmount,
          product_data: {
            name: isCourse ? "Use AI at Work" : "Private AI session",
            description: isCourse
              ? "Four weeks of class material, exercises, a prompt library, and two private sessions."
              : "A 60-minute working session, sold in a block of 2 to 5.",
          },
        },
      },
    ],
  });

  if (!session.url) return { error: "payment_unavailable" as const };
  return { url: session.url };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export type PaymentResult =
  | { state: "missing" }
  | { state: "unpaid" }
  | { state: "unavailable" }
  | {
      state: "paid";
      email: string | null;
      offer: string;
      amountLabel: string;
      emailSent: boolean;
    };

export async function verifyPaidSession(sessionId: string): Promise<PaymentResult> {
  const stripe = stripeClient();
  if (!stripe) return { state: "unavailable" };
  if (!sessionId.startsWith("cs_")) return { state: "missing" };

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return { state: "unpaid" };

    const email = session.customer_email ?? session.customer_details?.email ?? null;
    const offer = session.metadata?.offer === "sessions" ? "sessions" : "course";
    const amountLabel = formatUsd(session.amount_total ?? 0);
    const emailSent = email ? await sendReceipt(session.id, email, offer, amountLabel) : false;

    return { state: "paid", email, offer, amountLabel, emailSent };
  } catch (error) {
    console.error("Checkout verification failed", error);
    return { state: "missing" };
  }
}

async function sendReceipt(sessionId: string, email: string, offer: string, amountLabel: string) {
  if (emailedSessionIds.has(sessionId)) return true;
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const bookingUrl = process.env.BOOKING_URL?.trim();
  const what = offer === "sessions" ? "private session block" : "course seat";
  const nextStep = bookingUrl
    ? `Book your sessions here: ${bookingUrl}`
    : "Reply to this email, or write to support@wds-it.com, and we will schedule your sessions.";

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: "contact@wdsit.com",
      to: email,
      bcc: "info@wdsit.com",
      subject: "Your Use AI at Work payment",
      html: `
        <p>Your payment of ${escapeHtml(amountLabel)} for your ${escapeHtml(what)} went through.</p>
        <p>${escapeHtml(nextStep)}</p>
        <p>Class access, if you bought the course, arrives by email. The classroom login is not open yet.</p>
        <p>Email support@wds-it.com before your first session if you want a refund.</p>
      `,
    });
    if (error) {
      console.error("Receipt email failed", error);
      return false;
    }
    emailedSessionIds.add(sessionId);
    return true;
  } catch (error) {
    console.error("Receipt email failed", error);
    return false;
  }
}
