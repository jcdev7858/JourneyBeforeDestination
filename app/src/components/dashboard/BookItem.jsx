import Flex from "../ui/Flex";
import styles from "./BookItem.module.css";

export default function BookItem({ children }) {
  return (
    <Flex className={styles.book}>
      <span className={styles.gem}></span>
      {children}
    </Flex>
  );
}
