import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import {
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  Trash2,
  Eye,
  MapPin,
  Building2,
} from "lucide-react";

export default function AdminJobs() {
  const jobs = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "TechFlow Inc.",
      location: "San Francisco, CA",
      status: "Featured",
      statusColor: "text-amber-600 bg-amber-50 border-amber-100",
      postedBy: "Employer #42",
      date: "Oct 24, 2024",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Meta",
      location: "Remote",
      status: "Active",
      statusColor: "text-green-600 bg-green-50 border-green-100",
      postedBy: "Employer #12",
      date: "Oct 22, 2024",
    },
    {
      id: 3,
      title: "Marketing Manager",
      company: "Spotify",
      location: "New York, USA",
      status: "Under Review",
      statusColor: "text-blue-600 bg-blue-50 border-blue-100",
      postedBy: "Employer #85",
      date: "Oct 20, 2024",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Manage All Jobs
          </h1>
          <p className="text-gray-500 text-sm">
            Platform-wide job listing management and moderation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Reported Jobs (3)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-50 bg-gray-50/30 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, company or ID..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00b4d8]/20 focus:border-[#00b4d8] transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" /> Filter Status
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Job Details
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Posted By
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date
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
              {jobs.map((job: any) => (
                <tr
                  key={job.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-[#00b4d8] transition-colors">
                        {job.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> {job.company}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-700">
                      {job.postedBy}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${job.statusColor}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 text-gray-400 hover:text-[#00b4d8] hover:bg-blue-50 rounded-lg transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        title="Feature"
                      >
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
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
