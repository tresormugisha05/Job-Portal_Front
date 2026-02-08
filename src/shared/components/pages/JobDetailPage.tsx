import { MapPin, Briefcase, DollarSign, Calendar, Heart } from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageWrapper from "../layouts/PageWrapper";
import Loader from "../ui/Loader";
import usePageLoader from "../../hooks/usePageLoader";
import { jobService, type Job } from "../../services/api/jobs";
import { useAuth } from "../../contexts/AuthContext";

export default function JobDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isLoading = usePageLoader(1000);
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await jobService.getJobById(id || '');
        setJob(jobData);
      } catch (err) {
        setError('Failed to load job details');
        console.error('Job fetch error:', err);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);
  
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 text-xl font-semibold mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  if (!job) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-gray-600 text-xl">Job not found</h2>
          </div>
        </div>
      </PageWrapper>
    );
  }
  
  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">Job ID: {job.id}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold">LOGO</span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <p className="text-blue-600 text-lg mb-3">{job.company}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" /> {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" /> {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {job.postedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {isAuthenticated ? (
                  <button 
                    onClick={() => navigate(`/apply/${id}`)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-block"
                  >
                    Login to Apply
                  </Link>
                )}
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Heart className="w-4 h-4" /> Save Job
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">{job.description}</p>
                <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc pl-6 mb-4">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
              <p className="text-gray-700 mb-4">
                {job.company} is a leading company in their industry,
                dedicated to providing innovative solutions and excellent opportunities for growth.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Company Size:</span> 100-500 employees
                </div>
                <div>
                  <span className="font-semibold">Founded:</span> 2010
                </div>
                <div>
                  <span className="font-semibold">Industry:</span> Technology
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {job.location}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Job Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Job Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary:</span>
                  <span className="font-medium">{job.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span className="font-medium">{job.postedDate}</span>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Jobs</h3>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-900 mb-1">
                    iOS Developer
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">Apus Inc.</p>
                  <p className="text-gray-600 text-sm">
                    New York • $90k - $130k
                  </p>
                </div>
                <div className="border-b pb-3">
                  <h4 className="font-medium text-gray-900 mb-1">
                    Front-End Web Developer
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">Envato Inc.</p>
                  <p className="text-gray-600 text-sm">India • $70k - $100k</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Medical Logo Designer
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">FShop Inc.</p>
                  <p className="text-gray-600 text-sm">
                    Australia • $60k - $80k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
