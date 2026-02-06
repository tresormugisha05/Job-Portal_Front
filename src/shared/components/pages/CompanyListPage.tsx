import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../layouts/PageWrapper";
import { Search, MapPin, Briefcase, Users, ArrowRight } from "lucide-react";

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  employees: string;
  description: string;
  image: string;
  openJobs: number;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    industry: "Technology",
    location: "San Francisco, CA",
    employees: "500-1000",
    description: "Leading software development and IT solutions provider.",
    image: "/assets/company1.jpg",
    openJobs: 15,
  },
  {
    id: 2,
    name: "Global Marketing Group",
    industry: "Marketing",
    location: "New York, NY",
    employees: "200-500",
    description: "Creative marketing and digital advertising agency.",
    image: "/assets/company2.jpg",
    openJobs: 8,
  },
  {
    id: 3,
    name: "Finance Capital Partners",
    industry: "Finance",
    location: "London, UK",
    employees: "1000+",
    description: "Investment banking and financial advisory services.",
    image: "/assets/company3.jpg",
    openJobs: 12,
  },
  {
    id: 4,
    name: "Healthcare Innovations Ltd",
    industry: "Healthcare",
    location: "Boston, MA",
    employees: "300-500",
    description: "Medical research and healthcare technology company.",
    image: "/assets/company4.jpg",
    openJobs: 10,
  },
  {
    id: 5,
    name: "EcoGreen Energy",
    industry: "Energy",
    location: "Denver, CO",
    employees: "100-200",
    description: "Renewable energy solutions and sustainability consulting.",
    image: "/assets/company5.jpg",
    openJobs: 6,
  },
  {
    id: 6,
    name: "Creative Design Studio",
    industry: "Design",
    location: "Los Angeles, CA",
    employees: "50-100",
    description: "Brand design and user experience innovation.",
    image: "/assets/company6.jpg",
    openJobs: 5,
  },
  {
    id: 7,
    name: "Retail Dynamics Co",
    industry: "Retail",
    location: "Chicago, IL",
    employees: "500-1000",
    description: "E-commerce and retail management solutions.",
    image: "/assets/company7.jpg",
    openJobs: 20,
  },
  {
    id: 8,
    name: "Education Plus",
    industry: "Education",
    location: "Seattle, WA",
    employees: "200-500",
    description: "Online education platform and learning management systems.",
    image: "/assets/company8.jpg",
    openJobs: 9,
  },
];

const industries = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Energy",
  "Design",
  "Retail",
  "Education",
];

export default function CompanyListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry =
        !selectedIndustry || company.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [searchTerm, selectedIndustry]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const startIndex = (currentPage - 1) * companiesPerPage;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + companiesPerPage,
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-teal-50">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-teal-900 py-24 md:py-32 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="max-w-7xl mx-auto px-5 relative z-10">
            <nav className="flex items-center gap-2.5 text-sm text-white/70 mb-5">
              <a href="/" className="hover:text-teal-400 transition-colors">
                Home
              </a>
              <span>›</span>
              <span className="text-teal-400">Companies</span>
            </nav>

            <h1
              className="font-serif text-5xl md:text-7xl font-bold text-white m-0 tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              List Companies
            </h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Explore top companies hiring for amazing opportunities.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-5">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search by company name or location..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full py-3 px-4 pl-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>

              {/* Industry Filter */}
              <select
                value={selectedIndustry || ""}
                onChange={(e) => {
                  setSelectedIndustry(e.target.value || null);
                  setCurrentPage(1);
                }}
                className="py-3 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-teal-600 bg-white"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedCompanies.length > 0 ? (
                paginatedCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-48 bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center overflow-hidden">
                      <Briefcase size={64} className="text-white/30" />
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">
                        {company.name}
                      </h3>
                      <p className="text-teal-600 font-semibold text-sm mb-3">
                        {company.industry}
                      </p>

                      <div className="space-y-2 text-slate-600 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          {company.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          {company.employees} employees
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} />
                          {company.openJobs} open positions
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {company.description}
                      </p>

                      <Link
                        to={`/companies/${company.id}`}
                        className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                      >
                        View Details
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-600 text-lg">
                    No companies found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : "bg-white text-slate-900 border-2 border-slate-200 hover:border-teal-600"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
