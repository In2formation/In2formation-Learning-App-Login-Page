import { Link } from "react-router-dom";
import "./ProjectLibraryHeader.css";
import logo from "../assets/ProjectLibrary/LevelUpWorks.png";
import defaultAvatar from "../assets/ProjectLibrary/RawiriFletcher.png";
import nzFlag from "../assets/ProjectLibrary/NZflag.png";
import maoriFlag from "../assets/ProjectLibrary/Maoriflag.png";

function ProjectLibraryHeader({ user }) {
  const isTeacher = user?.role === "teacher";

  // Avatar (students + teachers)
  // Teachers store: "teachers/JasminaSalvador.png"
  // Students store: "/images/students/AidenAndrews.png" OR "AidenAndrews.png"
  const avatarSrc = user?.profile_pic
    ? user.profile_pic.startsWith("/")
      ? user.profile_pic
      : isTeacher
      ? `/images/${user.profile_pic}` // -> /images/teachers/JasminaSalvador.png
      : `/images/students/${user.profile_pic}`
    : defaultAvatar;

  //  Name (teacher or student)
  const displayName = user?.fullName
    ? user.fullName.toUpperCase()
    : "RAWIRI FLETCHER";

  //  Role-based profile link
  let profileLink = "/studentprofileviewer/12"; // fallback Rawiri (#12)

  if (isTeacher) {
    profileLink = "/teacherprofileviewer";
  } else {
    const studentId = user?.student_id || user?.id || 12; // fallback Rawiri (#12)
    profileLink = `/studentprofileviewer/${studentId}`;
  }

  return (
    <nav className="navbar">
      {/* LEFT LOGO */}
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} className="site-logo" alt="LevelUp Works logo" />
        </Link>
      </div>

      {/* CENTER LINKS */}
      <div className="navbar-center">
        <Link to="/">HOME</Link>
        <Link to="/projectlibrary">PROJECTS</Link>
        <Link to="/teacherdashboard">TEACHER</Link>
      </div>

      {/* RIGHT: AVATAR + LANG + FLAGS + NAME */}
      <div className="navbar-right">
        <div className="student-block">
          <img src={avatarSrc} className="avatar" alt={displayName} />

          <div className="student-text">
            <div className="lang-row">
              <span className="lang-label">LANG</span>
              <img src={nzFlag} alt="NZ flag" className="flag" />
              <img src={maoriFlag} alt="Maori flag" className="flag" />
            </div>

            <Link to={profileLink} className="student-name">
              {displayName}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ProjectLibraryHeader;
