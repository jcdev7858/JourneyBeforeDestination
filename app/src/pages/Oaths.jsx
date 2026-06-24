import PageHead from "../components/PageHead";
import OathCard from "../components/OathCard";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Flex from "../components/ui/Flex";
import Title from "../components/ui/Title";
import { useAppData } from "../context/AppDataProvider";
import { Plus } from "lucide-react";
import styles from "../components/OathCard.module.css";

export default function Oaths() {
  const { oaths } = useAppData();

  return (
    <Flex vertical gap={20}>
      <PageHead title="Oaths" cta="New Oath" primary={true} />
      {oaths.length > 0 ? (
        oaths.map((oath) => (
          <OathCard oath={oath} title={oath.status} key={oath.id}>
            <Flex gap={12}>
              <Button type="default" size="large">
                Edit
              </Button>
              <Button type="default" size="large">
                Archive
              </Button>
            </Flex>
          </OathCard>
        ))
      ) : (
        <Card title="Set An Oath">
          <Title level={3} className={styles.oathText}>
            Say the words. Swear your first oath.
          </Title>
          <Button type="primary" size="large" icon={<Plus />}>
            Create Oath
          </Button>
        </Card>
      )}
    </Flex>
  );
}
