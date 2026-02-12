import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getAllEmployers,
  type EmployerData,
} from "../../../services/employerService";
import { getAllJobs, type JobData } from "../../../services/jobService";

interface CompanyWithOpenings extends EmployerData {
  openings: number;
  logo: string;
  logoBg: string;
}

export default function HomeCompanies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [companies, setCompanies] = useState<CompanyWithOpenings[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch employers and count their jobs
  useEffect(() => {
    const fetchCompaniesData = async () => {
      try {
        const employers = await getAllEmployers();
        const jobs = await getAllJobs();

        if (employers && employers.length > 0) {
          // Filter only verified employers and count their active jobs
          const companiesWithOpenings: CompanyWithOpenings[] = employers
            .filter((emp) => emp.isVerified === true) // Only show verified employers
            .map((emp) => {
              // Count active jobs for this employer
              const employerJobs = jobs.filter(
                (job) =>
                  job.employerId === (emp._id || emp.id) &&
                  job.isActive !== false,
              );
              const openings = employerJobs.length;

              // Get first letter of company name for logo
              const companyName = emp.companyName || "Unknown";
              const logoText = companyName.charAt(0).toUpperCase();

              // Color backgrounds array
              const colorBgs = [
                "bg-blue-100 text-blue-600",
                "bg-green-100 text-green-600",
                "bg-purple-100 text-purple-600",
                "bg-red-100 text-red-600",
                "bg-orange-100 text-orange-600",
                "bg-pink-100 text-pink-600",
                "bg-indigo-100 text-indigo-600",
                "bg-cyan-100 text-cyan-600",
              ];

              const bgIndex = companyName.charCodeAt(0) % colorBgs.length;

              return {
                ...emp,
                openings,
                logo: logoText,
                logoBg: colorBgs[bgIndex],
              };
            });

          setCompanies(companiesWithOpenings);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesData();
  }, []);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) setVisibleCount(4);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = companies.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 bg-[#2c3e50] relative overflow-hidden">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wide">
              TOP HIRING COMPANIES
            </h2>
            <div className="w-12 h-1 bg-[#00b4d8] mt-3 rounded-full"></div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className={`flex-shrink-0 bg-white rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#00b4d8]/30`}
                style={{
                  width: `calc(${100 / visibleCount}% - ${(6 * (visibleCount - 1)) / visibleCount}px)`,
                }}
              >
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${company.logoBg} flex items-center justify-center text-2xl font-bold shadow-sm`}
                  >
                    {company.logo}
                  </div>
                </div>

                {/* Company Info */}
                <h3 className="text-base font-semibold text-gray-900 mb-1 truncate">
                  {company.companyName || "Unknown Company"}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{company.location}</p>

                {/* Openings Button */}
                <button className="w-full bg-[#2c3e50] text-white text-[10px] px-4 py-2 rounded font-bold hover:bg-[#34495e] transition-colors uppercase tracking-wider">
                  {company.openings} OPENING{company.openings > 1 ? "S" : ""}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === i
                  ? "bg-[#00b4d8] w-4"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
