import { Link } from "react-router-dom";
import {
  Briefcase,
  Home,
  Users,
  Building2,
  FileText,
  Phone,
  User,
  Plus,
  X,
  Menu
} from "lucide-react";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-[#0b2c3d] text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <Briefcase className="w-8 h-8" />
          EnTaro
        </Link>

        <nav className="hidden md:flex gap-6 text-sm items-center">
          <Link to="/" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link to="/jobs" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <Briefcase className="w-4 h-4" /> Jobs
          </Link>
          <Link to="/candidates" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <Users className="w-4 h-4" /> Candidates
          </Link>
          <Link to="/employers" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <Building2 className="w-4 h-4" /> Employers
          </Link>
          <Link to="/blog" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <FileText className="w-4 h-4" /> Blog
          </Link>
          <Link to="/contact" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <Phone className="w-4 h-4" /> Contact
          </Link>
        </nav>

        <div className="hidden md:flex gap-3 items-center">
          <Link to="/signin" className="text-sm hover:text-blue-300 transition-colors flex items-center gap-1">
            <User className="w-4 h-4" /> Sign In
          </Link>
          <Link to="/post-job" className="bg-red-500 px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-1">
            <Plus className="w-4 h-4" /> Post A Job
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b2c3d] border-t border-gray-600">
          <nav className="flex flex-col p-4 space-y-3 text-sm">
            <Link to="/" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link to="/jobs" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Briefcase className="w-4 h-4" /> Jobs
            </Link>
            <Link to="/candidates" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Users className="w-4 h-4" /> Candidates
            </Link>
            <Link to="/employers" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Building2 className="w-4 h-4" /> Employers
            </Link>
            <Link to="/blog" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <FileText className="w-4 h-4" /> Blog
            </Link>
            <Link to="/contact" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Phone className="w-4 h-4" /> Contact
            </Link>
            <Link to="/signin" className="text-left mt-2 flex items-center gap-2 hover:text-blue-300 transition-colors">
              <User className="w-4 h-4" /> Sign In
            </Link>
            <Link to="/post-job" className="bg-red-500 px-4 py-2 rounded text-sm w-fit flex items-center gap-2 hover:bg-red-600 transition-colors">
              <Plus className="w-4 h-4" /> Post A Job
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}