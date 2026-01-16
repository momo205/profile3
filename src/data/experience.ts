export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    id: "bloom-energy",
    company: "Bloom Energy",
    role: "Software Engineer",
    period: "June 2025 – Aug 2025",
    achievements: [
      "Built Python and FastAPI automation pipelines that reduced manual RMCC workflows by 70% across production teams",
      "Developed backend services deployed across 1,600+ sites to maintain stable performance and consistent reliability",
      "Implemented secure authentication using JWT single sign-on with role permissions to protect backend access",
      "Diagnosed and resolved pipeline failures by reviewing logs and database behavior to restore workflow stability",
      "Refactored over 1,000 lines of Python into clean, modular components to improve code quality and maintainability",
      "Delivered Streamlit workflow tools and collaborated through Git reviews to align updates with team standards",
    ],
    techStack: ["Python", "FastAPI", "JWT", "Streamlit", "Git", "CI/CD"],
  },
  {
    id: "personaland",
    company: "Personaland",
    role: "Software Developer",
    period: "June 2024 – Aug 2024",
    achievements: [
      "Built React Native features backed by Supabase APIs to deliver full-stack functionality across the mobile platform",
      "Improved app load performance by 40% through optimized component structure and more efficient state management",
      "Resolved navigation and rendering issues to maintain stable user flows and ensure a smooth, reliable experience",
      "Delivered over 25 features in an agile team while collaborating closely to meet sprint goals and release targets",
    ],
    techStack: ["React Native", "Supabase", "JavaScript", "Agile"],
  },
  {
    id: "ddc",
    company: "Department of Design & Construction",
    role: "QA Intern",
    period: "July 2024 – August 2024",
    achievements: [
      "Designed and executed functional and regression test suites to ensure stable, high-quality software releases",
      "Logged over 150 defects and partnered with engineering teams to prioritize and resolve issues across the SDLC",
      "Analyzed logs and behavior patterns to identify root causes and support data-driven troubleshooting improvements",
    ],
    techStack: ["QA Testing", "Regression Testing", "SDLC", "Log Analysis"],
  },
];
