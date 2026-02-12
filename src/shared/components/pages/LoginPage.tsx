import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Mail, Lock, LogIn, Loader2, ArrowRight } from "lucide-react";
import PageWrapper from "../layouts/PageWrapper";

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
                <div className="max-w-md w-full space-y-8 animate-fade-in">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-[#00b4d8] mb-6 shadow-sm border border-blue-100">
                            <LogIn className="w-10 h-10" />
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                        <p className="mt-3 text-gray-500 font-medium">
                            Log in to your account to continue
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-gray-100">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 text-left flex justify-between">
                                    <span>Password</span>
                                    <Link to="#" className="text-[#00b4d8] hover:underline normal-case font-bold">Forgot?</Link>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#00b4d8] transition-colors" />
                                    </div>
                                    <input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#00b4d8] focus:bg-white rounded-2xl transition-all outline-none font-medium"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-2xl bg-[#00b4d8] text-white font-black uppercase tracking-widest hover:bg-[#009bc2] transition-all transform active:scale-[0.98] shadow-lg shadow-blue-100 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                            <p className="text-gray-500 font-medium">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-[#ff6b6b] font-black hover:underline underline-offset-4">
                                    Create one
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </PageWrapper>
    );
}
