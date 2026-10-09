export const COURSE_FOUNDING_CENTS = 99_700;
export const COURSE_REGULAR_CENTS = 120_000;
export const SESSION_CENTS = 37_500;
export const SESSION_MIN = 2;
export const SESSION_MAX = 5;
export const FOUNDING_SEAT_CAP = 8;

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
