import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";
import { ORDERS } from "../data/orders";
import { charactersByOrder } from "../data/characters";
import { useReflection } from "../hooks/useReflection";
import Flex from "../components/ui/Flex";
import SectionHead from "../components/SectionHead";
import ReflectionEditor from "../components/journal/ReflectionEditor";
import DexFeatureCard from "../components/radiantdex/DexFeatureCard";
import NavigationLink from "../components/NavigationLink";
import CharacterCard from "../components/radiantdex/CharacterCard";
import OrderGlyph from "../components/OrderGlyph";
import EmptyCard from "../components/EmptyCard";
import IdealLadder from "../components/oaths/IdealLadder";
import { ArrowLeft, ArrowRight, Shield, Star, Zap, Sword } from "lucide-react";

const OrderDetail = () => {
  const { orderId } = useParams();
  const { themes, user } = useAppData();
  const navigate = useNavigate();
  const { reflecting, attached, startReflection, closeReflection } = useReflection();
  const order = ORDERS[orderId];

  // URL param is user-controlled (/dex/anything) — guard before touching char.*
  if (!order) {
    return (
      <EmptyCard
        title={`No Order by that name`}
        text={`There are ten Orders of the Knights Radiant, each bound to a different Ideal. Head back and find the one you're looking for.`}
        onCta={() => navigate("/dex")}
        ctaLabel="Return to RadiantDex"
        icon={<ArrowRight />}
        media={<OrderGlyph order="roshar" h={140} variant="empty" />}
      />
    );
  }

  const metaItems = [
    { icon: <Shield />, label: "Values", value: ORDERS[orderId].values.join(", ") },
    { icon: <Star />, label: "Spren", value: ORDERS[orderId].spren },
    { icon: <Zap />, label: "Surges", value: ORDERS[orderId].surges.join(", ") },
    { icon: <Sword />, label: "Herald", value: ORDERS[orderId].herald },
  ];
  const orderMates = charactersByOrder(orderId);

  return (
    <Flex gap={"var(--section-gap)"} vertical>
      {reflecting && (
        <ReflectionEditor
          entry={reflecting === "new" ? undefined : reflecting}
          closeModal={closeReflection}
          themes={themes}
          attached={attached}
        />
      )}

      <NavigationLink to={`../dex/`} text="Back to RadiantDex" type="muted" icon={<ArrowLeft />} />
      <Flex className="rise" style={{ animationDelay: "100ms" }} vertical>
        <DexFeatureCard
          name={ORDERS[orderId].name}
          description={ORDERS[orderId].description}
          orderId={orderId}
          meta={metaItems}
          eyebrow={orderId === user.orderId ? "Your Path" : "Order Details"}
          media={<OrderGlyph order={orderId} h={200} variant="corner" />}
        />
      </Flex>
      <Flex className="rise" style={{ animationDelay: "200ms" }} vertical>
        <IdealLadder orderId={orderId} onReflect={startReflection} />
      </Flex>

      {orderMates.length > 0 && (
        <Flex className="rise" style={{ animationDelay: "300ms" }} vertical>
          <SectionHead title="Exemplars" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "var(--gap-card)",
            }}
          >
            {orderMates.map((c) => (
              <Link
                to={`../dex/${c.id}`}
                style={{ textDecoration: "none", display: "grid" }}
                key={c.id}
              >
                <CharacterCard char={c} />
              </Link>
            ))}
          </div>
        </Flex>
      )}
    </Flex>
  );
};

export default OrderDetail;
