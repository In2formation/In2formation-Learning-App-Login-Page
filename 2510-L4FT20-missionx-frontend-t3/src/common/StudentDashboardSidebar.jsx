console.log("Student dashboard sidebar is running")

import React from "react";
import { Link } from "react-router-dom";
import learningObjectives from "../assets/StudentDashboard/learningObjectives.png";
import instructions from "../assets/StudentDashboard/instructions.png";
import videoTutorial from "../assets/StudentDashboard/video.png";
import makeProject from "../assets/StudentDashboard/makeProject.png";
import submitProject from "../assets/StudentDashboard/submitProject.png";
import bonusChallenge from "../assets/StudentDashboard/bonusChallenge.png";
import takeQuiz from "../assets/StudentDashboard/takeTheQuiz.png";
import logoutSidebar from "../assets/logout.png";
import profileSidebar from "../assets/profile.png";
import settingsSidebar from "../assets/settings.png";
import pinkArrow from "../assets/arrowLeft.png";
import AidenProfilePic from "../../public/images/students/AidenAndrews.png";
import styles from "./Sidebar.module.css";
import { useSidebar } from "./SidebarContext";

function Sidebar() {
  const {isCollapsed, toggleSidebar } = useSidebar();
  return (
<div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>      {/* Profile Picture */}
      <div className={styles.profileSection}>
        <img
          src={AidenProfilePic}
          alt="student-profile"
          className={styles.profileImg}
        />
      </div>
      {/* Navigation Items */}
      <nav className={styles.menu}>
        <Link to="/studentdashboard/learningobjectives" className={styles.menuItem}>
          <img
            src={learningObjectives}
            alt="learningobjectives-btn"
            className={styles.menuIcon}
          />
          <span className={styles.menuLabel}>LEARNING OBJECTIVES</span>
        </Link>

        <Link to="/studentdashboard/instructions" className={styles.menuItem}>
          <img
            src={instructions}
            alt="instructions-btn"
            className={styles.menuIcon}
          />
          <span className={styles.menuLabel}>INSTRUCTIONS</span>
        </Link>

        <Link to="/studentdashboard/videotutorial" className={styles.menuItem}>
          <img
            src={videoTutorial}
            alt="video-tutorial-btn"
            className={styles.menuIcon}
          />
          <span className={styles.menuLabel}>VIDEO TUTORIAL</span>
        </Link>

        <Link to="/studentdashboard/makeproject" className={styles.menuItem}>
          <img
            src={makeProject}
            alt="make-project-btn"
            className={styles.menuIcon}
          />
          <span className={styles.menuLabel}>MAKE PROJECT</span>
        </Link>

        <Link to="/studentdashboard/submitproject" className={styles.menuItem}>
          <img
            src={submitProject}
            alt="submit-project-btn"
            className={styles.menuIcon}
          />
          <span className={styles.menuLabel}>SUBMIT PROJECT</span>
        </Link>

        <Link to="/studentdashboard/bonuschallenge" className={styles.menuItem}>
          <img
            src={bonusChallenge}
            alt="bonus-challenge-btn"
            className={styles.menuIcon}
          />
          <span className={styles.menuLabel}>BONUS CHALLENGE</span>
        </Link>

        <Link to="/studentdashboard/takequiz" className={styles.menuItem}>
          <img src={takeQuiz} alt="take-quiz-btn" className={styles.menuIcon} />
          <span className={styles.menuText}>TAKE THE QUIZ</span>
        </Link>
      </nav>

      {/* Collapse Button - updated this to match sidebar.module.css */}
      <button className={styles.playBtn} onClick={toggleSidebar}>
        <img
          src={pinkArrow}
          alt="collapse-sidebar-btn"
          style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

{/* Sidebar Footer / Toggle Button */}
<div className={styles.footer}>
  <button className={styles.playBtn} onClick={toggleSidebar} title="Toggle Sidebar">
    <img
      src={pinkArrow}
      alt="collapse-sidebar-btn"
      style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
    />
  </button>
</div>

{/* Bottom Icons */}
<div className={styles.bottomIcons}>
  <img
    src={profileSidebar}
    alt="profile"
    className={styles.bottomIconImg}
  />
  <p className={styles.bottomMenuLabel}>Profile</p>

  <img
    src={settingsSidebar}
    alt="settings"
    className={styles.bottomIconImg}
  />
  <p className={styles.bottomMenuLabel}>Settings</p>

  <img
    src={logoutSidebar}
    alt="logout"
    className={styles.bottomIconImg}
  />
  <p className={styles.bottomMenuLabel}>Log out</p>
</div>
      </div>
  );
}
export default Sidebar;
