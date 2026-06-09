import Flex from "./ui/Flex";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <Flex className={styles.shell} vertical>
      {children}
    </Flex>
  );
}
