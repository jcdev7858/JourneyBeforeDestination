import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import Text from "../components/ui/Text";
import Flex from "../components/ui/Flex";
import ActionItem from "../components/dashboard/ActionItem";
import { useAppData } from "../context/AppDataProvider";
import styles from "./OathCard.module.css";

const OathCard = (props) => {
  const { toggleAction } = useAppData();
  const { oath, title, maxActions = Infinity } = props;

  const completedCount = oath.actions.filter((a) => a.completed).length;
  const total = oath.actions.length;
  const hiddenCount = total - maxActions;

  return (
    <Card title={title} key={oath.id}>
      <Title level={3} className={styles.oathText}>
        {oath.title}
      </Title>
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
      {total - maxActions > 0 && (
        <Flex
          className={styles.more}
        >{`${hiddenCount} more item${hiddenCount !== 1 ? "s" : ""}`}</Flex>
      )}
      {props.children}
    </Card>
  );
};

export default OathCard;
