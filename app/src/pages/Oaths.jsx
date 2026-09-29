import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import OathCard from "../components/OathCard";
import OathMenu from "../components/oaths/OathMenu";
import OrderGlyph from "../components/OrderGlyph";
import Button from "../components/ui/Button";
import Flex from "../components/ui/Flex";
import { useAppData } from "../context/AppDataContext";
import { RotateCcw, Check, Plus, Feather } from "lucide-react";
import { useReflection } from "../hooks/useReflection";
import { useOathEditor } from "../hooks/useOathEditor";
import OathEditor from "../components/oaths/OathEditor";
import EmptyCard from "../components/EmptyCard";
import ReflectionEditor from "../components/journal/ReflectionEditor";
import IdealLadder from "../components/oaths/IdealLadder";
import { idealById } from "../data/ideals";

export default function Oaths() {
  const { oaths, themes, restoreOath, archiveOath, deleteOath, user } = useAppData();
  const { reflecting, attached, startReflection, closeReflection } = useReflection();
  const { editing, openNew, openEdit, borrowIdeal, closeOathEditor } = useOathEditor();
  const active = oaths.filter((o) => o.status === "active");
  const kept = oaths.filter((o) => o.status === "kept");
  const archived = oaths.filter((o) => o.status === "archived");
  const isBorrowing = editing?.fromIdeal;
  const editingOath = editing === "new" || isBorrowing ? undefined : editing;
  const seedWords = isBorrowing ? idealById(editing.fromIdeal)?.text : undefined;

  return (
    <Flex vertical gap={"var(--sp-5)"}>
      <PageHead
        eyebrow="Your Oaths"
        title="The words you live by"
        lead="Two oaths run in parallel: the Ideals that mark how far you've walked the path, and the personal vows you keep day to day."
        user={user}
      />
      {editing && (
        <OathEditor oath={editingOath} seedWords={seedWords} closeModal={closeOathEditor} />
      )}

      {reflecting && (
        <ReflectionEditor
          entry={reflecting === "new" ? undefined : reflecting}
          closeModal={closeReflection}
          themes={themes}
          attached={attached}
        />
      )}

      <Flex vertical gap={20} className="rise" style={{ animationDelay: "200ms" }}>
        <IdealLadder orderId={user.orderId} onReflect={startReflection} onBorrow={borrowIdeal} />
      </Flex>

      <Flex vertical gap={20} className="rise" style={{ animationDelay: "200ms" }}>
        <SectionHead
          title="Personal oaths"
          cta="Write an Oath"
          icon={<Plus />}
          onClick={() => openNew()}
          primary
        />
        {active.length > 0 ? (
          // show only active oaths
          // TODO: add sorting of oaths before map, so by createdDate or status
          active.map((oath) => (
            <OathCard oath={oath} key={oath.id} clickable onClick={() => openEdit(oath)}>
              <Flex gap={12} justify="flex-end">
                {oath.actions.length === 0 && (
                  <Button type="ghost" size="large" icon={<Check />}>
                    Practice today
                  </Button>
                )}
                <Button
                  type="ghost"
                  size="large"
                  icon={<Feather />}
                  onClick={() => startReflection({ type: "oath", label: oath.title, id: oath.id })}
                >
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
          <EmptyCard
            title="No oaths yet"
            text="Every Radiant begins with the same words and comes to mean something personal by them. Speak the First Ideal to start your path."
            ctaLabel="Speak the First Ideal"
            onCta={() => openNew()}
            media={<OrderGlyph order={user.orderId} h={110} variant="empty" />}
          />
        )}
      </Flex>

      {kept.length > 0 && (
        <Flex vertical gap={20} className="rise" style={{ animationDelay: "300ms" }}>
          <SectionHead title="Kept" lead={`${kept.length} fulfilled`} />
          {kept.map((oath) => (
            // show only kept oaths
            <OathCard oath={oath} key={oath.id} clickable onClick={() => openEdit(oath)}>
              <Button
                type="ghost"
                size="large"
                icon={<Feather />}
                onClick={() => startReflection({ type: "oath", label: oath.title, id: oath.id })}
              >
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
            <OathCard oath={oath} key={oath.id} clickable onClick={() => openEdit(oath)}>
              <Button
                type="ghost"
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
