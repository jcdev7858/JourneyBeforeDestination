import PageHead from "../components/PageHead";

export default function Journal() {
  return (
    <div>
      <PageHead
        eyebrow="Your Reflections"
        title="Journal"
        lead="Every prompt you've answered, kept private and gathered here. The stormlight you've drawn in one day at a time."
        cta="New Entry"
        primary={true}
      />
    </div>
  );
}
