import React, { useState, useEffect } from "react";
import { X, Upload, CheckCircle, AlertCircle, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ApplicationService } from "../../services/application.Service";

interface ApplyJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    companyName: string;
    jobId?: string;
}

export default function ApplyJobModal({
    isOpen,
    onClose,
    jobTitle,
    companyName,
    jobId
}: ApplyJobModalProps) {
    const { role, isAuthenticated, user } = useAuth();
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        message: string;
        resume: File | null;
    }>({
        name: "",
        email: "",
        message: "",
        resume: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen && user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || "",
                email: user.email || ""
            }));
        }
    }, [isOpen, user]);

    if (!isOpen) return null;

    const isCandidate = role === "CANDIDATE";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isCandidate || !jobId) return;

        setIsSubmitting(true);
        try {
            await ApplicationService.submit(
                jobId,
                {
                    name: formData.name,
                    email: formData.email,
                    coverLetter: formData.message
                },
                formData.resume || undefined
            );
            setIsSuccess(true);
        } catch (error: any) {
            console.error("Error submitting application:", error);
            const errorMessage = error.response?.data?.message || "Failed to submit application. Please try again.";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h2>
                    <p className="text-gray-600 mb-8">
                        Your application for <span className="font-bold text-[#00b4d8]">{jobTitle}</span> has been sent successfully. Good luck!
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full bg-[#00b4d8] hover:bg-[#009bc2] text-white py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative animate-scale-in my-8">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Apply for this Job</h2>
                        <div className="w-12 h-1 bg-[#00b4d8] mt-2"></div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-600 transition-all shadow-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 text-center">
                    <p className="text-gray-500 mb-8">
                        Apply for the <span className="text-[#00b4d8] font-bold">{jobTitle}</span> position at <span className="text-[#00b4d8] font-bold">{companyName}</span>.
                    </p>

                    {!isCandidate ? (
                        <div className="bg-orange-50 border border-orange-100 p-8 rounded-xl text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <AlertCircle className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Login Required</h3>
                            <p className="text-gray-600 mb-6">
                                You must be logged in as a <span className="font-bold">Candidate</span> to apply for this job.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                            >
                                <LogIn className="w-5 h-5" /> Go to Login
                            </Link>
                            {!isAuthenticated && (
                                <p className="mt-4 text-xs text-gray-400 italic">No account? Select the Candidate role on the login page.</p>
                            )}
                            {isAuthenticated && (
                                <p className="mt-4 text-xs text-red-400 font-medium">Your current role ({role}) does not have permission to apply.</p>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Jhon Doe"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="e.g. jhon@example.com"
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upload Resume</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#00b4d8] hover:bg-blue-50/30 transition-all cursor-pointer group relative">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setFormData({ ...formData, resume: e.target.files[0] });
                                            }
                                        }}
                                    />
                                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-[#00b4d8] transition-colors" />
                                    <p className="text-sm font-medium text-gray-600 mb-1">
                                        {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                                    </p>
                                    <p className="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Message</label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell the employer why you are a good fit..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all outline-none resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-8 py-3 border border-gray-200 text-gray-600 rounded-lg font-bold uppercase tracking-wider hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-8 py-3 bg-[#00b4d8] hover:bg-[#009bc2] disabled:bg-gray-400 text-white rounded-lg font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                                        </>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
