import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Title from "../ui/Title";
import styles from "./OrderCard.module.css";
import Pill from "../Pill";
import OrderGlyph from "../OrderGlyph";

export default function OrderCard({ order }) {
  return (
    <Card title="Your Order" className="glowAccent glowBr">
      <Flex vertical align="flex-start" gap="15px">
        <Flex vertical>
          <Flex gap="10px" wrap align="center">
            <Flex className={styles.orderGlyph}>
              <OrderGlyph order={order.id} h={30} />
            </Flex>
            <Title level={2} className={styles.orderName}>
              {order.id}
            </Title>
          </Flex>
        </Flex>
        <Flex wrap gap={8} style={{ paddingTop: "var(--sp-4)" }}>
          {order.values.map((v) => (
            <Pill className={styles.tagSm} key={v}>
              {v}
            </Pill>
          ))}
        </Flex>
        <Flex wrap gap="10px">
          <Pill>Protection</Pill>
          <Pill>Leadership</Pill>
          <Pill>Responsibility</Pill>
          <Pill>Service</Pill>
        </Flex>
      </Flex>
      <div className="clipLayer">
        <OrderGlyph order={order.id} h={100} variant="corner" />
      </div>
    </Card>
  );
}
