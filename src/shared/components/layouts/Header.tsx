interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  return (
    <header className="bg-[#0b2c3d] text-white fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">💼</span>
          EnTaro
        </h1>

        <nav className="hidden md:flex gap-6 text-sm items-center">
          <a href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <span>🏠</span> Home
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <span>💼</span> Jobs
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <span>👥</span> Candidates
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <span>🏢</span> Employers
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <span>📝</span> Blog
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-blue-300 transition-colors">
            <span>📞</span> Contact
          </a>
        </nav>

        <div className="hidden md:flex gap-3 items-center">
          <button className="text-sm hover:text-blue-300 transition-colors flex items-center gap-1">
            <span>👤</span> Sign In
          </button>
          <button className="bg-red-500 px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors flex items-center gap-1">
            <span>➕</span> Post A Job
          </button>
        </div>

        <button 
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0b2c3d] border-t border-gray-600">
          <nav className="flex flex-col p-4 space-y-3 text-sm">
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>🏠</span> Home
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>💼</span> Jobs
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>👥</span> Candidates
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>🏢</span> Employers
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>📝</span> Blog
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>📞</span> Contact
            </a>
            <button className="text-left mt-2 flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span>👤</span> Sign In
            </button>
            <button className="bg-red-500 px-4 py-2 rounded text-sm w-fit flex items-center gap-2 hover:bg-red-600 transition-colors">
              <span>➕</span> Post A Job
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}