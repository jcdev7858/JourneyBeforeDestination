import Check from "../ui/Check";
import styles from "./ActionItem.module.css";

export default function ActionItem({ action, checked, onChange }) {
  const classes = [styles.action, checked && styles.done].filter(Boolean).join(" ");
  return (
    <li className={classes}>
      <Check checked={checked} onChange={onChange} />
      <label>{`${action}`}</label>
    </li>
  );
}
