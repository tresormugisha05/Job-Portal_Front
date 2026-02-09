import { Briefcase, MapPin, Clock, DollarSign, Heart, ExternalLink, Calendar } from "lucide-react";
import DashboardLayout from "../../shared/layouts/DashboardLayout";

export default function SavedJobsPage() {
  const savedJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Netflix",
      location: "Los Gatos, CA",
      salary: "$130k - $160k",
      type: "Full-time",
      postedDate: "2 days ago",
      savedDate: "2024-01-14",
      description: "We're looking for a senior React developer to join our streaming platform team...",
      tags: ["React", "TypeScript", "Node.js", "AWS"]
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Apple",
      location: "Cupertino, CA",
      salary: "$100k - $130k",
      type: "Full-time",
      postedDate: "3 days ago",
      savedDate: "2024-01-13",
      description: "Join our design team to create innovative user experiences for Apple products...",
      tags: ["UI/UX", "Figma", "Prototyping", "Design Systems"]
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Stripe",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Remote",
      postedDate: "1 week ago",
      savedDate: "2024-01-08",
      description: "Looking for experienced backend engineers to work on payment infrastructure...",
      tags: ["Python", "Django", "PostgreSQL", "Docker"]
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$110k - $140k",
      type: "Full-time",
      postedDate: "4 days ago",
      savedDate: "2024-01-10",
      description: "Join our data science team to work on machine learning and analytics projects...",
      tags: ["Python", "ML", "TensorFlow", "SQL"]
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
          <p className="text-gray-600">Jobs you've bookmarked for later review</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Saved</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Week</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search saved jobs..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sort by: Saved Date</option>
              <option>Sort by: Posted Date</option>
              <option>Sort by: Company</option>
              <option>Sort by: Salary</option>
            </select>
          </div>
        </div>

        {/* Saved Jobs List */}
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
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
                        <Clock className="w-4 h-4" />
                        {job.postedDate}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Saved on {job.savedDate}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Share
                  </button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    Remove
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
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">5</button>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </DashboardLayout>
  );
}
