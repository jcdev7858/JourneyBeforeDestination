import OathCard from "../OathCard";
import EmptyCard from "../EmptyCard";
import { useAppData } from "../../context/AppDataContext";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function ActiveOathCard() {
  const { oaths, formatRelativeTime } = useAppData();
  const navigate = useNavigate();
  const activeOath = oaths.find((o) => o.status === "active");
  if (!activeOath) {
    return (
      <EmptyCard
        title="No oaths yet"
        text="Every Radiant begins with the same words and comes to mean something personal by them. Speak the First Ideal to start your path."
        ctaLabel="Speak the First Ideal"
        onCta={() => navigate("/oaths")}
      />
    );
  }

  return (
    <OathCard
      oath={activeOath}
      title="Active Oath"
      footMeta={`Began ${activeOath.createdAt && formatRelativeTime(activeOath.createdAt)}`}
    >
      {activeOath.actions.every((o) => o.completed) ? (
        ""
      ) : (
        <Button size="large" icon={<ArrowRight />} to={"/oaths"}>
          Tend This Oath
        </Button>
      )}
    </OathCard>
  );
}
