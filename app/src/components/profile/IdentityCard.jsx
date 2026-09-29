import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import styles from "./IdentityCard.module.css";
import OrderGlyph from "../OrderGlyph";
import { capitalize } from "../../utils/strings";
import { useAppData } from "../../context/AppDataContext";

const IdentityCard = ({ user, entryCount }) => {
  const { formatDate } = useAppData();

  return (
    <Card data-order={user.orderId} className="rise">
      <Flex align="center" gap={30}>
        <Flex className={`${styles.orderRing}`}>
          <OrderGlyph order={user.orderId} h={48} variant="block" />
        </Flex>
        <Flex vertical>
          <Text className={styles.idName}>{user.name}</Text>
          <Text className={styles.idOrder}>{capitalize(user.orderId)}</Text>
          <Text
            className={styles.idMeta}
          >{`On the path since ${formatDate(user.createdAt)} · ${entryCount} reflections`}</Text>
          {/* // TODO: Wire in reflections streak */}
        </Flex>
      </Flex>
    </Card>
  );
};

export default IdentityCard;
