import { Link } from "react-router";

interface NavigationProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

export function Navigation({ mobile = false, onLinkClick }: NavigationProps) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const baseClasses = mobile
    ? "block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400"
    : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors";

  return (
    <nav
      className={mobile ? "flex flex-col" : "hidden md:flex md:items-center md:gap-8"}
      data-testid={mobile ? "mobile-nav" : "desktop-nav"}
      aria-label="Main navigation"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={baseClasses}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
