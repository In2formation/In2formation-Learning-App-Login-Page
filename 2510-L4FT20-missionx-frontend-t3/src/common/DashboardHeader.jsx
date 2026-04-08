
import styles from "./DashboardHeader.module.css";
import LevelUpWorksblue from "../assets/NavBar/LevelUpWorks-blue.png";
import MaoriFlag from "../assets/NavBar/MaoriFlag.png";
import NZFlag from "../assets/NavBar/NZFlag.png";

export default function DashboardHeader() {
 return (
     <div className={styles.header}>
       <img src={LevelUpWorksblue} className={styles.logo}/>
       <img src={MaoriFlag} className={styles.flags}/>
       <img src={NZFlag} className={styles.flags}/>

       <div className={styles.rightButtons}>
         <button className={styles.help}>Help Centre</button>
         <button className={styles.more}>More Projects</button>
       </div>
     </div>
   );
 }
 
