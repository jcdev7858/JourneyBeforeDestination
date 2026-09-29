import OrderGlyph from "../OrderGlyph";
import DexMetaItem from "./DexMetaItem";
import Eyebrow from "../Eyebrow";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./DexFeatureCard.module.css";
import { ArrowRight } from "lucide-react";

const DexFeatureCard = ({
  name,
  description,
  orderId,
  meta,
  media,
  caption,
  eyebrow,
  belowHeader,
  navLink,
  clickable = false,
  footer,
}) => {
  const cardClasses = [styles.featured, "glowAccent glowBr"].filter(Boolean).join(" ");

  return (
    <Card className={cardClasses} clickable={clickable} data-order={orderId}>
      <Flex align="flex-start" gap={24}>
        <Flex vertical className={styles.cardHeroBody}>
          <Flex align="flex-start" gap={24}>
            <Flex className={`${styles.orderRing} ${styles.cardRing}`}>
              <OrderGlyph order={orderId} h={42} variant="block" />
            </Flex>
            <Flex vertical align="flex-start">
              <Flex align="flex-start" vertical>
                {eyebrow && <Eyebrow lead={eyebrow} />}
                <Text className={styles.cardName}>{name}</Text>
              </Flex>
              {description && <Text className={styles.cardDesc}>{description}</Text>}
              {belowHeader && <Text className={styles.dexHeroRole}>{belowHeader}</Text>}
              {navLink}
            </Flex>
          </Flex>
          <Flex className={styles.dexMetaRow}>
            {meta.map((i) => (
              <DexMetaItem item={i} key={i.label} />
            ))}
          </Flex>
          {footer && (
            <Text className={styles.cardLaunch}>
              {footer} <ArrowRight />
            </Text>
          )}
        </Flex>
        <Flex className={styles.dexImgCol} vertical gap={5}>
          {media}
          {caption}
        </Flex>
      </Flex>
    </Card>
  );
};

export default DexFeatureCard;
