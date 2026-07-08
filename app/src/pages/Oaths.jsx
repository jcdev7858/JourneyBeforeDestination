import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import OathCard from "../components/OathCard";
import OathMenu from "../components/OathMenu";
import Button from "../components/ui/Button";
import Flex from "../components/ui/Flex";
import { useAppData } from "../context/AppDataContext";
import { useState } from "react";
import { RotateCcw, Check, Feather } from "lucide-react";
import EmptyOathCard from "../components/EmptyOathCard";
import OathEditor from "../components/OathEditor";

export default function Oaths() {
  const { oaths, restoreOath, archiveOath, deleteOath } = useAppData();
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

      <Flex vertical gap={20} className="rise" style={{ animationDelay: "200ms" }}>
        <SectionHead title="Personal oaths" cta="Write an Oath" onClick={() => setEditing("new")} />
        {active.length > 0 ? (
          // show only active oaths
          // TODO: add sorting of oaths before map, so by createdDate or status
          active.map((oath) => (
            <OathCard oath={oath} key={oath.id} clickable onClick={() => setEditing(oath)}>
              <Flex gap={12} justify="flex-end">
                {oath.actions.length === 0 && (
                  <Button type="ghost" size="large" icon={<Check />}>
                    Practice today
                  </Button>
                )}
                <Button type="secondary" size="large" icon={<Feather />}>
                  Reflect
                </Button>
                <OathMenu
                  onClick={(e) => e.stopPropagation()}
                  setArchive={() => archiveOath(oath.id)}
                  setDelete={() => deleteOath(oath.id)}
                />
              </Flex>
            </OathCard>
          ))
        ) : (
          <EmptyOathCard makeNewOath={() => setEditing("new")} />
        )}
      </Flex>

      {kept.length > 0 && (
        <Flex vertical gap={20} className="rise" style={{ animationDelay: "300ms" }}>
          <SectionHead title="Kept" lead={`${kept.length} fulfilled`} />
          {kept.map((oath) => (
            // show only kept oaths
            <OathCard oath={oath} key={oath.id} clickable onClick={() => setEditing(oath)}>
              <Button type="secondary" size="large" icon={<Feather />}>
                Reflect
              </Button>
              <OathMenu
                onClick={(e) => e.stopPropagation()}
                setArchive={() => archiveOath(oath.id)}
                setDelete={() => deleteOath(oath.id)}
              />
            </OathCard>
          ))}
        </Flex>
      )}

      {archived.length > 0 && (
        <Flex vertical gap={20} className="rise" style={{ animationDelay: "400ms" }}>
          <SectionHead title="Archived" lead={`${archived.length} set aside`} />
          {archived.map((oath) => (
            // show only active oaths
            <OathCard oath={oath} key={oath.id} clickable onClick={() => setEditing(oath)}>
              <Button
                type="secondary"
                size="large"
                icon={<RotateCcw />}
                onClick={() => restoreOath(oath.id)}
              >
                Restore
              </Button>
              <OathMenu
                onClick={(e) => e.stopPropagation()}
                setDelete={() => deleteOath(oath.id)}
              />
            </OathCard>
          ))}
        </Flex>
      )}
    </Flex>
  );
}
