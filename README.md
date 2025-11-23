# WDS IT - Shopify Solutions

Enterprise Shopify plugin development with AI integration and Azure certification. A modern, responsive website built with React Router 7 and deployed on Google Cloud Run with global CDN.

## 🚀 Features

- **Modern Tech Stack**: React 19, React Router 7, TypeScript, Tailwind CSS 4
- **Responsive Design**: Mobile-first approach with optimized layouts for phones, tablets, and desktops
- **Theme Support**: Light, dark, and high-contrast themes with system preference detection and manual override
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive keyboard navigation and screen reader support
- **Performance**: Server-side rendering (SSR) with Cloud Run and Cloud CDN for fast global delivery
- **Testing**: Comprehensive Playwright test suite covering E2E, accessibility, and deployment validation
- **SEO Optimized**: Proper meta tags, Open Graph support, and semantic HTML

## 📋 Prerequisites

- Node.js LTS (latest)
- npm or yarn

## 🛠️ Setup

Install dependencies:

```sh
npm install
```

## 💻 Development

Run the development server:

```sh
npm run dev
```

The site will be available at `http://localhost:5173`

## 🧪 Testing

Run all Playwright tests:

```sh
npm test
```

Run tests in headed mode (with browser visible):

```sh
npm run test:headed
```

Run tests with Playwright UI:

```sh
npm run test:ui
```

Run deployment smoke tests (against production):

```sh
PLAYWRIGHT_TEST_BASE_URL=https://wdsit.com npm run test:deployment
```

## 🏗️ Build

Build for production:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## 🚢 Deployment

### Google Cloud Run

Deploy to Cloud Run from source (no Docker required):

```sh
npm run deploy
```

Cloud Run will automatically containerize your application using Cloud Buildpacks and deploy it with global Cloud CDN distribution.

For detailed migration and setup instructions, see [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md).

### CI/CD

GitHub Actions workflows:
- `.github/workflows/playwright.yml` - Run tests on PRs and main branch
- `.github/workflows/deploy.yml` - Deploy from source to Cloud Run with gradual traffic migration
- Automated smoke tests after production deployments
- Test reports stored as artifacts

## 📁 Project Structure

```
├── app/
│   ├── components/       # Reusable React components
│   │   ├── Layout.tsx    # Main layout wrapper
│   │   ├── Header.tsx    # Site header with navigation
│   │   ├── Footer.tsx    # Site footer
│   │   ├── Navigation.tsx # Navigation component
│   │   └── ThemeToggle.tsx # Theme switcher
│   ├── routes/           # React Router routes
│   │   ├── home.tsx      # Homepage
│   │   ├── about.tsx     # About page
│   │   ├── contact.tsx   # Contact page
│   │   ├── privacy.tsx   # Privacy Policy
│   │   └── terms.tsx     # Terms of Service
│   ├── app.css           # Global styles and theme definitions
│   ├── entry.server.tsx  # Server entry point
│   ├── root.tsx          # Root layout
│   └── routes.ts         # Route configuration
├── public/               # Static assets
│   ├── favicon.ico
│   ├── wds-it.png        # Logo (original)
│   ├── wds-it_287x84.png # Logo (small)
│   └── wds-it_450x132.png # Logo (medium)
├── tests/                # Playwright tests
│   ├── accessibility/    # WCAG compliance tests
│   ├── e2e/             # End-to-end tests
│   └── deployment/      # Production smoke tests
├── terraform/           # Infrastructure as Code
│   ├── main.tf          # Terraform configuration
│   ├── cloud-run.tf     # Cloud Run service
│   ├── load-balancer.tf # Load Balancer & CDN
│   ├── secrets.tf       # Secret Manager configuration
│   ├── terraform.tfvars # Variables (secrets included)
│   └── ...              # Other infrastructure
├── .github/workflows/   # CI/CD workflows
├── server.js            # Express server entry point
└── playwright.config.ts # Playwright test configuration
```

## 🎨 Themes

The site supports three theme modes:
- **Light**: Default light theme with blue primary color
- **Dark**: Dark theme optimized for low-light viewing
- **High Contrast**: High contrast mode for improved accessibility

Themes respect system preferences by default and can be manually overridden via the theme selector in the header.

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Proper semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Screen reader friendly
- Minimum 48×48px touch targets on mobile
- Sufficient color contrast ratios in all themes

## 📱 Responsive Design

Breakpoints:
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Large Desktop: 1280px+

## 📄 License

© 2025 WDS IT, LLC. All rights reserved.

## 📧 Contact

- **Website**: [wdsit.com](https://wdsit.com)
- **Email**: support@wds-it.com
- **Location**: Olathe, Kansas
