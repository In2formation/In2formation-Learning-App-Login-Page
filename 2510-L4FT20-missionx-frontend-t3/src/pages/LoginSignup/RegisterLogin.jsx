import React, { useState } from "react"; // Imports React and state hook
import styles from "./RegisterLogin.module.css"; // Imports scoped CSS module
import studentImg from "../../assets/LoginSignup/students.png"; // Student section image asset
import teacherImg from "../../assets/LoginSignup/teachers.png"; // Teacher section image asset
import escIcon from "../../assets/LoginSignup/esc.png"; // Close icon asset
import { useAuth } from "../../context/AuthContext"; // Provides authentication context functions

function RegisterLogin({ isOpen, onClose, setStudent }) {
  const { logout } = useAuth(); // Extracts logout handler from auth context
  const [activeTab, setActiveTab] = useState("login"); // Tracks whether login or signup tab is active

  // Stores the student login form fields
  const [studentLoginData, setStudentLoginData] = useState({
    email: "",
    password: "",
  }); // Initializes student login state object

  // Stores the teacher login form fields
  const [teacherLoginData, setTeacherLoginData] = useState({
    email: "",
    password: "",
  }); // Initializes teacher login state object

  // Stores the student signup form fields
  const [studentSignupData, setStudentSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); // Initializes student signup state object

  // Stores the teacher signup form fields
  const [teacherSignupData, setTeacherSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); // Initializes teacher signup state object

  /**
   * When the modal closes:
   * - Reset all form fields
   * - Reset both login/signup modes
   *
   * This prevents old data from appearing when the modal is reopened.
   */
  React.useEffect(() => {
    if (!isOpen) {
      setActiveTab("login"); // Resets active tab to login when modal closes

      setTeacherSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Clears teacher signup fields

      setStudentSignupData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }); // Clears student signup fields

      setStudentLoginData({
        email: "",
        password: "",
      }); // Clears student login fields

      setTeacherLoginData({
        email: "",
        password: "",
      }); // Clears teacher login fields
    }
  }, [isOpen]); // Runs effect whenever modal open state changes

  // Updates student login form fields as the user types
  function handleStudentLoginChange(e) {
    setStudentLoginData({
      ...studentLoginData,
      [e.target.name]: e.target.value,
    }); // Updates specific student login field by key
  }

  /**
   * Handles student login:
   * Same backend message pattern as teacher login.
   */
  async function handleStudentLoginSubmit() {
    try {
      if (!studentLoginData.email || !studentLoginData.password) {
        alert("Please enter email and password");
        return;
      } // Validates required student login fields

      console.log("Login attempt:", studentLoginData); // Logs outgoing login payload

      const response = await fetch("http://localhost:4000/student-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentLoginData),
      }); // Sends login request to backend API

      const data = await response.json(); // Parses backend JSON response
      console.log("Login response:", data); // Logs backend response for debugging

      // Backend server error
      if (data.error) {
        alert(data.error);
        return;
      } // Handles backend-level error response

      // Successful login
      if (data.success) {
        alert(data.message); // backend message
        setStudent(data.student); // Stores authenticated student in parent state
        localStorage.setItem("loggedInUser", JSON.stringify(data.student)); // Persists session in localStorage
        window.location.href = "/projectlibrary"; // Redirects to student dashboard
      } else {
        // Invalid login (backend-defined)
        alert(data.message); // Displays backend invalid login message
      }
    } catch (err) {
      console.error("Login error:", err); // Logs unexpected runtime error
      alert("Login failed"); // Displays fallback error message
    }
  }

  // Updates student signup form fields
  function handleStudentSignupChange(e) {
    setStudentSignupData({
      ...studentSignupData,
      [e.target.name]: e.target.value,
    }); // Updates specific student signup field by key
  }

  /**
   * Handles student signup:
   * Backend returns insertId on success.
   */
  async function handleStudentSignupSubmit() {
    try {
      if (!studentSignupData.fullName || !studentSignupData.email || !studentSignupData.password) {
        alert("Please fill out all fields");
        return;
      } // Validates required student signup fields

      console.log("Student signup attempt:", studentSignupData); // Logs outgoing signup payload

      const response = await fetch("http://localhost:4000/student-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentSignupData),
      }); // Sends signup request to backend API


  const data = await response.json(); // Parses backend JSON response
console.log("Student signup response:", data); // Logs signup response for debugging

// backend login failure
if (data.success) {
  alert(data.message); // optional
  window.location.href = "/projectlibrary"; // Redirects to student dashboard after signup
} else {
  console.error("Signup error:", data.error); // Logs backend signup error
  alert(data.message || "Signup failed"); // Displays backend or fallback error message
}

} catch (err) {
  console.error("Signup error:", err); // Logs unexpected runtime error
  alert("Signup failed"); // Displays fallback error message
}
}

// Updates teacher login form fields as the user types
function handleTeacherLoginChange(e) {
  setTeacherLoginData({
    ...teacherLoginData,
    [e.target.name]: e.target.value,
  }); // Updates specific teacher login field by key
}

/**
 * Handles teacher login:
 * - Sends credentials to backend
 * - Backend returns:
 *      { success: true, message: "...", teacher: {...} }
 *      { success: false, message: "Invalid login" }
 *      { error: "Internal server error." }
 * - Frontend displays ONLY backend messages
 */
async function handleTeacherLoginSubmit() {
  if (!teacherLoginData.email || !teacherLoginData.password) {
    alert("Please enter email and password");
    return;
  } // Validates required teacher login fields

  console.log("Teacher login attempt:", teacherLoginData); // Logs outgoing login payload

  const response = await fetch("http://localhost:4000/teacher-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacherLoginData),
  }); // Sends teacher login request to backend

  const data = await response.json(); // Parses backend JSON response
  console.log("Teacher login response:", data); // Logs backend response for debugging

  // Backend-level failure (database offline, SQL error, etc.)
  if (data.error) {
    alert(data.error); // Displays backend error message
    return;
  }

  // Backend-level success
  if (data.success) {
    alert(data.message); // Displays backend success message
    localStorage.setItem("loggedInUser", JSON.stringify(data.teacher)); // Stores teacher session in localStorage
    window.location.href = "/teacherdashboard"; // Redirects to teacher dashboard
  } else {
    // Backend-level invalid login
    alert(data.message); // Displays backend invalid login message
  }
}

// Updates teacher signup form fields
function handleTeacherSignupChange(e) {
  setTeacherSignupData({
    ...teacherSignupData,
    [e.target.name]: e.target.value,
  }); // Updates specific teacher signup field by key
}

/**
 * Handles teacher signup:
 * - Uses try/catch to handle network or server errors
 * - Backend returns insertId on success
 */
async function handleTeacherSignupSubmit() {
  try {
    if (!teacherSignupData.fullName || !teacherSignupData.email || !teacherSignupData.password) {
      alert("Please fill out all fields");
      return;
    } // Validates required teacher signup fields

    console.log("Teacher signup attempt:", teacherSignupData); // Logs outgoing signup payload

    const response = await fetch("http://localhost:4000/teacher-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherSignupData),
    }); // Sends teacher signup request to backend

    const data = await response.json(); // Parses backend JSON response
    console.log("Teacher signup response:", data); // Logs backend response for debugging

    // Match student-signup logic
    if (data.success) {
      alert(data.message); // optional
      window.location.href = "/teacherdashboard"; // Redirects to teacher dashboard after signup
    } else {
      console.error("Signup error:", data.error); // Logs backend signup error
      alert(data.message || "Signup failed"); // Displays backend or fallback error message
    }

  } catch (err) {
    console.error("Signup error:", err); // Logs unexpected runtime error
    alert("Signup failed"); // Displays fallback error message
  }
}

if (!isOpen) return null; // Prevents modal from rendering when closed

function handleExitClick() {
  const savedUser = localStorage.getItem("loggedInUser"); // Retrieves stored session

  if (savedUser) {
    logout(); // clears user + localStorage
    window.location.href = "/"; // Redirects to home after logout
  } else {
    onClose(); // Closes modal when no session exists
  }
}

 return (
  <div className={styles.overlay}> {/* Modal overlay container */}
    <div className={styles.modal}> {/* Modal wrapper */}

      <button className={styles.closeButton} onClick={handleExitClick}> {/* Close button triggers exit handler */}
        <img src={escIcon} alt="Close" className={styles.closeIcon} /> {/* Close icon asset */}
      </button>

      <div className={styles.container}> {/* Wrapper for both user sections */}

        {/* STUDENT SECTION */}
        <div className={styles.section}> {/* Student section container */}
          <img src={studentImg} alt="Student" className={styles.topImage} /> {/* Student header image */}
          <h1 className={styles.title}>Students</h1> {/* Student section title */}

          <div className={styles.tabRow}> {/* Tab selector row */}
            <span
              className={`${styles.tab} ${activeTab === "login" ? styles.activeLogin : ""}`} /* Highlights login tab */
              onClick={() => setActiveTab("login")} /* Switches to login mode */
            >
              LOG IN
            </span>

            <span
              className={`${styles.tab} ${activeTab === "signup" ? styles.activeSignup : ""}`} /* Highlights signup tab */
              onClick={() => setActiveTab("signup")} /* Switches to signup mode */
            >
              SIGN UP
            </span>
          </div>

          {/* STUDENT LOGIN */}
          {activeTab === "login" && ( /* Renders login form when login tab is active */
            <div className={styles.form}> {/* Student login form container */}
              <input
                name="email"
                value={studentLoginData.email}
                onChange={handleStudentLoginChange} /* Updates student login email */
                type="email"
                placeholder="Email Address"
                className={styles.input}
              />

              <input
                name="password"
                value={studentLoginData.password}
                onChange={handleStudentLoginChange} /* Updates student login password */
                type="password"
                placeholder="Password"
                className={styles.input}
              />

              <button
                className={styles.actionButton}
                onClick={handleStudentLoginSubmit} /* Submits student login request */
              >
                LOG IN
              </button>
            </div>
          )}

          {/* STUDENT SIGNUP */}
          {activeTab === "signup" && ( /* Renders signup form when signup tab is active */
            <div className={styles.form}> {/* Student signup form container */}
              <input
                name="fullName"
                value={studentSignupData.fullName}
                onChange={handleStudentSignupChange} /* Updates student full name */
                type="text"
                placeholder="Full Name"
                className={styles.input}
              />

              <input
                name="email"
                value={studentSignupData.email}
                onChange={handleStudentSignupChange} /* Updates student signup email */
                type="email"
                placeholder="Email Address"
                className={styles.input}
              />

              <input
                name="password"
                value={studentSignupData.password}
                onChange={handleStudentSignupChange} /* Updates student signup password */
                type="password"
                placeholder="Password"
                className={styles.input}
              />

              <input
                name="confirmPassword"
                value={studentSignupData.confirmPassword}
                onChange={handleStudentSignupChange} /* Updates student confirm password */
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
              />

              <button
                className={styles.actionButton}
                onClick={handleStudentSignupSubmit} /* Submits student signup request */
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>

        {/* TEACHER SECTION */}
        <div className={styles.section}> {/* Teacher section container */}
          <img src={teacherImg} alt="Teacher" className={styles.topImage} /> {/* Teacher header image */}
          <h1 className={styles.title}>Teachers</h1> {/* Teacher section title */}

          <div className={styles.tabRow}> {/* Tab selector row */}
            <span
              className={`${styles.tab} ${activeTab === "login" ? styles.activeLogin : ""}`} /* Highlights login tab */
              onClick={() => setActiveTab("login")} /* Switches to login mode */
            >
              LOG IN
            </span>

            <span
              className={`${styles.tab} ${activeTab === "signup" ? styles.activeSignup : ""}`} /* Highlights signup tab */
              onClick={() => setActiveTab("signup")} /* Switches to signup mode */
            >
              SIGN UP
            </span>
          </div>

          {/* TEACHER LOGIN */}
          {activeTab === "login" && ( /* Renders login form when login tab is active */
            <div className={styles.form}> {/* Teacher login form container */}
              <input
                name="email"
                value={teacherLoginData.email}
                onChange={handleTeacherLoginChange} /* Updates teacher login email */
                type="email"
                placeholder="Email Address"
                className={styles.input}
              />

              <input
                name="password"
                value={teacherLoginData.password}
               onChange={handleTeacherLoginChange} /* Updates teacher login password */
                type="password"
                placeholder="Password"
                className={styles.input}
              />

              <button
                className={styles.actionButton}
                onClick={handleTeacherLoginSubmit} /* Submits teacher login request */
              >
                LOG IN
              </button>
            </div>
          )}

          {/* TEACHER SIGNUP */}
          {activeTab === "signup" && ( /* Renders signup form when signup tab is active */
            <div className={styles.form}> {/* Teacher signup form container */}
              <input
                name="fullName"
                value={teacherSignupData.fullName}
                onChange={handleTeacherSignupChange} /* Updates teacher full name */
                type="text"
                placeholder="Full Name"
                className={styles.input}
              />

              <input
                name="email"
                value={teacherSignupData.email}
                onChange={handleTeacherSignupChange} /* Updates teacher signup email */
                type="email"
                placeholder="Email Address"
                className={styles.input}
              />

              <input
                name="password"
                value={teacherSignupData.password}
                onChange={handleTeacherSignupChange} /* Updates teacher signup password */
                type="password"
                placeholder="Password"
                className={styles.input}
              />

              <input
                name="confirmPassword"
                value={teacherSignupData.confirmPassword}
                onChange={handleTeacherSignupChange} /* Updates teacher confirm password */
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
              />

              <button
                className={styles.actionButton}
                onClick={handleTeacherSignupSubmit} /* Submits teacher signup request */
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
);
}
export default RegisterLogin;

