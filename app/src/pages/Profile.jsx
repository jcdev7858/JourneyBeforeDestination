import IdentityCard from "../components/profile/IdentityCard";
import StatTile from "../components/profile/StatTile";
import Flex from "../components/ui/Flex";
import { useAppData } from "../context/AppDataContext";
import { ORDERS } from "../data/orders";
import OrderCard from "../components/dashboard/OrderCard";
import layoutStyles from "../components/Layout.module.css";

export default function Profile() {
  const { user, oaths, journalEntries } = useAppData();
  const userJournalCount = journalEntries.filter((entry) => entry.userId === user.id).length;
  const userOathCount = oaths.filter((oath) => oath.userId === user.id).length;
  const booksReadCount = user.booksRead.length;

  return (
    <Flex vertical gap={"var(--sp-5)"}>
      <IdentityCard user={user} entryCount={userJournalCount} />
      <Flex className="rise" style={{ animationDelay: "100ms" }} gap={24}>
        <StatTile num={userOathCount} label="Oaths Made" />
        <StatTile num={userJournalCount} label="Reflections" />
        <StatTile num={3} label="Day streak" />
        {/* TODO: add streak stats here */}
        <StatTile num={booksReadCount} label="Books read" />
      </Flex>
      <div className={`${layoutStyles.grid2} rise`} style={{ animationDelay: "200ms" }}>
        <OrderCard order={ORDERS[user.orderId]} />
        {/* TODO: Add in card for the Journey so far */}
      </div>
    </Flex>
  );
}
