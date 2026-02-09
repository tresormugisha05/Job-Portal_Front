import { Briefcase, MapPin, Clock, DollarSign, Calendar, ExternalLink } from "lucide-react";
import DashboardLayout from "../../shared/layouts/DashboardLayout";

export default function AppliedJobsPage() {
  const appliedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      appliedDate: "2024-01-15",
      status: "Shortlisted",
      statusColor: "bg-green-100 text-green-800",
      description: "We're looking for an experienced frontend developer to join our team..."
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$90k - $120k",
      type: "Full-time",
      appliedDate: "2024-01-12",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      description: "Join our design team to create beautiful and intuitive user interfaces..."
    },
    {
      id: 3,
      title: "React Developer",
      company: "Spotify",
      location: "New York, NY",
      salary: "$100k - $130k",
      type: "Remote",
      appliedDate: "2024-01-10",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
      description: "Looking for a skilled React developer to work on our music platform..."
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "Airbnb",
      location: "San Francisco, CA",
      salary: "$110k - $140k",
      type: "Full-time",
      appliedDate: "2024-01-08",
      status: "Interview Scheduled",
      statusColor: "bg-blue-100 text-blue-800",
      description: "We need a talented full stack developer to help build our platform..."
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Applied Jobs</h1>
          <p className="text-gray-600">Track the status of your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Applied</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <Briefcase className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shortlisted</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <ExternalLink className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Job Applications List */}
        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.statusColor}`}>
                        {job.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Applied: {job.appliedDate}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Withdraw Application
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-md">1</button>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">2</button>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">3</button>
            <span className="px-3 py-2">...</span>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">10</button>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </DashboardLayout>
  );
}
