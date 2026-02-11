import { useState, useMemo, useEffect } from "react";
import PageWrapper from "../layouts/PageWrapper";
import PageHeader from "../ui/PageHeader";
import Loader from "../ui/Loader";
import usePageLoader from "../../hooks/usePageLoader";
import { CandidateService, type UserModel } from "../../services/Auth.Service";
import CandidateCard from "../ui/CandidateCard";

// Extract unique values for filters
const ITEMS_PER_PAGE = 5;

export default function CandidatesListPage() {
  const isLoading = usePageLoader(1000);
  const [candidates, setCandidates] = useState<UserModel[]>([]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<
    string[]
  >([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedEducation, setSelectedEducation] = useState<string[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await CandidateService.getAllUsers();
        const filteredData = data.filter((user) => user.role === "CANDIDATE");
        setCandidates(filteredData);
      } catch (err) {
        console.error("Failed to load candidates", err);
      }
    };
    fetchCandidates();
  }, []);

  const uniqueLocations = useMemo(
    () =>
      [...new Set(candidates.map((c) => c.location).filter(Boolean))].sort(),
    [candidates],
  );
  const uniqueSkills = useMemo(
    () => [...new Set(candidates.flatMap((c) => c.skills))].sort(),
    [candidates],
  );
  const uniqueEducation = useMemo(
    () =>
      [...new Set(candidates.map((c) => c.education).filter(Boolean))].sort(),
    [candidates],
  );

  // Filter Logic
  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      // Search (Name or Role)
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (candidate.professionalTitle &&
          candidate.professionalTitle
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      // Location
      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "All Locations" ||
        candidate.location === selectedLocation;

      // Experience Level - Map experience string to levels
      const getExperienceLevel = (exp: string) => {
        if (!exp) return "";
        const expLower = exp.toLowerCase();
        if (
          expLower.includes("entry") ||
          expLower.includes("junior") ||
          expLower.includes("1-2")
        )
          return "Entry Level";
        if (expLower.includes("mid") || expLower.includes("3-5"))
          return "Mid Level";
        if (
          expLower.includes("senior") ||
          expLower.includes("lead") ||
          expLower.includes("5+")
        )
          return "Senior Level";
        return "";
      };
      const candidateLevel = getExperienceLevel(candidate.experience || "");
      const matchesExperience =
        selectedExperienceLevels.length === 0 ||
        selectedExperienceLevels.includes(candidateLevel);

      // Skills - Check if candidate has ANY of the selected skills
      const matchesSkills =
        selectedSkills.length === 0 ||
        candidate.skills.some((skill) => selectedSkills.includes(skill));

      // Education
      const matchesEducation =
        selectedEducation.length === 0 ||
        selectedEducation.includes(candidate.education || "");

      return (
        matchesSearch &&
        matchesLocation &&
        matchesExperience &&
        matchesSkills &&
        matchesEducation
      );
    });
  }, [
    searchQuery,
    selectedLocation,
    selectedExperienceLevels,
    selectedSkills,
    selectedEducation,
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
  const paginatedCandidates = filteredCandidates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCheckboxChange = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedExperienceLevels([]);
    setSelectedSkills([]);
    setSelectedEducation([]);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper disableTopPadding={true}>
      <PageHeader title="Browse Candidates" breadcrumb="Browse Candidates" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Filter Candidates
              </h3>

              {/* Keywords */}
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
                  placeholder="Name, job title..."
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
                    <option key={idx} value={loc || ""}>
                      {loc || "Unknown"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                </label>
                <div className="space-y-2">
                  {["Entry Level", "Mid Level", "Senior Level"].map((level) => (
                    <label
                      key={level}
                      className="flex items-center text-gray-600 hover:text-[#00b4d8] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedExperienceLevels.includes(level)}
                        onChange={() =>
                          handleCheckboxChange(
                            level,
                            setSelectedExperienceLevels,
                          )
                        }
                        className="mr-2 rounded border-gray-300 text-[#00b4d8] focus:ring-[#00b4d8]"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                  {uniqueSkills.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center text-gray-600 hover:text-[#00b4d8] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() =>
                          handleCheckboxChange(skill, setSelectedSkills)
                        }
                        className="mr-2 rounded border-gray-300 text-[#00b4d8] focus:ring-[#00b4d8]"
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <div className="space-y-2">
                  {uniqueEducation.map((edu) => (
                    <label
                      key={edu}
                      className="flex items-center text-gray-600 hover:text-[#00b4d8] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEducation.includes(edu || "")}
                        onChange={() =>
                          handleCheckboxChange(edu || "", setSelectedEducation)
                        }
                        className="mr-2 rounded border-gray-300 text-[#00b4d8] focus:ring-[#00b4d8]"
                      />
                      <span>{edu || "Unknown"}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Candidate Listings */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow mb-6 p-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 mb-2 sm:mb-0">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredCandidates.length > 0
                      ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                      : 0}
                    -
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredCandidates.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredCandidates.length}
                  </span>{" "}
                  candidates
                </p>
                <select className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#00b4d8] transition-colors">
                  <option>Sort by: Latest</option>
                  <option>Sort by: Most Experienced</option>
                  <option>Sort by: Most Skills</option>
                </select>
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {paginatedCandidates.length > 0 ? (
                paginatedCandidates.map((candidate) => (
                  <CandidateCard key={candidate._id} candidate={candidate} />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                  <p className="text-lg">
                    No candidates found matching your criteria.
                  </p>
                  <button
                    onClick={clearAllFilters}
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
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded ${
                          currentPage === page
                            ? "bg-[#00b4d8] text-white border border-[#00b4d8]"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
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
