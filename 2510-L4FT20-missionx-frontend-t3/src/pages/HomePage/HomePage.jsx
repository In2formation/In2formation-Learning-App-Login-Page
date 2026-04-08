import React, { useState } from "react"; // Imports React and state management hook

// Components for HomePage
import RegisterLogin from "./../LoginSignup/RegisterLogin"; // Modal for login and signup
import styles from "./HomePage.module.css"; // Module-scoped CSS classes
import HeroBanner from "./Components/HeroBanner"; // Top hero section
import Header from "./Components/Header.jsx"; // Main site header
import Footer from "./Components/Footer.jsx"; // Global footer
import FunctionalElements from "./Components/FunctionalElements.jsx"; // Functional features section
import WhatWeOffer from "./Components/WhatWeOffer"; // Programme offering section
import CallToAction from "./Components/CallToAction"; // CTA block
import HowProgHelpsFunctional from "./Components/HowProgHelpsFunctional.jsx"; // Tabbed content switcher

function HomePage({ student, setStudent }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Tracks visibility of login/signup modal
  return (
    <div className={styles.pageWrapper}>
      {" "}
      {/* Main page container */}
      <Header
        student={student} // Passes logged-in user to header
        onOpenRegisterLogin={() => setIsModalOpen(true)} // Opens modal from header
      />
      <HeroBanner onOpenRegisterLogin={() => setIsModalOpen(true)} />{" "}
      {/* Opens modal from hero */}
      <RegisterLogin
        isOpen={isModalOpen} // Controls modal visibility
        onClose={() => setIsModalOpen(false)} // Closes modal
        setStudent={setStudent} // Updates logged-in user state
      />
      <WhatWeOffer /> {/* Programme offering section */}
      <FunctionalElements /> {/* Functional features section */}
      {/* <NonFunctionalSection/>  */} {/* Optional non-functional section */}
      {/* <StudentProjects /> */} {/* Optional student projects */}
      <HowProgHelpsFunctional />{" "}
      {/* Tabbed content switcher for programme benefits */}
      <CallToAction onOpenRegisterLogin={() => setIsModalOpen(true)} />{" "}
      {/* CTA triggers modal */}
      <Footer /> {/* Global footer */}
    </div>
  );
}

export default HomePage; // Exports component for routing
