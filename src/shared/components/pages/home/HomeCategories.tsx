import { Code, Database, DollarSign, Calculator, Smartphone, Coffee, Utensils, GraduationCap } from "lucide-react";

export default function HomeCategories() {
    const categories = [
        { name: "Developer", jobs: "7 Jobs", icon: Code },
        { name: "Accounting", jobs: "1 Job", icon: Calculator },
        { name: "Technology", jobs: "3 Jobs", icon: Smartphone },
        { name: "Medical", jobs: "2 Jobs", icon: Coffee }, // Using Coffee as placeholder for Medical/Plus icon if not available
        { name: "Government", jobs: "0 Jobs", icon: Database },
        { name: "Media & News", jobs: "4 Jobs", icon: DollarSign }, // Using DollarSign as placeholder, maybe Newspaper is better
        { name: "Restaurants", jobs: "2 Jobs", icon: Utensils },
        { name: "Education", jobs: "0 Jobs", icon: GraduationCap },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
                        POPULAR CATEGORIES
                    </h2>
                    <div className="w-12 h-1 bg-[#00b4d8] mt-3 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <div key={index} className="bg-white p-8 rounded border border-gray-100 border-b-2 border-b-transparent hover:border-b-[#00b4d8] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center text-center group h-40">
                            <cat.icon className="w-8 h-8 text-[#00b4d8] mb-4 stroke-1" />
                            <h3 className="font-medium text-gray-900 mb-1">{cat.name}</h3>
                            <p className="text-xs text-gray-500">{cat.jobs}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
