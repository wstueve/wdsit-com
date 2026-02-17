# AI Automarketer MVP Marketing Page - Implementation Prompt

## Context
This is a React Router website (wdsit-com) that showcases WDS IT's Shopify plugin business. The site is built with TypeScript, React Router, and Tailwind CSS, hosted on Google Cloud Run with global CDN. We need to create a marketing page for our new AI Automarketer Shopify plugin that will grow with the product as we implement more features.

## Current Site Structure
- Modern React Router SPA with TypeScript
- Tailwind CSS for styling (no custom CSS)
- Responsive, mobile-first design
- Dark mode support via ThemeContext
- Component-based architecture in `app/components/`
- Routes in `app/routes/`
- Existing pages: home, about, contact, privacy, terms

## Objective
Create a professional marketing landing page for the **AI Automarketer** Shopify plugin MVP that:
1. Highlights the core value proposition without overwhelming with features
2. Focuses on the MVP capabilities (Phase 1 from the features doc)
3. Can be easily expanded as new features are implemented
4. Maintains consistency with the existing WDS IT site design
5. Converts visitors to interested beta testers or early customers
6. Meets Shopify marketplace requirements for plugin listings

## MVP Features to Highlight (Phase 1 Only)
Based on the comprehensive features document, focus ONLY on these MVP capabilities:

### Core Capabilities
- **Product-Centric Campaigns**: Select any product, set budget, launch AI-powered campaigns in minutes
- **AI Content Generation**: Robain automatically creates email copy and social media posts optimized for conversions
- **Multi-Channel Distribution**: Deploys to Shopify Email and connected social platforms
- **Basic A/B Testing**: Tests 2 content variants to find what works best
- **Real-Time Dashboard**: Track opens, clicks, conversions, and ROI
- **Manual Approval Queue**: Review and approve content before publishing (builds trust)

### Key Differentiators
- **5-Minute Setup**: From product selection to campaign launch
- **Self-Improving AI**: Gets better with each campaign based on your store's data
- **Affordable**: Starting at $49/month vs. $500+ for marketing agencies
- **Shopify-Native**: Built specifically for Shopify merchants
- **Privacy-First**: Full GDPR/CCPA compliance

## Page Structure

### 1. Hero Section
- **Headline**: Clear, benefit-driven statement about AI-powered marketing automation
- **Subheadline**: Address the pain point (time/cost of marketing) and the solution
- **Primary CTA**: "Join Beta" or "Get Early Access"
- **Secondary CTA**: "Watch Demo" or "See How It Works"
- **Hero Visual**: Placeholder for Robain character or dashboard screenshot
- **Trust Indicators**: "Azure AI Certified" badge, "Shopify Partner" badge

### 2. Problem/Solution Section
- **The Problem**: 3-4 bullet points about marketing challenges for Shopify merchants
  - Spending $500-2000/month on agencies
  - 10-20 hours/week on manual campaign creation
  - Expensive tools with steep learning curves
  - No time to optimize and test variations
- **The Solution**: How AI Automarketer solves these specific problems
  - Saves time and money
  - AI does the work
  - Gets better automatically
  - No expertise required

### 3. How It Works (3-Step Process)
Simple, visual explanation:
1. **Select Your Product** - Choose any product from your catalog
2. **Set Your Budget** - Control exactly how much you want to spend
3. **Launch & Optimize** - Robain creates, distributes, and improves campaigns automatically

### 4. MVP Features Grid
Present the 6 core MVP features with:
- Icon for each feature
- Feature name
- 1-2 sentence description
- Focus on benefits, not technical details

### 5. Pricing Preview
- **Beta Pricing**: Special early adopter rate
- **Starter Tier**: $49/month with clear feature list
- **Note**: "More plans available at full launch"
- CTA: "Join Beta for Special Pricing"

### 6. Social Proof Section (Placeholder)
- "Join XX merchants already testing AI Automarketer"
- Placeholder for testimonials/case studies (add as we get them)
- Trust badges: Azure AI, Shopify Partner, Security certifications

### 7. FAQ Section
Address common concerns:
- Is my data secure?
- How does the AI learn my brand?
- Can I review content before it goes out?
- What channels does it support in MVP?
- When will more features be available?
- How is this different from Klaviyo/Mailchimp?

### 8. Final CTA Section
- **Headline**: "Ready to Automate Your Marketing?"
- **Subheadline**: "Join our beta program and get lifetime early adopter pricing"
- **Primary CTA**: "Apply for Beta Access"
- **Secondary CTA**: "Schedule a Demo"
- **Note**: "Limited spots available for beta testers"

## Design Requirements

### Visual Style
- Match existing WDS IT site aesthetics
- Use gradient backgrounds (primary-50 to gray-50)
- Card-based layouts with subtle shadows
- Consistent spacing and typography
- Mobile-first responsive design
- Dark mode support throughout

### Color Palette
- Use existing design tokens from `app/design-tokens.ts`
- Primary color: For CTAs and accents
- Gray scale: For text hierarchy
- Success green: For benefits/checkmarks
- Use Tailwind utility classes exclusively

### Typography
- H1: text-4xl to text-6xl (responsive)
- H2: text-3xl to text-4xl
- H3: text-xl to text-2xl
- Body: text-base to text-lg
- Consistent font weights (normal, medium, bold)

### Components to Use
- Layout wrapper from `app/components/Layout.tsx`
- Reuse UI components from `app/components/ui/`
- Card, Button, Badge components
- Maintain Navigation and Footer

### Images & Icons
- Use SVG icons for features (inline or from Heroicons)
- Placeholder for Robain character (leave space for future asset)
- Placeholder for dashboard screenshots (use gradient boxes)
- Placeholder for social proof logos

## Technical Requirements

### Route Setup
- Create new route file: `app/routes/ai-automarketer.tsx`
- Follow existing route pattern (see `app/routes/home.tsx` as reference)
- Include proper meta tags for SEO:
  - Title: "AI Automarketer - Intelligent Shopify Marketing Automation | WDS IT"
  - Description: "Automate your Shopify marketing with AI-powered campaigns. Save $500+/month on agencies and 10+ hours/week. From product selection to optimization, Robain handles it all."
  - OG tags for social sharing

### Performance
- Static generation where possible
- Lazy load images (when added)
- Minimal JavaScript
- Fast initial load

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy (h1, h2, h3)
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1)
- Alt text for images (when added)

### SEO Optimization
- Structured data for product/service
- Proper meta tags
- Clean URL structure (/ai-automarketer)
- Internal linking to relevant pages (About, Contact)

## Content Tone & Voice

### Writing Style
- **Confident but accessible**: "We automate your marketing" not "We can help with marketing"
- **Benefit-focused**: Emphasize time/money saved, not technical features
- **Conversational**: Talk to merchants like peers, not children
- **Data-driven**: Use specific numbers ($500/month saved, 5-minute setup)
- **Action-oriented**: Strong CTAs throughout

### Target Audience
- Shopify merchants with $5k-100k monthly revenue
- 1-2 person teams (or solo merchants)
- Currently spending on ads but overwhelmed
- Limited marketing expertise
- Value time and ROI over complexity

### Key Messages
1. **Save Time**: "10+ hours/week back in your schedule"
2. **Save Money**: "Eliminate $500-2000/month in agency fees"
3. **Better Results**: "AI that gets smarter with every campaign"
4. **No Expertise Needed**: "Marketing automation without the learning curve"
5. **Risk-Free**: "Beta program with special pricing"

## Implementation Steps

1. **Create Route File**
   - New file: `app/routes/ai-automarketer.tsx`
   - Import Layout and necessary components
   - Set up meta function with SEO tags

2. **Build Page Sections**
   - Implement hero section with dual CTAs
   - Create problem/solution section
   - Build how-it-works 3-step process
   - Add features grid (6 MVP features)
   - Include pricing preview
   - Add social proof placeholders
   - Create FAQ accordion or static list
   - Final CTA section

3. **Add Navigation Link**
   - Update `app/components/Navigation.tsx` to include link to /ai-automarketer
   - Consider adding it as featured/highlighted nav item

4. **Create Reusable Components** (if needed)
   - Feature card component
   - Pricing card component
   - FAQ item component
   - Testimonial placeholder component

5. **Test Responsiveness**
   - Mobile (320px-640px)
   - Tablet (641px-1024px)
   - Desktop (1025px+)
   - Dark mode

6. **Optimize for Performance**
   - Check bundle size
   - Verify fast initial load
   - Test on slow connections

7. **Add Playwright Tests**
   - Navigation to page works
   - All CTAs are clickable
   - Responsive breakpoints render correctly
   - Dark mode toggles properly
   - Accessibility checks pass

## Future Expansion Plan

The page should be structured to easily add:
- **New feature sections** as they're implemented (Phase 2, 3)
- **Real testimonials** in social proof section
- **Case study cards** below pricing
- **Demo video** in hero section
- **Robain character assets** when designed
- **Dashboard screenshots** when available
- **Integration logos** as partners are added
- **More pricing tiers** at full launch

Use comments in code to mark expansion points:
```tsx
{/* TODO: Add Phase 2 features when implemented */}
{/* TODO: Replace with real testimonials */}
{/* TODO: Add Robain character illustration */}
```

## Success Metrics

The page should optimize for:
- **Beta signups**: Primary conversion goal
- **Demo requests**: Secondary conversion goal
- **Time on page**: Engaging content keeps visitors reading
- **Scroll depth**: Visitors reach pricing and final CTA
- **Mobile conversions**: 50%+ of traffic will be mobile

## Additional Considerations

### Legal & Compliance
- Link to Privacy Policy and Terms of Service in footer
- Note about beta program terms
- Clear data handling explanation in FAQ

### Beta Program
- Emphasize exclusivity and limited spots
- Highlight special pricing for early adopters
- Set expectation that features will grow
- Encourage feedback and community

### Messaging Strategy
- **Don't**: Promise specific ROI numbers or guarantees
- **Don't**: Over-promise features not yet built
- **Do**: Focus on MVP value and future potential
- **Do**: Be transparent about beta status
- **Do**: Build excitement for upcoming features

## Files to Reference

When implementing, reference these existing files:
- `app/routes/home.tsx` - Route structure and meta tags
- `app/components/Layout.tsx` - Page wrapper
- `app/components/ui/*` - Reusable UI components
- `app/design-tokens.ts` - Color and spacing values
- `app/contexts/ThemeContext.tsx` - Dark mode support
- `playwright.config.ts` - Test configuration

## Deliverables

Create the following:
1. ✅ New route file: `app/routes/ai-automarketer.tsx`
2. ✅ Any new components needed in `app/components/`
3. ✅ Updated navigation in `app/components/Navigation.tsx`
4. ✅ New Playwright test file: `tests/e2e/ai-automarketer.spec.ts`
5. ✅ Update README.md to mention new page (optional)

## Example Code Structure

```tsx
// app/routes/ai-automarketer.tsx
import type { Route } from "./+types/ai-automarketer";
import { Layout } from "~/components/Layout";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Automarketer - Intelligent Shopify Marketing Automation | WDS IT" },
    { name: "description", content: "Automate your Shopify marketing with AI..." },
    // ... more meta tags
  ];
}

export default function AIAutomarketer() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-gray-50 to-primary-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-16 sm:py-20 lg:py-24">
        {/* Hero content */}
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        {/* Content */}
      </section>

      {/* More sections... */}
    </Layout>
  );
}
```

## Notes
- Keep the MVP page focused and not overwhelming
- Leave clear expansion points for Phase 2/3 features
- Maintain consistency with existing WDS IT brand
- Optimize for conversion (beta signups)
- Build trust through transparency about beta status
- Make it easy to update as features are implemented

---

## Ready to Implement?

Use this prompt to guide the creation of the marketing page. The page should:
- ✅ Be production-ready and polished
- ✅ Focus only on MVP (Phase 1) capabilities
- ✅ Have clear placeholders for future content
- ✅ Match the existing site design perfectly
- ✅ Convert visitors to beta testers
- ✅ Be easily expandable as features are added
- ✅ Include comprehensive tests

**Next Step**: After moving feature documentation to the plugin repo, use this prompt with the AI assistant to implement the complete marketing page in one session.
