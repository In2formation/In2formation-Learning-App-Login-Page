
import React from 'react';
import styles from './HeroBanner.module.css';
import heroBg from '../../../assets/Home/hero.png';


function HeroBanner({ onOpenRegisterLogin }) {

  return (
    <section 
      className={styles.hero} 
      style={{ backgroundImage: `url(${heroBg})` }}
    >

 <div className={styles.heroContent}></div>

<h1 className={styles.title}>
  Prepare young minds for a better <span className={styles.future}>future.</span>
</h1>



<p className={styles.subtitle}>
  Let us help you advance students in Digital Technologies and other learning areas with our project-based learning programme.
</p>

<div className={styles.buttonGroup}>
  <button className={`${styles.button} ${styles.learnMore}`}>LEARN MORE</button>

  <div className={styles.signUpWrapper}>
   <button
  className={`${styles.button} ${styles.signUp}`}
  onClick={onOpenRegisterLogin}
>
  SIGN UP
</button>


    <p className={styles.subText}>
      *Basic subscription includes the first 15 projects free of charge
    </p>
  </div>
</div>



    </section>        
  );
}




export default HeroBanner;



