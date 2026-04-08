
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useSidebar } from "./SidebarContext";

// Asset imports
import progressTrackerIcon from "../assets/TeacherDashboard/progressTracker.png";
import studentProfilesIcon from "../assets/TeacherDashboard/studentProfiles.png";
import helpRequestsIcon from "../assets/TeacherDashboard/helpRequests.png";
import projectSubmissionsIcon from "../assets/TeacherDashboard/projectSubmissions.png";
import projectLibraryIcon from "../assets/TeacherDashboard/projectLibrary.png";
import progressTrackerIconSelected from "../assets/TeacherDashboard/progressTrackerSelected.png";
import studentProfilesIconSelected from "../assets/TeacherDashboard/studentProfilesSelected.png";
import helpRequestsIconSelected from "../assets/TeacherDashboard/helpRequestsSelected.png";
import projectSubmissionsIconSelected from "../assets/TeacherDashboard/projectSubmissionsSelected.png";
import projectLibraryIconSelected from "../assets/TeacherDashboard/projectLibrarySelected.png";
import arrowLeftIcon from "../assets/arrowLeft.png";

export default function Sidebar() {
  const location = useLocation();
  const { isCollapsed, toggle } = useSidebar();

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.profileSection}>
        <img
          src="/images/teachers/JasminaSalvador.png"
          className={styles.profileImg}
          alt="teacher"
        />
      </div>

      <nav className={styles.menu}>
        <Link
          to="/progress-tracker"
          className={`${styles.menuItem} ${
            location.pathname.includes("/progress-tracker") ? styles.active : ""
          }`}
        >
          <img
            className={styles.menuIcon}
            src={location.pathname.includes("/progress-tracker") ? progressTrackerIconSelected : progressTrackerIcon}
            alt="Progress Tracker"
          />
          <span className={styles.menuLabel}>PROGRESS TRACKER</span>
        </Link>

        <Link
          to="/student-profiles"
          className={`${styles.menuItem} ${
            location.pathname.includes("/student-profiles") ? styles.active : ""
          }`}
        >
          <img
            className={styles.menuIcon}
            src={location.pathname.includes("/student-profiles") ? studentProfilesIconSelected : studentProfilesIcon}
            alt="Student Profiles"
          />
          <span className={styles.menuLabel}>STUDENT PROFILES</span>
        </Link>

        <Link
          to="/help-requests"
          className={`${styles.menuItem} ${
            location.pathname.includes("/help-requests") ? styles.active : ""
          }`}
        >
           <img className={styles.menuIcon} src={location.pathname.includes("/help-requests") ? helpRequestsIconSelected : helpRequestsIcon} alt="Help Requests"/>
          <span className={styles.menuLabel}>HELP REQUESTS</span>
        </Link>

        <Link
          to="/project-submissions"
          className={`${styles.menuItem} ${
            location.pathname.includes("/project-submissions") ? styles.active : ""
          }`}
        >
           <img className={styles.menuIcon} src={location.pathname.includes("/project-submissions") ? projectSubmissionsIconSelected : projectSubmissionsIcon} alt="Project Submissions"/>
          <span className={styles.menuLabel}>PROJECT SUBMISSIONS</span>
        </Link>

        <Link
          to="/project-library"
          className={`${styles.menuItem} ${
            location.pathname.includes("/project-library") ? styles.active : ""
          }`}
        >
          <img className={styles.menuIcon} src={location.pathname.includes("/project-library") ? projectLibraryIconSelected : projectLibraryIcon} alt="Project Library"/>
          <span className={styles.menuLabel}>PROJECT LIBRARY</span>
        </Link>
      </nav>

      <div className={styles.footer}>
        <button className={styles.playBtn} onClick={toggle} title="Toggle Sidebar">
          <img src={arrowLeftIcon} alt="toggle" />
        </button>
      </div>
    </div>
  );

}
