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
    // New fields for detail page
    description?: string;
    responsibilities?: string[];
    requirements?: string[];
    postedDate?: string;
    experience?: string;
    education?: string;
    // New fields for filtering
    featured?: boolean;
    date?: string; // ISO Date YYYY-MM-DD
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
        description: "We are seeking an experienced Senior Health and Food Specialist to join our dynamic team. This role requires a passionate individual who can drive innovation in health and food safety standards.",
        responsibilities: [
            "Develop and implement health and safety protocols",
            "Conduct regular food safety audits",
            "Train staff on health and safety procedures",
            "Collaborate with regulatory agencies",
            "Monitor industry trends and best practices",
        ],
        requirements: [
            "Bachelor's degree in Food Science or related field",
            "5+ years of experience in health and food safety",
            "Certification in food safety (HACCP preferred)",
            "Strong analytical and problem-solving skills",
        ],
        postedDate: "2 days ago",
        experience: "5+ years",
        education: "Bachelor's Degree",
        featured: true,
        date: "2024-05-20"
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
        description: "We are looking for a talented iOS Developer to join our mobile team. You will be working on our flagship mobile application, ensuring a seamless user experience.",
        responsibilities: [
            "Design and build applications for the iOS platform",
            "Ensure the performance, quality, and responsiveness of applications",
            "Collaborate with a team to define, design, and ship new features",
            "Identify and correct bottlenecks and fix bugs",
        ],
        requirements: [
            "Proficient with Objective-C or Swift",
            "Experience with iOS frameworks such as Core Data, Core Animation, etc.",
            "Familiarity with RESTful APIs to connect iOS applications to back-end services",
            "Knowledge of other web technologies and UI/UX standards",
        ],
        postedDate: "1 week ago",
        experience: "1-3 years",
        education: "Bachelor's in CS",
        featured: false,
        date: "2024-05-15"
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
        description: "Envato is looking for a Front-End Web Developer to create amazing user experiences. You will work closely with our design team to translate designs into high-quality code.",
        responsibilities: [
            "Develop new user-facing features",
            "Build reusable code and libraries for future use",
            "Ensure the technical feasibility of UI/UX designs",
            "Optimize application for maximum speed and scalability",
        ],
        requirements: [
            "Proficient understanding of web markup, including HTML5, CSS3",
            "Basic understanding of server-side CSS pre-processing platforms, such as LESS and SASS",
            "Proficient understanding of client-side scripting and JavaScript frameworks",
            "Good understanding of SEO principles",
        ],
        postedDate: "3 days ago",
        experience: "2+ years",
        education: "Self-taught / Degree",
        featured: true,
        date: "2024-05-19"
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
        description: "We need a creative designer to create medical logos and branding materials. You should have a strong portfolio showcasing your logo design skills.",
        responsibilities: [
            "Create unique logotypes and brandmarks",
            "Develop branding guidelines",
            "Work with the marketing team on visual assets",
            "Iterate on designs based on feedback",
        ],
        requirements: [
            "Proven graphic designing experience",
            "A strong portfolio of illustrations or other graphics",
            "Familiarity with design software and technologies (such as InDesign, Illustrator, Dreamweaver, Photoshop)",
            "A keen eye for aesthetics and details",
        ],
        postedDate: "5 days ago",
        experience: "3+ years",
        education: "Design Degree",
        featured: false,
        date: "2024-05-17"
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
        description: "LWPtech is hiring a PHP Developer to maintain and improve our web applications. You will be responsible for back-end development and database management.",
        responsibilities: [
            "Write clean, well-designed code",
            "Produce detailed specifications",
            "Troubleshoot, test and maintain the core product software and databases",
            "Contribute in all phases of the development lifecycle",
        ],
        requirements: [
            "Proven software development experience in PHP",
            "Understanding of open source projects like Joomla, Drupal, Wikis, osCommerce, etc",
            "Demonstrable knowledge of web technologies including HTML, CSS, Javascript, AJAX etc",
            "Good knowledge of relational databases, version control tools and of developing web services",
        ],
        postedDate: "1 day ago",
        experience: "4+ years",
        education: "Bachelor's in CS",
        featured: true,
        date: "2024-05-21"
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
        tags: ["call center", "design", "developer"],
        description: "We are looking for a Marketing and Communications Specialist to manage our online and offline communication strategies.",
        responsibilities: [
            "Develop and implement marketing plans",
            "Manage social media accounts",
            "Write press releases and other media communications",
            "Organize promotional events",
        ],
        requirements: [
            "Proven experience as a Marketing Specialist or similar role",
            "Thorough understanding of marketing elements (including traditional and digital marketing such as SEO/Social media etc.) and market research methods",
            "Demonstrable experience in marketing data analytics and tools",
            "Solid computer skills, including MS Office, marketing software (Adobe Creative Suite & CRM) and applications (Web analytics, Google Adwords etc.)",
        ],
        postedDate: "4 days ago",
        experience: "3-5 years",
        education: "Marketing Degree",
        featured: false,
        date: "2024-05-18"
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
        tags: ["design", "developer", "it company"],
        description: "Coriea Inc. is seeking a Group Marketing Manager to lead our marketing efforts across multiple product lines.",
        responsibilities: [
            "Plan and execute marketing campaigns",
            "Lead a team of marketing professionals",
            "Analyze market trends and competitor activity",
            "Manage the marketing budget",
            "Collaborate with sales and product teams",
        ],
        requirements: [
            "Proven experience as a Marketing Manager",
            "Excellent leadership and project management skills",
            "Strong analytical and strategic thinking abilities",
            "Experience in the logistics industry is a plus",
        ],
        postedDate: "1 week ago",
        experience: "7+ years",
        education: "MBA preferred",
        featured: true,
        date: "2024-05-14"
    },
    {
        id: "8",
        employerId: "9", // Webzard Inc.
        title: "UX/UI Designer (1 - 2 Yrs Exp.)",
        company: "Webstrot Inc.",
        location: "906-152 Flatbush St, Brooklyn NY 11003",
        logo: "W",
        logoBg: "bg-green-100 text-green-600",
        type: "TEMPORARY",
        typeBg: "bg-teal-500",
        salary: "$30k - $35k/A",
        tags: ["design", "developer", "it company"],
        description: "We are looking for a junior UX/UI Designer to join our creative team. You will assist in designing user-friendly interfaces for our web and mobile applications.",
        responsibilities: [
            "Assist in creating wireframes, storyboards, user flows, process flows and site maps",
            "Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals and experience",
            "Execute all visual design stages from concept to final hand-off to engineering",
            "Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks",
        ],
        requirements: [
            "Proven UX/UI experience",
            "Demonstrable UX/UI design skills with a strong portfolio",
            "Solid experience in creating wireframes, storyboards, user flows, process flows and site maps",
            "Proficiency in Photoshop, Illustrator, OmniGraffle, or other visual design and wire-framing tools",
        ],
        postedDate: "2 days ago",
        experience: "1-2 years",
        education: "Design Degree",
        featured: false,
        date: "2024-05-20"
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
        description: "Another exciting opportunity for a JavaScript Developer at Envato. Work on diverse projects and expand your skills.",
        responsibilities: [
            "Develop and maintain JavaScript-based applications",
            "Participate in code reviews",
            "Write unit and integration tests",
            "Collaborate with cross-functional teams",
        ],
        requirements: [
            "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
            "Thorough understanding of React.js and its core principles",
            "Experience with data structure libraries (e.g., Immutable.js)",
            "Knowledge of modern authorization mechanisms, such as JSON Web Token",
        ],
        postedDate: "3 days ago",
        experience: "2+ years",
        education: "Bachelor's in CS",
        featured: false,
        date: "2024-05-19"
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
        description: "We are seeking a Protection Consultant to advise on website security and data protection.",
        responsibilities: [
            "Assess website security vulnerabilities",
            "Recommend security improvements",
            "Implement security measures",
            "Monitor for security breaches",
        ],
        requirements: [
            "Proven experience as a Security Consultant",
            "In-depth knowledge of security protocols and standards",
            "Experience with penetration testing",
            "Strong communication and reporting skills",
        ],
        postedDate: "5 days ago",
        experience: "4+ years",
        education: "Cybersecurity Cert.",
        featured: true,
        date: "2024-05-17"
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
        description: "Akshay INC. is hiring a Wordpress Developer to build and customize Wordpress themes and plugins.",
        responsibilities: [
            "Develop custom Wordpress themes",
            "Create and maintain Wordpress plugins",
            "Optimize Wordpress sites for performance",
            "Troubleshoot Wordpress issues",
        ],
        requirements: [
            "Strong understanding of PHP back-end development",
            "Good understanding of front-end technologies, including HTML5, CSS3, JavaScript, jQuery",
            "Experience using debugging tools such as Firebug and Chrome Inspector",
            "Ability to understand CSS changes and their ramifications to ensure consistent style across platforms and browsers",
        ],
        postedDate: "Today",
        experience: "3+ years",
        education: "Bachelor's Degree",
        featured: true,
        date: "2024-05-22"
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
        description: "We need a Senior Plugin Developer to lead our plugin development efforts.",
        responsibilities: [
            "Architect complex plugins",
            "Mentor junior developers",
            "Ensure code quality and best practices",
            "Collaborate with the product team on roadmap",
        ],
        requirements: [
            "Deep knowledge of Wordpress plugin architecture",
            "Experience with React and modern JavaScript",
            "Strong problem-solving skills",
            "Excellent communication abilities",
        ],
        postedDate: "Yesterday",
        experience: "5+ years",
        education: "Bachelor's in CS",
        featured: false,
        date: "2024-05-21"
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
        description: "Akshay INC. is looking for a Support Engineer to assist our customers with technical issues.",
        responsibilities: [
            "Respond to customer support tickets",
            "Troubleshoot technical problems",
            "Document solutions in the knowledge base",
            "Escalate complex issues to the development team",
        ],
        requirements: [
            "Experience in technical support",
            "Familiarity with Wordpress is a plus",
            "Strong written and verbal communication skills",
            "Patience and a customer-centric attitude",
        ],
        postedDate: "3 days ago",
        experience: "1-2 years",
        education: "Bachelor's Degree",
        featured: false,
        date: "2024-05-19"
    }
];
