import { useState, useMemo } from "react";
import { jobs } from "../../../data/jobs";
import JobCard from "../../ui/JobCard";

// Define filter types
type FilterType = "RECENT JOBS" | "FEATURED" | "FULL TIME" | "PART TIME";

export default function HomeJobs() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("RECENT JOBS");

  // Filter jobs based on active tab
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    switch (activeFilter) {
      case "FEATURED":
        filtered = filtered.filter((job) => job.featured);
        break;
      case "FULL TIME":
        filtered = filtered.filter((job) => job.type === "FULL TIME");
        break;
      case "PART TIME":
        filtered = filtered.filter((job) => job.type === "PART TIME");
        break;
      case "RECENT JOBS":
      default:
        // Sort by date descending if date exists, otherwise fallback to original order
        filtered = filtered.sort((a, b) => {
          if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return 0;
        });
        break;
    }

    // Limit to 6 jobs for the home page view
    return filtered.slice(0, 6);
  }, [activeFilter]);

  const tabs: FilterType[] = [
    "FEATURED",
    "RECENT JOBS",
    "FULL TIME",
    "PART TIME",
  ];

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
