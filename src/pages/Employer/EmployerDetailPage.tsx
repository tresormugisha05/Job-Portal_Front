import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../../shared/layouts/PageWrapper";
import Loader from "../../shared/components/ui/Loader";
import {
  ChevronRight,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";
import {
  getEmployerById,
  type EmployerData,
} from "../Employer/service/employerService";
import { getJobsByEmployer, type JobData } from "../Jobs/service/jobService";
import JobCard from "../../shared/components/ui/JobCard";

export default function EmployerDetailPage() {
  const { id } = useParams();
  const [employer, setEmployer] = useState<EmployerData | null>(null);
  const [employerJobs, setEmployerJobs] = useState<JobData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const [employerData, jobs] = await Promise.all([
          getEmployerById(id),
          getJobsByEmployer(id),
        ]);
        setEmployer(employerData);
        setEmployerJobs(jobs);
        setFilteredJobs(jobs);
      } catch (error) {
        console.error("Error fetching employer:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Apply filters whenever selections change
  useEffect(() => {
    let filtered = employerJobs;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((job: any) =>
        selectedCategories.includes(job.category),
      );
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter((job) =>
        selectedLocations.some((loc) =>
          job.location.toLowerCase().includes(loc.toLowerCase()),
        ),
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((job: any) =>
        selectedTypes.includes(job.jobType || job.type || ""),
      );
    }

    setFilteredJobs(filtered);
  }, [selectedCategories, selectedLocations, selectedTypes, employerJobs]);

  if (isLoading) {
    return <Loader />;
  }

  // Dynamically calculate categories, locations, and job types from employer jobs
  const categories = Array.from(
    new Set(employerJobs.map((job: any) => job.category)),
  )
    .map((category) => ({
      name: category,
      count: employerJobs.filter((job: any) => job.category === category)
        .length,
    }))
    .sort((a, b) => b.count - a.count);

  const locations = Array.from(
    new Set(employerJobs.map((job: any) => job.location)),
  )
    .map((location) => ({
      name: location,
      count: employerJobs.filter((job: any) => job.location === location)
        .length,
    }))
    .sort((a, b) => b.count - a.count);

  const jobTypes = Array.from(
    new Set(
      employerJobs.map((job: any) => job.jobType || job.type || "Full-time"),
    ),
  )
    .map((type) => ({
      name: type,
      count: employerJobs.filter((job) => (job.jobType || job.type) === type)
        .length,
    }))
    .sort((a, b) => b.count - a.count);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location],
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  if (!employer) {
    return (
      <PageWrapper disableTopPadding={true}>
        <div className="pt-40 text-center pb-20">
          <h1 className="text-3xl font-bold text-gray-800">
            Employer Not Found
          </h1>
          <Link
            to="/employers"
            className="text-[#00b4d8] hover:underline mt-4 inline-block"
          >
            Back to Employers
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper disableTopPadding={true}>
      {/* Hero Section */}
      <section className="relative bg-[#0f172a] pb-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <h1 className="text-5xl font-bold text-white mb-6">The Blogs</h1>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="hover:text-white cursor-pointer transition-colors">
              Home
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#00b4d8]">Job</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar */}
            <div className="w-full lg:w-80 space-y-6 order-2 lg:order-1">
              {/* Jobs By Category */}
              <div className="bg-white rounded overflow-hidden shadow-sm">
                <div className="bg-[#00b4d8] px-6 py-4">
                  <h3 className="text-white font-bold text-lg">
                    Jobs By Category
                  </h3>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="space-y-4">
                    {categories.map((cat, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.name)}
                            onChange={() => handleCategoryToggle(cat.name)}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-[#00b4d8] checked:bg-[#00b4d8] transition-all"
                          />
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm group-hover:text-[#00b4d8] transition-colors flex-1">
                          {cat.name}{" "}
                          <span className="text-[#00b4d8] font-medium">
                            ({cat.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Jobs By Location */}
              <div className="bg-white rounded overflow-hidden shadow-sm">
                <div className="bg-[#00b4d8] px-6 py-4">
                  <h3 className="text-white font-bold text-lg">
                    Jobs by Location
                  </h3>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location.name)}
                            onChange={() => handleLocationToggle(location.name)}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-[#00b4d8] checked:bg-[#00b4d8] transition-all"
                          />
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm group-hover:text-[#00b4d8] transition-colors flex-1">
                          {location.name}{" "}
                          <span className="text-[#00b4d8] font-medium">
                            ({location.count})
                          </span>
                        </span>
                      </label>
                    ))}
                    <button className="text-[#00b4d8] text-sm font-medium hover:underline mt-2">
                      View More
                    </button>
                  </div>
                </div>
              </div>

              {/* Jobs by Types */}
              <div className="bg-white rounded overflow-hidden shadow-sm">
                <div className="bg-[#00b4d8] px-6 py-4">
                  <h3 className="text-white font-bold text-lg">
                    Jobs by Types
                  </h3>
                </div>
                <div className="p-6 bg-gray-50">
                  <div className="space-y-4">
                    {jobTypes.map((type, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type.name)}
                            onChange={() => handleTypeToggle(type.name)}
                            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-[#00b4d8] checked:bg-[#00b4d8] transition-all"
                          />
                          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </div>
                        <span className="text-gray-700 text-sm group-hover:text-[#00b4d8] transition-colors flex-1">
                          {type.name}{" "}
                          <span className="text-[#00b4d8] font-medium">
                            ({type.count})
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content: Company Details */}
            <div className="flex-1 order-1 lg:order-2">
              {/* Company Header Card */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Logo */}
                  <div className="w-32 h-32 border border-gray-200 flex items-center justify-center p-2 bg-white flex-shrink-0">
                    {employer.logo ? (
                      <img
                        src={employer.logo}
                        alt={`${employer.companyName} Logo`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-100 flex items-center justify-center rounded">
                        <span className="text-4xl font-bold text-blue-600">
                          {employer.companyName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {employer.companyName}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3">
                      {employer.industry}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                      <MapPin className="w-4 h-4 text-[#ff6b6b]" />
                      <span>{employer.location}</span>
                    </div>

                    {/* Share & Socials */}
                    <div className="border-t border-gray-100 pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-bold text-gray-900 uppercase text-xs">
                          SHARE:
                        </span>
                        <div className="flex gap-3">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Facebook className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Twitter className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-blue-700 transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                        {employer.website && (
                          <div className="flex items-center gap-3">
                            <Link2 className="w-4 h-4 text-[#00b4d8]" />
                            <a
                              href={employer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-[#00b4d8] transition-colors"
                            >
                              {employer.website.replace(/^https?:\/\//, "")}
                            </a>
                          </div>
                        )}
                        {employer.email && (
                          <div className="flex items-center gap-3">
                            <span className="text-[#00b4d8]">✉</span>
                            <span className="text-gray-600">
                              {employer.email}
                            </span>
                          </div>
                        )}
                        {employer.contactPhone && (
                          <div className="flex items-center gap-3">
                            <span className="text-[#00b4d8]">📞</span>
                            <span className="text-gray-600">
                              {employer.contactPhone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About {employer.companyName}
                </h3>
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
                  {employer.description || "No description available."}
                </div>
              </div>

              {/* Company Jobs */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Open Positions
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job: any) => (
                      <JobCard
                        key={job._id || job.id}
                        job={
                          {
                            ...job,
                            id: job.id || job._id || "",
                            employerId: job.employerId || "",
                            company: job.company || "",
                            location: job.location || "Remote",
                            type: job.jobType || job.type || "Full-time",
                            typeBg: job.typeBg || "bg-blue-100 text-blue-600",
                            salary: job.salary || "Negotiable",
                            logo: job.logo || "",
                            logoBg: job.logoBg || "bg-gray-100",
                            tags: job.tags || [],
                            responsibilities:
                              typeof job.responsibilities === "string"
                                ? job.responsibilities
                                    .split(",")
                                    .map((r: string) => r.trim())
                                : job.responsibilities || [],
                            requirements:
                              typeof job.requirements === "string"
                                ? job.requirements
                                    .split(",")
                                    .map((r: string) => r.trim())
                                : job.requirements || [],
                          } as any
                        }
                      />
                    ))
                  ) : (
                    <div className="bg-white p-6 rounded border border-gray-100 text-center text-gray-500">
                      No open positions found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
