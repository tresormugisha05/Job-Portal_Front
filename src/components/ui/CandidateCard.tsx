import { MapPin, Briefcase, GraduationCap, Eye, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import type { UserModel } from "../../services/Auth.Service";

interface CandidateCardProps {
  candidate: UserModel;
}

export default function CandidateCard({ candidate }: CandidateCardProps) {
  // Define background colors for skills (looping pattern)
  const skillColors = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-purple-100 text-purple-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
    "bg-indigo-100 text-indigo-700",
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-[#00b4d8] group">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-5">
              {/* Avatar / Initials */}
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-300 shrink-0 shadow-sm">
                <span className="text-xl font-bold text-gray-600">
                  {candidate.initials}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900 hover:text-[#00b4d8] transition-colors cursor-pointer truncate">
                    <Link to={`/candidates/${candidate._id}`}>
                      {candidate.name}
                    </Link>
                  </h3>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <p className="text-[#00b4d8] font-medium text-sm truncate">
                    {candidate.professionalTitle}
                  </p>
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />{" "}
                    {candidate.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-gray-400" />{" "}
                    {candidate.experience}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-gray-400" />{" "}
                    {candidate.education}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {candidate.skills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                        skillColors[index % skillColors.length]
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 5 && (
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      +{candidate.skills.length - 5} more
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-4 sm:mb-0">
                  {candidate.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-start gap-3 mt-4 sm:mt-0 sm:ml-6 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 w-full sm:w-auto">
            <Link
              to={`/candidates/${candidate._id}`}
              className="flex-1 sm:flex-none w-full sm:w-40 bg-white border border-[#00b4d8] text-[#00b4d8] hover:bg-[#00b4d8] hover:text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" /> View Profile
            </Link>
            <a
              href={`mailto:${candidate.email}`}
              className="flex-1 sm:flex-none w-full sm:w-40 bg-[#00b4d8] hover:bg-[#0096c7] text-white px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
