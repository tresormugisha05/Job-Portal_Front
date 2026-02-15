import { useState, useEffect } from "react";
import PageWrapper from "../layouts/PageWrapper";
import PageHeader from "../ui/PageHeader";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader";
import { getAllEmployers, type EmployerData } from "../../services/employerService";
import { getAllJobs } from "../../services/jobService";

export default function EmployerListPage() {
    const [employers, setEmployers] = useState<EmployerData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
    const [locations, setLocations] = useState<{ name: string; count: number }[]>([]);
    const [jobTypes, setJobTypes] = useState<{ name: string; count: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [employersData, jobsData] = await Promise.all([
                    getAllEmployers(),
                    getAllJobs()
                ]);

                // Count jobs for each employer
                const employersWithJobCount = employersData.map(employer => ({
                    ...employer,
                    jobCount: jobsData.filter(job => {
                        const jobEmployerId = typeof job.employerId === 'object' && job.employerId !== null
                            ? (job.employerId as any)._id || (job.employerId as any).id
                            : job.employerId;
                        return jobEmployerId === (employer._id || employer.id);
                    }).length
                }));

                setEmployers(employersWithJobCount);

                // Calculate dynamic stats from jobsData
                const categoryMap = new Map<string, number>();
                const locationMap = new Map<string, number>();
                const typeMap = new Map<string, number>();

                jobsData.forEach(job => {
                    // Categories
                    const cat = job.category || "Other";
                    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);

                    // Locations
                    if (job.location) {
                        const loc = job.location.split(',').pop()?.trim() || job.location;
                        locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
                    }

                    // Job Types
                    const type = job.jobType || job.type || "Other";
                    typeMap.set(type, (typeMap.get(type) || 0) + 1);
                });

                setCategories(Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8));
                setLocations(Array.from(locationMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8));
                setJobTypes(Array.from(typeMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));

            } catch (error) {
                console.error("Error fetching employers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    // Group companies by first letter
    const companyGroups = employers.reduce((groups, company) => {
        const letter = company.companyName.charAt(0).toUpperCase();
        if (!groups[letter]) {
            groups[letter] = [];
        }
        groups[letter].push(company);
        return groups;
    }, {} as Record<string, typeof employers>);

    // Sort letters
    const sortedLetters = Object.keys(companyGroups).sort();

    return (
        <PageWrapper disableTopPadding={true}>
            <PageHeader title="List Company" breadcrumb="List Company" />

            {/* Main Content */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Content: Company List */}
                        <div className="flex-1">
                            {employers.length === 0 ? (
                                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                    <p className="text-gray-500">No employers found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                    {sortedLetters.map((letter) => (
                                        <div key={letter}>
                                            <h2 className="text-3xl font-bold text-[#00b4d8] mb-6">
                                                {letter}
                                            </h2>

                                            <ul className="space-y-4">
                                                {companyGroups[letter].map((company) => (
                                                    <li
                                                        key={company._id || company.id}
                                                        className="flex items-center gap-3 group cursor-pointer"
                                                    >
                                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-orange-500 border-b-[6px] border-b-transparent flex-shrink-0"></div>
                                                        <Link to={`/employers/${company._id || company.id}`} className="text-gray-700 font-medium group-hover:text-[#00b4d8] transition-colors text-base">
                                                            {company.companyName} ({company.jobCount || 0})
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar */}
                        <div className="w-full lg:w-80 space-y-6">
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
                    </div>
                </div>
            </section>
        </PageWrapper>
    );
}
