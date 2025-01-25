import { useState, useEffect } from "react";
import styles from "../page.module.css"; // Make sure path is correct

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const aboutTop = aboutSection.offsetTop;
    const scrollPos = window.pageYOffset;

    // Make header visible only once user scrolls past 'about' or any other threshold logic
    setIsVisible(scrollPos >= aboutTop - 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.headerContainer} ${
        isVisible ? styles.fixed : styles.hidden
      }`}
    >
      <div className={styles.headerLogo}>
        <h3>Muhammad Ahmed</h3>
      </div>
      <nav className={styles.headerNav}>
        <a href="#home" className={styles.headerLink}>
          Home
        </a>
        <a href="#about" className={styles.headerLink}>
          About Me
        </a>
        <a href="#experience" className={styles.headerLink}>
          Experience
        </a>
        <a href="#projects" className={styles.headerLink}>
          Projects
        </a>
      </nav>
    </div>
  );
};

export default StickyHeader;
