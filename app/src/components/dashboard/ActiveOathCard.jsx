import OathCard from "../OathCard";
import EmptyOathCard from "../EmptyOathCard";
import { useAppData } from "../../context/AppDataContext";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function ActiveOathCard() {
  const { oaths } = useAppData();
  const activeOath = oaths.find((o) => o.status === "active");
  if (!activeOath) {
    return <EmptyOathCard />;
  }

  return (
    <OathCard oath={activeOath} title="Active Oath">
      <Button size="large" icon={<ArrowRight />} to={"/oaths"}>
        Tend This Oath
      </Button>
    </OathCard>
  );
}
