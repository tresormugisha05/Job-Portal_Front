import DashboardLayout from "../../../shared/layouts/DashboardLayout";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Trash2,
  ExternalLink,
  Calendar,
} from "lucide-react";

export default function SavedJobs() {
  const savedJobs = [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "Apus Inc.",
      location: "Remote",
      salary: "$40k - $45k",
      postedDate: "Posted 2 days ago",
      type: "Full Time",
    },
    {
      id: 2,
      title: "React Developer",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$120k - $150k",
      postedDate: "Posted 5 days ago",
      type: "Full Time",
    },
    {
      id: 3,
      title: "Digital Marketer",
      company: "Spotify",
      location: "New York, USA",
      salary: "$80k - $90k",
      postedDate: "Posted 1 week ago",
      type: "Hybrid",
    },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
        <p className="text-gray-500 text-sm">
          You have saved {savedJobs.length} jobs to apply for later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedJobs.map((job: any) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00b4d8]/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-bold text-[#00b4d8] text-xl border border-gray-100 group-hover:scale-110 transition-transform">
                {job.company.charAt(0)}
              </div>
              <div className="flex gap-2">
                <button
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#00b4d8] transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-[#00b4d8] font-medium mb-4">
              {job.company}
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                {job.salary}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {job.postedDate}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex-1 bg-[#00b4d8] hover:bg-[#009bc2] text-white py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95">
                Apply Now
              </button>
              <button className="p-2.5 bg-gray-50 text-gray-500 hover:bg-gray-100 rounded-lg transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {savedJobs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No saved jobs
          </h3>
          <p className="text-gray-500 max-w-xs mx-auto mb-6">
            Explore the jobs list and save those that interest you to apply for
            them later.
          </p>
          <button className="text-[#00b4d8] font-bold hover:underline">
            Browse Jobs
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
