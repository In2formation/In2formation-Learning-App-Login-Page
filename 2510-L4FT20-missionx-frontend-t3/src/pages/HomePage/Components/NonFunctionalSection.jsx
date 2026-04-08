import React from 'react';
import styles from './NonFunctionalSection.module.css';

export default function NonFunctionalSection() {
  return (
    <div className={styles.sectionWrapper}>
      <p className={styles.bottomSentence}>
        How our programme helps teachers and schools.
      </p>

      <div className={styles.buttonRow}>
        <button className={styles.button}>LEARNING PATHWAYS</button>
        <button className={styles.button}>DIGITAL TECHNOLOGIES</button>
        <button className={styles.button}>KEY COMPETENCIES</button>
        <button className={styles.button}>IR4.0</button>
      </div>
    </div>
  );
}





