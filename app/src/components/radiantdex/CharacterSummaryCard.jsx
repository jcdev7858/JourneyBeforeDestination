import Card from "../ui/Card";
import Text from "../ui/Text";
import { SquareArrowOutUpRight } from "lucide-react";
import { snakify } from "../../utils/strings";
import styles from "./CharacterSummaryCard.module.css";

const CharacterSummaryCard = ({ char }) => {
  return (
    <Card title={char.exemplifies ? "Exemplifies" : ""} data-order={char.orderId}>
      <Text className={styles.summaryTitle}>{char.exemplifies}</Text>
      <Text className={styles.summaryText}>{char.summary}</Text>
      <a
        className={styles.coppermindLink}
        href={"https://coppermind.net/wiki/" + snakify(char.name)}
        target="_blank"
        rel="noreferrer"
      >
        <SquareArrowOutUpRight /> View on Coppermind
      </a>
    </Card>
  );
};

export default CharacterSummaryCard;
