import { useEffect, useState } from "react";
import styles from "./StudentProfiles.module.css";
import StudentCard from "./components/StudentCard";

export default function StudentProfiles() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.panel}>
        <div className={styles.scroller}>
        <div className={styles.grid}>
          {students.map((student) => (
            <StudentCard
              key={student.student_id}
              name={student.fullName}
              image={student.profile_pic}
            />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
