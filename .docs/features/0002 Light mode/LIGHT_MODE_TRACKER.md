Use this file to create a plan and track progress so that this can be restarted and not lose progress.

Feature: Light mode is not light enough fix.
Description: The light mode does not use a light background. Use the lightest color allowed in the palette to be the background and adjust all UI components including text/fonts, buttons, cards, and interactive elements for proper contrast and ADA compliance.

Steps:
1. Analyze /Users/mach3/code/wds-it/WdsIt.Public.Web to see what the light mode theme might look like. This is our migration source.
2. Implement comprehensive tests which verify:
   - Background lightness (body, main, sections, cards use primary-50 #EFF6FF or gray-50 #F9FAFB)
   - Text/font contrast ratios meet WCAG 2.1 AA standards (min 4.5:1 for body text, 3:1 for large text)
   - Button and interactive element contrast and visibility
   - All UI components (headers, footers, forms, icons) maintain proper contrast
   - Tests fail until the mode is light enough and meets ADA guidelines
3. Implement the UI fixes to pass the tests:
   - Update CSS theme variables for light mode (primary-50 backgrounds)
   - Adjust all page backgrounds (home, about, contact, privacy, terms)
   - Update component backgrounds (Header, Footer, Layout)
   - Verify text colors (gray-900 for headings, gray-700 for body) provide sufficient contrast
   - Test buttons, links, icons, and form inputs for visibility and contrast
   - Ensure gradients use only lightest colors
4. Verify performance and loading speed remain optimal with new theme.
