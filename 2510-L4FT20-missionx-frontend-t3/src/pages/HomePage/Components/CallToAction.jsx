import React from 'react';
import styles from './CallToAction.module.css';


import classroomImage from '../../../assets/Home/classroom.png';

function CallToAction({ onOpenRegisterLogin }) {


  return (
    <section className={styles.section}>
     
      <div className={styles.imageWrapper}>
        <img
          src={classroomImage}
          alt="Classroom visual"
          className={styles.image}
        />
      </div>

    
      <div className={styles.textWrapper}>
        <h1 className={styles.heading}>What are you waiting for?</h1>
        <h2 className={styles.subheading}>Start teaching Digital Technologies <br></br> today.</h2>
        <p className={styles.paragraph}>
          If you need more information, we are happy to answer any questions you may have.
        </p>

   <div className={styles.buttonRow}>
  <button className={`${styles.button} ${styles.enquire}`}>ENQUIRE NOW</button>
  <button
  className={`${styles.button} ${styles.signUp}`}
  onClick={onOpenRegisterLogin}
>
  SIGN UP
</button>



</div>

      </div>
    </section>
  );
}

export default CallToAction;

