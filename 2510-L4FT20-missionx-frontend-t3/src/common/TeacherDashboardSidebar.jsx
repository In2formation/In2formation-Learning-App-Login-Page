import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { useSidebar } from "./SidebarContext";

// import static icons from src so Vite bundles them correctly
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
import logoutIcon from "../assets/logout.png";
import settingsIcon from "../assets/settings.png";
import profileIcon from "../assets/profile.png"; 


export default function TeacherDashboardSidebar() {
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
{/* Navbar Items */}
      <nav className={styles.menu}>
        <Link
          to="/teacher-dashboard/progress-tracker"
          className={`${styles.menuItem} ${
            location.pathname.includes("/teacher-dashboard/progress-tracker") ? styles.active : ""
          }`}
        >
          <img
            className={styles.menuIcon}
            src={location.pathname.includes("/teacher-dashboard/progress-tracker") ? progressTrackerIconSelected : progressTrackerIcon}
            alt="Progress Tracker"
          />
          <span className={styles.menuLabel}>PROGRESS TRACKER</span>
        </Link>

        <Link
          to="/teacher-dashboard/student-profiles"
          className={`${styles.menuItem} ${
            location.pathname.includes("/teacher-dashboard/student-profiles") ? styles.active : ""
          }`}
        >
          <img
            className={styles.menuIcon}
            src={location.pathname.includes("/teacher-dashboard/student-profiles") ? studentProfilesIconSelected : studentProfilesIcon}
            alt="Student Profiles"
          />
          <span className={styles.menuLabel}>STUDENT PROFILES</span>
        </Link>

        <Link
          to="/teacher-dashboard/helprequests"
          className={`${styles.menuItem} ${
            location.pathname.includes("/teacher-dashboard/helprequests") ? styles.active : ""
          }`}
        >
           <img className={styles.menuIcon} src={location.pathname.includes("/teacher-dashboard/helprequests") ? helpRequestsIconSelected : helpRequestsIcon} alt="Help Requests"/>
          <span className={styles.menuLabel}>HELP REQUESTS</span>
        </Link>

        <Link
          to="/teacher-dashboard/projectsubmissions"
          className={`${styles.menuItem} ${
            location.pathname.includes("/teacher-dashboard/projectsubmissions") ? styles.active : ""
          }`}
        >
           <img className={styles.menuIcon} src={location.pathname.includes("/teacher-dashboard/projectsubmissions") ? projectSubmissionsIconSelected : projectSubmissionsIcon} alt="Project Submissions"/>
          <span className={styles.menuLabel}>PROJECT SUBMISSIONS</span>
        </Link>

        <Link
          to="/teacher-dashboard/project-library"
          className={`${styles.menuItem} ${
            location.pathname.includes("/teacher-dashboard/project-library") ? styles.active : ""
          }`}
        >
          <img className={styles.menuIcon} src={location.pathname.includes("/teacher-dashboard/project-library") ? projectLibraryIconSelected : projectLibraryIcon} alt="Project Library"/>
          <span className={styles.menuLabel}>PROJECT LIBRARY</span>
        </Link>
      </nav>
{/* Sidebar Footer / Toggle Button */}
      <div className={styles.footer}>
        <button className={styles.playBtn} onClick={toggle} title="Toggle Sidebar">
          <img src={arrowLeftIcon} alt="Toggle Sidebar" />
        </button>
      </div>
      <div className={styles.bottomIcons}>
        <img src={profileIcon} alt="profile" />

    <p className={styles.bottomMenuLabel}>Profile</p>

        <img src={settingsIcon} alt="settings" />
        <p className={styles.bottomMenuLabel}>Settings</p>

        <img src={logoutIcon} alt="logout" />
        <p className={styles.bottomMenuLabel}>Logout</p>
          </div>
    </div>
  );
}
