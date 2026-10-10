import { Resend } from "resend";
import { COMPANY_PROGRAM_CENTS, TEAM_DAY_CENTS, formatUsd } from "./offers";

export type CompanyProgram = "team-day" | "company-program";

export type Inquiry = {
  program: CompanyProgram;
  company: string;
  name: string;
  email: string;
  role: string;
  teamSize: string;
  note: string;
};

export function readInquiry(formData: FormData): { ok: true; value: Inquiry } | { ok: false; message: string } {
  const programRaw = String(formData.get("program") ?? "");
  const company = String(formData.get("company") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const teamSize = String(formData.get("teamSize") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  if (programRaw !== "team-day" && programRaw !== "company-program") {
    return { ok: false, message: "Choose the team day or the company program." };
  }
  if (!company || company.length > 200) return { ok: false, message: "Enter the company name." };
  if (!name || name.length > 200) return { ok: false, message: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, message: "Enter a valid email." };
  }
  if (!role || role.length > 200) return { ok: false, message: "Enter your role." };
  if (!teamSize || teamSize.length > 40) return { ok: false, message: "Enter about how many people would attend." };
  if (note.length > 2000) return { ok: false, message: "Shorten the note and try again." };

  return {
    ok: true,
    value: { program: programRaw, company, name, email, role, teamSize, note },
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendInquiry(inquiry: Inquiry): Promise<{ sent: true } | { sent: false }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false };

  const price = inquiry.program === "team-day" ? formatUsd(TEAM_DAY_CENTS) : formatUsd(COMPANY_PROGRAM_CENTS);
  const program = inquiry.program === "team-day" ? "Team day" : "Company program";

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      from: "contact@wdsit.com",
      to: "info@wdsit.com",
      replyTo: inquiry.email,
      subject: `Company training: ${inquiry.company}`,
      html: `
        <p><strong>Program:</strong> ${escapeHtml(program)} (${escapeHtml(price)})</p>
        <p><strong>Company:</strong> ${escapeHtml(inquiry.company)}</p>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
        <p><strong>Role:</strong> ${escapeHtml(inquiry.role)}</p>
        <p><strong>Team size:</strong> ${escapeHtml(inquiry.teamSize)}</p>
        <p><strong>Note:</strong></p>
        <p>${escapeHtml(inquiry.note).replace(/\n/g, "<br>")}</p>
      `,
    });
    if (error) {
      console.error("Company inquiry email failed", error);
      return { sent: false };
    }
    return { sent: true };
  } catch (error) {
    console.error("Company inquiry email failed", error);
    return { sent: false };
  }
}
