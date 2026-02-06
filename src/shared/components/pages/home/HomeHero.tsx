import { Search, MapPin, Briefcase } from "lucide-react";

export default function HomeHero() {
    return (
        <section className="relative bg-[#0b2c3d] text-white py-20 lg:py-32 overflow-hidden">
            {/* Background Overlay or Image Placeholder */}
            <div className="absolute inset-0 bg-[#0b2c3d]/90 z-0"></div>

            {/* Decorative Circles (optional to match "modern" feel) */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00b4d8] rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff6b6b] rounded-full blur-3xl opacity-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Let's Start Your Job <br />
                            With <span className="text-[#00b4d8]">Job Stock Team</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-lg">
                            Find Jobs, Employment & Career Opportunities. The most complete job portal to start your career.
                        </p>
                        <button className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-8 py-3 rounded font-semibold transition-colors">
                            Upload Resume
                        </button>
                    </div>

                    {/* Right Content - Search Form Mockup */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
                        <h3 className="text-xl font-semibold mb-4">Find Your Area</h3>
                        <form className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Job Title, Keywords..."
                                    className="w-full pl-10 pr-4 py-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="City, State, Zip"
                                    className="w-full pl-10 pr-4 py-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00b4d8]"
                                />
                            </div>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <select className="w-full pl-10 pr-4 py-3 rounded bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00b4d8] appearance-none">
                                    <option>Select Category</option>
                                    <option>Development</option>
                                    <option>Marketing</option>
                                    <option>Design</option>
                                </select>
                            </div>
                            <button type="button" className="w-full bg-[#00b4d8] hover:bg-[#009dc4] text-white font-bold py-3 rounded transition-colors">
                                Search Job
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
