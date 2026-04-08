import styles from "./ProgressTracker.module.css";
import StudentRow from "./components/StudentRow";
import {useEffect, useState} from 'react';

export default function ProgressTracker() {

  const [students, setStudents] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    // fetch students and progress, then set state
    Promise.all([
      fetch("http://localhost:4000/api/students").then((r) => r.json()),
      fetch("http://localhost:4000/api/progress-tracker").then((r) => r.json()),
    ])
      .then(([studentsData, progressData]) => {
        setStudents(studentsData || []);
        setProgress(progressData || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BEGINNER COURSE</h1>

      <div className={styles.list}>
      {students.map((s) => {
        // match MySQL schema: progress entries have `student_id`, `project_id`, `date_completed`
        const entries = progress.filter(
          (p) => p.student_id === s.student_id && p.date_completed
        );

        // extract numeric project ids from the entries (use `project_id` from DB)
        const completedProjects = Array.from(
          new Set(
            entries
              .map((p) => p.project_id ?? p.projectId ?? p.project_id)
              .map((v) => (v == null ? null : Number(v)))
              .filter((n) => n != null && !Number.isNaN(n))
          )
        );

        const studentObj = {
          id: s.student_id,
          name: s.fullName,
          completed: completedProjects.length,
          completedProjects,
          totalProjects: s.totalProjects ?? 15,
        };

        return (
          <StudentRow
            key={s.student_id || s.fullName}
            student={studentObj}
          />
        );
      })}
      </div>
    </div>
  );
}
