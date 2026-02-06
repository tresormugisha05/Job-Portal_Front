import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HomeCompanies() {
    const companies = [
        {
            name: "AbcPay INC.",
            location: "(New York)",
            openings: 3,
            logo: "W",
            logoBg: "bg-blue-100 text-blue-600",
        },
        {
            name: "Apus Inc.",
            location: "(India)",
            openings: 2,
            logo: "A",
            logoBg: "bg-green-100 text-green-600",
        },
        {
            name: "FShop Inc.",
            location: "(New York)",
            openings: 2,
            logo: "F",
            logoBg: "bg-purple-100 text-purple-600",
        },
        {
            name: "Cortex Inc.",
            location: "(New York)",
            openings: 2,
            logo: "B",
            logoBg: "bg-purple-100 text-purple-600",
        },
        {
            name: "Pay Walt",
            location: "(India)",
            openings: 2,
            logo: "P",
            logoBg: "bg-green-100 text-green-600",
        },
        {
            name: "AbcPay INC.",
            location: "(California)",
            openings: 5,
            logo: "M",
            logoBg: "bg-orange-100 text-orange-600",
        },
        {
            name: "LWPtech Inc.",
            location: "(California)",
            openings: 3,
            logo: "L",
            logoBg: "bg-blue-100 text-blue-600",
        },
        {
            name: "Cameo Inc.",
            location: "(New York)",
            openings: 4,
            logo: "C",
            logoBg: "bg-red-100 text-red-600",
        },
    ];

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
                        <button className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Companies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-shadow"
                        >
                            {/* Logo */}
                            <div className="flex justify-center mb-4">
                                <div
                                    className={`w-16 h-16 rounded-full ${company.logoBg} flex items-center justify-center text-2xl font-bold`}
                                >
                                    {company.logo}
                                </div>
                            </div>

                            {/* Company Info */}
                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                {company.name}
                            </h3>
                            <p className="text-xs text-gray-500 mb-4">{company.location}</p>

                            {/* Openings Button */}
                            <button className="bg-[#2c3e50] text-white text-xs px-4 py-2 rounded font-medium hover:bg-[#34495e] transition-colors uppercase">
                                {company.openings} OPENING{company.openings > 1 ? "S" : ""}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
