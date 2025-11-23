import { useState } from "react";
import { Link } from "react-router";
import { Navigation } from "./Navigation";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img
              src="/wds-it_287x84.png"
              alt="WDS IT Logo"
              className="h-10 w-auto sm:h-12 lg:hidden"
              width={287}
              height={84}
            />
            <img
              src="/wds-it_450x132.png"
              alt="WDS IT Logo"
              className="hidden lg:block h-12 w-auto lg:h-14"
              width={450}
              height={132}
            />
          </Link>

          {/* Desktop Navigation & Theme Toggle */}
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <Navigation />
            <ThemeToggle testId="desktop-theme-toggle" />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle testId="mobile-theme-toggle" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              data-testid="mobile-menu-button"
            >
              <span className="sr-only">
                {mobileMenuOpen ? "Close menu" : "Open menu"}
              </span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4" data-testid="mobile-menu">
            <Navigation mobile onLinkClick={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
