import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.topbar}>
      <NavLink className={styles.wordmark} to="/">
        Journey <span>Before</span> Destination
      </NavLink>
      <nav className={styles.nav} id="nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/oaths">Oaths</NavLink>
        <NavLink to="/journal">Journal</NavLink>
        <NavLink to="/radiantdex">RadiantDex</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
}
