import { useAppData } from "../context/AppDataContext";
import { ORDERS } from "../data/orders";
import { CHARACTERS } from "../data/characters";
import Flex from "../components/ui/Flex";
import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import DexOrderCard from "../components/radiantdex/DexOrderCard";
import DexFeatureCard from "../components/radiantdex/DexFeatureCard";
import CharacterCard from "../components/radiantdex/CharacterCard";

export default function RadiantDex() {
  const { user } = useAppData();
  const otherOrders = Object.values(ORDERS).filter((o) => o.id !== user.orderId);

  return (
    <Flex gap={"var(--sp-5)"} vertical>
      <PageHead
        title="RadiantDex"
        eyebrow="The Ten Orders"
        lead="Who you're becoming, and who's walked the path before you. Browse the Orders, or the characters who exemplify their Ideals."
        user={user}
      />

      <SectionHead title="The Ten Orders" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "var(--gap-card)",
        }}
      >
        <DexFeatureCard order={ORDERS[user.orderId]} onOpen />
        {otherOrders.map((o) => (
          <DexOrderCard order={o} key={o.id} onOpen />
        ))}
      </div>

      <SectionHead title="Browse by character" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "var(--gap-card)",
        }}
      >
        {CHARACTERS.map((c) => (
          <CharacterCard char={c} key={c.id} onOpen />
        ))}
      </div>
    </Flex>
  );
}
