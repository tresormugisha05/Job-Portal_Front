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
    description: string;
    requirements: string[];
    postedDate: string;
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
        description: "Looking for an experienced health and food specialist to join our dynamic team.",
        requirements: ["5+ years experience", "Bachelor's degree in related field", "Strong communication skills"],
        postedDate: "2024-01-15"
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
        description: "Join our team as an iOS Developer and work on cutting-edge mobile applications.",
        requirements: ["Experience with iOS development", "Git proficiency", "API integration experience"],
        postedDate: "2024-01-20"
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
        description: "Healthcare support specialist needed for our growing medical practice.",
        requirements: ["Medical knowledge", "Patient care experience", "Communication skills"],
        postedDate: "2024-01-24"
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
        description: "Creative marketing specialist needed for our growing social media presence.",
        requirements: ["Social media expertise", "Content creation skills", "Analytics knowledge"],
        postedDate: "2024-01-18"
    },
    {
        id: "5",
        employerId: "99", // LWPtech Inc.
        title: "Web Developer - PHP",
        company: "LWPtech Inc.",
        location: "Banaras 39 Pech Marg Sharti Delhi-110039",
        type: "FREELANCE",
        typeBg: "bg-gray-800",
        salary: "$15k - $20k",
        logo: "L",
        logoBg: "bg-blue-100 text-blue-600",
        tags: ["design", "developer", "it company"],
        description: "Legal counsel position for our corporate legal team.",
        requirements: ["Law degree", "Corporate experience", "Attention to detail"],
        postedDate: "2024-01-27"
    },
    {
        id: "6",
        employerId: "3", // Cameo Inc.
        title: "Marketing and Communications",
        company: "Camera Inc.",
        location: "Gali Nasser 10 Anand Nagar Delhi, 110039",
        type: "FREELANCE",
        typeBg: "bg-gray-800",
        salary: "$50k - $1,000",
        logo: "C",
        logoBg: "bg-red-100 text-red-600",
        tags: ["Engineering", "Software", "Development"],
        description: "Software engineer position available for our expanding tech team.",
        requirements: ["Programming experience", "Problem-solving skills", "Team collaboration"],
        postedDate: "2024-01-21"
    },
    {
        id: "7",
        employerId: "4", // Cortex Inc.
        title: "Group Marketing Manager",
        company: "Coriea Inc.",
        location: "1557 Taylor Farm Rd Virginia Beach Virginia",
        type: "FULL TIME",
        typeBg: "bg-yellow-500",
        salary: "$50k - $1,200",
        logo: "C",
        logoBg: "bg-purple-100 text-purple-600",
        tags: ["Technology", "Remote", "Full Stack"],
        description: "Looking for a talented full-stack developer to join our remote team.",
        requirements: ["3+ years experience", "Node.js and React", "Strong problem-solving skills"],
        postedDate: "2024-01-22"
    },
    {
        id: "8",
        employerId: "9", // Webzard Inc.
        title: "UX/UI Designer (1 - 2 Yrs Exp.)",
        company: "Webstrot Inc.",
        location: "906-152 Flatbush St, Brooklyn NY 11003",
        type: "TEMPORARY",
        typeBg: "bg-teal-500",
        salary: "$30k - $35k/A",
        logo: "W",
        logoBg: "bg-green-100 text-green-600",
        tags: ["Design", "UI/UX", "Creative"],
        description: "We're looking for a creative designer to help shape our user experience.",
        requirements: ["Portfolio of design work", "Figma proficiency", "Understanding of UX principles"],
        postedDate: "2024-01-25"
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
        description: "Join our team as a JavaScript developer and work on exciting web projects.",
        requirements: ["JavaScript experience", "Web development knowledge", "Problem-solving skills"],
        postedDate: "2024-01-25"
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
        description: "Protection consultant needed for our growing online presence.",
        requirements: ["Customer service experience", "Technical knowledge", "Communication skills"],
        postedDate: "2024-01-26"
    },
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
        description: "Join our team as a WordPress developer and work on exciting web projects.",
        requirements: ["WordPress experience", "PHP knowledge", "Problem-solving skills"],
        postedDate: "2024-01-20"
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
        tags: ["Sales", "Business", "Communication"],
        description: "Sales professional needed to drive our business growth and client relationships.",
        requirements: ["Sales experience", "Excellent communication", "Customer service skills"],
        postedDate: "2024-01-23"
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
        description: "Technical support engineer for our growing customer base.",
        requirements: ["Technical knowledge", "Customer service experience", "Problem-solving skills"],
        postedDate: "2024-01-30",
    }
];
