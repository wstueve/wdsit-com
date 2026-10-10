import type { Route } from "./+types/terms";
import { Layout } from "~/components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - WDS IT" },
    { name: "description", content: "Terms of service for WDS IT, LLC." },
    { property: "og:title", content: "Terms of Service - WDS IT" },
    { property: "og:description", content: "Terms of service for WDS IT, LLC." },
  ];
}

export default function Terms() {
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mb-8">Terms of Service</h1>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-8">Last updated: {lastUpdated}</div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By using this website or buying training from WDS IT, LLC ("WDS IT," "we," "our," or "us"), you agree to these Terms of Service ("Terms"). If you do not agree, do not use the site or enroll.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              WDS IT is an AI enablement and training company. We teach people who do not write code how to use AI in their work. What we sell is described on the site at the time you pay:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>The Use AI at Work course, including class material and two private sessions</li>
              <li>Private sessions sold on their own, in a block of 2, 3, 4, or 5</li>
              <li>Company training: a team day, or a four-week program, at the prices on the Companies page</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Give accurate information when you enroll</li>
              <li>Use the site and the class material for your own learning</li>
              <li>Not share, resell, or publish the class material</li>
              <li>Follow the law, and not use the training to harm someone</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">4. Payment and Billing</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The price is shown before you pay. You pay in full at checkout.
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Email support@wds-it.com before your first session and we refund the payment</li>
              <li>After the first session, the sale is final</li>
              <li>A later price change does not change a payment you already made</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We keep ownership of the course material, prompts, and site content. Your payment gives you a personal, non-transferable right to use that material for your own work. It does not let you resell it or teach it as your own course.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">6. Data and Privacy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using our services, you consent to the collection and use of information as described in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">7. Service Availability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we strive to maintain high service availability, we do not guarantee uninterrupted access to our services. We may perform maintenance, updates, or experience unexpected downtime that could temporarily affect service availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WDS IT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">9. Indemnification</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You agree to indemnify and hold harmless WDS IT from any claims, damages, losses, or expenses arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">10. Termination</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Either party may terminate the service relationship at any time. WDS IT reserves the right to suspend or terminate access to our services for violation of these Terms or for any other reason deemed necessary.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">11. Governing Law</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              These Terms are governed by the laws of the State of Kansas, United States, without regard to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We reserve the right to modify these Terms at any time. Material changes will be communicated through appropriate channels, and continued use of our services constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">13. Contact Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For questions about these Terms, please contact us:
            </p>
            <div className="bg-white/80 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Email:</strong> <a href="mailto:support@wds-it.com" className="text-primary-600 dark:text-primary-400 underline">support@wds-it.com</a></p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> WDS IT, LLC, Olathe, KS</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
