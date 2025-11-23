Plan: Visual Theme Switcher with Complete Design System
Build a comprehensive design system in app/components/ui/ with design tokens, reusable primitives, and custom SVG icon components. Implement a responsive theme switcher with icon-only square buttons and tooltips on desktop, and an expandable labeled menu on mobile that stays open for multiple interactions.

Steps
Create design tokens in app/design-tokens.ts exporting color palettes, spacing scale, typography values (font sizes, weights, families), border radii, shadows, and animation durations for system-wide consistency
Build base UI components in app/components/ui/: Button.tsx (primary/secondary/ghost variants with sizes), IconButton.tsx (square icon buttons), Tooltip.tsx (positioning with arrow), Stack.tsx (flex layouts), Badge.tsx, Card.tsx, and ui/types.ts for shared interfaces
Create custom theme icon components in app/components/ui/icons/: SunIcon.tsx, MoonIcon.tsx, ContrastIcon.tsx, AutoIcon.tsx - each accepting size and className props with clean, accessible SVG paths
Establish ThemeContext.tsx in app/contexts/ managing theme state ("light" | "dark" | "high-contrast" | "auto"), system preference detection via matchMedia, localStorage persistence, and exporting useTheme() hook
Build ThemeSwitcherButton.tsx combining IconButton, theme icons from step 3, and Tooltip to render individual square theme buttons with active states, hover effects, and ARIA labels
Create ThemeSwitcherDesktop.tsx rendering horizontal row of 4 square icon-only buttons with tooltips (using components from steps 2-5), consuming useTheme() to highlight active theme
Create ThemeSwitcherMobile.tsx with collapsible accordion showing current theme (icon + label) at top, expanding to reveal all 4 options as icon + label rows, staying open after selection for multiple interactions
Refactor ThemeToggle.tsx to detect viewport size and conditionally render ThemeSwitcherDesktop vs ThemeSwitcherMobile, or accept variant="desktop" | "mobile" prop for explicit control
Update Header.tsx to render <ThemeToggle variant="desktop" /> in desktop nav bar (right side with Navigation), and <ThemeToggle variant="mobile" /> inside mobile hamburger menu below Navigation
Enhance high-contrast theme in app.css adding font-bold for body, font-extrabold for headings (h1-h6), base font size increase (16px → 18px), and stronger borders (4px solid black) using design tokens from step 1
Update FOUC prevention script in root.tsx inline <script> to match new theme context logic, ensuring theme application before React hydration with same localStorage/system detection
Write comprehensive test suite in tests/e2e/theme-switcher.spec.ts covering desktop tooltip display, mobile menu expansion/persistence, theme switching on both viewports, localStorage persistence, system preference detection, and WCAG accessibility compliance
Further Considerations
Component documentation: Should we add JSDoc comments to all design system components describing props, usage examples, and accessibility considerations for developer reference?
Design token organization: Structure tokens as A) flat exports, B) nested objects by category (colors.primary, spacing.md), or C) CSS variable mappings for runtime theming?
Testing strategy: Focus tests on A) E2E user flows only, B) add component-level unit tests for design system primitives, or C) include visual regression testing with screenshots?