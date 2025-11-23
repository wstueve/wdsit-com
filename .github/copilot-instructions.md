# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Context
This is a React Router website for a Shopify plugin business, converted from legacy ASP.NET consulting site content. The site showcases technical expertise and credibility for Shopify marketplace requirements. We have also been using AI tools and are certified in Azure AI. The goal is to create a fast, responsive, and SEO-optimized site that highlights our experience with enterprise-scale applications and databases.  We want to ensure the site meets Shopify's marketplace requirements while maintaining a professional and technical tone.

It is built with TypeScript and React Router, focusing on static generation where possible for optimal performance. The design should be clean, modern, and responsive, catering to both Shopify merchants and developers.  It is hosted on Google Cloud Run with global load balancing and CDN for fast worldwide delivery.

## Technical Requirements
- Use React Router with TypeScript
- Implement static generation where possible for optimal performance
- Focus on fast first-load performance
- Follow modern React patterns and best practices
- Ensure responsive design for various devices
- Optimize for SEO with proper metadata and structure
- Create a clean and maintainable codebase
- Utilize many components for modularity and reusability
- Follow SOLID principles and clean architecture
- Ensure accessibility compliance (WCAG 2.1)
- Host on Google Cloud Run with Cloud CDN
- Secure the application against vulnerabilities
- Implement proper error handling and user feedback mechanisms
- Create playwright tests which fail and then fix them
- Only run single tests to verify functionality and then run entire suite once all single tests are passing
- When running playwright tests, ensure to use the reporter list flag to keep the browser from opening as to not block the terminal

## Content Guidelines
- Adapt consulting services content to demonstrate plugin development expertise especially with AI
- Maintain professional, technical credibility
- Include required marketplace pages (Terms of Service, Privacy Policy)
- Emphasize experience with AI and marketing technologies
- Keep responsive design principles
- Target audience is shopify merchants and developers

## Code Style
- Use TypeScript strictly
- Prefer functional components with hooks
- Use Tailwind classes over custom CSS
- Implement proper SEO metadata
- Follow React Router performance best practices
- Write clean, readable, and well-documented code
- Ensure components are reusable and modular
- Adhere to SOLID principles and clean architecture
- Ensure accessibility compliance (WCAG 2.1)
- Use descriptive naming conventions for variables and functions
- Write unit tests for critical components and functions
- Use Git for version control with clear commit messages
- Follow a consistent code formatting style (e.g., Prettier)
- Avoid inline styles; prefer Tailwind CSS classes
- Ensure proper error handling and user feedback mechanisms
- Optimize images and assets for web performance
- Regularly review and refactor code to maintain quality and performance
- Use environment variables for configuration and sensitive data
- Document components and functions with JSDoc comments where necessary
- Ensure cross-browser compatibility and test on major browsers
- Implement lazy loading for non-critical resources to improve initial load times
- Use React's built-in features for state management; avoid unnecessary external libraries
- Follow best practices for SEO, including semantic HTML and proper use of headings
- Ensure the application is mobile-first and responsive across all devices
- Regularly update dependencies to keep the project secure and up-to-date
- Use GitHub Actions for continuous integration and deployment
- Ensure the application adheres to Shopify's marketplace requirements and guidelines
- Leverage AI tools and technologies where appropriate to enhance functionality and user experience 
