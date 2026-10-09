import { useState } from "react";
import { Form, Link, redirect } from "react-router";
import type { Route } from "./+types/enroll";
import { Layout } from "~/components/Layout";
import {
  activeCourseCents,
  createCheckoutSession,
  readCheckoutForm,
  tooManyAttempts,
} from "~/lib/checkout.server";
import {
  COURSE_FOUNDING_CENTS,
  COURSE_REGULAR_CENTS,
  REFUND,
  SESSION_CENTS,
  SESSION_MAX,
  SESSION_MIN,
  formatUsd,
  sessionTotalCents,
} from "~/lib/offers";

export function loader({ request }: Route.LoaderArgs) {
  const offer = new URL(request.url).searchParams.get("offer") === "sessions" ? "sessions" : "course";
  return { courseCents: activeCourseCents(), offer };
}

export async function action({ request }: Route.ActionArgs) {
  if (tooManyAttempts(request)) {
    return { error: "rate_limited" as const, message: "Too many attempts. Wait a few minutes and try again. Your card has not been charged." };
  }

  const parsed = readCheckoutForm(await request.formData());
  if (!parsed.ok) {
    return { error: "invalid" as const, message: parsed.message };
  }

  const result = await createCheckoutSession(request, parsed.value);
  if ("error" in result) {
    return {
      error: result.error,
      message:
        "Online payment is not open yet. Email support@wds-it.com and we will send a way to pay. Your card has not been charged.",
    };
  }

  return redirect(result.url);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enroll - Use AI at Work" },
    {
      name: "description",
      content: "Pay for the Use AI at Work course, or buy a block of 2 to 5 private sessions.",
    },
    { property: "og:title", content: "Enroll in Use AI at Work" },
    { property: "og:description", content: "Pay for the course or a block of private sessions." },
  ];
}

const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-transparent";

export default function Enroll({ loaderData, actionData }: Route.ComponentProps) {
  const { courseCents } = loaderData;
  const [offer, setOffer] = useState<"course" | "sessions">(loaderData.offer);
  const [sessions, setSessions] = useState(String(SESSION_MIN));
  const sessionCount = Number(sessions);
  const total = offer === "course" ? courseCents : sessionTotalCents(sessionCount);
  const founding = courseCents === COURSE_FOUNDING_CENTS;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6">Enroll</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Pay for the course, or buy private sessions if you do not want the four weeks.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950" data-testid="main-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">What you are buying</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {founding
                ? `The course is ${formatUsd(COURSE_FOUNDING_CENTS)} for the first eight seats, then ${formatUsd(COURSE_REGULAR_CENTS)}. It includes four weeks, exercises, a prompt library, and two private sessions.`
                : `The course is ${formatUsd(courseCents)}. It includes four weeks, exercises, a prompt library, and two private sessions.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Private sessions are {formatUsd(SESSION_CENTS)} each. Choose 2, 3, 4, or 5. Two sessions alone are {formatUsd(sessionTotalCents(2))}, so the course is the better value if you also want the four weeks.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{REFUND}</p>
              <p className="text-gray-600 dark:text-gray-400">
              Questions before you pay: <a className="text-primary-600 dark:text-primary-400 underline" href="mailto:support@wds-it.com">support@wds-it.com</a>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Olathe, Kansas</p>
            <p className="mt-6">
              <Link to="/course" className="text-primary-600 dark:text-primary-400 font-medium underline">
                Read the outline first
              </Link>
            </p>
          </div>

          <div className="bg-white/80 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
            <Form method="post" className="space-y-6">
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What do you want to buy?
                </legend>
                <label className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <input
                    type="radio"
                    name="offer"
                    value="course"
                    checked={offer === "course"}
                    onChange={() => setOffer("course")}
                    className="mt-1"
                  />
                  <span>The course, {formatUsd(courseCents)}</span>
                </label>
                <label className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                  <input
                    type="radio"
                    name="offer"
                    value="sessions"
                    checked={offer === "sessions"}
                    onChange={() => setOffer("sessions")}
                    className="mt-1"
                  />
                  <span>Private sessions only, {formatUsd(SESSION_CENTS)} each</span>
                </label>
              </fieldset>

              {offer === "sessions" ? (
                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How many sessions?
                  </legend>
                  {Array.from({ length: SESSION_MAX - SESSION_MIN + 1 }, (_, index) => SESSION_MIN + index).map((count) => (
                    <label key={count} className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="sessions"
                        value={String(count)}
                        checked={sessions === String(count)}
                        onChange={() => setSessions(String(count))}
                        className="mt-1"
                      />
                      <span>
                        {count} sessions, {formatUsd(sessionTotalCents(count))}
                      </span>
                    </label>
                  ))}
                </fieldset>
              ) : (
                <input type="hidden" name="sessions" value={String(SESSION_MIN)} />
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input id="name" name="name" type="text" required maxLength={200} autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role *
                </label>
                <input id="role" name="role" type="text" required maxLength={200} className={fieldClass} placeholder="What you do at work" />
              </div>
              <div>
                <label htmlFor="task" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  The task you most want help with *
                </label>
                <textarea id="task" name="task" required maxLength={2000} rows={4} className={`${fieldClass} resize-none`} />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">{REFUND}</p>

              {actionData?.message ? (
                <div role="alert" className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm">
                  {actionData.message}
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg transition-colors min-h-[48px]"
              >
                Pay {formatUsd(total)}
              </button>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
