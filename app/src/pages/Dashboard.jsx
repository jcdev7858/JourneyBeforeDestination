import { useState } from "react";
import { useAppData } from "../context/AppDataContext";
import { promptsForOrder, pickPromptForToday } from "../data/prompts";
import { ORDERS } from "../data/orders";
import PromptCard from "../components/dashboard/PromptCard";
import OrderCard from "../components/dashboard/OrderCard";
import ActiveOathCard from "../components/dashboard/ActiveOathCard";
import ReflectionEditor from "../components/journal/ReflectionEditor";
import ReadingProgress from "../components/dashboard/ReadingProgress";
import layoutStyles from "../components/Layout.module.css";

export default function Dashboard() {
  const { user } = useAppData();
  const [editing, setEditing] = useState(null);
  const todaysPrompt = pickPromptForToday(promptsForOrder(user.orderId));

  return (
    <>
      {editing && (
        <ReflectionEditor
          entry={editing === "new" ? undefined : editing}
          closeModal={() => setEditing(null)}
          themes={[]}
        />
      )}
      {/* TODO: Fix the respond & fav buttons not working. has to do with not passing themes in */}
      <div className="rise" style={{ animationDelay: "100ms" }}>
        <PromptCard prompt={todaysPrompt} onRespond={setEditing} onFav />
      </div>
      <div className={`${layoutStyles.grid2} rise`} style={{ animationDelay: "200ms" }}>
        <OrderCard order={ORDERS[user.orderId]} />
        <ActiveOathCard />
      </div>
      <div className="rise" style={{ animationDelay: "300ms" }}>
        <ReadingProgress />
      </div>
    </>
  );
}
