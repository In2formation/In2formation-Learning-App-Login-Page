import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectLibraryHeader from "../../common/ProjectLibraryHeader";
import ProjectLibraryFooter from "../../common/ProjectLibraryFooter";
import StudentCard from "./components/StudentCard";
import "./StudentProfileViewer.css";

export default function StudentProfileViewer() {
  const navigate = useNavigate();
  const { id } = useParams(); // 👈 pulls student ID from /studentprofileviewer/:id

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // default student id if user goes to /studentprofileviewer with no id
    const studentId = id || 1;

    setLoading(true);

    fetch(`http://localhost:4000/students/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("STUDENT FROM DB:", data);
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch student:", err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="spv-page">
      <ProjectLibraryHeader user={student} />

      <div className="student-profile-wrapper">
        <main className="student-profile-container">
          {loading && <p>Loading student...</p>}

          {!loading && student && <StudentCard student={student} />}

          {!loading && !student && <p>Student not found.</p>}
        </main>

        <div className="spv-actions">
          <button
            type="button"
            className="spv-button"
            onClick={() => navigate("/projectlibrary")}
          >
            BACK TO PROJECTS
          </button>
        </div>
      </div>

      <ProjectLibraryFooter />
    </div>
  );
}
