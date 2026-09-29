import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import { idealsForOrder } from "../../data/ideals";
import { capitalize } from "../../utils/strings";
import { ChevronsUpDown } from "lucide-react";
import { ORDERS } from "../../data/orders";
import Title from "../ui/Title";
import Text from "../ui/Text";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Pill from "../Pill";
import Rung from "./Rung";
import LadderPopover from "./LadderPopover";
import OrderGlyph from "../OrderGlyph";
import styles from "./IdealLadder.module.css";

const ORDINALS = ["", "First Ideal", "Second Ideal", "Third Ideal", "Fourth Ideal", "Fifth Ideal"];
const getIdealWord = (n) => ORDINALS[n] || `${n}th`;
const ORDER_IDS = Object.keys(ORDERS);

const IdealLadder = ({ orderId, onBorrow, onReflect, hideControls }) => {
  const { user } = useAppData();
  const [viewedOrderId, setViewedOrderId] = useState(orderId);
  const orderIdeals = idealsForOrder(viewedOrderId);
  const isHome = viewedOrderId === user.orderId;

  return (
    <Card className="glowAccent">
      <Flex className={styles.ladderHead}>
        <Title level={3} className={styles.oathText}>
          The Five Ideals
        </Title>
        {!hideControls && (
          <Flex wrap gap={10}>
            <LadderPopover
              icon={<OrderGlyph order={orderId} h={17} />}
              label={({ open, toggle }) => (
                <button
                  className={styles.ladderSwitchBtn + (open ? " open" : "")}
                  aria-expanded={open}
                  aria-haspopup="true"
                  onClick={toggle}
                >
                  <OrderGlyph order={viewedOrderId} h={17} />
                  <Text className={styles.lsbName}>{capitalize(viewedOrderId)}</Text>
                  {!isHome && <span className={styles.lsbTag}>viewing</span>}
                  <ChevronsUpDown />
                </button>
              )}
            >
              {({ close }) => (
                <>
                  <Text className={styles.ladderPopHead}>Browse an Order's Ideals</Text>
                  <Flex className={styles.ladderPopOrders}>
                    {ORDER_IDS.map((o) => (
                      <Pill
                        key={o}
                        role="tab"
                        aria-selected={o === orderId}
                        clickable
                        className={"chip" + (o === orderId ? " on" : "")}
                        onClick={() => {
                          setViewedOrderId(o);
                          close();
                        }}
                      >
                        {o === user.orderId && (
                          <span className={styles.homeGem} title="Your Order"></span>
                        )}
                        {capitalize(o)}
                      </Pill>
                    ))}
                  </Flex>
                </>
              )}
            </LadderPopover>
            {/* TODO: wire in book progress picker */}
            {/* <LadderPopover icon={<Book />}, label /> */}
          </Flex>
        )}
      </Flex>
      <Flex className={styles.ladderContext}>
        {isHome ? (
          <Text>{`The ${capitalize(orderId)} Ideals. You speak each when you're ready.`}</Text>
        ) : (
          <Text>
            <Text className={styles.ladderForeignNote}>{`The ${capitalize(orderId)} Ideals.`}</Text>{" "}
            You can reflect on or borrow these words, but only your own Order's can be spoken.
          </Text>
        )}
      </Flex>
      <Flex vertical>
        {orderIdeals.map((ideal) => (
          <Rung
            ordinal={getIdealWord(ideal.rank)}
            ideal={ideal}
            isHome={isHome}
            onReflect={onReflect}
            onBorrow={onBorrow}
            key={ideal.id}
          />
        ))}
      </Flex>
    </Card>
  );
};
export default IdealLadder;
