export interface Candidate {
  id: number;
  name: string;
  professionalTitle: string;
  location: string;
  experience: string;
  experienceLevel: "Entry Level" | "Mid Level" | "Senior Level";
  education: string;
  skills: string[];
  summary: string;
  initials: string;
  email: string;
}

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Jhon Doe",
    professionalTitle: "Project Manager",
    location: "New York",
    experience: "5+ years",
    experienceLevel: "Senior Level",
    education: "Bachelor's Degree",
    skills: ["Leadership", "Agile", "Scrum", "PMP"],
    summary:
      "Experienced Project Manager with 5+ years in software development projects. Proven track record of delivering projects on time and within budget.",
    initials: "JD",
    email: "jhon.doe@example.com",
  },
  {
    id: 2,
    name: "Sarah Smith",
    professionalTitle: "Frontend Developer",
    location: "San Francisco",
    experience: "3 years",
    experienceLevel: "Mid Level",
    education: "Bachelor's Degree",
    skills: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
    summary:
      "Creative Frontend Developer passionate about building responsive and user-friendly web applications.",
    initials: "SS",
    email: "sarah.smith@example.com",
  },
  {
    id: 3,
    name: "Michael Brown",
    professionalTitle: "Backend Engineer",
    location: "Austin",
    experience: "7 years",
    experienceLevel: "Senior Level",
    education: "Master's Degree",
    skills: ["Python", "Django", "PostgreSQL", "AWS"],
    summary:
      "Skilled Backend Engineer specializing in scalable server-side logic and database architecture.",
    initials: "MB",
    email: "michael.brown@example.com",
  },
  {
    id: 4,
    name: "Emily Davis",
    professionalTitle: "UI/UX Designer",
    location: "New York",
    experience: "2 years",
    experienceLevel: "Entry Level",
    education: "Bachelor's Degree",
    skills: ["Figma", "Adobe XD", "UI/UX Design", "Wireframing"],
    summary:
      "Junior Designer with a strong portfolio in web and mobile app interfaces. Keen eye for detail and user capability.",
    initials: "ED",
    email: "emily.davis@example.com",
  },
  {
    id: 5,
    name: "David Wilson",
    professionalTitle: "DevOps Engineer",
    location: "Remote",
    experience: "4 years",
    experienceLevel: "Mid Level",
    education: "Bachelor's Degree",
    skills: ["Docker", "Kubernetes", "CI/CD", "Linux"],
    summary:
      "DevOps specialist focused on automating deployment pipelines and ensuring system reliability.",
    initials: "DW",
    email: "david.wilson@example.com",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    professionalTitle: "Data Scientist",
    location: "Boston",
    experience: "6 years",
    experienceLevel: "Senior Level",
    education: "Master's Degree",
    skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
    summary:
      "Data Scientist with expertise in predictive modeling and statistical analysis to drive business insights.",
    initials: "LA",
    email: "lisa.anderson@example.com",
  },
  {
    id: 7,
    name: "James Taylor",
    professionalTitle: "Full Stack Developer",
    location: "London",
    experience: "5 years",
    experienceLevel: "Senior Level",
    education: "Bachelor's Degree",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    summary:
      "Versatile Full Stack Developer capable of handling both client-side and server-side development.",
    initials: "JT",
    email: "james.taylor@example.com",
  },
  {
    id: 8,
    name: "Jessica Martinez",
    professionalTitle: "Marketing Specialist",
    location: "Chicago",
    experience: "3 years",
    experienceLevel: "Mid Level",
    education: "Bachelor's Degree",
    skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
    summary:
      "Marketing professional with a focus on digital strategies and brand growth.",
    initials: "JM",
    email: "jessica.martinez@example.com",
  },
  {
    id: 9,
    name: "Robert Thomas",
    professionalTitle: "QA Engineer",
    location: "Austin",
    experience: "2 years",
    experienceLevel: "Entry Level",
    education: "Bachelor's Degree",
    skills: ["Selenium", "Java", "Test Automation", "JIRA"],
    summary:
      "Detail-oriented QA Engineer dedicated to ensuring software quality through rigorous testing.",
    initials: "RT",
    email: "robert.thomas@example.com",
  },
  {
    id: 10,
    name: "Jennifer Garcia",
    professionalTitle: "Product Owner",
    location: "Seattle",
    experience: "8 years",
    experienceLevel: "Senior Level",
    education: "MBA",
    skills: ["Product Management", "Strategy", "User Research", "Agile"],
    summary:
      "Strategic Product Owner with a history of launching successful products in the tech industry.",
    initials: "JG",
    email: "jennifer.garcia@example.com",
  },
  {
    id: 11,
    name: "William Rodriguez",
    professionalTitle: "Mobile Developer",
    location: "Los Angeles",
    experience: "4 years",
    experienceLevel: "Mid Level",
    education: "Bachelor's Degree",
    skills: ["Swift", "iOS", "React Native", "Mobile App Dev"],
    summary:
      "Mobile Developer enthusiastic about creating seamless mobile experiences on iOS and Android.",
    initials: "WR",
    email: "william.rodriguez@example.com",
  },
  {
    id: 12,
    name: "Elizabeth Lee",
    professionalTitle: "HR Manager",
    location: "New York",
    experience: "10+ years",
    experienceLevel: "Senior Level",
    education: "Master's Degree",
    skills: ["Recruiting", "Employee Relations", "Communication", "HRIS"],
    summary:
      "Senior HR Manager aimed at fostering positive workplace culture and talent acquisition.",
    initials: "EL",
    email: "elizabeth.lee@example.com",
  },
  {
    id: 13,
    name: "Alex Johnson",
    professionalTitle: "Software Engineer",
    location: "Seattle",
    experience: "3 years",
    experienceLevel: "Mid Level",
    education: "Bachelor's Degree",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    summary:
      "Passionate Software Engineer with experience in full-stack development and a focus on scalable web applications.",
    initials: "AJ",
    email: "alex.johnson@example.com",
  },
];
