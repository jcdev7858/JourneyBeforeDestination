import PromptCard from "../components/dashboard/PromptCard";
import OrderCard from "../components/dashboard/OrderCard";
import ActiveOathCard from "../components/dashboard/ActiveOathCard";
import ReadingProgress from "../components/dashboard/ReadingProgress";
import layoutStyles from "../components/Layout.module.css";

export default function Dashboard() {
  return (
    <>
      <div className="rise" style={{ animationDelay: "100ms" }}>
        <PromptCard />
      </div>
      <div className={`${layoutStyles.grid2} rise`} style={{ animationDelay: "200ms" }}>
        <OrderCard />
        <ActiveOathCard />
      </div>
      <div className="rise" style={{ animationDelay: "300ms" }}>
        <ReadingProgress />
      </div>
    </>
  );
}
