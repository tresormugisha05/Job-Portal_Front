import { MapPin, Briefcase, GraduationCap, Mail, Phone, Calendar, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import { useState } from "react";

export default function CandidateDetailPage() {
  const [message, setMessage] = useState("");
  
  const candidate = {
    name: "Jhon Doe",
    title: "Project Manager",
    email: "jhon.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    experience: "5+ years",
    education: "Bachelor's Degree in Computer Science",
    joinedDate: "January 2020",
    bio: "Experienced Project Manager with 5+ years in software development projects. Proven track record of delivering complex projects on time and within budget. Strong leadership and communication skills with expertise in Agile methodologies.",
    skills: ["Leadership", "Agile", "Scrum", "PMP", "Risk Management", "Stakeholder Management"],
    workExperience: [
      {
        title: "Senior Project Manager",
        company: "Tech Corp",
        period: "2021 - Present",
        description: "Leading multiple software development projects with teams of 10+ members."
      },
      {
        title: "Project Manager",
        company: "Digital Solutions Inc",
        period: "2019 - 2021",
        description: "Managed web and mobile application projects using Agile methodologies."
      }
    ],
    educationHistory: [
      {
        degree: "Bachelor's in Computer Science",
        institution: "University of Technology",
        year: "2015 - 2019"
      }
    ]
  };

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
                <p className="text-blue-600 text-lg">{candidate.title}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{candidate.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-sm">{candidate.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {candidate.joinedDate}</span>
                </div>
              </div>

              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mb-3">
                <Download className="w-4 h-4" /> Download Resume
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{candidate.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md">
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
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
              <div className="space-y-4">
                {candidate.educationHistory.map((edu, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
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