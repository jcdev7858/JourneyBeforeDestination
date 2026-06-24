import Card from "../ui/Card";
import Title from "../ui/Title";
import OathCard from "../OathCard";
import styles from "./ActiveOathCard.module.css";
import { useAppData } from "../../context/AppDataProvider";

export default function ActiveOathCard() {
  const { oaths } = useAppData();
  const activeOath = oaths.find((o) => o.status === "active");
  if (!activeOath) {
    return (
      <Card title="Active Oath">
        <Title level={3} className={styles.oathText}>
          You haven't set an oath yet.
        </Title>
        {/* TODO: a button/link to create a new oath */}
      </Card>
    );
  }

  return <OathCard oath={activeOath} title="Active Oath" maxActions={3} />;
}
