import React, { useState } from "react";
import { X, Upload, CheckCircle, Loader2 } from "lucide-react";
import { ApplicationService } from "../../services/application.Service";
import type { ApplicationModel } from "../../services/application.Service";
import { useAuth } from "../../contexts/AuthContext";

interface ApplyJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    companyName: string;
    jobId?: string;
    employerId?: string;
}

export default function ApplyJobModal({
    isOpen,
    onClose,
    jobTitle,
    companyName,
    jobId,
    employerId
}: ApplyJobModalProps) {
    const { user } = useAuth();
    
    // Check if user is authenticated and is a CANDIDATE
    if (!user || user.role !== 'CANDIDATE') {
        return null;
    }
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        resumeFile: null as File | null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);

    if (!isOpen) return null;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['.pdf', '.doc', '.docx'];
            const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
            
            if (!allowedTypes.includes(fileExtension)) {
                setError('Please upload a PDF, DOC, or DOCX file');
                return;
            }
            
            // Validate file size (5MB max)
            if (file.size > 7 * 1024 * 1024) {
                setError('File size must be less than 7MB');
                return;
            }
            
            setFormData(prev => ({
                ...prev,
                resumeFile: file
            }));
            setError(''); // Clear error on successful upload
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent any parent form submission

        // Validate form
        if (!formData.name.trim()) {
            setError('Please enter your full name');
            return;
        }
        if (!formData.email.trim()) {
            setError('Please enter your email address');
            return;
        }
        if (!formData.resumeFile) {
            setError('Please upload your resume');
            return;
        }

        setIsSubmitting(true);
        setError(''); // Clear previous errors

        // Validate jobId
        if (!jobId) {
            setError('Job ID is missing');
            setIsSubmitting(false);
            return;
        }

        console.log("Application submit - Job ID:", jobId);

        try {
            // Use real user ID if logged in, otherwise use temporary ID
            const userId = user?.id || user?._id || `guest-${Date.now()}`;
            
            // If user is logged in, use their data; otherwise use form data
            const applicantName = user?.name || formData.name;
            const applicantEmail = user?.email || formData.email;

            // Prepare application data
            const applicationData: Partial<ApplicationModel> = {
                userId: userId,
                employerId: employerId || 'unknown', // Will be handled by backend if not provided
                name: applicantName,
                email: applicantEmail,
                coverLetter: formData.message || undefined,
            };

            // Submit application using ApplicationService
            await ApplicationService.submit(
                jobId!,
                applicationData,
                formData.resumeFile
            );

            setIsSuccess(true);
            // Form stays visible for user to see success or error state
        } catch (err) {
            let errorMessage = 'Failed to submit application. Please try again.';
            
            if (err instanceof Error && 'response' in err) {
                const axiosError = err as any;
                
                if (axiosError.response?.data?.message) {
                    errorMessage = axiosError.response.data.message;
                } else if (axiosError.response?.data?.error) {
                    errorMessage = axiosError.response.data.error;
                } else if (axiosError.response?.status === 500) {
                    errorMessage = 'Server error. Please contact support or try again later.';
                }
            }
            
            setError(errorMessage);
            // Keep form visible so user can see the error
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

                <div className="p-8">
                    <p className="text-gray-500 mb-8 text-center">
                        Apply for the <span className="text-[#00b4d8] font-bold">{jobTitle}</span> position at <span className="text-[#00b4d8] font-bold">{companyName}</span>.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            {/* Error Display */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                </div>
                            )}
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
                                {/* Hidden File Input */}
                                <input
                                    ref={(el) => setFileInputRef(el)}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                {/* Clickable Upload Area */}
                                <div 
                                    onClick={() => fileInputRef?.click()}
                                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#00b4d8] hover:bg-blue-50/30 transition-all cursor-pointer group"
                                >
                                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-[#00b4d8] transition-colors" />
                                    {formData.resumeFile ? (
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-green-600">{formData.resumeFile.name}</p>
                                            <p className="text-xs text-gray-400">{(formData.resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-600 mb-1">Click to upload or drag and drop</p>
                                            <p className="text-xs text-gray-400">PDF, DOC, DOCX (Max 5MB)</p>
                                        </div>
                                    )}
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
                </div>
            </div>
        </div>
    );
}
