import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface SigninModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick?: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const SigninModal: React.FC<SigninModalProps> = ({
  isOpen,
  onClose,
  onSignUpClick,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: LoginFormData) => {
    const errors: FormErrors = {};
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email address.";
    if (!data.password.trim()) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ status: "submitting" });
    const errors = validateForm(formData);
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setSubmitStatus({ status: "error", message: "Please fix the errors." });
      return;
    }

    try {
      await new Promise((res) => setTimeout(res, 900));
      setSubmitStatus({
        status: "success",
        message: "Signed in successfully!",
      });
      setFormData({ email: "", password: "" });
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setSubmitStatus({
        status: "error",
        message: "Sign in failed. Please try again.",
      });
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Modal */}
      <div
        className={`fixed left-0 top-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-slate-700 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8 pt-16">
          <h2
            className="font-serif text-3xl font-bold text-slate-900 mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sign In
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Welcome back! Sign in to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Status Messages */}
            {submitStatus.status === "success" && (
              <div className="rounded-md bg-green-50 border border-green-200 p-3 text-green-800 text-sm">
                {submitStatus.message}
              </div>
            )}
            {submitStatus.status === "error" && submitStatus.message && (
              <div className="rounded-md bg-rose-50 border border-rose-200 p-3 text-rose-800 text-sm">
                {submitStatus.message}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full py-2.5 px-3 border-2 border-slate-200 rounded-lg text-black transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              />
              {formErrors.email && (
                <p className="text-rose-600 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-900">
                  Password <span className="text-rose-500">*</span>
                </label>
                <a
                  href="#forgot-password"
                  className="text-teal-600 text-xs hover:text-teal-700 font-semibold transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full py-2.5 px-3 border-2 border-slate-200 rounded-lg text-black transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-rose-600 text-xs mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitStatus.status === "submitting"}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:shadow-lg disabled:opacity-70"
            >
              {submitStatus.status === "submitting"
                ? "Signing in..."
                : "SIGN IN"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-slate-500 text-xs">or</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            {/* Register Link */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSignUpClick?.();
              }}
              className="w-full text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SigninModal;
