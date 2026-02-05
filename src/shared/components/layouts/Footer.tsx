export default function Footer() {
  return (
    <footer className="bg-[#0b2c3d] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-4 text-sm">
        <div className="space-y-3">
          <h4 className="font-bold text-lg mb-4">Who We Are</h4>
          <p className="text-gray-300 leading-relaxed">Job portal platform connecting talent with opportunity.</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-lg mb-4">For Candidates</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition-colors">Browse Jobs</li>
            <li className="hover:text-white cursor-pointer transition-colors">Submit Resume</li>
            <li className="hover:text-white cursor-pointer transition-colors">Job Alerts</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-lg mb-4">For Employers</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition-colors">Post Jobs</li>
            <li className="hover:text-white cursor-pointer transition-colors">Search Candidates</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-lg mb-4">Information</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition-colors">About</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-600 mt-8 pt-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 EnTaro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}