import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.topbar}>
      <a className={styles.wordmark} href="#">
        Journey <span>Before</span> Destination
      </a>
      <nav className={styles.nav} id="nav">
        <a href="#">Dashboard</a>
        <a href="#">Oaths</a>
        <a href="#">Journal</a>
        <a href="#">RadiantDex</a>
        <a href="#">Profile</a>
      </nav>
    </header>
  );
}
