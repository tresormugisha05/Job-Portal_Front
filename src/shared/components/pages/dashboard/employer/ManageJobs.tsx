import DashboardLayout from "../../../layouts/DashboardLayout";
import { Briefcase, Eye, Edit3, Trash2, Search, Filter, Plus, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function ManageJobs() {
    const jobs = [
        {
            id: 1,
            title: "Senior Product Designer",
            type: "Full Time",
            location: "Kigali, Rwanda",
            postedDate: "Oct 24, 2024",
            applicants: 45,
            status: "Active",
            statusColor: "text-green-600 bg-green-50 border-green-100"
        },
        {
            id: 2,
            title: "Frontend Developer",
            type: "Full Time",
            location: "Remote",
            postedDate: "Oct 20, 2024",
            applicants: 128,
            status: "Active",
            statusColor: "text-green-600 bg-green-50 border-green-100"
        },
        {
            id: 3,
            title: "Marketing Manager",
            type: "Part Time",
            location: "Nairobi, Kenya",
            postedDate: "Oct 15, 2024",
            applicants: 12,
            status: "Expired",
            statusColor: "text-gray-600 bg-gray-50 border-gray-100"
        }
    ];

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
                    <p className="text-gray-500 text-sm">You have {jobs.length} total job listings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/dashboard/post-job"
                        className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> Post New Job
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applicants</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Posted Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {jobs.map((job) => (
                                <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">{job.title}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Briefcase className="w-3 h-3" /> {job.type}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {job.location}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-bold text-gray-700">
                                            <Users className="w-4 h-4 text-[#00b4d8]" />
                                            {job.applicants}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {job.postedDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${job.statusColor}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Applicants">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
