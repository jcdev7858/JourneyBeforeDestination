import PromptCard from "../components/dashboard/PromptCard";
import OrderCard from "../components/dashboard/OrderCard";
import ActiveOathCard from "../components/dashboard/ActiveOathCard";
import ReadingProgress from "../components/dashboard/ReadingProgress";
import layoutStyles from "../components/Layout.module.css";

export default function Dashboard() {
  return (
    <>
      <PromptCard />
      <div className={layoutStyles.grid2}>
        <OrderCard />
        <ActiveOathCard />
      </div>
      <ReadingProgress />
    </>
  );
}
