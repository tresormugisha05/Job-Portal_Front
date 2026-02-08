import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { X, Home, Briefcase, Users, FileText, BarChart3, Settings, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center justify-between hover:text-[#00b4d8] transition-colors py-2";
    const activeClass = "text-[#00b4d8]";
    return pathname === path ? `${baseClass} ${activeClass}` : baseClass;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#0b2c3d] shadow-xl transform transition-transform">
        <div className="flex items-center justify-between p-4 border-b border-[#1f4866]">
          <div className="flex items-center gap-2">
            <div className="border-2 border-[#00b4d8] rounded p-1">
              <Briefcase className="w-5 h-5 text-[#00b4d8]" />
            </div>
            <span className="text-lg font-bold text-white">JobPortal.rw</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className={getLinkClass("/")}
            >
              <div className="flex items-center gap-3">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/jobs"
              onClick={onClose}
              className={getLinkClass("/jobs")}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Jobs</span>
              </div>
            </Link>
            <Link
              to="/candidates"
              onClick={onClose}
              className={getLinkClass("/candidates")}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Candidates</span>
              </div>
            </Link>
            <Link
              to="/employers"
              onClick={onClose}
              className={getLinkClass("/employers")}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Employers</span>
              </div>
            </Link>
            <Link
              to="/blog"
              onClick={onClose}
              className={getLinkClass("/blog")}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Blog</span>
              </div>
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className={getLinkClass("/contact")}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>Contact</span>
              </div>
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-[#1f4866] my-4"></div>

          {/* User Section */}
          <div className="px-4 py-2">
            {isAuthenticated ? (
              <>
                <div className="mb-4 p-3 bg-[#1f4866] rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-[#00b4d8] rounded-full flex items-center justify-center text-white font-bold">
                      {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user?.firstName || user?.email}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={onClose}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    
                    {(user?.role === 'Employer' || user?.role === 'Admin') && (
                      <>
                        <Link
                          to={user?.role === 'Employer' ? '/dashboard' : '/admin'}
                          onClick={onClose}
                          className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-2"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>{user?.role === 'Employer' ? 'Dashboard' : 'Admin'}</span>
                        </Link>
                      </>
                    )}
                    
                    <Link
                      to="/applications"
                      onClick={onClose}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Applications</span>
                    </Link>
                    
                    <button
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors py-2 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    // Open auth modal in register mode
                    onClose();
                    // This would need to be connected to the auth modal
                    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'register' } }));
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-white/30 px-4 py-2 rounded text-white hover:bg-white/10 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>SIGN UP</span>
                </button>
                <button
                  onClick={() => {
                    // Open auth modal in login mode
                    onClose();
                    // This would need to be connected to the auth modal
                    window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { mode: 'login' } }));
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#ff6b6b] px-4 py-2 rounded text-white hover:bg-[#ff5252] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOGIN</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-[#1f4866] p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
