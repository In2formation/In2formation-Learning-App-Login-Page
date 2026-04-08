
import styles from "./StudentRow.module.css";

export default function StudentRow({ student, name, completed = 0, completedProjects = null, totalProjects = 15 }) {
  const studentName = student?.name ?? name ?? "Unnamed Student";
  const total = student?.totalProjects ?? totalProjects;

  // completed can be a number (count) or an array of project numbers
  const explicitCompletedList =
    completedProjects ?? (Array.isArray(student?.completed) ? student.completed : null);

  const completedCount = typeof student?.completed === 'number' ? student.completed : completed;

  const completedSet = explicitCompletedList
    ? new Set(explicitCompletedList.map((n) => Number(n)).filter((n) => !Number.isNaN(n)))
    : null;

  const circles = Array.from({ length: total }, (_, i) => i + 1);

  const displayCompleted = completedSet ? completedSet.size : completedCount;

  return (
    <div className={styles.row} data-student-id={student?.id ?? ''}>
      <div className={styles.info}>
        <h3>{studentName}</h3>
        <p>{displayCompleted}/{total} Projects Completed</p>
      </div>

      <div className={styles.circles}>
        {circles.map((num) => {
          const isCompleted = completedSet ? completedSet.has(num) : num <= completedCount;
          return (
            <div
              key={num}
              className={`${styles.circle} ${isCompleted ? styles.completed : ""}`}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
