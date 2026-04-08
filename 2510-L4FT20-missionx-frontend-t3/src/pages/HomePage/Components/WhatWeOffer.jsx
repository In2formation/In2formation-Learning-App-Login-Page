import styles from './WhatWeOffer.module.css';
import FunctionalElements from './FunctionalElements';
{/*import NonFunctionalSection from './NonFunctionalSection';*/}

function WhatWeOffer() {
  return (
    <section className={styles.offerSection}>
  <h2 className={styles.heading}>What We Offer</h2>

      <p className={styles.intro}>
        The Creative Problem Solving programme is series of digital creation projects aimed to encourage self-motivation and student agency, designed by New Zealand's leading IT industry experts and schools.
      </p>


      <h2 className={styles.subHeading}>What will students create?</h2>
      {/* <FunctionalElements /> */}

      {/* <p className={styles.midSentence}>
        Teaching kids programming and digital skills is MORE than just writing code.
      </p> */}

      {/* Combined section: non-functional elements + sentence + buttons */}
      {/* <NonFunctionalSection /> */}
    </section>
  );
}

export default WhatWeOffer



