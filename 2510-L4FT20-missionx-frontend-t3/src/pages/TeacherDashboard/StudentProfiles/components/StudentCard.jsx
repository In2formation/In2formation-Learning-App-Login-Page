import styles from "./StudentCard.module.css";

export default function StudentCard({ name, image }) {
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.photo}
      />
      <p className={styles.name}>{name}</p>
    </div>
  );
}
