import DashboardLayout from "../../../layouts/DashboardLayout";
import { Search, Filter, Download, Mail, Phone, ExternalLink, CheckCircle, XCircle } from "lucide-react";

export default function Applicants() {
    const applicants = [
        {
            id: 1,
            name: "Jhon Doe",
            title: "Project Manager",
            appliedFor: "Senior Health and Food",
            date: "Oct 24, 2024",
            email: "jhon.doe@example.com",
            phone: "+250 788 123 456",
            status: "Pending",
            avatar: "J"
        },
        {
            id: 2,
            name: "Sarah Smith",
            title: "UI Designer",
            appliedFor: "Product Designer",
            date: "Oct 25, 2024",
            email: "sarah.s@example.com",
            phone: "+250 788 000 000",
            status: "Shortlisted",
            avatar: "S"
        },
        {
            id: 3,
            name: "Mike Johnson",
            title: "Frontend Dev",
            appliedFor: "React Developer",
            date: "Oct 26, 2024",
            email: "mike.j@example.com",
            phone: "+250 789 111 222",
            status: "Rejected",
            avatar: "M"
        }
    ];

    return (
        <DashboardLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Applicants</h1>
                    <p className="text-gray-500 text-sm">You have {applicants.length} candidates who applied for your jobs.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
                    <Download className="w-4 h-4" /> Download Report
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8]">
                            <option>All Jobs</option>
                            <option>Senior Health and Food</option>
                            <option>Product Designer</option>
                        </select>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4" /> More Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Job Applied</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {applicants.map((cand) => (
                                <tr key={cand.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-[#00b4d8] text-white rounded-full flex items-center justify-center font-bold shadow-sm">
                                                {cand.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">{cand.name}</p>
                                                <p className="text-xs text-gray-500">{cand.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" /> {cand.email}
                                            </p>
                                            <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                                                <Phone className="w-3.5 h-3.5 text-gray-400" /> {cand.phone}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-gray-700">{cand.appliedFor}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {cand.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${cand.status === 'Shortlisted' ? 'text-green-600 bg-green-50 border-green-100' :
                                            cand.status === 'Rejected' ? 'text-red-600 bg-red-50 border-red-100' :
                                                'text-blue-600 bg-blue-50 border-blue-100'
                                            }`}>
                                            {cand.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Shortlist">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Reject">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all">
                                                <ExternalLink className="w-4 h-4" />
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
