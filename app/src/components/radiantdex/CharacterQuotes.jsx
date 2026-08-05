import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Title from "../ui/Title";
import Text from "../ui/Text";
import styles from "./CharacterQuotes.module.css";
import { Feather } from "lucide-react";
import { BOOKS_BY_ID } from "../../data/books";
import { CHARACTERS_BY_ID } from "../../data/characters";
import OrderGlyph from "../OrderGlyph";

const CharacterQuotes = ({ quotes, onReflect }) => {
  const orderId = CHARACTERS_BY_ID[quotes[0]?.characterId]?.orderId;

  return (
    <Card className="glowAccent" data-order={orderId}>
      <Title level={3} className={styles.sectionHead}>
        Sayings
      </Title>
      <OrderGlyph order={orderId} h={150} variant="corner" />

      {quotes.map((q, i) => {
        const book = BOOKS_BY_ID[q.source];
        return (
          <Flex className={styles.sayRailRow} key={q.id}>
            <OrderGlyph order={orderId} h={150} variant="corner" />
            <Flex className={styles.sayRailLine}>
              <span className={styles.sayRailDot}></span>
              {i < quotes.length - 1 && <span className={styles.sayRailStem}></span>}
            </Flex>
            <Flex className={styles.sayRailContent} vertical>
              <Flex className={styles.sayRailText}>&ldquo;{q.text}&rdquo;</Flex>
              <Flex className={styles.sayRailMeta}>
                <Text>
                  {q.context}
                  {book ? " — " + book.title : ""}
                </Text>
                <button className={styles.sayRailReflect} onClick={() => onReflect(q)}>
                  Reflect on this <Feather />
                </button>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Card>
  );
};

export default CharacterQuotes;
