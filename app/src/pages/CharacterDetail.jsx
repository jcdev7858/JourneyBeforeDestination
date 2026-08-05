import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { CHARACTERS_BY_ID, charactersByOrder } from "../data/characters";
import { ORDERS } from "../data/orders";
import { useAppData } from "../context/AppDataContext";
import Flex from "../components/ui/Flex";
import DexFeatureCard from "../components/radiantdex/DexFeatureCard";
import CharacterCard from "../components/radiantdex/CharacterCard";
import NavigationLink from "../components/NavigationLink";
import OrderGlyph from "../components/OrderGlyph";
import EmptyCard from "../components/EmptyCard";
import SectionHead from "../components/SectionHead";
import ReflectionEditor from "../components/journal/ReflectionEditor";
import CharacterSummaryCard from "../components/radiantdex/CharacterSummaryCard";
import CharacterMetaCard from "../components/radiantdex/CharacterMetaCard";
import CharacterQuotes from "../components/radiantdex/CharacterQuotes";
import { Shield, BookOpen, Zap, ArrowLeft, ArrowRight } from "lucide-react";
import DexPortrait from "../components/radiantdex/DexPortrait";
import { BOOKS_BY_ID } from "../data/books";
import { capitalize } from "../utils/strings";
import { quotesByCharacter, fullQuoteLabel } from "../data/quotes";

const CharacterDetail = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { themes } = useAppData();
  const [reflecting, setReflecting] = useState(null);
  const [attached, setAttached] = useState([]);
  const char = CHARACTERS_BY_ID[characterId];

  // URL param is user-controlled (/dex/anything) — guard before touching char.*
  if (!char) {
    return (
      <EmptyCard
        title={`No Radiant by the name ${characterId}.`}
        text={`Whoever you're looking for hasn't spoken the oaths here yet. Head back and find who you're looking for.`}
        onCta={() => navigate("/dex")}
        ctaLabel="Return to RadiantDex"
        icon={<ArrowRight />}
        media={<OrderGlyph order="roshar" h={140} variant="empty" />}
      />
    );
  }

  const orderMates = charactersByOrder(char.orderId).filter((c) => c.id !== char.id);
  const firstAppears = BOOKS_BY_ID[char.books[0]];
  const appearsIn = char.books.map((id) => BOOKS_BY_ID[id]);
  const order = ORDERS[char.orderId];
  const quotes = quotesByCharacter(char.id);
  const metaItems = [
    { icon: <Shield />, label: "Values", value: order.values.join(", ") },
    { icon: <BookOpen />, label: "First Appears", value: firstAppears.title },
    { icon: <Zap />, label: "Surges", value: order.surges.join(", ") },
  ];

  const handleOnReflect = (quote) => {
    setReflecting("new");
    setAttached((prev) => [
      ...prev,
      { type: "quote", label: fullQuoteLabel(quote.id), id: quote.id },
    ]);
  };

  return (
    <Flex gap={"var(--section-gap)"} vertical>
      {reflecting && (
        <ReflectionEditor
          entry={reflecting === "new" ? undefined : reflecting}
          closeModal={() => (setReflecting(null), setAttached([]))}
          themes={themes}
          attached={attached}
        />
      )}

      <NavigationLink to={`../dex/`} text="Back to RadiantDex" type="muted" icon={<ArrowLeft />} />
      <Flex className="rise" style={{ animationDelay: "100ms" }} vertical>
        <DexFeatureCard
          name={char.name}
          orderId={char.orderId}
          meta={metaItems}
          eyebrow="RadiantDex · Character"
          belowHeader={char.role}
          media={<DexPortrait char={char} />}
          navLink={
            <NavigationLink
              to={`../dex/order/${order.id}`}
              text={order.name}
              icon={<OrderGlyph order={order.id} h={18} variant="block" />}
            />
          }
        />
      </Flex>

      {quotes.length > 0 && (
        <Flex className="rise" style={{ animationDelay: "200ms" }} vertical>
          <CharacterQuotes quotes={quotes} onReflect={(q) => handleOnReflect(q)} />
        </Flex>
      )}

      <div
        className="rise"
        style={{
          animationDelay: "300ms",
          display: "grid",
          gridTemplateColumns: "1.25fr 1fr",
          gap: "var(--section-gap)",
        }}
      >
        <CharacterSummaryCard char={char} />
        <CharacterMetaCard char={char} books={appearsIn} />
      </div>

      <Flex className="rise" style={{ animationDelay: "400ms" }} vertical>
        <SectionHead title={`Also walking the ${capitalize(order.id)} path`} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--gap-card)",
          }}
        >
          {orderMates.map((c) => (
            <Link to={`./${c.id}`} style={{ textDecoration: "none", display: "grid" }} key={c.id}>
              <CharacterCard char={c} />
            </Link>
          ))}
        </div>
      </Flex>
    </Flex>
  );
};

export default CharacterDetail;
