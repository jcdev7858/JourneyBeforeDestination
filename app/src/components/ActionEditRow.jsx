import Flex from "./ui/Flex";
import styles from "./ActionEditRow.module.css";
import formStyles from "./ui/Form.module.css";
import Button from "./ui/Button";
import Check from "./ui/Check";
import { Trash2 } from "lucide-react";

const ActionEditRow = (props) => {
  const { title, checked, onToggle, onRename, onTrash } = props;
  return (
    <Flex className={styles.actionEdit}>
      <Check title="Mark complete" checked={checked} onChange={onToggle} />
      <input
        className={formStyles.input}
        placeholder="Describe a concrete action…"
        value={title}
        onChange={onRename}
      ></input>
      <Button
        className={`${styles.iconBtn} ${styles.danger}`}
        title="Delete action"
        icon={<Trash2 />}
        onClick={onTrash}
      ></Button>
    </Flex>
  );
};

export default ActionEditRow;
