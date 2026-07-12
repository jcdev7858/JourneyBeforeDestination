import { useAppData } from "../context/AppDataContext";
import { useMemo } from "react";
import { Feather } from "lucide-react";
import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import EntryCard from "../components/journal/EntryCard";
import Title from "../components/ui/Title";
import Flex from "../components/ui/Flex";
import styles from "./Journal.module.css";

export default function Journal() {
  const { user, formatDate, journalEntries } = useAppData();
  // group the flat entries into month buckets for the timeline.
  // flat list - { "June 2026": [entry, entry, ...], "May 2026": [...] } → [{ month, entries }]
  const months = useMemo(
    () =>
      // groupBy keys each entry by its formatted month ("June 2026")
      Object.entries(Object.groupBy(journalEntries, (e) => formatDate(e.createdAt)))
        // turn the bucket object into rows we can render
        .map(([month, entries]) => ({ month, entries })),
    [journalEntries]
  );

  return (
    <Flex gap={"var(--sp-5)"} vertical>
      <PageHead
        eyebrow="Your Reflections"
        title="Journal"
        lead="A place to write. Kept private and gathered here. Most days it's just what's on your mind; some entries answer a prompt or belong to an oath. The stormlight you've drawn in, one day at a time."
        user={user}
      />

      <SectionHead title="Entries" cta="New Entry" icon={<Feather />} primary />

      {months.map((m, mi) => (
        <Flex key={m.month} vertical>
          <Title
            level={3}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--fs-quote)",
              color: "var(--text-muted)",
              margin: "4px 0 16px",
            }}
          >
            {m.month}
          </Title>
          <Flex vertical>
            {m.entries.map((e, i) => (
              <div key={e.id} className={styles.tlEntry}>
                <Flex className={styles.tlRail} vertical align="center">
                  {/* hide the top line on the very first entry of the feed */}
                  <Flex
                    className={`${styles.tlLine} ${mi === 0 && i === 0 ? styles.hidden : ""}`}
                  ></Flex>
                  <Flex className={styles.tlDot}></Flex>
                  <Flex className={styles.tlLine}></Flex>
                </Flex>
                <Flex className={styles.tlBody} vertical>
                  <EntryCard e={e} />
                </Flex>
              </div>
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
