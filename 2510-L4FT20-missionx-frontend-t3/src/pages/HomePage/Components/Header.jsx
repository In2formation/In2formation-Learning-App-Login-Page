import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

import RegisterLogin from "../../LoginSignup/RegisterLogin.jsx";

import whiteLogo from "../../../assets/NavBar/LevelUpWorks-white.png";
import avatar from "../../../assets/NavBar/Avatar-white.png";
import nzflag from "../../../assets/NavBar/NZFlag.png";
import maoriflag from "../../../assets/NavBar/MaoriFlag.png";

function Header({ student, onOpenRegisterLogin }) {
  console.log("Student object:", student);

  return (
    <div className={styles["navbar-wrapper"]}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={whiteLogo} alt="LevelUp Works" />
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li><Link to="/">HOME</Link></li>
          <li><a href="#">FEATURES</a></li>
          <li><a href="#">TEACHERS</a></li>
        </ul>

        <div className={styles.rightSide}>
          <div className={styles.languageGroup}>
            <span className={styles.languageLabel}>LANG</span>
            <img className={styles.nzflag} src={nzflag} alt="NZ Flag" />
            <img className={styles.maoriflag} src={maoriflag} alt="Maori Flag" />
          </div>

          <div className={styles.userName}>
            {student ? (
              <>
              <img
  src={student.profile_pic || avatar}
  className={styles.avatar}
/>



                <span className={styles.userNameText}>
                  {student.fullName}
                </span>
              </>
            ) : (
              <>
                <img src={avatar} alt="Default avatar" />
                <span
                  className={styles.userNameText}
                  onClick={onOpenRegisterLogin}
                >
                  REGISTER | LOGIN
                </span>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}



export default Header;
