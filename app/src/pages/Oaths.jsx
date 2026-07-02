import PageHead from "../components/PageHead";
import OathCard from "../components/OathCard";
import Button from "../components/ui/Button";
import Flex from "../components/ui/Flex";
import { useAppData } from "../context/AppDataProvider";
import { useState } from "react";
import EmptyOathCard from "../components/EmptyOathCard";
import OathEditor from "../components/OathEditor";

export default function Oaths() {
  const { oaths } = useAppData();
  const [editing, setEditing] = useState(null);

  return (
    <Flex vertical gap={20}>
      <PageHead
        eyebrow="Your Oaths"
        title="The words you live by"
        lead="Two oaths run in parallel: the Ideals that mark how far you've walked the path, and the personal vows you keep day to day."
        cta="New Oath"
        onClick={() => setEditing("new")}
        primary
      />
      {editing && (
        <OathEditor
          oath={editing === "new" ? undefined : editing}
          closeModal={() => setEditing(null)}
        />
      )}

      {oaths.length > 0 ? (
        // TODO: add sorting of oaths before map, so by createdDate or status
        oaths.map((oath) => (
          <OathCard oath={oath} title={oath.status} key={oath.id}>
            <Flex gap={12}>
              <Button type="default" size="large" onClick={() => setEditing(oath)}>
                Edit
              </Button>
              <Button type="default" size="large">
                Archive
              </Button>
            </Flex>
          </OathCard>
        ))
      ) : (
        <EmptyOathCard />
      )}
    </Flex>
  );
}
