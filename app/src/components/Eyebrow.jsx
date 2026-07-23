import styles from "./Eyebrow.module.css";

const Eyebrow = ({ lead, trail }) => {
  return (
    <div className={styles.eyebrow}>
      <span className={styles.dot}></span>
      <span>{`${lead} · ${trail}`}</span>
    </div>
  );
};

export default Eyebrow;
