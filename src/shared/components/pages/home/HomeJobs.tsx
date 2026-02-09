import JobCard from "../../ui/JobCard";
import { useJobs } from "../../../hooks/useJobs";
import Loader from "../../ui/Loader";

// Define filter types
type FilterType = "RECENT JOBS" | "FEATURED" | "FULL TIME" | "PART TIME";

export default function HomeJobs() {
  const { jobs, loading, error } = useJobs({ limit: 6 });

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Failed to load jobs. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              {activeFilter}
            </h2>
            <div className="w-12 h-0.5 bg-[#00b4d8] mt-3"></div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-0 border border-gray-200 rounded overflow-hidden">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-wide transition-colors ${activeFilter === tab
                    ? "bg-[#00b4d8] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                  } ${index > 0 ? "border-l border-gray-200" : ""}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
              No jobs found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
