import styles from "./EmptyCard.module.css";
import Card from "./ui/Card";
import Title from "./ui/Title";
import Text from "./ui/Text";
import Button from "./ui/Button";
import { Feather } from "lucide-react";

const EmptyCard = ({ icon, title, text, ctaLabel, onCta }) => {
  return (
    <Card className={`${styles.empty} ${icon ? "glowAccent glowBr" : ""}`}>
      {icon}
      {title && (
        <Title level={3} className={styles.emptyTitle}>
          {title}
        </Title>
      )}
      {text && <Text className={styles.emptyText}>{text}</Text>}
      {ctaLabel && (
        <Button type="primary" size="large" icon={<Feather />} onClick={onCta}>
          {ctaLabel}
        </Button>
      )}
    </Card>
  );
};

export default EmptyCard;
