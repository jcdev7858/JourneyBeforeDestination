import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Title from "../ui/Title";
import styles from "./OrderCard.module.css";
import Pill from "../Pill";
import { Shield } from "lucide-react";

export default function OrderCard() {
  return (
    <Card title="Your Order">
      <Flex vertical align="flex-start" gap="15px">
        <Flex vertical>
          <Flex gap="10px">
            <Flex className={styles.orderGlyph}>
              <Shield />
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
      </Flex>
    </Card>
  );
}
