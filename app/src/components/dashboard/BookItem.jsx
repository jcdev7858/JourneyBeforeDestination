import Flex from "../ui/Flex";
import styles from "./BookItem.module.css";

export default function BookItem({ read, title, onToggle }) {
  const bookClasses = [styles.book, read ? styles.read : ""].filter(Boolean).join(" ");

  return (
    <Flex className={bookClasses} onClick={onToggle}>
      <span className={styles.gemstone}></span>
      {title}
    </Flex>
  );
}
