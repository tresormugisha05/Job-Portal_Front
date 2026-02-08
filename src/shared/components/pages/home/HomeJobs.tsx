import JobCard from "../../ui/JobCard";
import { useJobs } from "../../../hooks/useJobs";
import Loader from "../../ui/Loader";

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
              RECENT JOBS
            </h2>
            <div className="w-12 h-0.5 bg-[#00b4d8] mt-3"></div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border border-gray-200 rounded overflow-hidden">
            <button className="px-6 py-2.5 bg-[#00b4d8] text-white text-sm font-medium uppercase tracking-wide">
              FEATURED
            </button>
            <button className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 uppercase tracking-wide border-l border-gray-200">
              RECENT JOBS
            </button>
            <button className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 uppercase tracking-wide border-l border-gray-200">
              FULL TIME
            </button>
            <button className="px-6 py-2.5 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 uppercase tracking-wide border-l border-gray-200">
              PART TIME
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
