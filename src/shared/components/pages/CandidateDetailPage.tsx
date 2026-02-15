import {
  MapPin,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Download,
  ArrowLeft,
  User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { CandidateService, type UserModel } from "../../services/Auth.Service";
import Loader from "../ui/Loader";

export default function CandidateDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [candidateData, setCandidateData] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("CandidateDetailPage: useEffect triggered, id:", id, "user:", user);

        if (!id) {
          // Viewing own profile
          console.log("No id - viewing own profile");
          if (user) {
            // Map user to UserModel structure
            const mappedUser: UserModel = {
              _id: user.id,
              name: user.name,
              email: user.email,
              contactPhone: user.contactPhone || "",
              password: "", // Not needed for display
              avatar: user.avatar,
              role: user.role,
              professionalTitle: user.professionalTitle,
              location: user.location,
              experience: user.experience,
              education: user.education,
              skills: user.skills || [],
              summary: user.summary,
              workExperience: user.workExperience || [],
              educationHistory: user.educationHistory || [],
              resume: user.resume,
              initials: user.initials,
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            console.log("Mapped user:", mappedUser);
            setCandidateData(mappedUser);
          } else {
            console.log("No user in context - setting error");
            setError("User not authenticated");
          }
        } else {
          // Fetch other candidate's data
          console.log("Fetching candidate with id:", id);
          const data = await CandidateService.getUser(id);
          console.log("Received candidate data:", data);
          setCandidateData(data);
        }
      } catch (err: any) {
        console.error("Error fetching candidate:", err);
        setError(err.message || "Failed to load candidate data");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id, user]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader />
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-red-600 text-lg">{error}</p>
            <Link
              to="/candidates"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Candidates
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!candidateData) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-lg">Candidate not found</p>
            <p className="text-gray-500 text-sm mt-2">candidateData is null - received: {JSON.stringify(candidateData)}</p>
            <Link
              to="/candidates"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Candidates
            </Link>
          </div>
        </div>
      </PageWrapper>
    );
  }

  console.log("Rendering candidateData:", candidateData);

  const handleSendMessage = () => {
    const subject = encodeURIComponent(
      `Job Opportunity - Message from Employer`,
    );
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${candidateData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/candidates"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Candidates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-semibold">
                    {candidateData.initials ||
                      (candidateData.name
                        ? candidateData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                        : "U")}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {candidateData.name || "Unknown User"}
                </h2>
                <p className="text-[#00b4d8] font-bold text-lg">
                  {candidateData.professionalTitle || "No Title Set"}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">
                    {candidateData.location || "No Location Set"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">{candidateData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">
                    {candidateData.contactPhone || "No Phone Set"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Briefcase className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">
                    {candidateData.experience || "No Experience Set"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">
                    Joined{" "}
                    {candidateData.createdAt
                      ? new Date(candidateData.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
              </div>

              <button className="w-full bg-[#00b4d8] text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-[#00b4d8]/20 transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Resume
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-[#00b4d8]" /> About Me
              </h3>
              <p className="text-gray-600 leading-relaxed italic">
                {candidateData.summary || "No summary provided."}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidateData.skills &&
                  candidateData.skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-blue-50 text-[#0077b6] rounded-lg font-medium text-sm border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Work Experience
              </h3>
              <div className="space-y-4">
                {candidateData.workExperience &&
                  candidateData.workExperience.map(
                    (work: any, index: number) => (
                      <div
                        key={work.id || index}
                        className="border-l-2 border-blue-600 pl-4"
                      >
                        <h4 className="font-semibold text-gray-900">
                          {work.title}
                        </h4>
                        <p className="text-blue-600">{work.company}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {work.period}
                        </p>
                        <p className="text-gray-600">{work.description}</p>
                      </div>
                    ),
                  )}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00b4d8]" /> Education
              </h3>
              <div className="space-y-4">
                {candidateData.educationHistory &&
                  candidateData.educationHistory.map(
                    (edu: any, index: number) => (
                      <div
                        key={edu.id || index}
                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100"
                      >
                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                          <GraduationCap className="w-5 h-5 text-[#00b4d8]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {edu.degree}
                          </h4>
                          <p className="text-[#00b4d8] font-medium">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {edu.year}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Send Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your message here..."
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" /> Send Email to{" "}
                  {candidateData.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
