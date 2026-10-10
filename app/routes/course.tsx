import type { Route } from "./+types/course";
import { Layout } from "~/components/Layout";
import { Link } from "react-router";
import { activeCourseCents } from "~/lib/checkout.server";
import {
  COURSE_FOUNDING_CENTS,
  COURSE_REGULAR_CENTS,
  FAQS,
  REFUND,
  SESSION_CENTS,
  WEEKS,
  formatUsd,
} from "~/lib/offers";

export function loader() {
  return { courseCents: activeCourseCents() };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Course - Use AI at Work" },
    {
      name: "description",
      content:
        "Four weeks of practical AI training for people who do not write code, with two private sessions included.",
    },
    { property: "og:title", content: "Use AI at Work course outline" },
    {
      property: "og:description",
      content: "See the four-week outline, what is included, and how to enroll.",
    },
  ];
}

export default function Course({ loaderData }: Route.ComponentProps) {
  const { courseCents } = loaderData;
  const founding = courseCents === COURSE_FOUNDING_CENTS;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6">The course</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A short, practical course for people who do not write code. You learn to brief an AI assistant, check its work, and use it on the writing, research, and planning you already do.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8">The four weeks</h2>
          <ol className="space-y-8">
            {WEEKS.map((week, index) => (
              <li key={week.title}>
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">
                  Week {index + 1}: {week.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{week.summary}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-gray-600 dark:text-gray-400">
            Lessons are self-paced. The two private sessions are scheduled around your weeks: one after you start, and one after you finish a workflow you will keep.
          </p>

          <h2 className="mt-16 mb-6">Included</h2>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Four weeks of class material</li>
            <li>Exercises on your own work, with private details removed</li>
            <li>A prompt library and a short checklist of what not to paste</li>
            <li>Two 60-minute private sessions</li>
          </ul>
          <p className="mt-6 text-gray-700 dark:text-gray-300">
            The outline is public. The lesson steps, worksheets, and prompt library are for enrolled students. Paying does not open a classroom login yet. Access arrives by email.
          </p>

          <h2 className="mt-16 mb-6">Price</h2>
          <p className="text-lg text-gray-800 dark:text-gray-200">
            {founding
              ? `The first eight seats are ${formatUsd(COURSE_FOUNDING_CENTS)}. After that, the course is ${formatUsd(COURSE_REGULAR_CENTS)}.`
              : `The course is ${formatUsd(courseCents)}.`}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{REFUND}</p>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            If you want hands-on help and not the class, private sessions are {formatUsd(SESSION_CENTS)} each, in a block of 2, 3, 4, or 5.
          </p>
          <div className="mt-8">
            <Link
              to="/enroll"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
            >
              Enroll
            </Link>
          </div>

          <h2 className="mt-16 mb-6">Questions</h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
            {FAQS.map((item) => (
              <details key={item.question} className="py-4">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-gray-100">
                  {item.question}
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
