import { Link, useLocation } from "react-router-dom";
import { Briefcase, User, X, Menu, LogIn } from "lucide-react";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: HeaderProps) {
  const { pathname } = useLocation();

  const getLinkClass = (path: string) => {
    const baseClass =
      "flex items-center gap-1 hover:text-[#00b4d8] transition-colors";
    const activeClass =
      "text-[#00b4d8] relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#00b4d8]";

    return pathname === path ? `${baseClass} ${activeClass}` : baseClass;
  };

  const getMobileLinkClass = (path: string) => {
    const baseClass =
      "flex items-center justify-between hover:text-[#00b4d8] transition-colors";
    const activeClass = "text-[#00b4d8]";

    return pathname === path ? `${baseClass} ${activeClass}` : baseClass;
  };

  return (
    <header className="bg-[#0b2c3d] text-white fixed top-0 left-0 right-0 z-50 border-b border-[#1f4866]">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="border-2 border-[#00b4d8] rounded p-1">
            <Briefcase className="w-6 h-6 text-[#00b4d8]" />
          </div>
          <span>JobPortal.rw</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium items-center">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/jobs" className={getLinkClass("/jobs")}>
            Jobs
          </Link>
          <Link to="/candidates" className={getLinkClass("/candidates")}>
            Candidates
          </Link>
          <Link to="/employers" className={getLinkClass("/employers")}>
            Employers
          </Link>
          <Link to="/blog" className={getLinkClass("/blog")}>
            Blog
          </Link>
          <Link to="/contact" className={getLinkClass("/contact")}>
            Contact Us
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            to="/signup"
            className="border border-white/30 px-6 py-2 rounded hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <User className="w-4 h-4" /> SIGN UP
          </Link>
          <Link
            to="/signin"
            className="bg-[#ff6b6b] px-6 py-2 rounded hover:bg-[#ff5252] transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <LogIn className="w-4 h-4" /> LOGIN
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0b2c3d] border-t border-gray-600">
          <nav className="flex flex-col p-4 space-y-3 text-sm">
            <Link to="/" className={getMobileLinkClass("/")}>
              Home
            </Link>
            <Link to="/jobs" className={getMobileLinkClass("/jobs")}>
              Jobs
            </Link>
            <Link
              to="/candidates"
              className={getMobileLinkClass("/candidates")}
            >
              Candidates
            </Link>
            <Link to="/employers" className={getMobileLinkClass("/employers")}>
              Employers
            </Link>
            <Link to="/blog" className={getMobileLinkClass("/blog")}>
              Blog
            </Link>
            <Link to="/contact" className={getMobileLinkClass("/contact")}>
              Contact Us
            </Link>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/signup"
                className="border border-white/30 px-4 py-2 rounded text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> SIGN UP
              </Link>
              <Link
                to="/signin"
                className="bg-[#ff6b6b] px-4 py-2 rounded text-center hover:bg-[#ff5252] transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" /> LOGIN
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
