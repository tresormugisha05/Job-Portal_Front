import { useState, useRef } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import DashboardSection from "../components/DashboardSection";
import { useAuth } from "../../../../contexts/AuthContext";
import { createJob } from "../../../../services/jobService";
import { getEmployerByUserId } from "../../../../services/employerService";
import {
    Briefcase, Building2, Send, CheckCircle2,
    Loader2, Image as ImageIcon, X, Upload, Plus, Trash2,
    DollarSign, MapPin, GraduationCap, Award, Tag
} from "lucide-react";

export default function PostJob() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        company: "Pay Walt",
        location: "",
        type: "FULL TIME",
        salary: "",
        experience: "",
        education: "",
        description: "",
        tags: ["Media", "Medical"],
        responsibilities: [""],
        requirements: [""]
    });

    const [newTag, setNewTag] = useState("");

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeBanner = () => {
        setBannerPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleListChange = (index: number, value: string, field: "responsibilities" | "requirements") => {
        const newList = [...formData[field]];
        newList[index] = value;
        setFormData({ ...formData, [field]: newList });
    };

    const addListItem = (field: "responsibilities" | "requirements") => {
        setFormData({ ...formData, [field]: [...formData[field], ""] });
    };

    const removeListItem = (index: number, field: "responsibilities" | "requirements") => {
        if (formData[field].length > 1) {
            const newList = formData[field].filter((_, i) => i !== index);
            setFormData({ ...formData, [field]: newList });
        }
    };

    const addTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData({ ...formData, tags: [...formData.tags, newTag] });
            setNewTag("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
    };

    const { user } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            if (!user?.id) {
                throw new Error("User not authenticated");
            }

            const employerData = await getEmployerByUserId(user.id);
            if (!employerData) {
                throw new Error("Employer profile not found");
            }

            const employerId = employerData.id || employerData._id || "";
            const deadline = new Date();
            deadline.setDate(deadline.getDate() + 30);

            await createJob({
                title: formData.title,
                logo: bannerPreview || "https://via.placeholder.com/150",
                logoBg: "bg-blue-100 text-blue-600",
                description: formData.description,
                requirements: formData.requirements.filter(r => r.trim()).join(', '),
                responsibilities: formData.responsibilities.filter(r => r.trim()).join(', '),
                category: formData.tags[0] || "Other",
                jobType: formData.type.replace(" ", "-"),
                type: formData.type,
                typeBg: "bg-green-100 text-green-600",
                location: formData.location,
                salary: formData.salary,
                deadline: deadline.toISOString(),
                employerId: String(employerId),
                experience: formData.experience,
                education: formData.education,
            });

            setIsSuccess(true);
        } catch (err) {
            console.error("Error posting job:", err);
            setError(err instanceof Error ? err.message : "Failed to post job");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
                    <p className="text-gray-500 max-w-md mb-8">
                        Your listing for <span className="font-bold text-[#00b4d8]">{formData.title}</span> has been published.
                    </p>
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                        Post Another Job
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-10 text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Job Listing</h1>
                <p className="text-gray-500">Provide all details to attract the best talent for your team.</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-5xl space-y-8 pb-20 text-left">
                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                        {error}
                    </div>
                )}
                <DashboardSection title="Job Banner / Flyer">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-4">Promotional visual for the job page</p>
                    {bannerPreview ? (
                        <div className="relative rounded-2xl overflow-hidden border-2 border-[#00b4d8] group aspect-24/10 bg-gray-100 shadow-lg">
                            <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white/20 hover:bg-white/40 text-white p-4 rounded-full transition-all shadow-xl">
                                    <Upload className="w-6 h-6" />
                                </button>
                                <button type="button" onClick={removeBanner} className="bg-red-500/80 hover:bg-red-600 text-white p-4 rounded-full transition-all shadow-xl">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-2xl p-16 text-center hover:border-[#00b4d8] hover:bg-blue-50/30 transition-all cursor-pointer group bg-white shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <ImageIcon className="w-10 h-10 text-gray-300 group-hover:text-[#00b4d8] transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Add a Job Flyer</h3>
                            <p className="text-sm text-gray-500 mb-6">Visual listings get 3x more engagement. Recommended: 500x500px.</p>
                            <span className="inline-flex items-center gap-2 bg-white border-2 border-gray-100 px-8 py-3 rounded-xl text-sm font-bold text-gray-700 shadow-sm group-hover:border-[#00b4d8] group-hover:text-[#00b4d8] transition-all">
                                <Plus className="w-4 h-4" /> Choose Image
                            </span>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleBannerChange} accept="image/*" className="hidden" />
                </DashboardSection>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <DashboardSection title="Essential Details">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                        <Briefcase className="w-3 h-3 text-[#00b4d8]" /> Position Title
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Senior Product Designer"
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#00b4d8]/10 focus:border-[#00b4d8] transition-all outline-none font-medium text-left"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Description</label>
                                    <textarea
                                        required
                                        rows={8}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Tell us about the role, your team, and the mission..."
                                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#00b4d8]/10 focus:border-[#00b4d8] transition-all outline-none resize-none text-left"
                                    ></textarea>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center justify-between">
                                        <span>Responsibilities</span>
                                        <button type="button" onClick={() => addListItem("responsibilities")} className="text-[#00b4d8] hover:text-[#009bc2] flex items-center gap-1 font-bold">
                                            <Plus className="w-3 h-3" /> Add Item
                                        </button>
                                    </label>
                                    <div className="space-y-3">
                                        {formData.responsibilities.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => handleListChange(idx, e.target.value, "responsibilities")}
                                                    placeholder="Describe a key responsibility..."
                                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none transition-all text-left"
                                                />
                                                <button type="button" onClick={() => removeListItem(idx, "responsibilities")} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center justify-between">
                                        <span>Candidate Requirements</span>
                                        <button type="button" onClick={() => addListItem("requirements")} className="text-[#00b4d8] hover:text-[#009bc2] flex items-center gap-1 font-bold">
                                            <Plus className="w-3 h-3" /> Add Item
                                        </button>
                                    </label>
                                    <div className="space-y-3">
                                        {formData.requirements.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => handleListChange(idx, e.target.value, "requirements")}
                                                    placeholder="Required skill or experience..."
                                                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none transition-all text-left"
                                                />
                                                <button type="button" onClick={() => removeListItem(idx, "requirements")} className="p-3 text-gray-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DashboardSection>
                    </div>

                    <div className="space-y-8">
                        <DashboardSection title="Job Summary">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <DollarSign className="w-3 h-3" /> Salary Package
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.salary}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                        placeholder="e.g. $100k - $120k"
                                        className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none transition-all font-semibold text-left"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="New York, NY or Remote"
                                        className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none transition-all font-semibold text-left"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <Building2 className="w-3 h-3" /> Employment Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none appearance-none font-semibold text-left"
                                    >
                                        <option>FULL TIME</option>
                                        <option>PART TIME</option>
                                        <option>FREELANCE</option>
                                        <option>CONTRACT</option>
                                        <option>INTERNSHIP</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <Award className="w-3 h-3" /> Required Exp.
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.experience}
                                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                        placeholder="e.g. 3-5 Years"
                                        className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none transition-all font-semibold text-left"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                        <GraduationCap className="w-3 h-3" /> Education
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.education}
                                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                        placeholder="e.g. Bachelor's Degree"
                                        className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl focus:border-[#00b4d8] outline-none transition-all font-semibold text-left"
                                    />
                                </div>
                            </div>
                        </DashboardSection>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-left">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2 mb-4">
                                <Tag className="w-3 h-3 text-[#00b4d8]" /> Job Tags
                            </label>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-[#00b4d8] text-xs font-bold rounded-lg border border-blue-100">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)}><X className="w-3 h-3" /></button>
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    placeholder="Add skill tag..."
                                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-[#00b4d8] outline-none text-left"
                                />
                                <button type="button" onClick={addTag} className="p-2 bg-[#00b4d8] text-white rounded-xl shadow-md hover:bg-[#009bc2]">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] disabled:bg-gray-400 text-white py-5 rounded-2xl font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-red-200 active:scale-95 flex items-center justify-center gap-3 text-lg"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-6 h-6 animate-spin" /> Publishing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-6 h-6" /> Post Job Listing
                                    </>
                                )}
                            </button>
                            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                                By posting, you agree to our Terms of Service
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
}
