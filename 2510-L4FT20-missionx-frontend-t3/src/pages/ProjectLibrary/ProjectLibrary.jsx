import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./ProjectLibrary.css";
import ProjectCard from "./components/ProjectCard";

import ProjectLibraryHeader from "../../common/ProjectLibraryHeader";
import ProjectLibraryFooter from "../../common/ProjectLibraryFooter";

// AuthContext
import { useAuth } from "../../context/AuthContext";

export default function ProjectLibrary() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // this fixes casing issues
  const isTeacher = user?.role?.toLowerCase() === "teacher";
  console.log("USER IN PROJECT LIBRARY:", user);
  console.log("IS TEACHER?:", isTeacher);
  // show 5/10/all
  const [visibleCount, setVisibleCount] = useState(5);

  // top difficulty tabs
  const [selectedDifficulty, setSelectedDifficulty] = useState("BEGINNER");

  // subscription filter sidebar
  const [subscriptionFilter, setSubscriptionFilter] = useState([]);

  // PROJECT DATA FROM DB
  const [projects, setProjects] = useState([]);

  // Fetch projects from backend
  useEffect(() => {
    fetch("http://localhost:4000/projects")
      .then((res) => res.json())
      .then((data) => {
        console.log("PROJECTS FROM DB:", data);
        setProjects(data);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  // FILTER SECTIONS sidebar (SUBSCRIPTION functional)
  const filterSections = [
    {
      title: "SUBSCRIPTION",
      options: ["Free", "Premium"],
    },
    {
      title: "ACTIVITY TYPE",
      options: ["Animation", "Game", "Chatbot", "Augmented Reality"],
    },
    {
      title: "YEAR LEVEL",
      options: ["1 - 4", "5 - 6", "7 - 8", "9 - 13"],
    },
    {
      title: "SUBJECT MATTER",
      options: [
        "Computer Science",
        "Maths",
        "Science",
        "Language",
        "Art",
        "Music",
      ],
    },
  ];

  // DB FILTERS
  const filteredProjects = projects.filter((project) => {
    // difficulty comes from DB: "Beginner", "Intermediate", "Advanced"
    const difficultyMatch =
      (project.course || "").toUpperCase() === selectedDifficulty;

    // subscription from DB: "Free" or "Premium"
    const subscriptionMatch =
      subscriptionFilter.length === 0 ||
      subscriptionFilter
        .map((v) => v.toLowerCase())
        .includes((project.subscription || "").toLowerCase());

    return difficultyMatch && subscriptionMatch;
  });

  return (
    <>
      {/* PROJECT LIBRARY HEADER: added user={user} */}
      <ProjectLibraryHeader user={user} />

      {/* ======= MAIN LAYOUT ======= */}
      <div className="app-container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo"></div>

          {/* FILTER PANEL */}
          <div className="filter-panel">
            {filterSections.map((section) => (
              <div key={section.title}>
                <h3>{section.title}</h3>

                {section.options.map((option) => {
                  // SUBSCRIPTION = functional
                  if (section.title === "SUBSCRIPTION") {
                    return (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={subscriptionFilter.includes(
                            option.toUpperCase()
                          )}
                          onChange={(e) =>
                            setSubscriptionFilter((prev) =>
                              e.target.checked
                                ? [...prev, option.toUpperCase()]
                                : prev.filter((v) => v !== option.toUpperCase())
                            )
                          }
                        />
                        {option}
                      </label>
                    );
                  }

                  // other filters visual only for now
                  return (
                    <label key={option}>
                      <input type="checkbox" />
                      {option}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="main">
          <header className="topbar"></header>

          <main className="content project-library">
            <h1 className="page-title">PROJECTS</h1>
            <p className="page-description">
              Welcome to the project library. You can use the filters on the
              side to search for specific projects.
            </p>

            {/* TOP CONTROL TABS */}
            <div className="top-controls">
              {/* difficulty */}
              <div className="difficulty-tabs">
                {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((level) => (
                  <button
                    key={level}
                    className={`difficulty-tab ${
                      selectedDifficulty === level ? "active" : ""
                    }`}
                    onClick={() => setSelectedDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {/* show 5/10/all */}
              <div className="show-controls">
                <span className="show-label">SHOW</span>

                <button
                  className={`show-btn ${visibleCount === 5 ? "active" : ""}`}
                  onClick={() => setVisibleCount(5)}
                >
                  5
                </button>

                <button
                  className={`show-btn ${visibleCount === 10 ? "active" : ""}`}
                  onClick={() => setVisibleCount(10)}
                >
                  10
                </button>

                <button
                  className={`show-btn ${
                    visibleCount === filteredProjects.length ? "active" : ""
                  }`}
                  onClick={() => setVisibleCount(filteredProjects.length)}
                >
                  All
                </button>
              </div>
            </div>

            {/* PROJECT GRID */}
            <div id="project-grid" className="project-grid">
              {filteredProjects.slice(0, visibleCount).map((project) => {
                //  Intro project routes to dashboard
                if (project.name === "Introduction") {
                  return (
                    <Link
                      key={project.project_id}
                      to="/studentdashboard"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ProjectCard
                        img={`/${project.project_pic}`}
                        title={project.name}
                        tagline={`${project.course} | ${project.activity_type}`}
                      />
                    </Link>
                  );
                }

                //  all other cards normal
                return (
                  <ProjectCard
                    key={project.project_id}
                    img={`/${project.project_pic}`}
                    title={project.name}
                    tagline={`${project.course} | ${project.activity_type}`}
                  />
                );
              })}
            </div>

            {/* ACTION BUTTONS */}
            <div className="project-library-actions">
              <button
                type="button"
                className="pl-btn pl-btn-top"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                BACK TO TOP
              </button>

              {/* Teacher-only button */}
              {isTeacher && (
                <button
                  type="button"
                  className="pl-btn pl-btn-dashboard"
                  onClick={() => navigate("/teacherdashboard")}
                >
                  BACK TO DASHBOARD
                </button>
              )}
            </div>
          </main>
        </div>
      </div>

      <ProjectLibraryFooter />
    </>
  );
}

// TEST LOGINS FOR DIFFERENT USERS:
// copy and paste the code beginning wiht local storage below.  It should show the relevant user with their avatar and keep "persistence"

//Teacher Jasmina Salvador:
// localStorage.setItem("loggedInUser", JSON.stringify({ role:"teacher", teacher_id:1, fullName:"Jasmina Salvador", profile_pic:"teachers/JasminaSalvador.png" })), window.location.reload();

//Student 1 Aiden:
// localStorage.setItem("loggedInUser", JSON.stringify({ role:"student", student_id:1, fullName:"Aiden Andrews", profile_pic:"/images/students/AidenAndrews.png" })), window.location.reload();

//Student 2 Alice:
// localStorage.setItem("loggedInUser", JSON.stringify({ role:"student", student_id:2, fullName:"Alice Kindellan", profile_pic:"/images/students/AliceKindellan.png" })), window.location.reload();

//Student 12 (default) Rawiri:
// localStorage.setItem("loggedInUser", JSON.stringify({ role:"student", student_id:12, fullName:"Rawiri Fletcher", profile_pic:"/images/students/RawiriFletcher.png" })), window.location.reload();

//LOGIN CLEAR: use this to clear the log if you have issues
//localStorage.removeItem("loggedInUser"), window.location.reload();
