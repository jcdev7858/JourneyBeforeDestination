import OathCard from "../OathCard";
import EmptyOathCard from "../EmptyOathCard";
import { useAppData } from "../../context/AppDataProvider";

export default function ActiveOathCard() {
  const { oaths } = useAppData();
  const activeOath = oaths.find((o) => o.status === "active");
  if (!activeOath) {
    return <EmptyOathCard />;
  }

  return <OathCard oath={activeOath} title="Active Oath" maxActions={3} />;
}
