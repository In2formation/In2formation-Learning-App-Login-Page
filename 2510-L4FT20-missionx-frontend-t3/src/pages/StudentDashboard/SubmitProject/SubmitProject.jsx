import React from 'react'
import {Link} from 'react-router-dom'

import {useState} from 'react'
import Header from '../../../common/StudentDashboardHeader.jsx'
import sendPhotoIcon from '../../../assets/StudentDashboard/sendPhoto.png'
import callTeacherIcon from '../../../assets/StudentDashboard/callTeacher.png'
import makeProjectScreenshot from '../../../assets/StudentDashboard/makeProject-screenshot.png'
import submitProjectPhoto from '../../../assets/StudentDashboard/submitProject-Photo.png'
import styles from './SubmitProject.module.css'
import Footer from '../../../common/Footer.jsx'
import Sidebar from '../../../common/StudentDashboardSidebar.jsx'

function SubmitProject() {
  const [uploadStatus, setUploadStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // When user clicks "Send Photo" button
  const handleSendPhoto = () => {
    // Open file picker
    document.getElementById('photoInput').click();
  };

  // When user selects a file
// When user selects a file from their computer
const handleFileSelected = (e) => {
  // Get the file they selected
  const file = e.target.files[0];
  
  // If no file selected, do nothing
  if (!file) return;
  
  // Show loading state
  setIsSubmitting(true);
  setUploadStatus('Sending your masterpiece to the teacher...');

  // 1. Prepare data to send to backend
  // FormData is used to send files over HTTP
  const data = new FormData();
  data.append('student_id', 1);  // Hardcoded for demo - would come from login in real app
  data.append('image', file); // The actual image file
  // NOTE: don't send project_id - backend will generate it automatically

  // 2. Send POST request to backend
  fetch('http://localhost:4000/api/projects/submit', {
    method: 'POST',
    body: data
  })
  // 3. Get response from backend
  .then(response => response.json())
  .then(result => {
    // Check if backend says success
    if (result.success) {
      // Show success message
      setUploadStatus('Yay! Photo submitted successfully!');
      // Clear message after 3 seconds
      setTimeout(() => setUploadStatus(''), 3000);
    } else {
      // Backend returned error - think I need to set up consolelog errors to better understand the issue
      setUploadStatus(`Oh no! The photo got lost. Let's try sending it again!`);
    }
    // Stop loading state
    setIsSubmitting(false);
  })
  // 4. Handle any network errors
  .catch(error => {
    console.error('Upload error:', error);
    // This catches errors like server not running
    setUploadStatus(`Uh oh! Something's wrong with the server. Let's try again`);
    setIsSubmitting(false);
  });
};

  const handleCallTeacher = () => {
    alert('Calling teacher...');
  };




  return (
    <>
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <section className={styles.submitSection}>
  
  {/* upload photo section */}
              <div className={styles.projectDisplay}>
              <img 
                src={makeProjectScreenshot} 
                alt="Project Example" 
                className={styles.projectImage}
              />
            </div>
            
            <h2 className={styles.sectionTitle}>Submit project photo</h2>
            <p className={styles.sectionDescription}>
              After completing your project, take a screenshot of your project and upload it here.
            </p>

            {uploadStatus && <p>{uploadStatus}</p>}

            {/* Hidden file input */}
            <input 
              type="file" 
              id="photoInput"
              name="image"
              accept="image/*"
              onChange={handleFileSelected}
              style={{display: 'none'}}
            />

  {/* the pink upload button */}
<div className={styles.uploadContainer}>
  
  <button 
    className={styles.sendButton}
    onClick={handleSendPhoto}
    disabled={isSubmitting}
  >
    <img 
      src={sendPhotoIcon} 
      alt="SendIcon" 
      className={styles.buttonIcon} 
    />
    <span className={styles.buttonText}>
      {isSubmitting ? 'Uploading...' : 'Send Photo'}
    </span>
  </button>
  
</div>
</section>


        {/* Show your teacher section */}
        <section className={styles.teachSection}>
          <div className={styles.teacherDisplay}>
            <img src={submitProjectPhoto} alt="Show teacher" className={styles.teacherImage}/>
          </div>

          {/* section header */}
          <h2 className={styles.sectionTitle}>
            Show your teacher
          </h2>
          <p className={styles.sectionDescription}>
            If your teacher is in the same room as you, click the button below to let them know you are done. 
          </p>
          <button className={styles.callButton} onClick={handleCallTeacher}>
              <img src={callTeacherIcon} alt="Call Teacher Icon" className={styles.buttonIcon} />
            <span>Call Teacher</span>
          </button>
        </section>
      </div>
    </div>
    </>
  )
}

export default SubmitProject