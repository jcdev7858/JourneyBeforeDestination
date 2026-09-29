import Card from "../ui/Card";
import Pill from "../Pill";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./CharacterMetaCard.module.css";

const CharacterMetaCard = ({ char, books }) => {
  return (
    <Card title="Appears In">
      <Flex gap={10} wrap>
        {books.map((b) => (
          <Pill key={b.id}>{b.title}</Pill>
        ))}
      </Flex>
      <Text className={styles.sideLabel}>Tags</Text>
      <Flex gap={10} wrap>
        {char.tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </Flex>
    </Card>
  );
};

export default CharacterMetaCard;
