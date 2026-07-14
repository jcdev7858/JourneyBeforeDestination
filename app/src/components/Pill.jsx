import styles from "./Pill.module.css";

export default function Pill({ children, clickable = false, onClick, active = false }) {
  const classes = [styles.pill, clickable && styles.chip, active && styles.on]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} onClick={onClick}>
      {children}
    </span>
  );
}
