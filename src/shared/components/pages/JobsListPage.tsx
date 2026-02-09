import { useState } from "react";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../ui/Loader";
import { useJobs } from "../../hooks/useJobs";
import JobCard from "../ui/JobCard";

export default function JobsListPage() {
  const [filters] = useState({
    search: '',
    location: '',
    type: '',
    page: 1,
    limit: 10
  });
  
  const { jobs, loading, error } = useJobs(filters);

  if (loading) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Jobs</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Browse Jobs" breadcrumb="Browse Jobs" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Filter Jobs</h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00b4d8] transition-colors"
                  placeholder="Job title or company"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00b4d8] transition-colors"
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {uniqueCategories.map((category) => (
                    <label key={category} className="flex items-center text-gray-600 hover:text-[#00b4d8] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2 rounded border-gray-300 text-[#00b4d8] focus:ring-[#00b4d8]"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <div className="space-y-2">
                  {uniqueJobTypes.map((type) => (
                    <label key={type} className="flex items-center text-gray-600 hover:text-[#00b4d8] cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedJobTypes.includes(type)}
                        onChange={() => handleJobTypeChange(type)}
                        className="mr-2 rounded border-gray-300 text-[#00b4d8] focus:ring-[#00b4d8]"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedLocation("");
                  setSelectedCategories([]);
                  setSelectedJobTypes([]);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow mb-6 p-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 mb-2 sm:mb-0">
                  Showing <span className="font-semibold text-gray-900">
                    {filteredJobs.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
                    -
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredJobs.length)}
                  </span> of <span className="font-semibold text-gray-900">{filteredJobs.length}</span> jobs
                </p>
                <select className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00b4d8] transition-colors">
                  <option>Sort by: Latest</option>
                  <option>Sort by: Relevant</option>
                  <option>Sort by: Salary</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No jobs found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded ${currentPage === page
                        ? "bg-[#00b4d8] text-white border border-[#00b4d8]"
                        : "border border-gray-300 hover:bg-gray-50"
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}


