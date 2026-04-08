console.log("APP.JSX IS RUNNING"); // Shows that the App component loaded
import { useState } from "react"; // Lets the component store and update state
import { Route, Routes } from "react-router"; // Handles page navigation
import "./App.css"; // Loads global styles
import { AuthProvider } from "./context/AuthContext"; // Wraps app with login state

import HomePage from "./pages/HomePage/HomePage"; // Home page component
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard"; // Student dashboard layout
import RegisterLogin from "./pages/LoginSignup/RegisterLogin"; // Login/signup modal page
import StudentProfileViewer from "./pages/StudentProfileViewer/StudentProfileViewer"; // Student profile viewer
import TeacherProfileViewer from "./pages/TeacherProfileViewer/TeacherProfileViewer"; // Teacher profile viewer
import ProjectLibrary from "./pages/ProjectLibrary/ProjectLibrary"; // Project library page
import LearningObjective from "./pages/StudentDashboard/LearningObjective/LearningObjective"; // Student learning objective
import Instructions from "./pages/StudentDashboard/Instructions/Instructions"; // Project instructions
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard"; // Teacher dashboard layout
import VideoTutorial from "./pages/StudentDashboard/VideoTutorial/VideoTutorial"; // Video tutorial page
import MakeProject from "./pages/StudentDashboard/MakeProject/MakeProject"; // Project creation page
import SubmitProject from "./pages/StudentDashboard/SubmitProject/SubmitProject"; // Project submission page
import HelpRequest from "./pages/TeacherDashboard/HelpRequests/HelpRequest"; // Teacher help requests
import ProjectSubmissions from "./pages/TeacherDashboard/ProjectSubmissions/ProjectSubmissions"; // Teacher project review
import ProgressTracker from "./pages/TeacherDashboard/ProgressTracker/ProgressTracker"; // Student progress tracking
import StudentProfiles from "./pages/TeacherDashboard/StudentProfiles/StudentProfiles"; // Teacher student profiles
//Import YourPage from './folder location......' // Placeholder for future pages

function App() {
  const [student, setStudent] = useState(() => { // Stores logged‑in student data
    const saved = localStorage.getItem("loggedInUser"); // Loads saved user from storage
    return saved ? JSON.parse(saved) : null; // Restores user or returns null
  });

  return (
    <>
      <AuthProvider> {/* Provides login state to the whole app */}
        
        <Routes> {/* Defines all available routes in the app */}

          <Route
            path="/"
            element={<HomePage student={student} setStudent={setStudent} />} // Home page with login state
          />

          <Route
            path="/loginsignup"
            element={<RegisterLogin isOpen={true} setStudent={setStudent} />} // Always-open login modal
          />

          <Route
            path="/studentprofileviewer"
            element={<StudentProfileViewer />} // Student profile viewer page
          />

          <Route
            path="/teacherprofileviewer"
            element={<TeacherProfileViewer />} // Teacher profile viewer page
          />

          <Route
            path="/projectlibrary"
            element={<ProjectLibrary student={student} />} // Project library with student data
          />

          <Route path="/studentdashboard" element={<StudentDashboard />}> {/* Student dashboard layout */}
            <Route path="learningobjective" element={<LearningObjective />} /> {/* Learning objective page */}
            <Route path="instructions" element={<Instructions />} /> {/* Instructions page */}
            <Route path="videotutorial" element={<VideoTutorial />} /> {/* Video tutorial page */}
            <Route path="makeproject" element={<MakeProject />} /> {/* Make project page */}
            <Route path="submitproject" element={<SubmitProject />} /> {/* Submit project page */}
          </Route>

          <Route path="/teacherdashboard" element={<TeacherDashboard />}> {/* Teacher dashboard layout */}
            <Route path="progresstracker" element={<ProgressTracker />} /> {/* Track student progress */}
            <Route path="studentprofiles" element={<StudentProfiles />} /> {/* View student profiles */}
            <Route path="helprequests" element={<HelpRequest />} /> {/* View help requests */}
            <Route path="projectsubmissions" element={<ProjectSubmissions />} /> {/* Review submissions */}
          </Route>

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App; // Exports the App component for rendering


 
