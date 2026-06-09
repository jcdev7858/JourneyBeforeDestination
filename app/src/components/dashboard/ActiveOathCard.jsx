import { useLocalStorage } from "../../hooks/useLocalStorage";
import Card from "../ui/Card";
import Title from "../ui/Title";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import ActionItem from "./ActionItem";
import styles from "./ActiveOathCard.module.css";

export default function ActiveOathCard() {
  const SEED_ACTIONS = [
    // TODO: replace with [] when oath form exists
    { id: 1, action: "Put my phone away during dinner", completed: true },
    { id: 2, action: "Plan one daddy-daughter date this month", completed: true },
    { id: 3, action: "Spend one hour outside this week", completed: false },
    { id: 4, action: "Lorem ispum dolor sit amet", completed: false },
  ];

  const [actions, setActions] = useLocalStorage("actions", SEED_ACTIONS);
  const completedCount = actions.filter((action) => action.completed).length;
  const total = actions.length;
  const hiddenCount = total - 3;

  const toggleAction = (id) => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a)));
  };

  return (
    <Card title="Active Oath">
      <Title level={3} className={styles.oathText}>
        I will be more present with my family
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
        {actions.slice(0, 3).map((a) => (
          <ActionItem
            action={a.action}
            checked={a.completed}
            key={a.id}
            id={a.id}
            onChange={() => toggleAction(a.id)}
          />
        ))}
      </ul>
      {total > 3 && (
        <Flex
          className={styles.more}
        >{`${hiddenCount} more item${hiddenCount !== 1 ? "s" : ""}`}</Flex>
      )}
    </Card>
  );
}
