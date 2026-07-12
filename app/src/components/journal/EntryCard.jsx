import { useAppData } from "../../context/AppDataContext";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./EntryCard.module.css";

const EntryCard = (props) => {
  const { e } = props;
  const { formatDate } = useAppData();
  const kind = e.prompt ? "prompt" : e.oathId ? "oath" : e.idealId ? "ideal" : "free";
  const heading = e.title || (kind === "prompt" ? e.prompt : null);

  return (
    <Card>
      <Flex className={styles.entryHead}>
        <Flex align="start" gap={9} vertical>
          <Text className={`${styles.entryBadge} ${styles[kind]}`}>{kind}</Text>
          {heading && (
            <Flex className={e.title ? styles.entryTitle : styles.entryPrompt}>{heading}</Flex>
          )}
        </Flex>
        <Text className={styles.entryDate}>{formatDate(e.createdAt)}</Text>
      </Flex>
      {/* TODO(v1.1): emphasis pull-quote Emify() */}
      <Flex className={styles.entryBody}>{e.body}</Flex>
    </Card>
  );
};

export default EntryCard;
