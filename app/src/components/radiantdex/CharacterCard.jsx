import OrderGlyph from "../OrderGlyph";
import Pill from "../Pill";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./CharacterCard.module.css";

const CharacterCard = ({ char, onOpen }) => {
  return (
    <Card clickable data-order={char.orderId}>
      <Flex align="center" gap={14}>
        <Flex className={`${styles.orderRing} ${styles.cardRing}`}>
          <OrderGlyph order={char.orderId} h={26} variant="block" />
          {/* TODO: add in spoiler gate for character card where the glyph reverts to Roshar in stormlight blue if gated */}
        </Flex>
        <Flex vertical>
          <Text className={styles.charCardName}>{char.name}</Text>
          <Text className={styles.charCardRole}>{char.role}</Text>
        </Flex>
      </Flex>
      <Text className={styles.charCardHook}>{char.exemplifies}</Text>
      <Flex wrap gap={8} style={{ paddingTop: "var(--sp-4)" }}>
        {char.tags.map((v) => (
          <Pill className={styles.tagSm} key={v}>
            {v}
          </Pill>
        ))}
      </Flex>
    </Card>
  );
};

export default CharacterCard;
