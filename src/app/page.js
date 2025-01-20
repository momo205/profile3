"use client";
import styles from "./page.module.css";
import "./globals.css";
import Image from "next/image";

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
        <section style={{ width: "100%" }} id="home">
          <div className={styles.homeContainer}>
            <Image
              src="/back6.jpg"
              className={styles.backgroundImage}
              alt="Background"
              height={2000}
              width={2000}
            />
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
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
            <div className={styles.contact}>
              <button
                className={styles.contactButton}
                style={{ fontSize: "15px" }}
              >
                Contact Me
              </button>
            </div>
            <div className={styles.homeSection}>
              <div className={styles.image}>
                <img src="/images/profile.jpg" />
              </div>
              <div className={styles.title}>
                <h1>Muhammad Ahmed</h1>
                <h2>Full Stack Software Engineer</h2>
              </div>

              <div className={styles.homeDescription}>
                <h4 style={{ fontWeight: "400" }}>
                  Passionate software engineering student with skills in
                  front-end and back-end development, driven to create
                  innovative solutions that make a positive impact. Currently
                  seeking internships to apply my expertise and further grow as
                  a developer.
                </h4>
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
                  {" "}
                  Github
                </button>
                <button onClick={() => window.open("/resume.pdf", "_blank")}>
                  Resume{" "}
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div id="about " className={styles.aboutContainer}>
            <div className={styles.aboutBody}>
              <h3
                style={{
                  fontWeight: "bold",
                  fontSize: "28px",
                }}
              >
                About Me
              </h3>
              <h3 style={{}}>City College Of New York'26</h3>
              <h3 style={{}}>Computer Science</h3>
            </div>
            <div style={{ paddingBottom: "60px" }}>
              {" "}
              <h3
                style={{
                  borderBottom: "1px solid black",
                  fontFamily: "inherit",
                  fontSize: "28px",
                }}
              >
                Goals
              </h3>
            </div>
            <div className={styles.cardsContainer}>
              <div className={styles.card}>
                <img className={styles.icons} src="/images/solution_icon.png" />
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
        <section id="projects" className={styles.projectsContainer}>
          <div id="projects" className={styles.projectsContainer}>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "28px",
              }}
            >
              Projects
            </h3>
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
                          src={tool.trim()} // Ensure no leading/trailing whitespace
                          alt="Tool image"
                          key={idx}
                          className={styles.toolImage}
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
        <section id="experience" className={styles.experienceContainer}>
          <div id=" experience" className={styles.experienceContainer}>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "28px",
              }}
            >
              Experience
            </h3>
            <div
              className={styles.gridContainer1}
              style={{ marginLeft: "120px" }}
            >
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={styles.experienceCard}
                  style={{ backgroundImage: `url(${exp.image})` }}
                >
                  <div className={styles.experienceContent}>
                    <h3
                      style={{
                        fontFamily: "Times New Roman , Times, serif",
                        fontStyle: "normal",
                        fontSize: "21px",
                      }}
                    >
                      {exp.title}
                    </h3>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontFamily: "Times New Roman , Times, serif",
                        fontStyle: "normal",
                        fontSize: "16px",
                      }}
                    >
                      {exp.summary}
                    </p>
                    <p>{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact">
          <div id="contact" className={styles.gutter}>
            <div className={styles.homebuttons}>
              <button href="https://www.linkedin.com">LinkedIn</button>
              <button href="https://github.com">Github</button>
              <button href="/resume.pdf">Resume</button>
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
