import { useState } from "react";
import SignupModal from "../SignupModal";

export default function SignupDemo() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-teal-50 py-16 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Signup Modal Demo
          </h1>
          <p className="text-slate-600 mb-8">
            Click the button below to open the signup modal that slides from
            left to right.
          </p>

          <button
            onClick={() => setIsSignupOpen(true)}
            className="bg-linear-to-r from-teal-500 to-cyan-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Open Signup Modal
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Slide Animation
            </h3>
            <p className="text-slate-600">
              Modal slides smoothly from left to right with transition effects.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Form Validation
            </h3>
            <p className="text-slate-600">
              Real-time validation for email and password fields with error
              messages.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Reusable Component
            </h3>
            <p className="text-slate-600">
              Easy to integrate into any page with customizable callbacks.
            </p>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
    </div>
  );
}
