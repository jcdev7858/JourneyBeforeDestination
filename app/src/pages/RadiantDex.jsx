import { useAppData } from "../context/AppDataContext";
import { ORDERS } from "../data/orders";
import { CHARACTERS } from "../data/characters";
import { Shield, Star, Zap, Sword } from "lucide-react";
import Flex from "../components/ui/Flex";
import PageHead from "../components/PageHead";
import SectionHead from "../components/SectionHead";
import DexOrderCard from "../components/radiantdex/DexOrderCard";
import DexFeatureCard from "../components/radiantdex/DexFeatureCard";
import CharacterCard from "../components/radiantdex/CharacterCard";
import ReadingProgress from "../components/dashboard/ReadingProgress";
import { Link } from "react-router-dom";
import OrderGlyph from "../components/OrderGlyph";
import styles from "./RadiantDex.module.css";

export default function RadiantDex() {
  const { user } = useAppData();
  const otherOrders = Object.values(ORDERS).filter((o) => o.id !== user.orderId);
  const metaItems = [
    { icon: <Shield />, label: "Values", value: ORDERS[user.orderId].values.join(", ") },
    { icon: <Star />, label: "Spren", value: ORDERS[user.orderId].spren },
    { icon: <Zap />, label: "Surges", value: ORDERS[user.orderId].surges.join(", ") },
    { icon: <Sword />, label: "Herald", value: ORDERS[user.orderId].herald },
  ];

  return (
    <Flex gap={"var(--section-gap)"} vertical>
      <PageHead
        title="RadiantDex"
        eyebrow="The Ten Orders"
        lead="Who you're becoming, and who's walked the path before you. Browse the Orders, or the characters who exemplify their Ideals."
        user={user}
      />

      <div className="rise" style={{ animationDelay: "100ms" }}>
        <SectionHead title="The Ten Orders" />
        <Link
          to={`./order/${user.orderId}`}
          style={{ textDecoration: "none", gridColumn: "1 / -1" }}
        >
          <DexFeatureCard
            name={ORDERS[user.orderId].name}
            description={ORDERS[user.orderId].description}
            orderId={user.orderId}
            meta={metaItems}
            eyebrow="Your Path"
            media={<OrderGlyph order={user.orderId} h={200} variant="corner" />}
            footer="View your order"
            clickable
          />
        </Link>
      </div>
      <div
        className={`${styles.grid3} rise`}
        style={{
          animationDelay: "200ms",
        }}
      >
        {otherOrders.map((o) => (
          <Link
            to={`./order/${o.id}`}
            style={{ textDecoration: "none", display: "grid" }}
            key={o.id}
          >
            <DexOrderCard order={o} />
          </Link>
        ))}
      </div>

      <Flex
        className="rise"
        style={{
          animationDelay: "300ms",
        }}
        vertical
      >
        <SectionHead title="Browse by character" />

        <div className={styles.grid3}>
          {CHARACTERS.map((c) => (
            <Link to={`./${c.id}`} style={{ textDecoration: "none", display: "grid" }} key={c.id}>
              <CharacterCard char={c} />
            </Link>
          ))}
        </div>
      </Flex>

      <div className="rise" style={{ animationDelay: "400ms" }}>
        <ReadingProgress footer="This gates which RadiantDex entries are revealed above. Set it to wherever you've actually read." />
      </div>
    </Flex>
  );
}
