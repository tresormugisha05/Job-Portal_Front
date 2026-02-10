import { MapPin, Briefcase, GraduationCap, Mail, Phone, Calendar, Download, ArrowLeft, User } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import { useState, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { candidates } from "../../data/candidates";

export default function CandidateDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const candidate = useMemo(() => {
    // If we're looking at our own profile in the detail view
    if (user && (id === user.id || !id)) {
      return {
        name: user.name,
        professionalTitle: user.professionalTitle || "No Title Set",
        email: user.email,
        phone: user.phone || "No Phone Set",
        location: user.location || "No Location Set",
        experience: user.experience || "No Experience Set",
        education: user.education || "No Education Set",
        joinedDate: "February 2026",
        summary: user.summary || "No summary provided.",
        skills: user.skills || [],
        initials: user.initials || user.name.split(" ").map(n => n[0]).join("").toUpperCase(),
        workExperience: [
          {
            title: user.professionalTitle || "Professional",
            company: "Current Company",
            period: "2024 - Present",
            description: user.summary || ""
          }
        ],
        educationHistory: [
          {
            degree: user.education || "Degree",
            institution: "University",
            year: "2020 - 2024"
          }
        ]
      };
    }

    // Otherwise find in mock data
    const mockCandidate = candidates.find(c => c.id.toString() === id) || candidates[0];
    return {
      ...mockCandidate,
      professionalTitle: mockCandidate.professionalTitle, // Consistent naming
      summary: mockCandidate.summary,
      phone: "+1 234 567 8900",
      joinedDate: "January 2020",
      workExperience: [
        {
          title: mockCandidate.professionalTitle,
          company: "Tech Corp",
          period: "2021 - Present",
          description: mockCandidate.summary
        }
      ],
      educationHistory: [
        {
          degree: mockCandidate.education,
          institution: "University of Technology",
          year: "2015 - 2019"
        }
      ]
    };
  }, [id, user]);

  const handleSendMessage = () => {
    const subject = encodeURIComponent(`Job Opportunity - Message from Employer`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${candidate.email}?subject=${subject}&body=${body}`;
  };

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/candidates" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Candidates
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-semibold">JD</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                <p className="text-[#00b4d8] font-bold text-lg">{candidate.professionalTitle}</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Briefcase className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">{candidate.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4 text-[#00b4d8]" />
                  <span className="text-sm">Joined {candidate.joinedDate}</span>
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
              <p className="text-gray-600 leading-relaxed italic">{candidate.summary}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-blue-50 text-[#0077b6] rounded-lg font-medium text-sm border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Work Experience</h3>
              <div className="space-y-4">
                {candidate.workExperience.map((work, index) => (
                  <div key={index} className="border-l-2 border-blue-600 pl-4">
                    <h4 className="font-semibold text-gray-900">{work.title}</h4>
                    <p className="text-blue-600">{work.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{work.period}</p>
                    <p className="text-gray-600">{work.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00b4d8]" /> Education
              </h3>
              <div className="space-y-4">
                {candidate.educationHistory.map((edu, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                      <GraduationCap className="w-5 h-5 text-[#00b4d8]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                      <p className="text-[#00b4d8] font-medium">{edu.institution}</p>
                      <p className="text-xs text-gray-400 mt-1">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Send Message</h3>
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
                  <Mail className="w-5 h-5" /> Send Email to {candidate.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}