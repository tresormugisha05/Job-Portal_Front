import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Briefcase,
  Mail,
  Lock,
  UserPlus,
  Loader2,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import PageWrapper from "../layouts/PageWrapper";
import { useAuth } from "../contexts/AuthContext";
type RegRole = "CANDIDATE" | "EMPLOYER";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<RegRole>("CANDIDATE");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactPhone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await register({
        name: formData.name,
        email: formData.email,
        contactPhone: formData.contactPhone,
        password: formData.password,
        role: role,
      });
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed. Please try again.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20 text-left">
        <div className="max-w-2xl w-full space-y-12 animate-fade-in">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#ff6b6b]/10 text-[#ff6b6b] mb-6 shadow-sm border border-red-50">
              <UserPlus className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="mt-3 text-gray-500 font-medium">
              Join the thousands of users finding opportunities daily
            </p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto">
            <button
              onClick={() => setRole("CANDIDATE")}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${role === "CANDIDATE"
                  ? "border-[#00b4d8] bg-blue-50/50 shadow-lg shadow-blue-100/50"
                  : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
            >
              {role === "CANDIDATE" && (
                <div className="absolute top-4 right-4 text-[#00b4d8]">
                  <CheckCircle2 className="w-5 h-5 fill-white" />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl ${role === "CANDIDATE" ? "bg-[#00b4d8] text-white" : "bg-gray-50 text-gray-400"} transition-colors`}
              >
                <User className="w-6 h-6" />
              </div>
              <span
                className={`font-black uppercase tracking-widest text-xs ${role === "CANDIDATE" ? "text-gray-900" : "text-gray-400"}`}
              >
                Candidate
              </span>
            </button>

            <button
              onClick={() => setRole("EMPLOYER")}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${role === "EMPLOYER"
                  ? "border-[#ff6b6b] bg-red-50/50 shadow-lg shadow-red-100/50"
                  : "border-gray-100 hover:border-gray-200 bg-white"
                }`}
            >
              {role === "EMPLOYER" && (
                <div className="absolute top-4 right-4 text-[#ff6b6b]">
                  <CheckCircle2 className="w-5 h-5 fill-white" />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl ${role === "EMPLOYER" ? "bg-[#ff6b6b] text-white" : "bg-gray-50 text-gray-400"} transition-colors`}
              >
                <Briefcase className="w-6 h-6" />
              </div>
              <span
                className={`font-black uppercase tracking-widest text-xs ${role === "EMPLOYER" ? "text-gray-900" : "text-gray-400"}`}
              >
                Employer
              </span>
            </button>
          </div>

          {/* Registration Form */}
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-gray-100 border border-gray-100 max-w-xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 mb-6">
                  {error}
                </div>
              )}

              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  {role === "CANDIDATE" ? "Full Name" : "Company Name"}
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#00b4d8] transition-colors" />
                  </div>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium"
                    placeholder={
                      role === "CANDIDATE" ? "John Doe" : "Tech Solutions Inc."
                    }
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#00b4d8] transition-colors" />
                  </div>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#00b4d8] transition-colors" />
                  </div>
                  <input
                    required
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPhone: e.target.value })
                    }
                    className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium"
                    placeholder="+1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#00b4d8] transition-colors" />
                    </div>
                    <input
                      required
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium text-xs"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Confirm
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#00b4d8] transition-colors" />
                    </div>
                    <input
                      required
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium text-xs"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 py-5 px-4 rounded-2xl font-black uppercase tracking-widest text-white transition-all transform active:scale-[0.98] shadow-lg disabled:opacity-50 mt-4 ${role === "CANDIDATE"
                    ? "bg-[#00b4d8] hover:bg-[#009bc2] shadow-blue-100"
                    : "bg-[#ff6b6b] hover:bg-[#ff5252] shadow-red-100"
                  }`}
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Get Started <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-50 text-center">
              <p className="text-gray-500 font-medium text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#00b4d8] font-black hover:underline underline-offset-4"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
