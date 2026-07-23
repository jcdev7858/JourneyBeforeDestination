import Flex from "../ui/Flex";
import styles from "./DexMetaItem.module.css";

const DexMetaRow = ({ item }) => {
  return (
    <Flex vertical gap={6}>
      <span className={styles.dexMetaLabel}>
        {item.icon} {item.label}
      </span>
      <span className={styles.dexMetaValue}>{item.value}</span>
    </Flex>
  );
};

export default DexMetaRow;
