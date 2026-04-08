

import React, { useState } from 'react';

// The imported 'styles' object maps each CSS class to a unique class name.
import styles from './FunctionalElements.module.css';

// Import four images representing different "Student Creations" categories.
import animation from '../../../assets/Home/animation.png';
import games from '../../../assets/Home/games.png';
import chatbots from '../../../assets/Home/chatbots.png';
import augreality from '../../../assets/Home/augreality.png';

// Import four images representing group boxes (rectangular items shown as a row below the sentence).
import groupBox1 from '../../../assets/Home/group1.png';
import groupBox2 from '../../../assets/Home/group2.png';
import groupBox3 from '../../../assets/Home/group3.png';
import groupBox4 from '../../../assets/Home/group4.png';

import laptop1 from '../../../assets/Home/laptop1.png';
import laptop2 from '../../../assets/Home/laptop2.png';
import laptop3 from '../../../assets/Home/laptop3.png';
import laptop4 from '../../../assets/Home/laptop4.png';

// 1)Define a React function component named FunctionalElements.
function FunctionalElements() {


  const [selectedIndex, setSelectedIndex] = useState(0);


  const studentCreations = [animation, games, chatbots, augreality];


  const groupBoxes = [groupBox1, groupBox2, groupBox3, groupBox4];

  const laptopImages = [laptop1, laptop2, laptop3, laptop4];

  let studentRow = null;

  if (studentCreations.length > 0) {

    // Assign JSX to 'studentRow' — this represents the entire tile row.
    studentRow = (

      // Outer container for the tiles row. The CSS class handles layout.
      <div className={styles.studentRow}>
        {
          studentCreations.map((img, index) => (

            <div
              key={index}
              className={`${styles.studentBox} ${selectedIndex === index ? styles.activeBox : ''}`}
              onClick={() => setSelectedIndex(index)} >

              {
          
              }
              <img src={img} alt={`Student Creation ${index + 1}`} className={styles.studentImage} />
            </div>
          ))
        }
      </div>
    );
  }


  let laptop = null;

  // Check whether we have at least one laptop image to display.
  if (laptopImages.length > 0) {

    // Assign the JSX that renders the large laptop image and the navigation circles.
    laptop = (


      <div className={styles.laptopWrapper}>

        {
       
        }
        <img
          src={laptopImages[selectedIndex]}
          alt={`Laptop screen ${selectedIndex + 1}`}
          className={styles.laptopImage}
        />


        {
       
        }
        <div className={styles.circleRow}>
          {

      
            laptopImages.map((_, index) => (

         
              <div
                key={index}

    
                className={`${styles.circle} ${selectedIndex === index ? styles.filled : ''}`}

                onClick={() => setSelectedIndex(index)}
              />
            ))
          }
        </div>
      </div>
    );
  }

  
  let midSentence = null;

 
  if (groupBoxes.length > 0) {

  
    midSentence = (

    
      <p className={styles.midSentence}>
        Teaching kids programming and digital skills is MORE than just writing code.
      </p>
    );
  }

  let groups = null;

  // Check if there is at least one group box image to render.
  if (groupBoxes.length > 0) {

    // Assign JSX for the horizontal row of group box images.
    groups = (

      // The container that lays out the group box images in a row (e.g., flex with gap).
      <div className={styles.groupRow}>
        {

  
          groupBoxes.map((img, index) => (

          
            <img
              key={index}

              // The image URL to display for this group box.
              src={img}

              // Accessible alt text describing the position (first, second, etc.) via (index + 1).
              alt={`Group Box ${index + 1}`}

              // CSS Module class sizes and shapes the group box image
              className={styles.groupImage}
            />
          ))
        }
      </div>
    );
  }

  return (

    <div>

      {

      }
      <div className={styles.wrapper}>

        {
         
        }
        {studentRow}

        {
       
        }
        {laptop}
      </div>

      {
   
      }
      {midSentence}
      
      {
     
      }
      {groups}
    </div>
  );
}


export default FunctionalElements;











