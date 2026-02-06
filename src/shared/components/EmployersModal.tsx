import { X } from "lucide-react";

interface EmployersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmployersModal({
  isOpen,
  onClose,
}: EmployersModalProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      )}

      {/* Modal */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">For Employers</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto space-y-6">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Post Your Jobs
              </h3>
              <p className="text-sm text-slate-600">
                Post job openings and reach thousands of qualified candidates
                looking for opportunities.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Build Your Company Profile
              </h3>
              <p className="text-sm text-slate-600">
                Create a professional company profile to attract top talent and
                showcase your company culture.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Advanced Candidate Filtering
              </h3>
              <p className="text-sm text-slate-600">
                Use our powerful tools to filter and find the perfect candidates
                for your positions.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Analytics & Insights
              </h3>
              <p className="text-sm text-slate-600">
                Track job performance, candidate engagement, and hire quality
                metrics in one place.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-slate-200">
            <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105">
              Start Hiring Today
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
