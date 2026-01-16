export interface Project {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  impact: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "materinaize",
    title: "Materinaize",
    tagline: "1st Place Winner - Pfizer Hackathon | ML-powered maternal health monitoring",
    problem:
      "Healthcare providers needed a secure system to process maternal health data and generate real-time clinical insights for better patient outcomes.",
    solution:
      "Built a secure full-stack system with ML pipelines to process maternal health data. Integrated React, Firebase, and REST APIs to deliver a low-latency backend workflow that improved performance by 35%.",
    impact:
      "Enhanced reliability through structured debugging, data validation, and streamlined API design. Won 1st place at Pfizer Hackathon for innovative healthcare solution.",
    techStack: ["React", "Firebase", "REST APIs", "ML Pipelines", "Python"],
    featured: true,
  },
  {
    id: "thera-cam",
    title: "Thera Cam",
    tagline: "Rutgers Hackathon | Real-time fitness form correction with OpenPose",
    problem:
      "Users exercising at home lacked real-time feedback on exercise form, leading to injuries and ineffective workouts.",
    solution:
      "Developed a real-time form-correction tool using OpenPose and JavaScript for accurate motion tracking and data processing. Implemented responsive feedback and tracking features with Firebase.",
    impact:
      "Ensured stable performance by optimizing event handling, reducing latency, and improving front-end processing flow. Received Honorable Mention in Mental Health Track at Rutgers Hackathon.",
    techStack: ["JavaScript", "OpenPose", "Firebase", "Computer Vision"],
    featured: true,
  },
  {
    id: "fitness-ai",
    title: "Fitness AI",
    tagline: "AI-driven chatbot for personalized health recommendations",
    problem:
      "Users struggled to find personalized fitness and nutrition plans that adapt to their goals and progress.",
    solution:
      "Built an AI-driven chatbot using FastAPI, React, and SQL with secure endpoints and reliable REST API integration. Designed calorie and diet analysis features powered by model prompts.",
    impact:
      "Delivered personalized daily health recommendations through intelligent AI analysis, improving user engagement and health outcomes.",
    techStack: ["FastAPI", "React", "SQL", "AI/ML", "REST APIs"],
    featured: true,
  },
  {
    id: "break-through-tech",
    title: "Break Through Tech AI/ML Fellow",
    tagline: "Cornell Tech | Production-ready ML pipelines and NLP systems",
    problem:
      "Real-world problems required scalable, production-ready ML solutions with secure coding practices and automated testing.",
    solution:
      "Built scalable, production-ready ML pipelines in Python with secure coding practices and automated testing workflows. Developed NLP and computer-vision components that integrated into stable backend workflows.",
    impact:
      "Translated real problems into deployable software solutions through data analysis and careful model performance tuning at Cornell Tech.",
    techStack: ["Python", "ML Pipelines", "NLP", "Computer Vision", "Automated Testing"],
    featured: false,
  },
];
