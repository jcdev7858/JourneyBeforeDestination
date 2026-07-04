import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import OathCard from "../components/OathCard";
import Button from "../components/ui/Button";
import Flex from "../components/ui/Flex";
import { useAppData } from "../context/AppDataContext";
import { useState } from "react";
import { ArrowRight, Feather } from "lucide-react";
import EmptyOathCard from "../components/EmptyOathCard";
import OathEditor from "../components/OathEditor";

export default function Oaths() {
  const { oaths, restoreOath } = useAppData();
  const [editing, setEditing] = useState(null);
  const active = oaths.filter((o) => o.status === "active");
  const kept = oaths.filter((o) => o.status === "kept");
  const archived = oaths.filter((o) => o.status === "archived");

  return (
    <Flex vertical gap={20}>
      <PageHead
        eyebrow="Your Oaths"
        title="The words you live by"
        lead="Two oaths run in parallel: the Ideals that mark how far you've walked the path, and the personal vows you keep day to day."
      />
      {editing && (
        <OathEditor
          oath={editing === "new" ? undefined : editing}
          closeModal={() => setEditing(null)}
        />
      )}

      <SectionHead title="Personal oaths" cta="Write an Oath" onClick={() => setEditing("new")} />
      {active.length > 0 ? (
        // TODO: add sorting of oaths before map, so by createdDate or status
        active.map((oath) => (
          <OathCard oath={oath} key={oath.id}>
            <Flex gap={12} justify="flex-end">
              <Button
                type="default"
                size="large"
                icon={<ArrowRight />}
                onClick={() => setEditing(oath)}
              >
                Open
              </Button>
              <Button type="default" size="large" icon={<Feather />}>
                Reflect
              </Button>
            </Flex>
          </OathCard>
        ))
      ) : (
        <EmptyOathCard makeNewOath={() => setEditing("new")} />
      )}

      {kept.length > 0 && (
        <>
          <SectionHead title="Kept" lead={`${kept.length} fulfilled`} />
          {kept.map((oath) => (
            <OathCard oath={oath} key={oath.id}>
              <Button type="default" size="large" icon={<Feather />}>
                Reflect
              </Button>
            </OathCard>
          ))}
        </>
      )}

      {archived.length > 0 && (
        <>
          <SectionHead title="Archived" lead={`${archived.length} set aside`} />
          {archived.map((oath) => (
            <OathCard oath={oath} key={oath.id}>
              <Button
                type="default"
                size="large"
                icon={<ArrowRight />}
                onClick={() => restoreOath(oath.id)}
              >
                Restore
              </Button>
            </OathCard>
          ))}
        </>
      )}
    </Flex>
  );
}
