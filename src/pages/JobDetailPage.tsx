import { useState, useEffect } from "react";
import { MapPin, Briefcase, DollarSign, Calendar, Heart } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../components/ui/Loader";
import { getJobById, getAllJobs } from "../services/jobService";
import type { JobData } from "../services/jobService";
import ApplyJobModal from "../components/ui/ApplyJobModal";

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState<JobData | null>(null);
  const [similarJobs, setSimilarJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const jobData = await getJobById(id);
        setJob(jobData);

        const allJobs = await getAllJobs();
        setSimilarJobs(
          allJobs.filter((j) => (j._id || j.id) !== id).slice(0, 3),
        );
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobData();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job Not Found</h1>
          <p className="text-gray-600 mt-2">
            The job you are looking for does not exist.
          </p>
          <Link
            to="/jobs"
            className="text-[#00b4d8] hover:underline mt-4 inline-block"
          >
            Browse All Jobs
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center ${job.logoBg || "bg-blue-100"} flex-shrink-0`}
                >
                  <span className="text-2xl font-bold">
                    {job.logo || job.company?.charAt(0) || "?"}
                  </span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <p className="text-[#00b4d8] text-lg mb-3 font-medium">
                    {job.company}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#ff6b6b]" />{" "}
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-[#ff6b6b]" />{" "}
                      {job.jobType || job.type || "Full-time"}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#ff6b6b]" />{" "}
                        {job.salary}
                      </span>
                    )}
                    {job.createdAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#ff6b6b]" /> Posted{" "}
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-8 py-3 bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252] transition-all font-bold uppercase tracking-wider shadow-sm active:scale-95"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`px-6 py-2 border rounded-lg transition-all flex items-center gap-2 font-bold uppercase tracking-wider text-xs active:scale-95 ${
                    isSaved
                      ? "bg-red-50 border-[#ff6b6b] text-[#ff6b6b]"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${isSaved ? "fill-current" : ""}`}
                  />
                  {isSaved ? "Saved" : "Save Job"}
                </button>
              </div>
            </div>

            {/* Apply Modal */}
            <ApplyJobModal
              isOpen={isApplyModalOpen}
              onClose={() => setIsApplyModalOpen(false)}
              jobTitle={job.title}
              companyName={job.company || "Company"}
              jobId={job._id || job.id}
            />

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Job Description
              </h2>
              <div className="prose max-w-none text-gray-600 leading-relaxed">
                <p className="mb-6">
                  {job.description || "No description provided."}
                </p>

                {job.responsibilities && (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Responsibilities:
                    </h3>
                    <ul className="list-disc pl-5 mb-6 space-y-2">
                      {(Array.isArray(job.responsibilities)
                        ? job.responsibilities
                        : job.responsibilities.split(", ")
                      )
                        .filter((item) => item && item.trim())
                        .map((item, idx) => (
                          <li key={idx}>{item.trim()}</li>
                        ))}
                    </ul>
                  </>
                )}

                {job.requirements && (
                  <>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      Requirements:
                    </h3>
                    <ul className="list-disc pl-5 mb-6 space-y-2">
                      {(Array.isArray(job.requirements)
                        ? job.requirements
                        : job.requirements.split(", ")
                      )
                        .filter((item) => item && item.trim())
                        .map((item, idx) => (
                          <li key={idx}>{item.trim()}</li>
                        ))}
                    </ul>
                  </>
                )}

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What We Offer:
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Competitive salary and benefits package</li>
                  <li>Health, dental, and vision insurance</li>
                  <li>401(k) retirement plan</li>
                  <li>Professional development opportunities</li>
                  <li>Flexible work arrangements</li>
                </ul>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About {job.company}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Join our team and be part of an innovative company driving
                change in the industry.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-bold text-gray-900 block">
                    Location:
                  </span>{" "}
                  {job.location}
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">
                    Category:
                  </span>{" "}
                  {job.category}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Job Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Job Summary
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-gray-500">Job Type:</span>
                  <span className="font-medium text-gray-900">
                    {job.jobType || job.type || "Full-time"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium text-gray-900 text-right w-1/2 line-clamp-1">
                    {job.location}
                  </span>
                </div>
                {job.salary && (
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500">Salary:</span>
                    <span className="font-medium text-gray-900">
                      {job.salary}
                    </span>
                  </div>
                )}
                {job.experience && (
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500">Experience:</span>
                    <span className="font-medium text-gray-900">
                      {job.experience}
                    </span>
                  </div>
                )}
                {job.education && (
                  <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                    <span className="text-gray-500">Education:</span>
                    <span className="font-medium text-gray-900">
                      {job.education}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Posted:</span>
                  <span className="font-medium text-gray-900">
                    {job.createdAt
                      ? new Date(job.createdAt).toLocaleDateString()
                      : "Recently"}
                  </span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-4">
                {similarJobs.length > 0 ? (
                  similarJobs.map((similar) => (
                    <div
                      key={similar._id || similar.id}
                      className="border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                    >
                      <h4 className="font-bold text-gray-900 mb-1 hover:text-[#00b4d8] transition-colors cursor-pointer block">
                        <Link to={`/jobs/${similar._id || similar.id}`}>
                          {similar.title}
                        </Link>
                      </h4>
                      <p className="text-[#00b4d8] text-sm mb-1">
                        {similar.company}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {similar.location}{" "}
                        {similar.salary && `• ${similar.salary}`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No similar jobs found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
