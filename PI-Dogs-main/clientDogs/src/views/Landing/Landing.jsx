
import { NavLink } from "react-router-dom";
import styles from './Landing.module.css'
export default function LandingPage() {
  return (
    
      <div className={styles.landingContainer}>
        <h1 className={styles.landingText}>go to home</h1>
        <NavLink to="/home">
          <a className={styles.landingButton}>go</a>
        </NavLink>
      </div>
    
  );
}
