import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../ui/Loader";
import usePageLoader from "../../hooks/usePageLoader";
import JobCard from "../ui/JobCard";
import PageHeader from "../ui/PageHeader";
import api from "../../services/ApiSetter";
export default function JobsListPage() {
  const isLoading = usePageLoader(1000);
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("/api/jobs");
      setJobs(response.data.data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique values for filters from fetched jobs
  const uniqueLocations = useMemo(() => 
    [...new Set(jobs.map((job) => job.location?.split(',').pop()?.trim() || job.location))].sort(),
    [jobs]
  );
  const uniqueJobTypes = useMemo(() => 
    [...new Set(jobs.map((job) => job.jobType || job.type))].sort(),
    [jobs]
  );
  const uniqueCategories = ["Developer", "Technology", "Medical", "Accounting", "Design", "Marketing"];

  const ITEMS_PER_PAGE = 5;

  // Filter States initialized from searchParams
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const initialCategory = searchParams.get("category");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Sync state back to URL (optional but helpful for bookmarking)
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set("search", searchQuery);
    if (selectedLocation) newParams.set("location", selectedLocation);
    if (selectedCategories.length > 0) newParams.set("category", selectedCategories[0]);

    // update URL without triggering a full re-render loop if possible
    // or just leave URL as is if you don't want deep synchronization
  }, [searchQuery, selectedLocation, selectedCategories]);


  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search (Title or Company)
      const matchesSearch =
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase());

      // Location
      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "All Locations" ||
        job.location?.includes(selectedLocation);

      // Job Type
      const jobType = job.jobType || job.type;
      const matchesType =
        selectedJobTypes.length === 0 || selectedJobTypes.includes(jobType);

      // Categories (Tags)
      const jobTags = job.tags || job.category || [];
      const matchesCategory =
        selectedCategories.length === 0 ||
        (Array.isArray(jobTags) && jobTags.some((tag: string) =>
          selectedCategories.some((cat) => tag.toLowerCase().includes(cat.toLowerCase()))
        ));

      return matchesSearch && matchesLocation && matchesType && matchesCategory;
    });
  }, [jobs, searchQuery, selectedLocation, selectedJobTypes, selectedCategories]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleJobTypeChange = (type: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  if (isLoading || loading) {
    return <Loader />;
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
              {paginatedJobs.length > 0 ? (
                paginatedJobs.map((job) => (
                  <JobCard key={job._id} job={{ ...job, id: job._id }} />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                  <p className="text-lg">No jobs found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedLocation("");
                      setSelectedCategories([]);
                      setSelectedJobTypes([]);
                    }}
                    className="mt-4 text-[#00b4d8] hover:underline"
                  >
                    Clear all filters
                  </button>
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


