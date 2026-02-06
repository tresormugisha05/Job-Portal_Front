import { MapPin, Heart, Tag, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "../../data/jobs";

interface JobCardProps {
    job: Job;
}

export default function JobCard({ job }: JobCardProps) {
    return (
        <div className="bg-white overflow-hidden hover:shadow-lg transition-all border border-[#00b4d8] group">
            <div className="p-6">
                <div className="flex items-start gap-4">
                    {/* Logo */}
                    <div
                        className={`w-16 h-16 rounded ${job.logoBg} flex items-center justify-center text-2xl font-bold shrink-0`}
                    >
                        {job.logo}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex-1 pr-4">
                                <h3 className="text-base font-semibold text-gray-900 hover:text-[#00b4d8] transition-colors cursor-pointer mb-1">
                                    <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                                </h3>
                                <p className="text-sm text-[#00b4d8] font-medium">
                                    {job.company}
                                </p>
                            </div>

                            {/* Heart Icon */}
                            <button className="text-gray-300 hover:text-[#ff6b6b] transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-1.5 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <DollarSign className="w-4 h-4 text-[#ff6b6b]" />
                                <span>{job.salary}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-[#ff6b6b] mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">{job.location}</span>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex items-center justify-end gap-3">
                            <span
                                className={`${job.typeBg} text-white text-xs px-4 py-1.5 font-medium uppercase tracking-wider rounded`}
                            >
                                {job.type}
                            </span>
                            <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-xs px-6 py-1.5 rounded font-medium transition-colors uppercase tracking-wider">
                                APPLY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags Bar - Shows on hover */}
            <div className="h-0 group-hover:h-auto overflow-hidden transition-all">
                <div className="bg-[#00b4d8] px-6 py-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-white" />
                    <div className="flex flex-wrap gap-1 text-sm text-white">
                        <span className="font-medium">Tagged as:</span>
                        {job.tags.map((tag, i) => (
                            <span key={i}>
                                {tag}
                                {i < job.tags.length - 1 ? "," : ""}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
