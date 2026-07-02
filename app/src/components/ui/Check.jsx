import styles from "./Check.module.css";

export default function Check(props) {
  const { title, onChange, checked } = props;

  return (
    <input
      className={styles.check}
      type="checkbox"
      title={title}
      checked={checked}
      onChange={onChange}
    ></input>
  );
}
