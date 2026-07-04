import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Text from "../components/ui/Text";
import Flex from "../components/ui/Flex";
import Button from "../components/ui/Button";
import ActionItem from "../components/dashboard/ActionItem";
import { useAppData } from "../context/AppDataContext";
import { Check } from "lucide-react";
import styles from "./OathCard.module.css";

const OathCard = (props) => {
  const { toggleAction, markKept, formatDate, formatRelativeTime } = useAppData();
  const { oath, maxActions = Infinity } = props;
  const completedCount = oath.actions.filter((a) => a.completed).length;
  const total = oath.actions.length;
  const hiddenCount = total - maxActions;
  const statusClasses = [styles.oathStatus, styles[oath.status]].filter(Boolean).join(" ");

  function footMeta() {
    if (oath.actions.length === 0)
      return <Text className={styles.meta}>A practice · no checklist, just the habit</Text>;
    if (oath.status === "kept")
      return (
        <Text
          className={styles.meta}
        >{`Fulfilled ${oath.keptAt && formatDate(oath.keptAt)} · all ${oath.actions.length} actions answered`}</Text>
      );
    if (oath.status === "archived")
      return <Text className={styles.meta}>{`Set aside ${formatDate(oath.archivedAt)}`}</Text>;

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
    return (
      <Text
        className={styles.meta}
      >{`Began ${oath.createdAt && formatRelativeTime(oath.createdAt)} · ${oath.actions.filter((a) => a.completed !== true).length} more actions`}</Text>
    );
  }

  return (
    <Card key={oath.id} className={oath.status === "archived" ? styles.archivedCard : undefined}>
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

          <ul className={styles.actions}>
            {oath.actions.slice(0, maxActions).map((a) => (
              <ActionItem
                action={a.title}
                checked={a.completed}
                key={a.id}
                id={a.id}
                onChange={() => toggleAction(oath.id, a.id)}
              />
            ))}
          </ul>
        </>
      )}
      {total - maxActions > 0 && (
        <Flex
          className={styles.more}
        >{`${hiddenCount} more item${hiddenCount !== 1 ? "s" : ""}`}</Flex>
      )}
      <Flex gap={12} justify="space-between" align="center" wrap>
        {footMeta()}
        <Flex gap={12} justify="flex-end">
          {props.children}
        </Flex>
      </Flex>
    </Card>
  );
};

export default OathCard;
