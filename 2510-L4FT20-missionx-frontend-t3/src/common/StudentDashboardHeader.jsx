console.log("Student Dashboard Header is running")

// import { useState } from "react";
import { useLocation } from "react-router";
import MaoriFlag from '../assets/NavBar/MaoriFlag.png'
import NZFlag from '../assets/NavBar/NZFlag.png'
import LevelUpWorksblue from '../assets/NavBar/LevelUpWorks-blue.png'
import styles from './StudentDashboardHeader.module.css'


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src={LevelUpWorksblue}
            alt="LevelUp Works"
            className={styles.logo}
          />
        </div>

        {/* Project Progress */}
        <div className={styles.projectProgress}>
          <div className={styles.projectLabel}>
            <span className={styles.projectTitle}>PROJECT</span>
            <span className={styles.projectIntro}>Introduction</span>
          </div>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={styles.currentStep}>1</div>
            {/* Progress circles */}
            <div className={styles.progressDots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
          </div>
        </div>

        {/* Right side buttons */}
        <div className={styles.headerButtons}>
          <button className={styles.startProjectBtn}>Start Project</button>
          <button className={styles.askTeacherBtn}>Ask Teacher for help</button>
          <button className={styles.moreProjectsBtn}>More Projects</button>

          {/* Language flags */}
          <div className={styles.languageFlags}>
            <img src={MaoriFlag} alt="English" className={styles.flag} />
            <img src={NZFlag} alt="English" className={styles.flag} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
