import Flex from "./ui/Flex";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <Flex className={styles.siteFooter}>
      <Flex className={styles.footerOath}>
        <span className={styles.phrase}>Life Before Death</span>
        <span className={styles.footerSep}></span>
        <span className={styles.phrase}>Strength Before Weakness</span>
        <span className={styles.footerSep}></span>
        <span className={styles.phrase}>Journey Before Destination</span>
      </Flex>
      <Flex className={styles.footerMeta}>
        <span>Private by Intent</span>
        <span className={styles.footerSep}></span>
        <a>Find support</a>
      </Flex>
    </Flex>
  );
}
