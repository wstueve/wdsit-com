import type { Route } from "./+types/about";
import { Layout } from "~/components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About WDS IT - Enterprise Shopify Development" },
    { name: "description", content: "Learn about WDS IT's expertise in enterprise-scale applications, database optimization, and AI-powered Shopify solutions." },
    { property: "og:title", content: "About WDS IT - Enterprise Shopify Development" },
    { property: "og:description", content: "Enterprise Shopify development with AI integration and decades of technical experience." },
  ];
}

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center mb-6">About WDS IT</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
            Bringing enterprise-scale expertise and AI innovation to the Shopify ecosystem
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="mb-6">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              WDS IT, LLC was founded with a clear mission: to bring enterprise-grade technical expertise to Shopify merchants who need more than off-the-shelf solutions. Based in Olathe, Kansas, we combine decades of experience in large-scale application development with cutting-edge AI and cloud technologies.
            </p>

            <h2 className="mb-6 mt-12">Technical Expertise</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our team brings extensive experience from the enterprise software world, where performance, reliability, and scalability aren't optional—they're requirements. We've worked on systems handling millions of transactions, optimized databases managing terabytes of data, and built integrations connecting complex business ecosystems.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 my-8 border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Core Competencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Development</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                    <li>• Custom Shopify app development</li>
                    <li>• React & TypeScript</li>
                    <li>• RESTful & GraphQL APIs</li>
                    <li>• Serverless architecture</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">AI & Automation</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                    <li>• Azure AI services integration</li>
                    <li>• Machine learning implementation</li>
                    <li>• Intelligent automation workflows</li>
                    <li>• Natural language processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Database</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                    <li>• Database architecture & optimization</li>
                    <li>• Performance tuning</li>
                    <li>• Data migration strategies</li>
                    <li>• Scalability planning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Integration</h4>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
                    <li>• Enterprise system integration</li>
                    <li>• Third-party API connections</li>
                    <li>• Webhook implementations</li>
                    <li>• Data synchronization</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="mb-6 mt-12">AI & Azure Certification</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We are certified in Azure AI technologies, enabling us to bring sophisticated artificial intelligence capabilities to your Shopify store. From intelligent product recommendations to automated customer support and predictive analytics, we leverage Microsoft's AI platform to create competitive advantages for our clients.
            </p>

            <h2 className="mb-6 mt-12">Why Shopify?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              While we have experience across many platforms, we've chosen to focus on Shopify because of its robust ecosystem, strong developer tools, and commitment to merchant success. Shopify provides the foundation—we build the custom solutions that make your store stand out.
            </p>

            <h2 className="mb-6 mt-12">Our Approach</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We believe in:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              <li><strong>Technical Excellence:</strong> Clean code, proper architecture, and thorough testing</li>
              <li><strong>Performance First:</strong> Every millisecond matters in e-commerce</li>
              <li><strong>Security by Design:</strong> Protecting your data and your customers' privacy</li>
              <li><strong>Scalability:</strong> Building solutions that grow with your business</li>
              <li><strong>Clear Communication:</strong> Technical jargon only when necessary</li>
            </ul>

            <h2 className="mb-6 mt-12">Marketplace Compliance</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              All our Shopify apps are built to meet or exceed Shopify's marketplace requirements. We understand the importance of privacy, security, and user experience, and we design our solutions accordingly. Our apps undergo rigorous testing and security reviews before deployment.
            </p>

            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 my-12 border-2 border-primary-200 dark:border-primary-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Ready to Work Together?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Whether you need a custom Shopify app, database optimization, or AI integration, we're here to help your business succeed.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
