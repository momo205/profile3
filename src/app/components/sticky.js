import { useState, useEffect } from "react";
import styles from "../page.module.css"; // Ensure the path is correct

const StickyHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const aboutTop = document.getElementById("about").offsetTop;
    const headerHeight = document.querySelector(
      `.${styles.headerContainer}`
    ).offsetHeight;
    // Make the header visible only if the scroll position is within the about section
    setIsVisible(window.pageYOffset >= aboutTop - headerHeight);
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
      <div className={styles.nameContainer}>
        <h3
          style={{
            fontFamily: "times new roman",
            fontSize: "25px",
            fontWeight: "lighter",
          }}
        >
          Muhammad Ahmed
        </h3>
      </div>
      <nav className={styles.navigationBar1}>
        <a href="#home" className={styles.navLink1}>
          Home
        </a>
        <a href="#about" className={styles.navLink1}>
          About Me
        </a>
        <a href="#experience" className={styles.navLink1}>
          Experience
        </a>
        <a href="#projects" className={styles.navLink1}>
          Projects
        </a>
      </nav>
    </div>
  );
};

export default StickyHeader;
