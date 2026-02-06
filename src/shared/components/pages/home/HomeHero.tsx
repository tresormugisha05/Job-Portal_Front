import { Search, MapPin, Briefcase } from "lucide-react";
import HomeCategories from "./HomeCategories";

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] bg-[#0b1f33] text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0b1f33]/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-16">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-light leading-tight mb-4">
          <span className="text-[#00b4d8] font-bold">3,000+</span> Browse Jobs
        </h1>
        <p className="text-gray-300 text-lg mb-10">
          Find Jobs, Employment & Career Opportunities
        </p>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                placeholder="What are you looking for?"
                className="w-full pl-10 pr-4 py-3 rounded text-gray-900 focus:bg-white transition-colors"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select className="w-full pl-10 pr-4 py-3 rounded text-gray-900 focus:bg-white transition-colors">
                <option>All Regions</option>
                <option>Kigali</option>
                <option>Musanze</option>
              </select>
            </div>

            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select className="w-full pl-10 pr-4 py-3 rounded text-gray-900 focus:bg-white transition-colors">
                <option>Choose a category</option>
                <option>Technology</option>
                <option>Accounting</option>
                <option>Medical</option>
              </select>
            </div>

            <button className="bg-[#00b4d8] hover:bg-[#009dc4] font-semibold rounded text-white">
              SEARCH
            </button>
          </div>
        </div>

        {/* Trending keywords */}
        <p className="mt-6 text-sm text-gray-300">
          <span className="text-[#00b4d8] font-semibold">Trending Keywords:</span>{" "}
          Developer, Design, IT Company, Media, Jobs, Medical
        </p>

        {/* Categories */}
        <HomeCategories />
      </div>
    </section>
  );
}
