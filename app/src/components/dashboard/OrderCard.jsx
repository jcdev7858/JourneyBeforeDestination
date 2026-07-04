import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Title from "../ui/Title";
import styles from "./OrderCard.module.css";
import cardStyles from "../ui/Card.module.css";
import Pill from "../Pill";
import OrderGlyph from "../OrderGlyph";

export default function OrderCard() {
  return (
    <Card title="Your Order" className={`${cardStyles.glowAccent} ${cardStyles.glowBr}`}>
      <Flex vertical align="flex-start" gap="15px">
        <Flex vertical>
          <Flex gap="10px" wrap align="center">
            <Flex className={styles.orderGlyph}>
              <OrderGlyph order="windrunner" h={30} />
            </Flex>
            <Title level={2} className={styles.orderName}>
              Windrunner
            </Title>
          </Flex>
        </Flex>
        <Flex wrap gap="10px">
          <Pill>Protection</Pill>
          <Pill>Leadership</Pill>
          <Pill>Responsibility</Pill>
          <Pill>Service</Pill>
        </Flex>
        <OrderGlyph order="windrunner" h={100} variant="corner" />
      </Flex>
    </Card>
  );
}
