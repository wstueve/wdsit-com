import type { Route } from "./+types/about";
import { Layout } from "~/components/Layout";
import { Link } from "react-router";
import { BIO } from "~/lib/offers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About WDS IT - Use AI at Work" },
    {
      name: "description",
      content:
        "WDS IT teaches non-technical people how to use AI in their real work. Led by Wes Stueve in Olathe, Kansas.",
    },
    { property: "og:title", content: "About WDS IT" },
    {
      property: "og:description",
      content: "Plain-language AI training for people who do not write code.",
    },
  ];
}

export default function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-6">About WDS IT</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We teach people who do not write code how to use AI on the work they already have.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6">How we teach</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Plain language, real tasks, and a check before anything goes out the door. The assistant drafts. You decide.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We will tell you when an answer is the wrong place to trust a tool: hiring, health, legal matters, money, and anything about a specific person.
          </p>

          <h2 className="mb-6 mt-12">Who leads</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{BIO}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Wes leads the practice. Your session follows a written agenda. It may be with Wes, or with a coach trained to that agenda, so the same hour still works as we add people.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            WDS IT, LLC is based in Olathe, Kansas.
          </p>

          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 mt-12 border-2 border-primary-200 dark:border-primary-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">See the course</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The outline, the price, and both ways to buy are on the course page.
            </p>
            <Link
              to="/course"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              Read the outline
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
