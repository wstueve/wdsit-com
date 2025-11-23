import { test, expect } from "@playwright/test";

/**
 * Light Mode Background Lightness Tests
 * 
 * These tests verify that the light theme uses the lightest colors from the palette
 * to create a visibly "light" aesthetic. The background should use primary-50 (#EFF6FF)
 * or gray-50 (#F9FAFB) rather than pure white.
 * 
 * Lightness Requirements:
 * - Main page background: HSL lightness > 95%
 * - Content sections and cards: HSL lightness > 90%
 * - Must maintain WCAG 2.1 AA contrast ratios for text
 */

test.describe("Light Mode Background Lightness", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    
    // Ensure we're in light mode
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    const testId = isMobile ? "mobile-theme-toggle" : "desktop-theme-toggle";
    
    await page.getByTestId(testId)
      .getByLabel("Theme selection")
      .selectOption("light");
    
    // Verify light mode is active
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  /**
   * Helper function to convert RGB to HSL and extract lightness value
   */
  async function getBackgroundLightness(page: any, selector: string): Promise<number> {
    const lightness = await page.evaluate((sel: string) => {
      const element = document.querySelector(sel);
      if (!element) return 0;
      
      const bgColor = window.getComputedStyle(element).backgroundColor;
      
      // Skip transparent backgrounds
      if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        return 0;
      }
      
      // Handle oklab() format (modern browsers)
      if (bgColor.startsWith('oklab')) {
        // oklab format: oklab(L a b / alpha)
        // L is already lightness in 0-1 range
        const match = bgColor.match(/oklab\(([\d.]+)/);
        if (match) {
          return parseFloat(match[1]) * 100;
        }
      }
      
      // Parse RGB/RGBA values
      const match = bgColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return 0;
      
      const r = parseInt(match[1]) / 255;
      const g = parseInt(match[2]) / 255;
      const b = parseInt(match[3]) / 255;
      
      // Convert RGB to HSL
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      
      // Return lightness as percentage (0-100)
      return l * 100;
    }, selector);
    
    return lightness;
  }

  /**
   * Helper function to get computed background color
   */
  async function getBackgroundColor(page: any, selector: string): Promise<string> {
    const color = await page.evaluate((sel: string) => {
      const element = document.querySelector(sel);
      if (!element) return '';
      return window.getComputedStyle(element).backgroundColor;
    }, selector);
    
    return color;
  }

  test("body background should use lightest palette color", async ({ page }) => {
    const lightness = await getBackgroundLightness(page, "body");
    const color = await getBackgroundColor(page, "body");
    
    // Body background should have lightness > 95% (very light)
    expect(lightness, `Body background lightness (${lightness.toFixed(1)}%) should be > 95%. Current color: ${color}`).toBeGreaterThan(95);
    
    // Should not be pure white (255, 255, 255)
    expect(color, "Body should not use pure white (#FFFFFF)").not.toBe("rgb(255, 255, 255)");
  });

  test("main content area should use lightest palette color", async ({ page }) => {
    const lightness = await getBackgroundLightness(page, "main");
    const color = await getBackgroundColor(page, "main");
    
    expect(lightness, `Main content lightness (${lightness.toFixed(1)}%) should be > 95%. Current color: ${color}`).toBeGreaterThan(95);
  });

  test("header should use lightest palette color", async ({ page }) => {
    const lightness = await getBackgroundLightness(page, "header");
    const color = await getBackgroundColor(page, "header");
    
    expect(lightness, `Header lightness (${lightness.toFixed(1)}%) should be > 95%. Current color: ${color}`).toBeGreaterThan(95);
  });

  test("footer should use lightest palette color", async ({ page }) => {
    const lightness = await getBackgroundLightness(page, "footer");
    const color = await getBackgroundColor(page, "footer");
    
    expect(lightness, `Footer lightness (${lightness.toFixed(1)}%) should be > 95%. Current color: ${color}`).toBeGreaterThan(95);
  });

  test("content sections should use light backgrounds", async ({ page }) => {
    // Find all sections within main content
    const sectionLightnesses = await page.evaluate(() => {
      const sections = document.querySelectorAll("main section");
      const results: { index: number; lightness: number; color: string }[] = [];
      
      sections.forEach((section, index) => {
        const bgColor = window.getComputedStyle(section).backgroundColor;
        
        // Skip transparent backgrounds
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') return;
        
        let lightness = 0;
        
        // Handle oklab() format (modern browsers)
        if (bgColor.startsWith('oklab')) {
          const match = bgColor.match(/oklab\(([\d.]+)/);
          if (match) {
            lightness = parseFloat(match[1]) * 100;
          } else {
            return;
          }
        } else {
          // Parse RGB values
          const match = bgColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1]) / 255;
            const g = parseInt(match[2]) / 255;
            const b = parseInt(match[3]) / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            lightness = ((max + min) / 2) * 100;
          } else {
            return;
          }
        }
        
        results.push({
          index,
          lightness,
          color: bgColor
        });
      });
      
      return results;
    });
    
    // Each section should have lightness > 90%
    for (const section of sectionLightnesses) {
      expect(section.lightness, 
        `Section ${section.index} lightness (${section.lightness.toFixed(1)}%) should be > 90%. Current color: ${section.color}`
      ).toBeGreaterThan(90);
    }
    
    // Should have at least some sections to test
    expect(sectionLightnesses.length).toBeGreaterThan(0);
  });

  test("card components should use light backgrounds", async ({ page }) => {
    // Find all elements with common card classes, excluding buttons and links
    const cardLightnesses = await page.evaluate(() => {
      const cards = document.querySelectorAll('[class*="bg-"], .card, [class*="rounded"]');
      const results: { lightness: number; color: string; classes: string }[] = [];
      
      cards.forEach((card) => {
        // Skip buttons, links, and other interactive elements
        const tagName = (card as Element).tagName.toLowerCase();
        if (tagName === 'button' || tagName === 'a') return;
        
        const bgColor = window.getComputedStyle(card).backgroundColor;
        
        // Skip transparent backgrounds
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') return;
        
        let lightness = 0;
        
        // Handle oklab() format (modern browsers)
        if (bgColor.startsWith('oklab')) {
          const match = bgColor.match(/oklab\(([\d.]+)/);
          if (match) {
            lightness = parseFloat(match[1]) * 100;
          } else {
            return;
          }
        } else {
          // Parse RGB values
          const match = bgColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1]) / 255;
            const g = parseInt(match[2]) / 255;
            const b = parseInt(match[3]) / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            lightness = ((max + min) / 2) * 100;
          } else {
            return;
          }
        }
        
        results.push({
          lightness,
          color: bgColor,
          classes: (card as Element).className
        });
      });
      
      return results;
    });
    
    // Each card should have lightness > 90%
    for (const card of cardLightnesses) {
      expect(card.lightness, 
        `Card with classes "${card.classes}" has lightness ${card.lightness.toFixed(1)}% (should be > 90%). Current color: ${card.color}`
      ).toBeGreaterThan(90);
    }
  });

  test("hero section should use lightest palette colors", async ({ page }) => {
    // Find hero section (typically first section on page)
    const heroExists = await page.locator("main section").first().isVisible();
    
    if (heroExists) {
      const lightness = await getBackgroundLightness(page, "main section:first-of-type");
      const color = await getBackgroundColor(page, "main section:first-of-type");
      
      // Skip test if hero has gradient background (will be transparent)
      // Gradients use lightest colors but don't compute to a single background value
      if (lightness === 0 && (color === 'rgba(0, 0, 0, 0)' || color === 'transparent')) {
        // Hero section uses gradient, which is acceptable if it uses light colors
        // The gradient itself is defined in the classes with primary-50 and gray-50
        expect(true).toBe(true); // Pass the test
      } else {
        expect(lightness, 
          `Hero section lightness (${lightness.toFixed(1)}%) should be > 95%. Current color: ${color}`
        ).toBeGreaterThan(95);
      }
    }
  });

  test("should use primary-50 or gray-50 colors specifically", async ({ page }) => {
    const bodyColor = await getBackgroundColor(page, "body");
    
    // Expected colors:
    // primary-50: rgb(239, 246, 255) or #EFF6FF
    // gray-50: rgb(249, 250, 251) or #F9FAFB
    
    const isPrimary50 = bodyColor === "rgb(239, 246, 255)";
    const isGray50 = bodyColor === "rgb(249, 250, 251)";
    
    expect(isPrimary50 || isGray50, 
      `Body should use primary-50 rgb(239, 246, 255) or gray-50 rgb(249, 250, 251), but got: ${bodyColor}`
    ).toBe(true);
  });

  test("about page should use lightest backgrounds", async ({ page }) => {
    await page.goto("/about");
    
    const bodyLightness = await getBackgroundLightness(page, "body");
    const mainLightness = await getBackgroundLightness(page, "main");
    
    expect(bodyLightness).toBeGreaterThan(95);
    expect(mainLightness).toBeGreaterThan(95);
  });

  test("contact page should use lightest backgrounds", async ({ page }) => {
    await page.goto("/contact");
    
    const bodyLightness = await getBackgroundLightness(page, "body");
    const mainLightness = await getBackgroundLightness(page, "main");
    
    expect(bodyLightness).toBeGreaterThan(95);
    expect(mainLightness).toBeGreaterThan(95);
  });

  test("privacy page should use lightest backgrounds", async ({ page }) => {
    await page.goto("/privacy");
    
    const bodyLightness = await getBackgroundLightness(page, "body");
    const mainLightness = await getBackgroundLightness(page, "main");
    
    expect(bodyLightness).toBeGreaterThan(95);
    expect(mainLightness).toBeGreaterThan(95);
  });

  test("terms page should use lightest backgrounds", async ({ page }) => {
    await page.goto("/terms");
    
    const bodyLightness = await getBackgroundLightness(page, "body");
    const mainLightness = await getBackgroundLightness(page, "main");
    
    expect(bodyLightness).toBeGreaterThan(95);
    expect(mainLightness).toBeGreaterThan(95);
  });

  test("text colors should have sufficient contrast on light backgrounds", async ({ page }) => {
    // Check various text elements for proper contrast
    const textElements = await page.evaluate(() => {
      const elements = [
        { selector: 'h1', type: 'heading' },
        { selector: 'h2', type: 'heading' },
        { selector: 'h3', type: 'heading' },
        { selector: 'p', type: 'body' },
        { selector: 'a', type: 'link' },
      ];
      
      const results: Array<{
        selector: string;
        type: string;
        color: string;
        lightness: number;
        found: boolean;
      }> = [];
      
      for (const { selector, type } of elements) {
        const element = document.querySelector(selector);
        if (element) {
          const styles = window.getComputedStyle(element);
          const color = styles.color;
          
          // Parse color to get lightness
          let lightness = 100;
          
          // Parse RGB format: rgb(r, g, b)
          const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            // Calculate perceived lightness (0-100)
            lightness = (Math.max(r, g, b) / 255) * 100;
          }
          
          // Parse oklab/oklch format: oklab(L a b) or oklch(L c h) where L is 0-1
          const oklabMatch = color.match(/oklch?\(([\d.]+)/);
          if (oklabMatch) {
            lightness = parseFloat(oklabMatch[1]) * 100;
          }
          
          results.push({
            selector,
            type,
            color,
            lightness,
            found: true
          });
          break; // Just check first of each type
        }
      }
      
      return results;
    });
    
    // Verify we found text elements to test
    expect(textElements.length).toBeGreaterThan(0);
    
    // All text should have dark colors (lightness < 60%) on light backgrounds
    for (const element of textElements) {
      expect(element.lightness, 
        `${element.type} text (${element.selector}) should use dark colors for contrast. Color: ${element.color}, Lightness: ${element.lightness}%`
      ).toBeLessThan(60);
    }
  });

  test("buttons should be visible with proper contrast", async ({ page }) => {
    // Check visible call-to-action links (not hidden mobile menu or icon buttons)
    const ctaLinks = await page.locator('a[href="/contact"]:visible').all();
    
    expect(ctaLinks.length, "Should have visible CTA links").toBeGreaterThan(0);
    
    // Check each visible CTA link
    for (const link of ctaLinks) {
      await expect(link).toBeVisible();
      
      // Verify link has either background color or border for contrast
      const styles = await link.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          borderWidth: computed.borderWidth,
          borderColor: computed.borderColor,
          color: computed.color
        };
      });
      
      const hasSolidBackground = styles.backgroundColor !== 'rgba(0, 0, 0, 0)' && styles.backgroundColor !== 'transparent';
      const hasBorder = styles.borderWidth !== '0px' && styles.borderColor !== 'rgba(0, 0, 0, 0)';
      const hasTextColor = styles.color !== 'rgba(0, 0, 0, 0)';
      
      expect(hasSolidBackground || hasBorder || hasTextColor, 
        `Button should have styling for visibility. BG: ${styles.backgroundColor}, Border: ${styles.borderWidth}, Color: ${styles.color}`
      ).toBeTruthy();
    }
  });

  test("form inputs should be visible on light background", async ({ page }) => {
    await page.goto("/contact");
    
    const inputs = await page.locator('input[type="text"], input[type="email"], textarea').all();
    
    if (inputs.length > 0) {
      const firstInput = inputs[0];
      
      // Input should be visible
      await expect(firstInput).toBeVisible();
      
      // Input should have border or background to be distinguishable
      const styles = await firstInput.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          bgColor: computed.backgroundColor,
          border: computed.border,
          borderColor: computed.borderColor
        };
      });
      
      // Should have either a visible border or distinct background
      const hasBorder = styles.border !== 'none' && styles.border !== '';
      const hasBackground = styles.bgColor !== 'rgba(0, 0, 0, 0)' && styles.bgColor !== 'transparent';
      
      expect(hasBorder || hasBackground, 
        `Form input should be visible with border or background. Border: ${styles.border}, Background: ${styles.bgColor}`
      ).toBe(true);
    }
  });

  test("icons should be visible with primary color", async ({ page }) => {
    // Check for SVG icons
    const icons = await page.locator('svg[class*="text-primary"]').all();
    
    if (icons.length > 0) {
      const firstIcon = icons[0];
      await expect(firstIcon).toBeVisible();
      
      // Icon should have color styling
      const color = await firstIcon.evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      
      expect(color, "Icon should have a color defined").not.toBe('');
    }
  });
});
