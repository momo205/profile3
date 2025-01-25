"use client";
import styles from "./page.module.css";
import "./globals.css";
import Image from "next/image";
import StickyHeader from "./components/sticky";

const experiences = [
  {
    title: "Personaland",
    role: "App Developer",
    summary: "Developed mobile apps to enhance user interaction.",
    description:
      "Led the development of innovative mobile applications focusing on improving user engagement through intuitive UI/UX designs. Utilized React Native extensively to ensure cross-platform compatibility.",
  },
  {
    title: "Department of Design and Construction",
    role: "QA Intern",
    summary: "Performed software testing and QA.",
    description:
      "Engaged in rigorous testing and QA processes for the Civil Service Application Tracker project, ensuring the software met all specified requirements before its deployment.",
  },
];
const projects = [
  {
    title: "Auction Architects",
    role: "Selling used cars",
    description:
      "Developed a full-stack web application using Node.js and Next.js to facilitate real-time car auctions and purchases. This system integrates essential features such as live bidding and car history checks.",
    tools: ["/images/node.png", "/images/next.jpeg", "/images/mongo.png"],
  },
  {
    title: "Materinaize",
    role: "Maternal Health Monitor using ML",
    description:
      "Created a system to monitor maternal health using machine learning algorithms to analyze health data and provide real-time updates to healthcare providers.",
    tools: ["/images/node.png", "/images/react.jpeg", "/images/firebase.png"],
  },
  {
    title: "Thera Cam",
    role: "In-Home Fitness Tool",
    description:
      "Developed an application using Node.js and OpenPose technology to provide real-time exercise feedback, helping users maintain correct form during workouts.",
    tools: ["/images/node.png", "/images/next.jpeg", "/images/firebase.png"],
  },
  {
    title: "Fitness AI",
    role: "Personalized fitness tracker",
    description:
      "Implemented a fitness tracking app that uses artificial intelligence to personalize diet and exercise recommendations based on user input.",
    tools: ["/images/node.png", "/images/next.jpeg", "/images/ai.png"],
  },
  {
    title: "Green Scan",
    role: "Environmental Protection through waste reduction",
    description:
      "Developed a platform to recommend how to reuse household waste using AI, promoting environmental protection through practical daily actions.",
    tools: ["/images/node.png", " /images/next.jpeg", "/images/mongo.png"],
  },
  {
    title: "Halal Finder",
    role: "Nearest Restaurant Finder",
    description:
      "Designed an application to locate the nearest halal restaurants, providing directions and details for users seeking halal options.",
    tools: ["/images/java.png", "/images/sql.jpeg"],
  },
];

const scrollToSection = (event, sectionId) => {
  event.preventDefault(); // Prevent the default anchor link behavior
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Home() {
  return (
    <>
      <div className={styles.fullScreenContainer}>
        {/* ----------------- HOME SECTION ----------------- */}
        <section id="home" className={styles.homeContainer}>
          {/* Background image behind content */}
          <Image
            src="/back6.jpg"
            alt="Background"
            layout="fill"
            objectFit="cover"
            className={styles.backgroundImage}
          />

          {/* Top bar: Logo (left), Nav (center) */}
          <div className={styles.homeNavContainer}>
            <div className={styles.logo}>
              <h3>MA</h3>
            </div>
            <nav className={styles.navigationBar}>
              <a
                href="#home"
                onClick={(e) => scrollToSection(e, "home")}
                className={styles.navLink}
              >
                Home
              </a>
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, "about")}
                className={styles.navLink}
              >
                About Me
              </a>
              <a
                href="#experience"
                onClick={(e) => scrollToSection(e, "experience")}
                className={styles.navLink}
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className={styles.navLink}
              >
                Projects
              </a>
            </nav>
          </div>

          {/* Main home content (single column) */}
          <div className={styles.homeSection}>
            <div className={styles.image}>
              <img src="/images/profile.jpg" alt="Profile" />
            </div>
            <div className={styles.title}>
              <h1>Muhammad Ahmed</h1>
              <h2>Full Stack Software Engineer</h2>
            </div>
            <div className={styles.homeDescription}>
              <p>
                Passionate software engineering student with skills in front-end
                and back-end development, driven to create innovative solutions
                that make a positive impact. Currently seeking internships to
                apply my expertise and further grow as a developer.
              </p>
            </div>
            <div className={styles.Homebuttons}>
              <button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/muhammad-a-67356b205/",
                    "_blank"
                  )
                }
              >
                LinkedIn
              </button>
              <button
                onClick={() =>
                  window.open("https://github.com/momo205", "_blank")
                }
              >
                Github
              </button>
              <button onClick={() => window.open("/resume.pdf", "_blank")}>
                Resume
              </button>
            </div>
          </div>
        </section>

        {/* ----------------- ABOUT SECTION ----------------- */}
        <section id="about">
          {/* Optional Sticky Header */}
          <StickyHeader />

          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.sectionText}>City College Of New York '26</p>
            <p className={styles.sectionText}>Computer Science</p>

            <h2 className={styles.sectionTitle}>Goals</h2>
            <div className={styles.cardsContainer}>
              <div className={styles.card}>
                <img
                  className={styles.icons}
                  src="/images/solution_icon.png"
                  alt="Solutions Icon"
                />
                <h5>Finding Solutions</h5>
                <p>
                  I am passionate about solving complex problems through
                  technology by leveraging my skills in full-stack development
                  and AI-driven systems to create impactful solutions.
                </p>
              </div>
              <div className={styles.card}>
                <img
                  className={styles.icons}
                  src="/images/community_icon.jpeg"
                  alt="Community Icon"
                />
                <h5>Helping Community</h5>
                <p>
                  I strive to complement my technical expertise with strong
                  communication and leadership skills to deliver impactful,
                  user-focused solutions that address community needs
                  effectively.
                </p>
              </div>
              <div className={styles.card}>
                <img
                  className={styles.icons}
                  src="/images/challenges_icon.png"
                  alt="Challenges Icon"
                />
                <h5>Making Innovations</h5>
                <p>
                  Dedicated to constant improvement, I approach challenges as
                  opportunities to enhance my skills and processes, creating
                  scalable solutions that adapt and grow to meet both current
                  and future needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- PROJECTS SECTION ----------------- */}
        <section id="projects">
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.gridContainer}>
              {projects.map((project, index) => (
                <div key={index} className={styles.projectCard}>
                  <div className={styles.projectContent}>
                    <h3>{project.title}</h3>
                    <p>{project.role}</p>
                    <p>{project.description}</p>
                    <div className={styles.toolsContainer}>
                      {project.tools.map((tool, idx) => (
                        <Image
                          src={tool.trim()}
                          alt="Tool image"
                          key={idx}
                          width={40}
                          height={40}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------- EXPERIENCE SECTION ----------------- */}
        <section id="experience">
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.gridContainer1}>
              {experiences.map((exp, index) => (
                <div key={index} className={styles.experienceCard}>
                  <div className={styles.experienceContent}>
                    <h3>{exp.title}</h3>
                    <p>{exp.summary}</p>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------- CONTACT SECTION ----------------- */}
        <section id="contact">
          <div className={styles.sectionContainer}>
            {/* You can rename .homebuttons if you want a unique class for contact buttons */}
            <div className={styles.homebuttons}>
              <button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/muhammad-a-67356b205/",
                    "_blank"
                  )
                }
              >
                LinkedIn
              </button>
              <button
                onClick={() =>
                  window.open("https://github.com/momo205", "_blank")
                }
              >
                Github
              </button>
              <button onClick={() => window.open("/resume.pdf", "_blank")}>
                Resume
              </button>
            </div>
            <div className={styles.logo3}>
              <h3>MA</h3>
            </div>
            <div className={styles.footer}>
              <p>muhammadb2345@gmail.com</p>
              <p>Copyright © 2025 Muhammad Ahmed. All rights reserved.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
