import { useAppData } from "../context/AppDataContext";
import { useMemo, useState } from "react";
import { Feather } from "lucide-react";
import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import EntryCard from "../components/journal/EntryCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import OrderGlyph from "../components/OrderGlyph";
import Title from "../components/ui/Title";
import Flex from "../components/ui/Flex";
import styles from "./Journal.module.css";
import ReflectionEditor from "../components/journal/ReflectionEditor";
import EmptyCard from "../components/EmptyCard";

const ENTRY_KINDS = ["Free", "Prompted", "Linked", "Favorites"];

export default function Journal() {
  const { user, formatDate, journalEntries } = useAppData();
  const [activeTypeFilter, setActiveTypeFilter] = useState("All");
  const [activeThemeFilter, setActiveThemeFilter] = useState("All");
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(null);

  const searchResults = journalEntries.filter((e) => {
    const title = e.title ? e.title.toLowerCase() : "";
    if (searchTerm === "") return e;

    const body = e.body.toLowerCase();
    if (title.includes(searchTerm) || body.includes(searchTerm)) return e;
  });

  let filteredEntries;
  switch (activeTypeFilter) {
    case "Prompted":
      filteredEntries = searchResults.filter((e) => e.promptId);
      break;
    case "Linked":
      filteredEntries = searchResults.filter((e) => e.oathId || e.idealId || e.promptId);
      break;
    case "Favorites":
      filteredEntries = searchResults.filter((e) => e.fav);
      break;
    case "Free":
      filteredEntries = searchResults.filter((e) => !e.oathId && !e.idealId && !e.promptId);
      break;
    case "All":
      filteredEntries = searchResults;
      break;
    default:
      filteredEntries = searchResults;
  }

  const themedEntries = filteredEntries.filter((e) => {
    if (activeThemeFilter === "All") return true;
    return e.themes.includes(activeThemeFilter);
  });

  // group the flat entries into month buckets for the timeline.
  // flat list - { "June 2026": [entry, entry, ...], "May 2026": [...] } → [{ month, entries }]
  const months = useMemo(
    () =>
      // groupBy keys each entry by its formatted month ("June 2026")
      Object.entries(Object.groupBy(themedEntries, (e) => formatDate(e.createdAt)))
        // turn the bucket object into rows we can render
        .map(([month, entries]) => ({ month, entries })),
    [themedEntries]
  );
  const themes = useMemo(
    () => Array.from(new Set(journalEntries.flatMap((e) => e.themes))),
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

      {editing && (
        <ReflectionEditor
          entry={editing === "new" ? undefined : editing}
          closeModal={() => setEditing(null)}
        />
      )}

      <SectionHead
        title="Entries"
        cta="New Entry"
        onClick={() => setEditing(true)}
        icon={<Feather />}
        primary
      />

      <Flex vertical gap={8}>
        <SearchBar
          setSearch={setSearchTerm}
          toggleFilters={() => setFilterVisible(!filterVisible)}
        />
        {filterVisible && (
          <>
            <FilterBar
              data={ENTRY_KINDS}
              setFilter={setActiveTypeFilter}
              activeValue={activeTypeFilter}
            />
            <FilterBar
              data={themes}
              label="Themes"
              setFilter={setActiveThemeFilter}
              activeValue={activeThemeFilter}
            />
          </>
        )}
      </Flex>

      {months.length > 0 ? (
        months.map((m, mi) => (
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
                    <EntryCard e={e} clickable onClick={() => setEditing(e)} />
                  </Flex>
                </div>
              ))}
            </Flex>
          </Flex>
        ))
      ) : (
        <EmptyCard
          title="Nothing here yet"
          text="Free thoughts, prompts, oaths and Ideals all land here once you write them. Nothing's been set down yet."
          ctaLabel="New Entry"
          onCta={() => setEditing("new")}
          icon={<OrderGlyph order={user.orderId} h={110} variant="empty" />}
        />
      )}
    </Flex>
  );
}
