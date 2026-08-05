import { useAppData } from "../../context/AppDataContext";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Title from "../ui/Title";
import Button from "../ui/Button";
import Eyebrow from "../Eyebrow";
import styles from "./PromptCard.module.css";
import OrderGlyph from "../OrderGlyph";
import { PencilLine, Star } from "lucide-react";

function PromptCard({ prompt, onRespond, onFav }) {
  const { user } = useAppData();

  return (
    <Card className={styles.promptCard}>
      <Eyebrow lead="Today's Reflection" trail={user.orderId} />
      <Title level={1} className={styles.promptText}>
        {prompt.text}
      </Title>
      <Flex className={styles.promptActions}>
        <Button type="primary" size="large" icon={<PencilLine />} onClick={() => onRespond(true)}>
          Respond
        </Button>
        <Button size="large" icon={<Star />}>
          Favorite
        </Button>
      </Flex>
      <div className="clipLayer">
        <OrderGlyph order={user.orderId} h={240} variant="watermark" />
      </div>
    </Card>
  );
}

export default PromptCard;
