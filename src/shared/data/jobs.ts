export interface Job {
    id: string;
    employerId: string;
    title: string;
    company: string;
    location: string;
    type: string;
    typeBg: string;
    salary: string;
    logo: string;
    logoBg: string;
    tags: string[];
}

export const jobs: Job[] = [
    {
        id: "1",
        employerId: "8", // Pay Walt
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
        id: "2",
        employerId: "2", // Apus Inc.
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
        id: "3",
        employerId: "5", // Envato Inc.
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
        id: "4",
        employerId: "7", // FShop Inc.
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
        id: "5",
        employerId: "99", // LWPtech Inc. (Not in mock employers list)
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
        id: "6",
        employerId: "3", // Cameo Inc. (Assuming Camera Inc? or distinct? employer list has Camera Inc (3). Cameo Inc is likely distinct or typo. Let's map to Camera Inc for demo)
        title: "Marketing and Communications",
        company: "Camera Inc.",
        location: "Gali Nasser 10 Anand Nagar Delhi, 110039",
        type: "FREELANCE",
        typeBg: "bg-gray-800",
        salary: "$50k - $1,000",
        logo: "C",
        logoBg: "bg-red-100 text-red-600",
        tags: ["call center", "design", "developer"],
    },
    {
        id: "7",
        employerId: "4", // Cortex Inc. (Assuming Coriea Inc? Mapping to Coriea for demo)
        title: "Group Marketing Manager",
        company: "Coriea Inc.",
        location: "1557 Taylor Farm Rd Virginia Beach Virginia",
        type: "FULL TIME",
        typeBg: "bg-yellow-500",
        salary: "$50k - $1,200",
        logo: "C",
        logoBg: "bg-purple-100 text-purple-600",
        tags: ["design", "developer", "it company"],
    },
    {
        id: "8",
        employerId: "9", // Webzard Inc. (Mapping to Webstrot Inc (9) for demo or distinct?)
        title: "UX/UI Designer (1 - 2 Yrs Exp.)",
        company: "Webstrot Inc.",
        location: "906-152 Flatbush St, Brooklyn NY 11003",
        logo: "W",
        logoBg: "bg-green-100 text-green-600",
        type: "TEMPORARY",
        typeBg: "bg-teal-500",
        salary: "$30k - $35k/A",
        tags: ["design", "developer", "it company"],
    },
    {
        id: "9",
        employerId: "5", // Envato Inc.
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
        id: "10",
        employerId: "7", // FShop Inc.
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
    // Adding more jobs for Akshay INC (1) since it's the first one usually clicked
    {
        id: "11",
        employerId: "1", // Akshay INC.
        title: "Wordpress Developer",
        company: "Akshay INC.",
        location: "12 Lane No 5 Jain Nagar Delhi, 110039",
        type: "FULL TIME",
        typeBg: "bg-yellow-500",
        salary: "$40k - $50k",
        logo: "A",
        logoBg: "bg-blue-100 text-blue-600",
        tags: ["developer", "wordpress", "php"],
    },
    {
        id: "12",
        employerId: "1", // Akshay INC.
        title: "Senior Plugin Developer",
        company: "Akshay INC.",
        location: "Remote",
        type: "PART TIME",
        typeBg: "bg-blue-500",
        salary: "$30k - $40k",
        logo: "A",
        logoBg: "bg-blue-100 text-blue-600",
        tags: ["developer", "plugin", "react"],
    },
    {
        id: "13",
        employerId: "1", // Akshay INC.
        title: "Support Engineer",
        company: "Akshay INC.",
        location: "Delhi, India",
        type: "FULL TIME",
        typeBg: "bg-yellow-500",
        salary: "$20k - $30k",
        logo: "A",
        logoBg: "bg-blue-100 text-blue-600",
        tags: ["support", "technical"],
    }
];
