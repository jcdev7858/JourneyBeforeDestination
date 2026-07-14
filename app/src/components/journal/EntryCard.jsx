import { useAppData } from "../../context/AppDataContext";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import Button from "../ui/Button";
import Backlink from "./Backlink";
import { Star } from "lucide-react";
import Pill from "../Pill";
import styles from "./EntryCard.module.css";

const EntryCard = ({ e, onClick, clickable = false }) => {
  const { formatDateMDY, createBacklinks, toggleFav } = useAppData();
  const postType = e.promptId ? "prompt" : e.oathId ? "oath" : e.idealId ? "ideal" : "free";
  const heading = e.title || (postType === "prompt" ? e.promptId : null); // TODO: refactor this as a lookup for promptId
  const backlinks = createBacklinks(e);

  return (
    <Card clickable onClick={onClick} className={clickable && styles.cardLink}>
      <Flex className={styles.entryHead}>
        <Flex align="start" gap={9} vertical>
          <Text className={`${styles.entryBadge} ${styles[postType]}`}>{postType}</Text>
          {heading && (
            <Flex className={e.title ? styles.entryTitle : styles.entryPrompt}>{heading}</Flex>
          )}
        </Flex>
        <Text className={styles.entryDate}>{formatDateMDY(e.createdAt)}</Text>
      </Flex>
      {/* TODO(v1.1): emphasis pull-quote Emify() */}
      <Flex className={styles.entryBody}>{e.body}</Flex>
      {backlinks.length > 0 && (
        <Flex gap={5}>
          {backlinks.map((link) => (
            <Backlink {...link} key={link.id} />
          ))}
        </Flex>
      )}
      <Flex className={styles.entryFoot}>
        <Flex wrap gap={9}>
          {e.themes && e.themes.map((t) => <Pill key={t}>{t}</Pill>)}
        </Flex>
        <Button
          className={`${styles.entryFav} ${e.fav ? styles.on : ""}`}
          icon={<Star />}
          onClick={(evt) => {
            evt.stopPropagation();
            toggleFav(e.id);
          }}
        ></Button>
      </Flex>
    </Card>
  );
};

export default EntryCard;
