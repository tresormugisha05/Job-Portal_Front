import { useState } from "react";
import { MapPin, Heart, Tag, DollarSign, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "../../data/jobs";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-[#00b4d8] group overflow-hidden flex flex-col">
            <div className="p-6">
                <div className="flex items-start gap-5">
                    <div
                        className={`w-16 h-16 rounded-xl ${job.logoBg || 'bg-gray-100'} flex items-center justify-center text-2xl font-bold shrink-0 border border-gray-100 shadow-sm transition-transform group-hover:scale-105 duration-300`}
                    >
                        {job.logo ? (
                            <img src={job.logo} alt={job.company} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                            job.company?.charAt(0) || '?'
                        )}
                    </div>

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
                            {job.salary && (
                                <span className="flex items-center gap-1.5 font-medium">
                                    <DollarSign className="w-4 h-4 text-gray-400" /> {job.salary}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5 font-medium">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="line-clamp-1">{job.location || 'Remote'}</span>
                            </span>
                            <span className="flex items-center gap-1.5 font-medium">
                                <Briefcase className="w-4 h-4 text-gray-400" /> {job.type || 'Full-time'}
                            </span>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-between mt-auto">
                            <span
                                className={`${job.typeBg || 'bg-blue-100 text-blue-600'} text-xs px-3 py-1 font-bold uppercase tracking-wider rounded-full shadow-sm`}
                            >
                                {job.type || 'Full-time'}
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

            {/* Tags Bar - Reveal on Hover */}
            {job.tags && job.tags.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Tag className="w-4 h-4 text-[#00b4d8]" />
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="font-medium text-gray-900">Tags:</span>
                        {job.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500">
                                {tag}
                            </span>
                        ))}
                        {job.tags.length > 3 && (
                            <span className="text-gray-400">+{job.tags.length - 3}</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
