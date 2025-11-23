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
├── workers/             # Cloudflare Workers configuration
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
