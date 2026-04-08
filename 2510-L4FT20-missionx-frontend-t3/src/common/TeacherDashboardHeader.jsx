// import { useState } from "react";
import { useLocation } from "react-router";
import MaoriFlag from '../assets/NavBar/MaoriFlag.png'
import NZFlag from '../assets/NavBar/NZFlag.png'
import LevelUpWorksblue from '../assets/NavBar/LevelUpWorks-blue.png'
import styles from './StudentDashboardHeader.module.css'
//Now using styling Student Dashboard Header CSS. No longer using DashboardHeader (let me know if you'd like me to udpate the fiel names)


function TeacherHeader() {
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

        {/* Right side buttons */}
        <div className={styles.headerButtons}>
          <button className={styles.askTeacherBtn}>Help Centre</button>
          <button className={styles.moreProjectsBtn}>More Projects</button>
          
          {/* Language flags */}
          <div className={styles.languageFlags}>
            <img 
              src={MaoriFlag} 
              alt="Maori" 
              className={styles.flag}
            />
            <img 
              src={NZFlag} 
              alt="English" 
              className={styles.flag}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default TeacherHeader