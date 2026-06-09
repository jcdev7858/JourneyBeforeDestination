import Layout from "../components/Layout";
import Header from "../components/Header";
import PromptCard from "../components/dashboard/PromptCard";
import OrderCard from "../components/dashboard/OrderCard";
import ActiveOathCard from "../components/dashboard/ActiveOathCard";
import ReadingProgress from "../components/dashboard/ReadingProgress";
import layoutStyles from "../components/Layout.module.css";

export default function Dashboard() {
  return (
    <>
      <Layout>
        <Header />
        <PromptCard />
        <div className={layoutStyles.grid2}>
          <OrderCard />
          <ActiveOathCard />
        </div>
        <ReadingProgress />
      </Layout>
    </>
  );
}
