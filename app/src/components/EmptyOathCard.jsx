import Card from "./ui/Card";
import Title from "./ui/Title";
import Text from "./ui/Text";
import Button from "./ui/Button";
import styles from "./OathCard.module.css";
import OrderGlyph from "./OrderGlyph";
import { Feather } from "lucide-react";

const EmptyOathCard = (props) => {
  const { makeNewOath } = props;
  return (
    <Card className={`${styles.empty} ${styles.glowAccent}`}>
      <OrderGlyph order="windrunner" h={90} variant="block" className={styles.emptyGlyph} />
      <Title level={3} className={styles.emptyTitle}>
        No oaths yet
      </Title>
      <Text className={styles.emptyText}>
        Every Radiant begins with the same words and comes to mean something personal by them. Speak
        the First Ideal to start your path.
      </Text>
      <Button type="primary" size="large" icon={<Feather />} onClick={makeNewOath}>
        Speak the First Ideal
      </Button>
    </Card>
  );
};
export default EmptyOathCard;
