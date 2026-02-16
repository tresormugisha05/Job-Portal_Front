import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PendingVerification() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full">
                {/* Main Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 border border-gray-100 p-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-12 h-12 text-yellow-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-black text-gray-900 text-center mb-4">
                        Account Pending Verification
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 text-center mb-8">
                        Thank you for registering, <span className="font-bold text-[#00b4d8]">{user?.companyName}</span>!
                    </p>

                    {/* Info Box */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
                        <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            What's Next?
                        </h2>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>Your account is currently under review by our admin team</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>You will receive an email notification once your account is verified</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>After verification, you'll be able to access your dashboard and post jobs</span>
                            </li>
                        </ul>
                    </div>

                    {/* Estimated Time */}
                    <div className="text-center mb-8">
                        <p className="text-sm text-gray-500">
                            <span className="font-bold">Estimated verification time:</span> 24-48 hours
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={handleLogout}
                            className="w-full py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Support */}
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600">
                            Need help?{" "}
                            <a href="mailto:support@jobportal.com" className="text-[#00b4d8] font-bold hover:underline">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
