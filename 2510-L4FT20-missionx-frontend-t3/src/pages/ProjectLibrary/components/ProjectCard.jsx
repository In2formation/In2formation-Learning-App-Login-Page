import React from "react";
import styles from "../ProjectLibrary.module.css";

export default function ProjectCard({ img, title, tagline }) {
  return (
    <div className={styles.projectCard}>
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p className="tagline">{tagline}</p>
    </div>
  );
}
