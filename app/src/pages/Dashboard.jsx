import { useAppData } from "../context/AppDataContext";
import { promptsForOrder, pickPromptForToday } from "../data/prompts";
import { ORDERS } from "../data/orders";
import { useReflection } from "../hooks/useReflection";
import PromptCard from "../components/dashboard/PromptCard";
import OrderCard from "../components/dashboard/OrderCard";
import ActiveOathCard from "../components/dashboard/ActiveOathCard";
import ReflectionEditor from "../components/journal/ReflectionEditor";
import ReadingProgress from "../components/dashboard/ReadingProgress";
import layoutStyles from "../components/Layout.module.css";

export default function Dashboard() {
  const { user, themes } = useAppData();
  const { reflecting, attached, startReflection, closeReflection } = useReflection();
  const todaysPrompt = pickPromptForToday(promptsForOrder(user.orderId));

  return (
    <>
      {reflecting && (
        <ReflectionEditor
          entry={reflecting === "new" ? undefined : reflecting}
          closeModal={closeReflection}
          themes={themes}
          attached={attached}
        />
      )}
      <div className="rise" style={{ animationDelay: "100ms" }}>
        <PromptCard prompt={todaysPrompt} onRespond={startReflection} />
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
