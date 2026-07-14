import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Modal from "../ui/Modal";
import Title from "../ui/Title";
import Text from "../ui/Text";
import Button from "../ui/Button";
import styles from "./PromptCard.module.css";
import cardStyles from "../ui/Card.module.css";
import OrderGlyph from "../OrderGlyph";
import { PencilLine, Star } from "lucide-react";

function PromptCard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAppData();

  return (
    <>
      <Card className={styles.promptCard}>
        <Flex className={cardStyles.eyebrow}>
          <Text className={cardStyles.dot}></Text>
          <Text>{`Today's reflection · ${user.orderId}`}</Text>
        </Flex>
        <Title level={1} className={styles.promptText}>
          What responsibility are you avoiding right now?
        </Title>
        <Flex className={styles.promptActions}>
          <Button
            type="primary"
            size="large"
            icon={<PencilLine />}
            onClick={() => setIsModalVisible(true)}
          >
            Respond
          </Button>
          <Button size="large" icon={<Star />}>
            Favorite
          </Button>
        </Flex>
        <OrderGlyph order={user.orderId} h={240} variant="watermark" />
      </Card>
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        centered
        width={"80vw"}
        closable
        maskBlur
        glassmorphic
        title={
          <Flex align="center" justify="space-between">
            <Text>Respond</Text>
          </Flex>
        }
        footer={null}
        styles={{
          content: {
            border: "1px solid rgba(255, 255, 255, 0.06)",
            maxHeight: "95vh",
            overflowY: "auto",
          },
          body: {
            padding: "30px",
          },
        }}
      ></Modal>
    </>
  );
}

export default PromptCard;
