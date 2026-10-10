import { useState } from "react";
import { Form } from "react-router";
import type { Route } from "./+types/companies";
import { Layout } from "~/components/Layout";
import { readInquiry, sendInquiry } from "~/lib/inquiry.server";
import {
  CASE_STUDIES,
  COMPANY_PROGRAM_CENTS,
  TEAM_DAY_CENTS,
  formatUsd,
} from "~/lib/offers";

const attempts = new Map<string, { count: number; resetAt: number }>();

function tooManyAttempts(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 8;
}

export async function action({ request }: Route.ActionArgs) {
  if (tooManyAttempts(request)) {
    return {
      status: "rate_limited" as const,
      message: "Too many attempts. Wait a few minutes, or email support@wds-it.com. Nothing was sent.",
    };
  }

  const parsed = readInquiry(await request.formData());
  if (!parsed.ok) return { status: "invalid" as const, message: parsed.message };

  const result = await sendInquiry(parsed.value);
  if (!result.sent) {
    return {
      status: "unsent" as const,
      message:
        "This form is not delivering email yet. Write to support@wds-it.com with the program you want. Nothing was sent from this page.",
    };
  }

  return {
    status: "sent" as const,
    message: `We received the request and emailed info@wdsit.com. We will reply at ${parsed.value.email}.`,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Companies - WDS IT AI Training" },
    {
      name: "description",
      content:
        "Company AI training for people who do not write code. A team day is $15,000. A four-week company program is $30,000.",
    },
    { property: "og:title", content: "Company AI training from WDS IT" },
    {
      property: "og:description",
      content: "Train a non-technical team to brief an AI assistant, check the work, and keep private data out.",
    },
  ];
}

const fieldClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 focus:border-transparent";

const primaryButton =
  "w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg transition-colors min-h-[48px]";

export default function Companies({ actionData }: Route.ComponentProps) {
  const [program, setProgram] = useState<"team-day" | "company-program">("company-program");

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6">Train the people who do the work</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            A company program for teams that do not write code. They leave knowing how to brief an assistant, check the answer, and keep private data out of the tool.
          </p>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            {formatUsd(TEAM_DAY_CENTS)} for a team day. {formatUsd(COMPANY_PROGRAM_CENTS)} for a four-week program.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6">What is going wrong without this</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            People are already using AI. They are doing it alone, in different tools, with no shared check. Some of the drafts sound polished and are wrong. Some of them contain customer data, numbers that should not leave the building, or a promise the company did not make.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            A tool rollout does not fix that. A shared way of working does. Managers need to know what to review. Everyone else needs a brief they can reuse on Monday.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950" id="programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="rounded-xl border border-gray-200 dark:border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Team day</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{formatUsd(TEAM_DAY_CENTS)}</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>A prep call with the sponsor, so the day is about your work</li>
              <li>One working day, on site or remote, for up to 25 people</li>
              <li>Practice on real emails, notes, and briefs, with private details removed</li>
              <li>A one-page playbook the company keeps</li>
              <li>Two weeks of email follow-up for the sponsor</li>
            </ul>
            <a href="#request" className="text-primary-600 dark:text-primary-400 font-medium underline">
              Request the team day
            </a>
          </article>
          <article className="rounded-xl border-2 border-primary-600 dark:border-primary-400 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Company program</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{formatUsd(COMPANY_PROGRAM_CENTS)}</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li>The team day, for up to 40 people</li>
              <li>A separate session for managers on what to review and what to send back</li>
              <li>A second working day, two weeks later, on the workflows that stuck</li>
              <li>Four office hours for the people who want a person in the room</li>
              <li>A playbook filled in with your examples, not ours</li>
            </ul>
            <a href="#request" className="text-primary-600 dark:text-primary-400 font-medium underline">
              Request the company program
            </a>
          </article>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6">What the team day feels like</h2>
          <ol className="space-y-4 text-gray-700 dark:text-gray-300">
            <li>The sponsor call happens the week before. We pick three real tasks and strip the private details.</li>
            <li>Morning: what the tool can and cannot do, then three tasks everyone tries on their own work.</li>
            <li>Midday: the brief. Role, goal, audience, constraints, and one example of a good result.</li>
            <li>Afternoon: the check. Names, numbers, dates, and the list of what never gets pasted.</li>
            <li>They leave with a playbook and one workflow they will use the next day.</li>
          </ol>
          <p className="mt-6 text-gray-700 dark:text-gray-300">
            Email support@wds-it.com before the first session and we refund the payment. After that session, the sale is final.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4">Case studies</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            These are from Wes Stueve's work leading this kind of change inside large companies. Names are left off. They are not quotes from a training client, and they are not a promise that your team will get the same result.
          </p>
          <div className="space-y-10">
            {CASE_STUDIES.map((study) => (
              <article key={study.title} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
                <p className="text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">{study.setting}</p>
                <h3 className="text-gray-900 dark:text-gray-100 mb-4">{study.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <span className="font-semibold">Situation. </span>
                  {study.situation}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <span className="font-semibold">What changed in the work. </span>
                  {study.move}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">What was different after. </span>
                  {study.change}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950" id="request" data-testid="main-content">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4">Request a program</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            Tell us which program and who would be in the room. We reply with how to pay and a date. The date is not held until the invoice is paid.
          </p>
          <Form method="post" className="space-y-6">
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Program</legend>
              <label className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                <input
                  type="radio"
                  name="program"
                  value="team-day"
                  checked={program === "team-day"}
                  onChange={() => setProgram("team-day")}
                  className="mt-1"
                />
                <span>Team day, {formatUsd(TEAM_DAY_CENTS)}</span>
              </label>
              <label className="flex items-start gap-3 text-gray-800 dark:text-gray-200">
                <input
                  type="radio"
                  name="program"
                  value="company-program"
                  checked={program === "company-program"}
                  onChange={() => setProgram("company-program")}
                  className="mt-1"
                />
                <span>Company program, {formatUsd(COMPANY_PROGRAM_CENTS)}</span>
              </label>
            </fieldset>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company *</label>
              <input id="company" name="company" required maxLength={200} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
              <input id="name" name="name" required maxLength={200} autoComplete="name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email *</label>
              <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role *</label>
              <input id="role" name="role" required maxLength={200} className={fieldClass} placeholder="Your job, not your title stack" />
            </div>
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How many people *</label>
              <input id="teamSize" name="teamSize" required maxLength={40} className={fieldClass} placeholder="For example, 18" />
            </div>
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What should the team be able to do after?</label>
              <textarea id="note" name="note" rows={4} maxLength={2000} className={`${fieldClass} resize-none`} />
            </div>
            {actionData?.message ? (
              <div
                role="status"
                className={`p-4 rounded-lg text-sm border ${
                  actionData.status === "sent"
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
                }`}
              >
                {actionData.message}
              </div>
            ) : null}
            <button type="submit" className={primaryButton}>
              Request {program === "team-day" ? formatUsd(TEAM_DAY_CENTS) : formatUsd(COMPANY_PROGRAM_CENTS)} program
            </button>
          </Form>
        </div>
      </section>
    </Layout>
  );
}
