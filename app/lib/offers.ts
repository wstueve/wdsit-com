export const COURSE_FOUNDING_CENTS = 99_700;
export const COURSE_REGULAR_CENTS = 120_000;
export const SESSION_CENTS = 37_500;
export const SESSION_MIN = 2;
export const SESSION_MAX = 5;
export const FOUNDING_SEAT_CAP = 8;
export const TEAM_DAY_CENTS = 1_500_000;
export const COMPANY_PROGRAM_CENTS = 3_000_000;

export const CASE_STUDIES = [
  {
    title: "A product team that already had the tools",
    setting: "A global manufacturer",
    situation:
      "The company had bought AI assistants. Most people tried them once, got a generic draft, and went back to the old way. A few were pasting internal material into a public tool.",
    move: "We put one brief in place, a check before anything left the team, and a short list of what never gets pasted. People practiced on real specs and tickets, not on sample prompts.",
    change:
      "Reviews started from a draft that already had the constraints. New people copied the brief instead of inventing their own. The assistant stopped being a toy on the side of the job.",
  },
  {
    title: "Customer writing that sounded like three companies",
    setting: "A company with many customer-facing teams",
    situation:
      "Marketing, support, and operations each had a different way of asking an assistant for help. Customer emails did not sound like one company. A manager could not tell which drafts had been checked.",
    move: "We taught one briefing pattern for customer replies, status updates, and internal recommendations. Managers learned what to review. The people doing the work practiced on the previous day's queue.",
    change:
      "The drafts started sounding like the company. Review became a decision, not a rewrite of the whole message.",
  },
  {
    title: "Leaders who needed a plan they could check",
    setting: "A regulated utility",
    situation:
      "Sponsors had to choose what to modernize. The source documents were long. An AI summary that missed a constraint would have been worse than no summary, because it looked finished.",
    move: "We taught the sponsors to ask for a plan, then check names, numbers, and constraints before anyone treated it as a recommendation. Engineers still made the technical decision.",
    change:
      "Leaders could read a short brief and see what was still unverified. The tool sped up the reading. It did not make the call.",
  },
] as const;

export const BIO =
  "Wes Stueve is a senior engineering leader with more than 20 years of building software for large companies. He has run his own consultancy, led engineering work, and taught at the university level. He has used AI in real product work for more than six years, including bringing AI assistants into how a team gets its work done. He is based in Olathe, Kansas.";

export const REFUND =
  "Email support@wds-it.com before your first session and we refund the payment. After the first session, the sale is final.";

export const WEEKS = [
  {
    title: "See what it can and cannot do",
    summary:
      "Stop guessing. Leave with a clear picture of what these tools are good at, and three tasks you can try the same day.",
  },
  {
    title: "Brief it like a capable assistant",
    summary: "Give instructions that return a useful first draft instead of a generic one.",
  },
  {
    title: "Trust, but verify",
    summary: "Catch invented facts, and keep private information private.",
  },
  {
    title: "Make it part of your week",
    summary: "Leave with one workflow you will keep using, and a 30-minute weekly routine.",
  },
] as const;

export const FAQS = [
  {
    question: "Do I need to code?",
    answer:
      "No. This is for people who do their work in email, documents, meetings, and spreadsheets.",
  },
  {
    question: "Which AI product do I need?",
    answer:
      "Use an assistant you already have. ChatGPT, Copilot, and Gemini are examples. None of them is required.",
  },
  {
    question: "What if I have never used one?",
    answer: "Week 1 starts with setup and three small tasks on work you already do.",
  },
  {
    question: "Is the private session about my job?",
    answer:
      "Yes. You bring one real task, with private details removed. You leave with a brief you can reuse and a way to check the answer.",
  },
  {
    question: "What should I avoid pasting in?",
    answer:
      "Passwords, customer lists, health information, legal matters, and unpublished financials.",
  },
  {
    question: "Who will I meet with?",
    answer:
      "Wes leads the practice. A private session follows a written agenda, with Wes or a coach trained to that agenda.",
  },
  {
    question: "What if I only want the sessions?",
    answer:
      "Buy a block of 2, 3, 4, or 5 sessions. You skip the four weeks, the exercises, and the prompt library.",
  },
  {
    question: "What is the refund?",
    answer: REFUND,
  },
] as const;

export function formatUsd(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function sessionTotalCents(count: number) {
  return count * SESSION_CENTS;
}
