import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useAuth } from "../../../../contexts/AuthContext";
import api from "../../../../services/ApiSetter";
import type {
  WorkExperience,
  EducationHistory,
} from "../../../../contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Camera,
  Save,
  CheckCircle,
  MapPin,
  GraduationCap,
  Plus,
  Trash2,
  AlertCircle,
} from "lucide-react";

export default function CandidateProfile() {
  const { user, updateProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "+250 788 123 456",
    professionalTitle: user?.professionalTitle || "Frontend Developer",
    summary:
      user?.summary ||
      "Passionate developer with experience in building modern web applications using React and Tailwind CSS. Always eager to learn new technologies and solve complex problems.",
    location: user?.location || "Kigali, Rwanda",
    experience: user?.experience || "3 years",
    education: user?.education || "Bachelor's Degree",
    skills:
      user?.skills?.join(", ") || "React, JavaScript, TypeScript, Tailwind CSS",
    resume: user?.resume || "Jhon_Doe_Resume_2024.pdf",
  });

  // Work Experience - Initialize from user data or with one default entry
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>(
    user?.workExperience && user.workExperience.length > 0
      ? user.workExperience
      : [
          {
            id: "1",
            title: "",
            company: "",
            period: "",
            description: "",
          },
        ],
  );

  // Education History - Initialize from user data or with one default entry
  const [educationHistory, setEducationHistory] = useState<EducationHistory[]>(
    user?.educationHistory && user.educationHistory.length > 0
      ? user.educationHistory
      : [
          {
            id: "1",
            degree: "",
            institution: "",
            year: "",
          },
        ],
  );

  // Fetch full profile on mount
  useEffect(() => {
    if (user?.id) {
      const fetchProfile = async () => {
        try {
          const response = await api.get(`/auth/${user.id}`);
          const fullUser = response.data.data;

          if (fullUser) {
            setFormData({
              name: fullUser.name || "",
              email: fullUser.email || "",
              phone: fullUser.phone || "",
              professionalTitle: fullUser.professionalTitle || "",
              summary: fullUser.summary || "",
              location: fullUser.location || "",
              experience: fullUser.experience || "",
              education: fullUser.education || "",
              skills: fullUser.skills?.join(", ") || "",
              resume: fullUser.resume || "",
            });

            if (fullUser.workExperience && fullUser.workExperience.length > 0) {
              setWorkExperience(fullUser.workExperience);
            }

            if (
              fullUser.educationHistory &&
              fullUser.educationHistory.length > 0
            ) {
              setEducationHistory(fullUser.educationHistory);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Work Experience Handlers
  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      period: "",
      description: "",
    };
    setWorkExperience([...workExperience, newWork]);
  };

  const removeWorkExperience = (id: string) => {
    if (workExperience.length > 1) {
      setWorkExperience(workExperience.filter((work) => work.id !== id));
    }
  };

  const updateWorkExperience = (
    id: string,
    field: keyof WorkExperience,
    value: string,
  ) => {
    setWorkExperience(
      workExperience.map((work) =>
        work.id === id ? { ...work, [field]: value } : work,
      ),
    );
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: EducationHistory = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
    };
    setEducationHistory([...educationHistory, newEdu]);
  };

  const removeEducation = (id: string) => {
    if (educationHistory.length > 1) {
      setEducationHistory(educationHistory.filter((edu) => edu.id !== id));
    }
  };

  const updateEducation = (
    id: string,
    field: keyof EducationHistory,
    value: string,
  ) => {
    setEducationHistory(
      educationHistory.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: null, message: "" });

    try {
      const skillArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");
      const initials = formData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        professionalTitle: formData.professionalTitle,
        summary: formData.summary,
        location: formData.location,
        experience: formData.experience,
        education: formData.education,
        skills: skillArray,
        resume: formData.resume,
        initials: initials,
        workExperience: workExperience.filter((w) => w.title && w.company),
        educationHistory: educationHistory.filter(
          (e) => e.degree && e.institution,
        ),
      });

      setStatus({
        type: "success",
        message: "Profile updated successfully!",
      });
      setTimeout(() => setStatus({ type: null, message: "" }), 3000);
    } catch (error: any) {
      console.error("Failed to update profile", error);
      setStatus({
        type: "error",
        message: error.message || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              My Profile
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your personal information and professional presence to
              match your candidate card.
            </p>
          </div>
          {status.type === "success" && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-100 animate-in fade-in slide-in-from-top-4">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}
          {status.type === "error" && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{status.message}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info & Photo */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">Basic Information</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="w-32 h-32 bg-linear-to-br from-[#00b4d8] to-[#0077b6] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden">
                      {user?.avatar || (
                        <span>
                          {formData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white rounded-2xl"
                    >
                      <Camera className="w-8 h-8" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    Square Photo
                  </p>
                </div>

                {/* Inputs */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-[#00b4d8]" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#00b4d8]" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#00b4d8]" /> Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#00b4d8]" /> Role /
                      Title
                    </label>
                    <input
                      type="text"
                      name="professionalTitle"
                      value={formData.professionalTitle}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="e.g. Senior Product Designer"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#00b4d8]" /> Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="e.g. New York, USA"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#00b4d8]" />{" "}
                      Experience (Years)
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="e.g. 5+ years"
                    />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#00b4d8]" />{" "}
                      Education
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                      placeholder="e.g. Master's Degree"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">Technical Skills</h2>
            </div>
            <div className="p-6">
              <label className="text-sm font-bold text-gray-700 mb-2 block">
                Skills (Comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                placeholder="React, Node.js, TypeScript..."
              />
              <p className="text-xs text-gray-400 mt-2">
                These skills will appear on your candidate card.
              </p>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">Summary / Bio</h2>
            </div>
            <div className="p-6">
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all resize-none"
                placeholder="Describe your professional background and goals..."
              />
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Work Experience</h2>
              <button
                type="button"
                onClick={addWorkExperience}
                className="flex items-center gap-2 text-[#00b4d8] hover:text-[#0077b6] font-bold text-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Position
              </button>
            </div>
            <div className="p-6 space-y-6">
              {workExperience.map((work, index) => (
                <div
                  key={work.id}
                  className="p-5 bg-gray-50 rounded-lg border border-gray-200 relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Position {index + 1}
                    </h3>
                    {workExperience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWorkExperience(work.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={work.title}
                        onChange={(e) =>
                          updateWorkExperience(work.id, "title", e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Company
                      </label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) =>
                          updateWorkExperience(
                            work.id,
                            "company",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        placeholder="e.g. Tech Corp"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Period
                      </label>
                      <input
                        type="text"
                        value={work.period}
                        onChange={(e) =>
                          updateWorkExperience(
                            work.id,
                            "period",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        placeholder="e.g. 2021 - Present"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={work.description}
                        onChange={(e) =>
                          updateWorkExperience(
                            work.id,
                            "description",
                            e.target.value,
                          )
                        }
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all resize-none"
                        placeholder="Describe your key responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education History Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Education History</h2>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center gap-2 text-[#00b4d8] hover:text-[#0077b6] font-bold text-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>
            <div className="p-6 space-y-6">
              {educationHistory.map((edu, index) => (
                <div
                  key={edu.id}
                  className="p-5 bg-gray-50 rounded-lg border border-gray-200 relative"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Education {index + 1}
                    </h3>
                    {educationHistory.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(edu.id, "degree", e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        placeholder="e.g. Bachelor of Science in Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          updateEducation(edu.id, "institution", e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        placeholder="e.g. University of Technology"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) =>
                          updateEducation(edu.id, "year", e.target.value)
                        }
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        placeholder="e.g. 2015 - 2019"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">Resume / CV</h2>
            </div>
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/50 group hover:bg-gray-50 hover:border-[#00b4d8]/50 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#00b4d8] group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900 mb-1">
                    {formData.resume}
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF, DOC, DOCX up to 5MB
                  </p>
                </div>
                <button
                  type="button"
                  className="text-[#00b4d8] text-sm font-bold hover:text-[#0077b6]"
                >
                  Change File
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 pb-12">
            <button
              type="button"
              className="px-8 py-3 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 bg-linear-to-r from-[#00b4d8] to-[#0077b6] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#00b4d8]/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

//profile page for candidates to edit their profile information, including name, email, phone, professional title, summary, location, experience, education, skills, resume upload, and work experience/education history sections. Uses a clean and modern design with a focus on usability and quick access to important information for job seekers.
