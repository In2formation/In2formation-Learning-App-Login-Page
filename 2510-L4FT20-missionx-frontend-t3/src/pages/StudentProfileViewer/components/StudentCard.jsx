import React from "react";
import "./StudentCard.css";

export default function StudentCard({ student }) {
  if (!student) return null;

  return (
    <div className="student-card-layout">
      {/* LEFT BOX */}
      <div className="student-avatar-box">
        <img
          src={
            student.profile_pic.startsWith("/")
              ? student.profile_pic
              : `/${student.profile_pic}`
          }
          alt={student.fullName}
        />

        <button className="student-btn">EDIT PROFILE</button>
        <button className="student-btn">CHANGE INFO</button>
      </div>

      {/* RIGHT BOX */}
      <div className="student-info-box">
        <h2>{student.fullName}</h2>

        <div className="student-info-grid">
          <div className="label">School:</div>
          <div className="value">{student.school || "N/A"}</div>

          <div className="label">Teacher:</div>
          <div className="value">{student.teacher_name || "N/A"}</div>

          <div className="label">Course:</div>
          <div className="value">{student.course || "N/A"}</div>

          <div className="label">Date of Birth:</div>
          <div className="value">
            {student.date_of_birth
              ? new Date(student.date_of_birth).toLocaleDateString("en-NZ")
              : "N/A"}
          </div>

          <div className="label">Contact No:</div>
          <div className="value">{student.contact_number || "N/A"}</div>

          <div className="label">Email Address:</div>
          <div className="value">{student.email || "N/A"}</div>
        </div>
      </div>
    </div>
  );
}
// Date of Birth format changed for NZ date format e.g. day/month/year  ---> 14/11/2010
