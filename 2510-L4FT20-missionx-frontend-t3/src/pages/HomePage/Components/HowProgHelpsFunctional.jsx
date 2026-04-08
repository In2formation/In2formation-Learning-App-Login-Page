import React, { useState } from 'react';
import styles from './HowProgHelpsFunctional.module.css';
import starIcon from '../../../assets/Home/star.png';

function HowProgHelpsFunctional() {
  const [selectedSection, setSelectedSection] = useState("LEARNING PATHWAYS");

  function renderSection() {
    if (selectedSection === "LEARNING PATHWAYS") {
      return (
        <>
          <h1 className={styles.heading}>Learning Pathways</h1>
          <p className={styles.intro}>
            This programme gives us 5 important interlinking Learning Pathways.
          </p>

          <div className={styles.list}>
            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Computational Thinking</h2>
                <p className={styles.itemDescription}>
                  Students express problems and form solutions designed for computer-based applications.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Developing Digital Outcomes</h2>
                <p className={styles.itemDescription}>
                  Strengthens personal outcomes to form strong applications.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Designing Processed Outcomes</h2>
                <p className={styles.itemDescription}>
                  Teaches how outcomes are processed, thought about, and produced.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Visual and Social Communications</h2>
                <p className={styles.itemDescription}>
                  Design visually pleasing applications that keep users aware of screen activity.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Strong Technological Practices</h2>
                <p className={styles.itemDescription}>
                  Shows best practices for solving problems using technology.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (selectedSection === "DIGITAL TECHNOLOGIES") {
      return (
        <>
          <h1 className={styles.heading}>Digital Technologies</h1>
          <p className={styles.intro}>
            This section describes how the programme supports Digital Technologies and builds student confidence through five key capabilities:
          </p>

          <div className={styles.list}>
            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Problem Solving</h2>
                <p className={styles.itemDescription}>
                  The programme challenges students to think around multiple issues and reconsider the way they interact with computers and related technology.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Decision-Making</h2>
                <p className={styles.itemDescription}>
                  Students learn how digital applications can improve people’s lives through thoughtful and purposeful decision-making.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Confidence</h2>
                <p className={styles.itemDescription}>
                  Developing the skills to manipulate and understand applications builds confidence and empowers students in their learning.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Higher Self-Expectations</h2>
                <p className={styles.itemDescription}>
                  The programme encourages students to think the best of themselves and raise expectations in their learning and development as young adults.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Coherence</h2>
                <p className={styles.itemDescription}>
                  The programme offers students a broader education that makes meaningful links within and across learning areas.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (selectedSection === "KEY COMPETENCIES") {
      return (
        <>
          <h1 className={styles.heading}>Enhance key competencies</h1>
          <p className={styles.intro}>
            The programme enhances capabilities of students in the 5 Key Competencies identified in the New Zealand Curriculum:
          </p>

          <div className={styles.list}>
            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>THINKING</h2>
                <p className={styles.itemDescription}>
                  In particular the programme focused on problem solving, design thinking and computational thinking.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>DISCERNING CODES</h2>
                <p className={styles.itemDescription}>
                  Analysing language, symbols, and texts in order to understand and make sense of the codes in which knowledge is expressed.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>SELF-MANAGEMENT</h2>
                <p className={styles.itemDescription}>
                  Projects and challenges are designed to motivate students to explore and experiment with self-motivation.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>RELATIONSHIPS WITH PEERS</h2>
                <p className={styles.itemDescription}>
                  The programme is designed with unplugged sessions where students interact in a range of different situations, including things like being able to listen well, recognise different points of view, and share ideas.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>PARTICIPATION AND COLLABORATION</h2>
                <p className={styles.itemDescription}>
                  The programme encourages students to be involved in communities, such as family, whānau, school, and contribute and make connections with other people.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (selectedSection === "IR4.0") {
      return (
        <>
          <h1 className={styles.heading}>IR4.0</h1>
          <p className={styles.intro}>
            This section describes how the programme supports IR4.0 and broader educational goals aligned with future-focused learning:
          </p>

          <div className={styles.list}>
            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>IR4.0</h2>
                <p className={styles.itemDescription}>
                  Designed with IT industry experts, the programme develops students to find applicable jobs and careers in the Fourth Industrial Revolution.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Learning to Learn</h2>
                <p className={styles.itemDescription}>
                  The programme sets challenges at the end of every project to encourage students to explore and learn how to learn.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Community Engagement</h2>
                <p className={styles.itemDescription}>
                  Students are encouraged to be involved in communities such as family, friends, and school, contributing and making connections with others.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Cultural Diversity</h2>
                <p className={styles.itemDescription}>
                  Designed in New Zealand, the programme reflects the country’s rich cultural diversity.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Inclusion</h2>
                <p className={styles.itemDescription}>
                  The programme acknowledges students’ identities and talents, allowing them to be creative to their personal ability.
                </p>
              </div>
            </div>

            <div className={styles.item}>
              <img src={starIcon} alt="" className={styles.bullet} />
              <div className={styles.textBlock}>
                <h2 className={styles.itemTitle}>Future Focus</h2>
                <p className={styles.itemDescription}>
                  Students explore future themes such as artificial intelligence and augmented reality.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <div className={styles.sectionWrapper}>
        <p className={styles.bottomSentence}>
          How our programme helps teachers and schools.
        </p>

        <div className={styles.buttonRow}>
          <button
            className={`${styles.button} ${selectedSection === "LEARNING PATHWAYS" ? styles.activeButton : ""}`}
            onClick={() => setSelectedSection("LEARNING PATHWAYS")}
          >
            LEARNING PATHWAYS
          </button>

          <button
            className={`${styles.button} ${selectedSection === "DIGITAL TECHNOLOGIES" ? styles.activeButton : ""}`}
            onClick={() => setSelectedSection("DIGITAL TECHNOLOGIES")}
          >
            DIGITAL TECHNOLOGIES
          </button>

          <button
            className={`${styles.button} ${selectedSection === "KEY COMPETENCIES" ? styles.activeButton : ""}`}
            onClick={() => setSelectedSection("KEY COMPETENCIES")}
          >
            KEY COMPETENCIES
          </button>

          <button
            className={`${styles.button} ${selectedSection === "IR4.0" ? styles.activeButton : ""}`}
            onClick={() => setSelectedSection("IR4.0")}
          >
            IR4.0
          </button>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.contentWrapper}>
          {renderSection()}
        </div>
      </section>
    </>
  );
}

export default HowProgHelpsFunctional;












