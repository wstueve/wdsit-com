import type { Route } from "./+types/terms";
import { Layout } from "~/components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terms of Service - WDS IT Shopify Apps" },
    { name: "description", content: "Terms of service for WDS IT Shopify applications and services" },
    { property: "og:title", content: "Terms of Service - WDS IT" },
    { property: "og:description", content: "Terms of service for WDS IT Shopify applications and services" },
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
              By accessing or using WDS IT, LLC's ("WDS IT," "we," "our," or "us") Shopify applications and services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              WDS IT provides Shopify applications and related services designed to enhance e-commerce functionality. Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Custom Shopify app development and integration</li>
              <li>Database optimization and management solutions</li>
              <li>Enterprise system integrations</li>
              <li>Technical support and consulting services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Provide accurate and complete information when using our services</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use our services in compliance with all applicable laws and regulations</li>
              <li>Not attempt to reverse engineer, modify, or distribute our applications</li>
              <li>Not use our services for any fraudulent or harmful purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">4. Payment and Billing</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Payment terms vary by service and are specified at the time of purchase. Generally:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Fees are charged in advance for subscription services</li>
              <li>Custom development projects are billed according to agreed-upon milestones</li>
              <li>All fees are non-refundable unless otherwise specified</li>
              <li>We reserve the right to change pricing with reasonable notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4">5. Intellectual Property</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              WDS IT retains all rights, title, and interest in our applications, services, and related intellectual property. You are granted a limited, non-exclusive, non-transferable license to use our services for their intended purpose.
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
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Email:</strong> <a href="mailto:support@wds-it.com" className="text-primary-600 dark:text-primary-400 hover:underline">support@wds-it.com</a></p>
              <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> WDS IT, LLC, Olathe, KS</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
