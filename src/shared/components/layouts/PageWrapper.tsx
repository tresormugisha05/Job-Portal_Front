import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageWrapperProps {
  children: React.ReactNode;
  disableTopPadding?: boolean;
}

export default function PageWrapper({ children, disableTopPadding = false }: PageWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex-col bg-gray-50 flex">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className={`flex-1 ${disableTopPadding ? "" : "pt-24"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}