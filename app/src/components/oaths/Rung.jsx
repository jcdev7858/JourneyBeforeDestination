import Button from "../ui/Button";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./Rung.module.css";
import { Book, Plus, Feather, Info } from "lucide-react";

const Rung = ({ ideal, ordinal, onReflect, onBorrow, gateBook = false }) => {
  const hidden = false; // means they haven't read far enough and it's blocked by women's script
  const words = ideal.text;
  const hasWords = !!words;
  const canBorrow = !hidden && hasWords;
  const canReflect = !hidden && hasWords;
  const idealWords = words === null ? "These words are not yet chronicled." : words;
  const showActions = canBorrow || canReflect;
  const classes = [styles.rung, styles.interactive, !hidden && hasWords && styles.revealed]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Flex className={styles.rungRail}>
        <Flex className={`${styles.rungLine} ${ideal.rank === 1 && styles.top}`}></Flex>
        <Flex className={styles.rungNode}></Flex>
        <Flex className={styles.rungLine}></Flex>
      </Flex>

      <Flex className={styles.rungBody} vertical>
        <Flex className={styles.rungOrdinal}>{ordinal}</Flex>
        <Flex className={styles.rungReveal}>
          {hidden ? (
            "TODO: Womens script here"
          ) : (
            <Text className={`${styles.rungWords} ${hasWords ? "" : styles["unknown"]}`}>
              {idealWords}
            </Text>
          )}
        </Flex>
        {hidden && (
          <Flex className={styles.rungHiddenHint}>
            <Book />
            {gateBook
              ? "Revealed as you read further into the Stormlight Archive"
              : "Not yet within sight."}
          </Flex>
        )}

        {showActions && (
          <Flex className={styles.rungActions}>
            {canBorrow && (
              <Button
                icon={<Plus />}
                type="link"
                className={styles.rungLink}
                onClick={() => onBorrow(ideal.id)}
              >
                Borrow this Ideal
              </Button>
            )}
            {canReflect && (
              <Button
                icon={<Feather />}
                type="link"
                className={styles.rungLink}
                onClick={() => onReflect({ type: "ideal", label: words, id: ideal.id })}
              >
                Reflect on this Ideal
              </Button>
            )}
            {/* Reserved slot — the "Understanding" ideal-breakdown ships in a later pass. */}
            {canReflect && (
              <Button className={styles.rungUnderstanding} type="link" icon={<Info />} disabled>
                Understanding
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Rung;
