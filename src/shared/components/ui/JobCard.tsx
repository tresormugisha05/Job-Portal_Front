import { useState } from "react";
import { MapPin, Heart, Tag, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "../../services/api/jobs";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-[#00b4d8] group overflow-hidden flex flex-col">
            <div className="p-6">
                <div className="flex items-start gap-5">
                    {/* Logo */}
                    <div
                        className={`w-16 h-16 rounded ${job.logoBg || 'bg-gray-200'} flex items-center justify-center text-2xl font-bold shrink-0`}
                    >
                        {job.logo || 'LOGO'}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 pr-4">
                                <h3 className="text-lg font-bold text-gray-900 hover:text-[#00b4d8] transition-colors cursor-pointer mb-1 truncate">
                                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                </h3>
                                <p className="text-[#00b4d8] font-medium text-sm">
                                    {job.company}
                                </p>
                            </div>

                            {/* Heart Icon */}
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className={`transition-all p-2 rounded-full active:scale-90 ${isSaved
                                        ? "bg-red-50 text-[#ff6b6b]"
                                        : "text-gray-300 hover:text-[#ff6b6b] hover:bg-red-50"
                                    }`}
                            >
                                <Heart className={`w-5 h-5 transition-colors ${isSaved ? "fill-current" : ""}`} />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500 mb-6">
                            <span className="flex items-center gap-1.5 font-medium">
                                <DollarSign className="w-4 h-4 text-gray-400" /> {job.salary}
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="line-clamp-1">{job.location}</span>
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                                <Briefcase className="w-4 h-4 text-gray-400" /> {job.type}
                            </span>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between mt-auto">
                            <span
                                className={`bg-blue-100 text-blue-700 text-xs px-4 py-1.5 font-medium uppercase tracking-wider rounded`}
                            >
                                {job.type}
                            </span>
                            <Link
                                to={`/jobs/${job.id}`}
                                className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-xs px-6 py-2 rounded-lg font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
                            >
                                APPLY
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags Bar - Shows on hover */}
            {job.tags && job.tags.length > 0 && (
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all">
                    <div className="bg-[#00b4d8] px-6 py-3 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-white" />
                        <div className="flex flex-wrap gap-1 text-sm text-white">
                            <span className="font-medium">Tagged as:</span>
                            {job.tags.map((tag, i) => (
                                <span key={i}>
                                    {tag}
                                    {i < job.tags!.length - 1 ? "," : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
