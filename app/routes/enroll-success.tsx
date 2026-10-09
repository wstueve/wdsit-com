import type { Route } from "./+types/enroll-success";
import { Layout } from "~/components/Layout";
import { Link } from "react-router";
import { verifyPaidSession } from "~/lib/checkout.server";

export async function loader({ request }: Route.LoaderArgs) {
  const sessionId = new URL(request.url).searchParams.get("session_id") ?? "";
  if (!sessionId) return { state: "missing" as const };
  return verifyPaidSession(sessionId);
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Payment - Use AI at Work" },
    { name: "description", content: "Payment status for Use AI at Work." },
  ];
}

export default function EnrollSuccess({ loaderData }: Route.ComponentProps) {
  return (
    <Layout>
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-6">Payment</h1>
          {loaderData.state === "paid" ? (
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>Your payment of {loaderData.amountLabel} went through.</p>
              {loaderData.emailSent && loaderData.email ? (
                <p>We emailed {loaderData.email} with how to book your sessions.</p>
              ) : (
                <p>
                  Email <a className="text-primary-600 dark:text-primary-400 underline" href="mailto:support@wds-it.com">support@wds-it.com</a> and we will schedule your sessions. Keep this page as your receipt.
                </p>
              )}
              {loaderData.offer === "course" ? (
                <p>Class material arrives by email. This page does not open the classroom.</p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <p>We could not confirm a completed payment. Your card has not been charged unless your bank shows a charge from us.</p>
              <p>
                If you already paid, email <a className="text-primary-600 dark:text-primary-400 underline" href="mailto:support@wds-it.com">support@wds-it.com</a> and we will look it up.
              </p>
            </div>
          )}
          <p className="mt-8">
            <Link to="/enroll" className="text-primary-600 dark:text-primary-400 font-medium underline">
              Back to enroll
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
