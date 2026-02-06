import { Briefcase, Plus } from "lucide-react";

export default function HomeResumes() {
  const resumes = [
    {
      name: "Jhon Doe",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    },
    {
      name: "Doe Akshay",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    },
    {
      name: "Devel Name",
      role: "UI Designer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    },
    {
      name: "Akshay Handge",
      role: "Developer",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
            RECENT RESUMES
          </h2>
          <div className="w-12 h-0.5 bg-[#00b4d8] mx-auto mt-4"></div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          {resumes.map((resume, index) => (
            <div
              key={index}
              className="bg-white p-8 border border-gray-200 flex items-center justify-between hover:shadow-lg transition-shadow relative"
            >
              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00b4d8]"></div>

              <div className="flex items-center gap-4">
                <img
                  src={resume.image}
                  alt={resume.name}
                  className="w-16 h-16 rounded-sm object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {resume.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Briefcase className="w-3.5 h-3.5 text-[#ff6b6b]" />
                    <span className="text-gray-500">{resume.role}</span>
                  </div>
                </div>
              </div>

              <button className="bg-[#0a0e27] hover:bg-black text-white text-xs px-5 py-2.5 rounded uppercase tracking-wider font-medium transition-colors">
                VIEW PROFILE
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-[#00b4d8] hover:bg-[#009bc2] text-white px-10 py-3 rounded text-sm font-semibold uppercase tracking-wide transition-colors inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            VIEW ALL
          </button>
        </div>
      </div>
    </section>
  );
}
