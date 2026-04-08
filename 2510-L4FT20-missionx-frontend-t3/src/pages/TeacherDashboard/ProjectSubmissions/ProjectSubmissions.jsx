import React from 'react'
import { useState, useEffect } from 'react'
import styles from './ProjectSubmissions.module.css'

// STUDENT PROFILE PICTURE IMPORTS
// These are the profile pictures displayed next to each submission
// Each student_id maps to their corresponding image
import AidenAndrews from '../../../../public/images/students/AidenAndrews.png'
import AliceKindellan from '../../../../public/images/students/AliceKindellan.png'
import CourtneyBristol from '../../../../public/images/students/CourtneyBristol.png'
import HanuNepe from '../../../../public/images/students/HanuNepe.png'
import HarryMcGrath from '../../../../public/images/students/HarryMcGrath.png'
import JavierFuego from '../../../../public/images/students/JavierFuego.png'
import LisaHoran from '../../../../public/images/students/LisaHoran.png'
import LuciaMendez from '../../../../public/images/students/LuciaMendez.png'
import MarkOLeary from '../../../../public/images/students/MarkOLeary.png'
import NaganiCortes from '../../../../public/images/students/NaganiCortes.png'
import NeveahMachenry from '../../../../public/images/students/NeveahMachenry.png'
import RawiriFletcher from '../../../../public/images/students/RawiriFletcher.png'
import ShaneOMonahan from '../../../../public/images/students/ShaneOMonahan.png'
import SimonLaine from '../../../../public/images/students/SimonLaine.png'
import TokioHan from '../../../../public/images/students/TokioHan.png'

// Import fallback image for submissions without screenshots
import fallbackProjectImage from '../../../assets/StudentDashboard/makeProject-screenshot.png'


// API CONFIGURATION
// This is the base URL for all backend API calls
// Make sure your Express server is running on this port!
const API_BASE_URL = 'http://localhost:4000';

export default function ProjectSubmissions() {

    // STATE VARIABLES
    // These control what the component displays and tracks

    
    // submissions: Array of all project submissions from the database
    const [submissions, setSubmissions] = useState([]);
    
    // loading: Shows a loading spinner/message while fetching data
    const [loading, setLoading] = useState(true);
    
    // error: Stores any error messages to display to the user
    const [error, setError] = useState(null);
    
    // selectedSubmissions: Array of submission IDs that the teacher has checked
    // Used for bulk actions like "Download Files" or "Mark Complete"
    const [selectedSubmissions, setSelectedSubmissions] = useState([]);


    // STUDENT PHOTO MAPPING
    // Maps student_id (number) to their profile picture (imported image)
    // When a submission comes in, we use the student_id to look up their photo

    const studentNames = {
  1: 'Aiden Andrews',
  2: 'Alice Kindellan',
  3: 'Courtney Bristol',
  4: 'Hanu Nepe',
  5: 'Harry McGrath',
  6: 'Javier Fuego',
  7: 'Lisa Horan',
  8: 'Lucia Mendez',
  9: 'Mark O\'Leary',
  10: 'Nagani Cortes',
  11: 'Neveah Machenry',
  12: 'Rawiri Fletcher',
  13: 'Shane O\'Monahan',
  14: 'Simon Laine',
  15: 'Tokio Han'
};
    const studentPhotos = {
      1: AidenAndrews,
      2: AliceKindellan,
      3: CourtneyBristol,
      4: HanuNepe,
      5: HarryMcGrath,
      6: JavierFuego,
      7: LisaHoran,
      8: LuciaMendez,
      9: MarkOLeary,
      10: NaganiCortes,
      11: NeveahMachenry,
      12: RawiriFletcher,
      13: ShaneOMonahan,
      14: SimonLaine,
      15: TokioHan
    };


    // useEffect HOOK - RUNS ONCE WHEN PAGE LOADS
    // Empty dependency array [] means this only runs on initial mount
    // This fetches all submissions from the database when the page opens

    useEffect(() => {
      fetchSubmissions();
    }, []);


    // API CALL: GET ALL SUBMISSIONS FROM DATABASE
    // Endpoint: GET http://localhost:4000/api/projects/submissions
    // This connects to server.js which queries the MySQL database
    // The backend returns: { success: true, submissions: [...] }
    // 
    // Each submission object contains:
    //   - id: The project_id from the database
    //   - submissionText: Description of the submission - need to confirm if this needs to change
    //   - screenshot_path: Path to uploaded image (e.g., "/uploads/project_2024-01-15.png")
    //   - submitted_at: Timestamp when the student submitted

    const fetchSubmissions = async () => {
      // 1. Show loading state and clear any previous errors
      setLoading(true);
      setError(null);

      try {
        // 2. Make the API call to our Express backend
        const response = await fetch(`${API_BASE_URL}/api/projects/submissions`);
        
        // 3. Check if the HTTP request was successful (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 4. Parse the JSON response from the server
        const data = await response.json();
        
        // 5. Check if the backend returned success: true
        if (data.success) {
          // Success! Store the submissions in state
          setSubmissions(data.submissions);
        } else {
          // Backend returned success: false with an error message
          setError(data.error || 'Failed to fetch submissions');
        }
      } catch (error) {
        // 6. Handle any network errors (server not running, etc.)
        console.error('Error fetching submissions:', error);
        setError('Failed to connect to server. Please check if the backend is running.');
      } finally {
        // Step 7: Always hide the loading spinner when done
        setLoading(false);
      }
    };

    // CHECKBOX SELECTION FUNCTIONS
    // handle when the teacher clicks checkboxes to select submissions
    // Toggle a single checkbox on/off
    // If already selected, remove it from the array
    // If not selected, add it to the array
    const toggleSelection = (submissionId) => {
      if (selectedSubmissions.includes(submissionId)) {
        // Already selected - remove it (uncheck)
        setSelectedSubmissions(selectedSubmissions.filter(id => id !== submissionId));
      } else {
        // Not selected - add it (check)
        setSelectedSubmissions([...selectedSubmissions, submissionId]);
      }
    };

    // Check if a specific submission is currently selected
    // Used to set the "checked" property on checkboxes
    const isSelected = (submissionId) => {
      return selectedSubmissions.includes(submissionId);
    };


    // ACTION BUTTON HANDLERS
    // Runs when the teacher clicks the action buttons
 // Download selected files 
 //had to change to URL once I fixed the upload image API POST
    const handleDownloadFiles = () => {
      if (selectedSubmissions.length === 0) {
        alert('Please select submissions to download');
        return;
      }
      
      const selected = submissions.filter(s => selectedSubmissions.includes(s.id));
      
      selected.forEach(sub => {
        const link = document.createElement('a');
        
        if (sub.submission) {
          link.href = `${API_BASE_URL}/api/download?file=${encodeURIComponent(sub.submission)}`;
          link.download = '';
        } else {
          // No screenshot - download the fallback image
          link.href = fallbackProjectImage;
          link.download = `project_${sub.id}_screenshot.png`;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    };

    // Open screenshot in new tab
    const handleEnlargePhoto = (submission) => {
      if (submission.submission) {
  window.open(`${submission.submission}`, '_blank');
      } else {
        // No screenshot - open the fallback image in new tab
        window.open(fallbackProjectImage, '_blank');
      }
    };


    // Handle "Mark as Complete" button click
    // TO DO MISSION X: This needs a PUT endpoint in server.js to actually update the database
    const handleMarkComplete = async () => {
      // Check if any submissions are selected
      if (selectedSubmissions.length === 0) {
        alert('Please select submissions to mark as complete');
        return;
      }

      // TO DO MISSIONX: Add PUT endpoint to your server.js to mark as complete
      // For now, just show an alert
      alert(`Marking ${selectedSubmissions.length} submission(s) as complete...`);
      
      // Clear the checkboxes after the action - thinking I should remove this
      setSelectedSubmissions([]);
    };


    // DATE/TIME FORMATTING FUNCTIONS
    // Convert database timestamps into readable format
    // Format date as: "MON 15 January 2024"
    const formatDate = (dateString) => {
      // Handle null/undefined dates
      if (!dateString) return 'N/A';
      
      // Create a JavaScript Date object from the database string
      const date = new Date(dateString);
      
      // Get each part of the date
      const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(); // "MON"
      const dateNum = date.getDate();  // 15
      const month = date.toLocaleDateString('en-US', { month: 'long' });  // "January"
      const year = date.getFullYear();  // 2024
      
      return `${day} ${dateNum} ${month} ${year}`;
    };

    // Format time as: "02:30 PM"
    const formatTime = (dateString) => {
      // Handle null/undefined dates
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true  // Use 12-hour format with AM/PM
      });
    };

  return (
    <>
      {/* Teacher navigation components */}
      {/* <TeacherHeader/> */}
      {/* <TeacherSidebar/> */}
      
      {/* Main page container */}
      <div className={styles.pageContainer}>
        <div className={styles.contentWrapper}>
          
          {/* PAGE HEADER WITH ACTION BUTTONS */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>PROJECT SUBMISSIONS</h1>

            {/* Action buttons - only show select all when there are submissions */}
            <div className={styles.headerActions}>

              <button className={styles.downloadBtn} onClick={handleDownloadFiles}>
                📥 DOWNLOAD FILES
              </button>
              <button className={styles.completeBtn} onClick={handleMarkComplete}>
                ☑️ MARK AS COMPLETE PROJECT
              </button>
            </div>
          </div>

          {/* SELECTION COUNTER*/}
          {/* Only shows when at least one submission is selected */}
          {selectedSubmissions.length > 0 && (
            <div className={styles.selectionInfo}>
              <p>{selectedSubmissions.length} submission(s) selected</p>
            </div>
          )}

          {/* LOADING STATE */}
          {/* Shows while waiting for API response */}
          {loading && (
            <div className={styles.loading}>
              <p>Loading submissions...</p>
            </div>
          )}

          {/* ERROR STATE */}
          {/* Shows if API call failed - includes retry button */}
          {error && (
            <div className={styles.error}>
              <p>⚠️ {error}</p>
              <button onClick={fetchSubmissions}>Try Again</button>
            </div>
          )}

          {/*  EMPTY STATE */}
          {/* Shows when API succeeded but returned no submissions */}
          {!loading && !error && submissions.length === 0 && (
            <div className={styles.noSubmissions}>
              <p>No submissions in database</p>
            </div>
          )}

          {/* SUBMISSIONS LIST  */}
          {/* Main content - shows all the submission cards */}
          {!loading && !error && submissions.length > 0 && (
            <div className={styles.submissionsList}>
              
              {/* Loop through each submission and create a card */}
              {submissions.map((submission) => (
                <div 
                  key={submission.id}  // React needs unique key for list items
                  className={`${styles.submissionRow} ${isSelected(submission.id) ? styles.selected : ''}`}
                >
                  
                  {/* CHECKBOX*/}
                  <div className={styles.selectionBox}>
                    <input 
                      type="checkbox" 
                      className={styles.checkbox}
                      checked={isSelected(submission.id)}
                      onChange={() => toggleSelection(submission.id)}
                    />
                  </div>

                  {/*  WHITE CARD CONTAINER  */}
                  <div className={styles.submissionCard}>
                    
                    {/* STUDENT PROFILE PHOTO*/}
                    {/* Uses submission.id to look up the student's photo */}
                    {/* Falls back to student 1's photo if no match found */}
                    <div className={styles.studentInfo}>
                      <img 
                      src={studentPhotos[submission.student_id] || studentPhotos[1]} 
                      alt={studentNames[submission.student_id] || 'Student'}
                      className={styles.studentPhoto}/>
                    </div>

                    {/* SUBMISSION DETAILS  */}
                    <div className={styles.submissionDetails}>
                      {/* Submission title - shows submissionText or fallback */}
                      <h3 className={styles.submissionTitle}>
                        {studentNames[submission.student_id] || 'Unknown Student'} submitted a project
                        </h3>
                      
                      {/*  PROJECT SCREENSHOT PREVIEW  */}
                      <div className={styles.projectPreview}>
                        {/* 
                          IMAGE SOURCE LOGIC:
                          1. If submission exists: Show the actual uploaded screenshot
                          2. If submission is null/empty: Show the fallback placeholder image
                          3. If image fails to load (onError): Also show the fallback image

                        */}
                        <img 
                          src={submission.submission 
                            ? `${API_BASE_URL}${submission.submission}` 
                            : fallbackProjectImage
                          }
                          alt="project-screenshot" 
                          className={styles.projectImage}
                          onError={(e) => {
                            // If the image URL is broken or file doesn't exist,
                            // replace with the fallback placeholder image
                            e.target.src = fallbackProjectImage;
                          }}
                        />
                        {/* Button to view full-size screenshot */}
                        <button 
                          className={styles.enlargeBtn} 
                          onClick={(e) => {
                            e.stopPropagation();  // Prevent triggering parent click events
                            handleEnlargePhoto(submission);
                          }}
                        >
                          🔍 ENLARGE PHOTO
                        </button>
                      </div>
                    </div>

                    {/* ---- TIMESTAMP ---- */}
                    {/* Shows when the student submitted their project */}
                    <div className={styles.timestamp}>
                      <p className={styles.date}>
                        {formatDate(submission.submitted_at)}
                      </p>
                      <p className={styles.time}>
                        {formatTime(submission.submitted_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </>
  ); 
}
