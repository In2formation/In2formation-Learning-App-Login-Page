import { Link } from "react-router-dom";
import "./ProjectLibraryFooter.css";

function ProjectLibraryFooter() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>COMPANY</h4>
        <Link to="#">About Us</Link>
        <Link to="#">Careers</Link>
        <Link to="#">Partners</Link>
      </div>

      <div className="footer-section">
        <h4>COURSES</h4>
        <Link to="#">Register</Link>
        <Link to="#">Login</Link>
        <Link to="#">Projects</Link>
        <Link to="#">Teachers</Link>
        <Link to="#">Parents</Link>
        <Link to="#">Resources</Link>
      </div>

      <div className="footer-section">
        <h4>SUPPORT</h4>
        <Link to="#">FAQs</Link>
        <Link to="#">Helpdesk</Link>
        <Link to="#">Contact Us</Link>
      </div>

      <div className="footer-section">
        <h4>LEGAL</h4>
        <Link to="#">Terms & Conditions</Link>
        <Link to="#">Privacy Policy</Link>
      </div>

      <div className="footer-section footer-company">
        <h4>LevelUp Works</h4>
        <p>
          LevelUp Works is an Auckland-based enterprise dedicated to developing
          game based learning software to help teachers in response to the New
          Zealand Digital Technologies & Hangarau Matihiko.
        </p>
        <p>alan@levelupworks.com</p>
        <p>(021) 668 185</p>
      </div>
    </footer>
  );
}

export default ProjectLibraryFooter;
