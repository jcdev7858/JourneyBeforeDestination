import OrderGlyph from "../OrderGlyph";
import DexMetaItem from "./DexMetaItem";
import Eyebrow from "../Eyebrow";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./DexFeatureCard.module.css";
import { Shield, Star, Zap, Sword, ArrowRight } from "lucide-react";

const DexFeatureCard = ({ order, onOpen }) => {
  const cardClasses = [styles.featured, "glowAccent glowBr"].filter(Boolean).join(" ");

  const metaItems = [
    { icon: <Shield />, label: "Values", value: order.values.join(", ") },
    { icon: <Star />, label: "Spren", value: order.spren },
    { icon: <Zap />, label: "Surges", value: order.surges.join(", ") },
    { icon: <Sword />, label: "Herald", value: order.herald },
  ];

  return (
    <Card className={cardClasses} clickable data-order={order.id}>
      <OrderGlyph order={order.id} h={170} variant="corner" />
      <Flex align="flex-start" gap={24}>
        <Flex className={`${styles.orderRing} ${styles.cardRing}`}>
          <OrderGlyph order={order.id} h={34} variant="block" />
        </Flex>
        <Flex vertical align="flex-start">
          <Flex align="flex-start" vertical>
            <Eyebrow lead="Your Path" />
            <Text className={styles.cardName}>{order.name}</Text>
          </Flex>
          <Text className={styles.cardDesc}>{order.description}</Text>
        </Flex>
      </Flex>
      <Flex className={styles.dexMetaRow}>
        {metaItems.map((i) => (
          <DexMetaItem item={i} />
        ))}
      </Flex>
      <Text className={styles.cardLaunch}>
        View your order <ArrowRight />
      </Text>
    </Card>
  );
};

export default DexFeatureCard;
