import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./StatTile.module.css";

const StatTile = ({ num, label }) => {
  return (
    <Flex vertical className={styles.statTile}>
      <Text className={styles.n}>{num}</Text>
      <Text className={styles.lbl}>{label}</Text>
    </Flex>
  );
};

export default StatTile;
