import { useState, useMemo, useEffect } from "react";
import { getAllJobs } from "../../../services/jobService";
import type { JobData } from "../../../services/jobService";
import JobCard from "../../ui/JobCard";

// Define filter types
type FilterType = "RECENT JOBS" | "FEATURED" | "FULL TIME" | "PART TIME";

export default function HomeJobs() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("RECENT JOBS");
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filter jobs based on active tab
  const filteredJobs = useMemo(() => {
    let filtered = [...jobs];

    switch (activeFilter) {
      case "FEATURED":
        filtered = filtered.filter((job) => job.featured);
        break;
      case "FULL TIME":
        filtered = filtered.filter((job) => (job.jobType || job.type) === "Full-time");
        break;
      case "PART TIME":
        filtered = filtered.filter((job) => (job.jobType || job.type) === "Part-time");
        break;
      case "RECENT JOBS":
      default:
        filtered = filtered.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }

    return filtered.slice(0, 6);
  }, [activeFilter, jobs]);

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
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b4d8] mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job._id || job.id}
                  job={{
                    ...job,
                    id: job._id || job.id || "",
                    salary: job.salary || "Negotiable",
                    type: job.jobType || job.type || "Full-time",
                    logo: job.logo || "",
                    logoBg: job.logoBg || "bg-gray-100",
                    typeBg: job.typeBg || "bg-blue-100 text-blue-600",
                    tags: job.tags || [],
                    company: job.company || "Unknown",
                    location: job.location || "Remote",
                    employerId: job.employerId || ""
                  } as any}
                />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500">
                No jobs found for this category.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
