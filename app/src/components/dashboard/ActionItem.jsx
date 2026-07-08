import Check from "../ui/Check";
import Flex from "../ui/Flex";
import styles from "./ActionItem.module.css";

export default function ActionItem({ action, checked, onChange }) {
  const classes = [styles.action, styles.tickable, checked && styles.done]
    .filter(Boolean)
    .join(" ");
  return (
    <Flex className={classes} onClick={onChange}>
      <Check checked={checked} />
      <label>{`${action}`}</label>
    </Flex>
  );
}
