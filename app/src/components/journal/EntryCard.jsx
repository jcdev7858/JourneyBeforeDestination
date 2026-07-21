import { useAppData } from "../../context/AppDataContext";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import Backlink from "./Backlink";
import FavoriteButton from "../FavoriteButton";
import styles from "./EntryCard.module.css";
import { promptById } from "../../data/prompts";

const EntryCard = ({ e, onClick, clickable = false }) => {
  const { formatDateMDY, resolveAttachments, toggleFav } = useAppData();
  const postType = e.promptIds?.length
    ? "prompt"
    : e.oathIds?.length
      ? "oath"
      : e.idealIds?.length
        ? "ideal"
        : "free";
  const heading = e.title || (postType === "prompt" ? promptById(e.promptIds[0])?.text : null);
  const backlinks = resolveAttachments(e);

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
      <Flex className={styles.entryFoot}>
        <Flex wrap gap={9}>
          {backlinks?.length > 0 && (
            <Flex gap={8} wrap>
              {backlinks.map((link) => (
                <Backlink {...link} key={link.id} />
              ))}
            </Flex>
          )}
        </Flex>
        <FavoriteButton id={e.id} fav={e.fav} toggle={toggleFav} />
      </Flex>
    </Card>
  );
};

export default EntryCard;
