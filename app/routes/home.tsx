import type { Route } from "./+types/home";
import { Layout } from "~/components/Layout";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "WDS IT - Shopify Solutions & AI Integration" },
    { name: "description", content: "Enterprise Shopify plugin development with AI integration and Azure certification. Expert database optimization and custom e-commerce solutions." },
    { property: "og:title", content: "WDS IT - Shopify Solutions & AI Integration" },
    { property: "og:description", content: "Enterprise Shopify plugin development with AI integration and Azure certification." },
    { property: "og:type", content: "website" },
  ];
}

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Enterprise Shopify Solutions
              <span className="block text-primary-600 dark:text-primary-400 mt-2">
                Powered by AI
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Elevate your e-commerce with custom Shopify plugins, AI-driven automation, and enterprise-scale database solutions. Certified in Azure AI and trusted by businesses that demand excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg text-primary-600 dark:text-primary-400 bg-white dark:bg-gray-800 border-2 border-primary-600 dark:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why Choose WDS IT?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Combining decades of enterprise experience with cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/80 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                AI-Powered Automation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Leverage Azure AI services to automate workflows, enhance customer experiences, and drive intelligent decision-making in your Shopify store.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/80 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Enterprise Database Solutions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimize performance with enterprise-scale database architecture, ensuring your Shopify store handles high traffic and complex data with ease.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/80 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Custom Plugin Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tailored Shopify apps built to your exact specifications, integrating seamlessly with your existing systems and workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Enterprise Experience Meets Modern Innovation
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                With extensive experience in enterprise-scale applications and databases, WDS IT brings proven expertise to the Shopify ecosystem. We combine traditional reliability with cutting-edge AI and cloud technologies.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Azure AI Certified professionals</span>
                </li>
                <li className="flex items-start">
                  <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Decades of enterprise application development</span>
                </li>
                <li className="flex items-start">
                  <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Expertise in marketing technologies and automation</span>
                </li>
                <li className="flex items-start">
                  <svg aria-hidden="true" className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">Shopify marketplace compliance expertise</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Store?</h3>
                <p className="mb-6 text-primary-100">
                  Let's discuss how we can enhance your Shopify store with custom solutions tailored to your business needs.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}