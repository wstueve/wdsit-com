import type { Route } from "./+types/privacy";
import { Layout } from "~/components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - WDS IT" },
    { name: "description", content: "Privacy policy for WDS IT, LLC." },
    { property: "og:title", content: "Privacy Policy - WDS IT" },
    { property: "og:description", content: "Privacy policy for WDS IT, LLC." },
  ];
}

export default function Privacy() {
  const lastUpdated = new Date().toLocaleDateString();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="mb-8">Privacy Policy</h1>
        <div className="text-gray-600 dark:text-gray-400 text-sm mb-8">Last updated: {lastUpdated}</div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              WDS IT, LLC ("we," "our," or "us") teaches people how to use AI in their work. When you use this site, enroll, or email us, we collect information you give us. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Your name, email address, role, and the work task you want help with</li>
              <li>Payment details processed by our payment provider when you buy the course or private sessions</li>
              <li>Messages you send to support@wds-it.com</li>
              <li>Basic technical data such as browser type, which we use to keep the site working</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              What you type into an AI assistant such as ChatGPT, Copilot, or Gemini goes to that provider, not to us, unless you choose to share it in a session or an email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Deliver the course, private sessions, and related emails</li>
              <li>Process your payment and provide support</li>
              <li>Send scheduling and class-access messages</li>
              <li>Keep the site reliable and secure</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect the rights, property, or safety of WDS IT, our users, or others</li>
              <li>In connection with a business transfer (merger, acquisition, etc.)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">4. Data Security</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">5. Data Retention</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">6. Your Rights</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>The right to access, update, or delete your information</li>
              <li>The right to restrict or object to our processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent where we rely on consent to process your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">7. Payments and email</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Card payments are handled by Stripe. Delivery of our emails is handled by our email provider. Those companies process the data they need to complete the payment or send the message, under their own terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">9. Contact Us</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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
