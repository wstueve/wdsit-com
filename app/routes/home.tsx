import type { Route } from "./+types/home";
import { Layout } from "~/components/Layout";
import { Link } from "react-router";
import { activeCourseCents } from "~/lib/checkout.server";
import {
  BIO,
  COURSE_FOUNDING_CENTS,
  COURSE_REGULAR_CENTS,
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
    { title: "WDS IT - Use AI at Work" },
    {
      name: "description",
      content:
        "A practical AI course for people who do not write code, plus private sessions on your real work. From WDS IT in Olathe, Kansas.",
    },
    { property: "og:title", content: "Use AI at Work" },
    {
      property: "og:description",
      content:
        "Four weeks of practical AI training for non-technical work, with two private sessions included.",
    },
    { property: "og:type", content: "website" },
  ];
}

const primaryLink =
  "inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl";

export default function Home({ loaderData }: Route.ComponentProps) {
  const { courseCents } = loaderData;
  const founding = courseCents === COURSE_FOUNDING_CENTS;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Use AI at work
              <span className="block text-primary-600 dark:text-primary-400 mt-2">
                without learning to code
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              A four-week course that shows you how to brief an AI assistant, check its work, and keep one workflow you will actually use. Two private sessions are included.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto mb-8">
              {founding
                ? `The first eight seats are ${formatUsd(COURSE_FOUNDING_CENTS)}. After that, the course is ${formatUsd(COURSE_REGULAR_CENTS)}.`
                : `The course is ${formatUsd(courseCents)}.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll" className={primaryLink}>
                Enroll
              </Link>
              <Link
                to="/course"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 border-2 border-primary-600 dark:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                See the four weeks
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            The tools feel ahead of you
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Answers look polished, and some of them are wrong. Nobody has shown you a way to use this in the job you already have.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            You will leave able to brief an assistant, check the result, and keep one workflow. You decide what gets sent. The tool only drafts.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center">
            How the course works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Four weeks of lessons you do on your own time.",
              "Exercises on your own work, with private details removed.",
              "Two 60-minute sessions: one to choose a workflow, one to review it.",
            ].map((item) => (
              <div
                key={item}
                className="bg-white/80 dark:bg-gray-950 rounded-xl p-8 border border-gray-200 dark:border-gray-800"
              >
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/enroll" className={primaryLink}>
              Enroll
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Four weeks
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center mb-10">
            The public page is the outline. The lessons, worksheets, and prompt library are for paid students.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WEEKS.map((week, index) => (
              <div
                key={week.title}
                className="bg-white/80 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Week {index + 1}: {week.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{week.summary}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <Link to="/course" className="text-primary-600 dark:text-primary-400 font-medium underline">
              Read the full outline
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What a better brief looks like
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            This is an example we wrote for the page. It is not a client result.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Before</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Hey, circling back on the vendor. Let me know.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">After</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Hi Priya, the vendor sent the revised quote yesterday. I need your yes or no by Thursday so we can keep the June start. I recommend we accept it. The price is the same, and they added the onboarding call we asked for.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-primary-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Who teaches this</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{BIO}</p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Wes leads the practice. A private session follows a written agenda, with Wes or a coach trained to that agenda.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border-2 border-primary-600 dark:border-primary-400">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">The course</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {founding
                  ? `${formatUsd(courseCents)} for the first eight seats, then ${formatUsd(COURSE_REGULAR_CENTS)}.`
                  : `${formatUsd(courseCents)}.`}
                {" "}Four weeks, the exercises, a prompt library, and two private sessions.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{REFUND}</p>
              <Link to="/enroll" className={primaryLink}>
                Enroll
              </Link>
            </div>
            <div className="bg-white/80 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                Private sessions only
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                For hands-on help without the four weeks. Each session is 60 minutes and {formatUsd(SESSION_CENTS)}. Choose 2, 3, 4, or 5.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{REFUND}</p>
              <Link
                to="/enroll?offer=sessions"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800 transition-colors"
              >
                Buy sessions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
