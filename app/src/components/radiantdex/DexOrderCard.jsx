import OrderGlyph from "../OrderGlyph";
import Pill from "../Pill";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./DexOrderCard.module.css";

const DexOrderCard = ({ order, onOpen }) => {
  return (
    <Card clickable data-order={order.id}>
      <Flex align="center" gap={14}>
        <Flex className={`${styles.orderRing} ${styles.orderCardRing}`}>
          <OrderGlyph order={order.id} h={26} variant="block" />
        </Flex>
        <Flex>
          <Text className={styles.orderCardName}>{order.name}</Text>
        </Flex>
      </Flex>
      <Text className={styles.orderCardDesc}>{order.description}</Text>
      <Flex wrap gap={8} style={{ paddingTop: "var(--sp-4)" }}>
        {order.values.map((v) => (
          <Pill key={v}>{v}</Pill>
        ))}
      </Flex>
    </Card>
  );
};

export default DexOrderCard;
