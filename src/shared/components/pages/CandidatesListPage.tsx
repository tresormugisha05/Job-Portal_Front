import { MapPin, Briefcase, GraduationCap, Eye, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../ui/Loader";
import usePageLoader from "../../hooks/usePageLoader";

export default function CandidatesListPage() {
  const isLoading = usePageLoader(1000);
  
  if (isLoading) {
    return <Loader />;
  }
  
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Browse Candidates
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-4">Filter Candidates</h3>

              {/* Keywords */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Skills, job title..."
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Locations</option>
                  <option>New York</option>
                  <option>Delhi</option>
                  <option>Ohio</option>
                  <option>Hawaii</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Entry Level (0-2 years)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Mid Level (3-5 years)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Senior Level (5+ years)</span>
                  </label>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>JavaScript</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>React</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Python</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>UI/UX Design</span>
                  </label>
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>High School</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Bachelor's Degree</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Master's Degree</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Candidate Listings */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow mb-6 p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 mb-2 sm:mb-0">
                  Showing 1-10 of 500+ candidates
                </p>
                <select className="px-3 py-2 border border-gray-300 rounded-md">
                  <option>Sort by: Latest</option>
                  <option>Sort by: Most Experienced</option>
                  <option>Sort by: Most Skills</option>
                </select>
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((candidate) => (
                <div
                  key={candidate}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold">JD</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Jhon Doe
                          </h3>
                          <p className="text-blue-600 mb-2">Project Manager</p>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> New York
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> 5+ years
                              experience
                            </span>
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-4 h-4" /> Bachelor's
                              Degree
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              Leadership
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              Agile
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                              Scrum
                            </span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                              PMP
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            Experienced Project Manager with 5+ years in
                            software development projects...
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
                      <Link to={`/candidates/${candidate}`} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Eye className="w-4 h-4" /> View Profile
                      </Link>
                      <Link to={`/candidates/${candidate}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Contact
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-md">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  3
                </button>
                <span className="px-3 py-2">...</span>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  50
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
