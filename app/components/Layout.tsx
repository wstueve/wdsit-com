import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-primary-50 dark:bg-gray-950" data-testid="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
