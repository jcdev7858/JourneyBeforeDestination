import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Text from "../components/ui/Text";
import Flex from "../components/ui/Flex";
import Button from "../components/ui/Button";
import ActionItem from "../components/dashboard/ActionItem";
import { useAppData } from "../context/AppDataContext";
import { ArrowRight, Check } from "lucide-react";
import styles from "./OathCard.module.css";

const OathCard = ({
  oath,
  clickable = false,
  onClick,
  maxActions = Infinity,
  footMeta,
  children,
}) => {
  const { toggleAction, markKept, formatDate, formatRelativeTime } = useAppData();
  const completedCount = oath.actions.filter((a) => a.completed).length;
  const total = oath.actions.length;
  const hiddenCount = total - maxActions;
  const statusClasses = [styles.oathStatus, styles[oath.status]].filter(Boolean).join(" ");
  const classes = [
    oath.status === "archived" ? styles.archivedCard : undefined,
    clickable && styles.cardLink,
  ]
    .filter(Boolean)
    .join(" ");

  function buildFootMeta() {
    if (oath.actions.length === 0)
      return <Text className={styles.footText}>A practice · no checklist, just the habit</Text>;
    if (oath.status === "kept")
      return (
        <Text className={styles.footText}>
          {`Fulfilled ${oath.keptAt && formatDate(oath.keptAt)} · all ${oath.actions.length} actions answered`}
        </Text>
      );
    if (oath.status === "archived")
      return <Text className={styles.footText}>{`Set aside ${formatDate(oath.archivedAt)}`}</Text>;

    if (oath.actions.every((a) => a.completed)) {
      return (
        <Flex className={styles.oathReady}>
          <Text className={styles.readyNote}>Every action answered</Text>
          <Button type="primary" size="large" icon={<Check />} onClick={() => markKept(oath.id)}>
            Mark as kept
          </Button>
        </Flex>
      );
    }

    const statusText =
      footMeta ??
      `Began ${oath.createdAt && formatRelativeTime(oath.createdAt)} · ${oath.actions.filter((a) => a.completed !== true).length} more actions`;

    return <Text className={styles.footText}>{statusText}</Text>;
  }

  return (
    <Card key={oath.id} className={classes} clickable onClick={onClick}>
      <Flex className={styles.oathTop}>
        <Title level={3} className={styles.oathText}>
          {oath.title}
        </Title>
        <span className={statusClasses}>
          <span className={styles.seal}></span>
          {oath.actions.length === 0 && oath.status === "active" ? "Practice" : oath.status}
        </span>
      </Flex>
      {oath.actions.length > 0 && oath.status === "active" && (
        <>
          <Flex justify="space-between" align="center" className={styles.progressRow}>
            <Text>Progress</Text>
            <Text>{`${completedCount} of ${total} actions`}</Text>
          </Flex>
          <Flex className={styles.progressTrack}>
            <Flex
              className={styles.progressFill}
              style={{ width: `${(completedCount / total) * 100}%` }}
            ></Flex>
          </Flex>

          <Flex
            className={`${styles.actions} ${styles.tickableList}`}
            onClick={(e) => e.stopPropagation()}
            vertical
            gap={5}
          >
            {oath.actions.slice(0, maxActions).map((a) => (
              <ActionItem
                action={a.title}
                checked={a.completed}
                key={a.id}
                id={a.id}
                onChange={() => toggleAction(oath.id, a.id)}
              />
            ))}
          </Flex>
        </>
      )}
      {total - maxActions > 0 && (
        <Flex
          className={styles.more}
        >{`${hiddenCount} more item${hiddenCount !== 1 ? "s" : ""}`}</Flex>
      )}
      <Flex gap={12} justify="space-between" align="center" wrap style={{ paddingTop: "20px" }}>
        {buildFootMeta()}
        <Flex gap={12} justify="flex-end" onClick={(e) => e.stopPropagation()}>
          {children}
        </Flex>
      </Flex>
    </Card>
  );
};

export default OathCard;
