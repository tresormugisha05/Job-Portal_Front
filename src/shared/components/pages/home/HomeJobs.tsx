import { MapPin, Heart, Tag, DollarSign } from "lucide-react";

export default function HomeJobs() {
  const jobs = [
    {
      title: "Senior Health and Food",
      company: "Pay Walt",
      location: "Grand Central Pkwy Flushing NY 11005 USA",
      type: "FREELANCE",
      typeBg: "bg-gray-800",
      salary: "$30k - $35k",
      logo: "P",
      logoBg: "bg-green-100 text-green-600",
      tags: ["Media", "Medical", "Restaurants"],
    },
    {
      title: "iOS Developer - iOS, Git, API",
      company: "Apus Inc.",
      location: "1800-1750 Apcco Pl Hilo, HI 96720",
      type: "INTERNSHIP",
      typeBg: "bg-green-500",
      salary: "$25k - $35k",
      logo: "A",
      logoBg: "bg-green-100 text-green-600",
      tags: ["developer", "it company", "jobs"],
    },
    {
      title: "Front-End Web Developer",
      company: "Envato Inc.",
      location: "Old Commerce Rd Russas Rd Russas Rd 95720 Hawaii",
      type: "FREELANCE",
      typeBg: "bg-gray-800",
      salary: "$15k - $20k",
      logo: "E",
      logoBg: "bg-orange-100 text-orange-600",
      tags: ["developer", "it company", "jobs"],
    },
    {
      title: "Designer Medical Logo",
      company: "FShop Inc.",
      location: "Banaras 39 Sector 36 Rohini Delhi, 110039",
      type: "PART TIME",
      typeBg: "bg-blue-500",
      salary: "$40k - $52,000",
      logo: "F",
      logoBg: "bg-purple-100 text-purple-600",
      tags: ["design", "Medical", "Restaurants"],
    },
    {
      title: "Web Developer - PHP",
      company: "LWPtech Inc.",
      location: "Banaras 39 Pech Marg Sharti Delhi-110039",
      type: "FREELANCE",
      typeBg: "bg-gray-800",
      salary: "$15k - $20k",
      logo: "L",
      logoBg: "bg-blue-100 text-blue-600",
      tags: ["design", "developer", "it company"],
    },
    {
      title: "Marketing and Communications",
      company: "Cameo Inc.",
      location: "Gali Nasser 10 Anand Nagar Delhi, 110039",
      type: "FREELANCE",
      typeBg: "bg-gray-800",
      salary: "$50k - $1,000",
      logo: "C",
      logoBg: "bg-red-100 text-red-600",
      tags: ["call center", "design", "developer"],
    },
    {
      title: "Group Marketing Manager",
      company: "Cortex Inc.",
      location: "1557 Taylor Farm Rd Virginia Beach Virginia",
      type: "FULL TIME",
      typeBg: "bg-yellow-500",
      salary: "$50k - $1,200",
      logo: "C",
      logoBg: "bg-purple-100 text-purple-600",
      tags: ["design", "developer", "it company"],
    },
    {
      title: "UX/UI Designer (1 - 2 Yrs Exp.)",
      company: "Webzard Inc.",
      location: "906-152 Flatbush St, Brooklyn NY 11003",
      logo: "W",
      logoBg: "bg-green-100 text-green-600",
      type: "TEMPORARY",
      typeBg: "bg-teal-500",
      salary: "$30k - $35k/A",
      tags: ["design", "developer", "it company"],
    },
    {
      title: "JavaScript Developer Webiste",
      company: "Envato Inc.",
      location: "57 Chestnut Ave, Floral Park NY 11003 New York",
      type: "PART TIME",
      typeBg: "bg-blue-500",
      salary: "$700 - $800",
      logo: "E",
      logoBg: "bg-orange-100 text-orange-600",
      tags: ["design", "developer", "it company"],
    },
    {
      title: "Protection Consultant - Website",
      company: "FShop Inc.",
      location: "89-92 220th St Jamaica, NY 11427 USA",
      type: "FREELANCE",
      typeBg: "bg-gray-800",
      salary: "$20k - $25k/A",
      logo: "F",
      logoBg: "bg-purple-100 text-purple-600",
      tags: ["call center", "design", "developer"],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
              RECENT JOBS
            </h2>
            <div className="w-12 h-1 bg-[#00b4d8] mt-3 rounded-full"></div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            <button className="px-5 py-2 bg-[#00b4d8] text-white rounded text-sm font-medium">
              FEATURED
            </button>
            <button className="px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50">
              RECENT JOBS
            </button>
            <button className="px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50">
              FULL TIME
            </button>
            <button className="px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded text-sm font-medium hover:bg-gray-50">
              PART TIME
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div
                    className={`w-14 h-14 rounded-lg ${job.logoBg} flex items-center justify-center text-xl font-bold flex-shrink-0`}
                  >
                    {job.logo}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {job.title}
                        </h3>
                        <p className="text-xs text-blue-600 mt-1">
                          {job.company}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <DollarSign className="w-3 h-3" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{job.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`${job.typeBg} text-white text-xs px-3 py-1 rounded font-medium uppercase`}
                      >
                        {job.type}
                      </span>
                      <button className="bg-red-400 hover:bg-red-500 text-white text-xs px-4 py-1 rounded font-medium transition-colors uppercase">
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags Bar */}
              <div className="bg-[#00b4d8] px-6 py-2.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Tag className="w-3.5 h-3.5 text-white" />
                <div className="flex flex-wrap gap-1 text-xs text-white">
                  <span className="font-medium">Tagged as:</span>
                  {job.tags.map((tag, i) => (
                    <span key={i}>
                      {tag}
                      {i < job.tags.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
