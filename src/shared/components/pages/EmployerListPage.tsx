import PageWrapper from "../layouts/PageWrapper";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { employers } from "../../data/employers";
import Loader from "../ui/Loader";
import usePageLoader from "../../hooks/usePageLoader";

export default function EmployerListPage() {
    const isLoading = usePageLoader(1000);
    
    if (isLoading) {
        return <Loader />;
    }
    
    // Group companies by first letter
    const companyGroups = employers.reduce((groups, company) => {
        const letter = company.name.charAt(0).toUpperCase();
        if (!groups[letter]) {
            groups[letter] = [];
        }
        groups[letter].push(company);
        return groups;
    }, {} as Record<string, typeof employers>);

    // Sort letters
    const sortedLetters = Object.keys(companyGroups).sort();

    const categories = [
        { name: "Accounting", count: 1 },
        { name: "Developer", count: 7 },
        { name: "Educations", count: 0 },
        { name: "Government", count: 0 },
        { name: "Media & News", count: 4 },
        { name: "Medical", count: 2 },
        { name: "Restaurants", count: 2 },
        { name: "Technology", count: 3 },
    ];

    const locations = [
        { name: "Delhi", count: 6 },
        { name: "Gurgaon", count: 0 },
        { name: "Hawaii", count: 3 },
        { name: "Hyderabad", count: 0 },
        { name: "Kolkata", count: 0 },
        { name: "New York", count: 5 },
        { name: "Ohio", count: 2 },
        { name: "Virginia", count: 2 },
    ];

    const jobTypes = [
        { name: "Freelance", count: 9 },
        { name: "Full Time", count: 3 },
        { name: "Internship", count: 2 },
        { name: "Part Time", count: 3 },
        { name: "Temporary", count: 2 },
    ];

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
                    <h1 className="text-5xl font-bold text-white mb-6">List Company</h1>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="hover:text-white cursor-pointer transition-colors">
                            Home
                        </span>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-[#00b4d8]">List Company</span>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Content: Company List */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                {sortedLetters.map((letter) => (
                                    <div key={letter}>
                                        <h2 className="text-3xl font-bold text-[#00b4d8] mb-6">
                                            {letter}
                                        </h2>

                                        <ul className="space-y-4">
                                            {companyGroups[letter].map((company) => (
                                                <li
                                                    key={company.id}
                                                    className="flex items-center gap-3 group cursor-pointer"
                                                >
                                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-orange-500 border-b-[6px] border-b-transparent flex-shrink-0"></div>
                                                    <Link to={`/employers/${company.id}`} className="text-gray-700 font-medium group-hover:text-[#00b4d8] transition-colors text-base">
                                                        {company.name} ({company.openings})
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
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
