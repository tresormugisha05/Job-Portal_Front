import DashboardLayout from "../../../layouts/DashboardLayout";
import { Search, Filter, Trash2, Eye, Calendar, Briefcase } from "lucide-react";

export default function AdminApplications() {
  const applications = [
    {
      id: 1,
      candidate: "Jhon Jeremy",
      job: "Senior Product Designer",
      company: "TechFlow Inc.",
      date: "Oct 24, 2024",
      status: "Pending",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      id: 2,
      candidate: "Sarah Smith",
      job: "Frontend Developer",
      company: "Meta",
      date: "Oct 22, 2024",
      status: "Shortlisted",
      statusColor: "text-green-600 bg-green-50 border-green-100",
    },
    {
      id: 3,
      candidate: "Mike Johnson",
      job: "Marketing Manager",
      company: "Spotify",
      date: "Oct 20, 2024",
      status: "Rejected",
      statusColor: "text-red-600 bg-red-50 border-red-100",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Platform Applications
          </h1>
          <p className="text-gray-500 text-sm">
            View and manage all job applications across the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
            Total: {applications.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by candidate or job..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8]">
              <option>All Status</option>
              <option>Pending</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#00b4d8]/10 text-[#00b4d8] rounded-full flex items-center justify-center font-bold text-xs">
                        {app.candidate.charAt(0)}
                      </div>
                      <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">
                        {app.candidate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-700">
                        {app.job}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" /> {app.company}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {app.date}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${app.statusColor}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Application"
                      >
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
