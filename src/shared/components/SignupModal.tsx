import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInClick?: () => void;
}

interface RegisterFormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "candidate" | "employer";
}

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSignInClick,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "candidate",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<{
    status: "idle" | "submitting" | "success" | "error";
    message?: string;
  }>({ status: "idle" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value as any,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data: RegisterFormData) => {
    const errors: FormErrors = {};
    if (!data.fullName.trim()) errors.fullName = "Full name is required.";
    if (!data.username.trim()) errors.username = "Username is required.";
    else if (data.username.length < 3)
      errors.username = "Username must be at least 3 characters.";
    if (!data.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email address.";
    if (!data.password.trim()) errors.password = "Password is required.";
    else if (data.password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    if (!data.confirmPassword.trim())
      errors.confirmPassword = "Please confirm your password.";
    else if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
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
        message: "Account created successfully!",
      });
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "candidate",
      });
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setSubmitStatus({
        status: "error",
        message: "Registration failed. Please try again.",
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
            Register
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            Create your account to get started.
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
        
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Username <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full py-2.5 px-3 border-2 border-slate-200 rounded-lg text-black transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              />
              {formErrors.username && (
                <p className="text-rose-600 text-xs mt-1">
                  {formErrors.username}
                </p>
              )}
            </div>
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
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
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
            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full py-2.5 px-3 border-2 border-slate-200 rounded-lg text-black transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
                />
              </div>
              {formErrors.confirmPassword && (
                <p className="text-rose-600 text-xs mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
            {/* User Type Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                I want to register as <span className="text-rose-500">*</span>
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full py-2.5 px-3 border-2 border-slate-200 rounded-lg bg-white text-black transition-all focus:outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
              >
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitStatus.status === "submitting"}
              className="w-full bg-linear-to-r from-teal-500 to-cyan-500 text-white py-2.5 px-4 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-300 hover:shadow-lg disabled:opacity-70"
            >
              {submitStatus.status === "submitting"
                ? "Creating account..."
                : "REGISTER"}
            </button>
            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-slate-500 text-xs">or</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            {/* Sign In Link */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onSignInClick?.();
              }}
              className="w-full text-teal-600 font-semibold text-sm hover:text-teal-700 transition-colors"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
