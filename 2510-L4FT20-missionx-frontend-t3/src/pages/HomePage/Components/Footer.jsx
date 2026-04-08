import styles from "./Footer.module.css";
import { useLocation } from "react-router";

function Footer() {
  const location = useLocation();

  const isDashboard =
    location.pathname === "/dashboard" ||
    location.pathname === "/teacherDashboard" ||
    location.pathname === "/studentDashboard";

  if (isDashboard) {
    return (
      <footer className={styles.dashboardFooter}>
        <p>© LevelUp Works 2020</p>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
      
        <div>
          <h4 className={styles.heading}>COMPANY</h4>
          <ul className={styles.list}>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className={styles.heading}>COURSES</h4>
          <ul className={styles.list}>
            <li><a href="#">Register</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Teachers</a></li>
            <li><a href="#">Parents</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>

       
        <div>
          <h4 className={styles.heading}>SUPPORT</h4>
          <ul className={styles.list}>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Helpdesk</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>LEGAL</h4>
          <ul className={styles.list}>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

      
        <div>
          <h4 className={styles.heading}>LevelUp Works</h4>
          <p className={styles.text}>
            LevelUp Works is an Auckland-based enterprise dedicated to developing game-based 
            learning software to help teachers in response to the New Zealand Digital Technologies 
            & Hangarau Matihiko.
          </p>
          <p className={styles.text}>alan@levelupworks.com</p>
          <p className={styles.text}>(021) 668 185</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer