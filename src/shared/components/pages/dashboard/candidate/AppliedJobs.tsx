import DashboardLayout from "../../../layouts/DashboardLayout";
import { Briefcase, MapPin, Calendar, ChevronRight, Search, Filter } from "lucide-react";

export default function AppliedJobs() {
    const applications = [
        {
            id: 1,
            title: "UI Designer",
            company: "LWPtech Inc.",
            location: "Kigali, Rwanda",
            appliedDate: "Oct 24, 2024",
            status: "Pending",
            statusColor: "text-blue-600 bg-blue-50 border-blue-100",
            salary: "$35k - $40k"
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: "Google",
            location: "Mountain View, CA",
            appliedDate: "Oct 20, 2024",
            status: "Shortlisted",
            statusColor: "text-green-600 bg-green-50 border-green-100",
            salary: "$120k - $150k"
        },
        {
            id: 3,
            title: "UX Researcher",
            company: "Airbnb",
            location: "San Francisco, CA",
            appliedDate: "Oct 15, 2024",
            status: "Rejected",
            statusColor: "text-red-600 bg-red-50 border-red-100",
            salary: "$90k - $110k"
        }
    ];

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Applied Jobs</h1>
                    <p className="text-gray-500 text-sm">You have applied for {applications.length} jobs in total.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        />
                    </div>
                    <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Title</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Applied Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-400">
                                                {app.company.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">{app.title}</p>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Briefcase className="w-3 h-3" /> {app.company}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" /> {app.location}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            {app.appliedDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${app.statusColor}`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
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
