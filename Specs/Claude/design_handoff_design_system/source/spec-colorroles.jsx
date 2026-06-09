/* Color roles — the legend / guidance card. Explains the discipline:
   neutrals carry the UI; stormlight blue is the constant "light"; the Order
   accent is one identity color applied to a fixed short list; gold is in
   question. */
function Swatch({ c, ring, size = 22 }) {
  return <span style={{ width: size, height: size, borderRadius: 6, flexShrink: 0, background: c, border: ring || '1px solid rgba(255,255,255,0.12)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)' }} />;
}
function Dot({ c }) {
  return <span style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, background: c, boxShadow: `0 0 10px ${c}` }} />;
}

function ColorRoles() {
  const Row = ({ swatches, role, use, dim }) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '15px 0', borderTop: '1px solid var(--border)', opacity: dim ? 0.78 : 1 }}>
      <div style={{ display: 'flex', gap: 7, width: 96, flexShrink: 0, paddingTop: 1 }}>{swatches}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 19, lineHeight: 1.2 }}>{role}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{use}</div>
      </div>
    </div>
  );
  return (
    <div className="jbd">
      <div className="aura"><div className="orb orb-sky"></div></div>
      <div className="jbd-scroll" style={{ padding: '34px 38px 36px' }}>
        <div className="card-label" style={{ marginBottom: 6 }}>The system</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, marginBottom: 4 }}>Color roles</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: '46ch', marginBottom: 14 }}>
          Two light colors, the rest neutral. Each color has one job — that's the rule that keeps it calm.
        </p>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 14, marginBottom: 2 }}>Neutral · carries the UI</div>
          <Row
            swatches={<><Swatch c="#0b0f1c" /><Swatch c="#141a2c" /><Swatch c="rgba(40,52,86,0.6)" /></>}
            role="Slate surfaces"
            use="Backgrounds, cards, the glass. Never competes with content." />
          <Row
            swatches={<><Swatch c="#e9e5d7" /><Swatch c="#8b95ad" /><Swatch c="#5b647d" /></>}
            role="Parchment text — 3 weights"
            use="All copy, including muted labels, pills, and crossed-out actions. These reads as 'quiet', not as a color." />

          <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 20, marginBottom: 2 }}>Light · the constant</div>
          <Row
            swatches={<Dot c="#7cc4e8" />}
            role="Stormlight blue"
            use="The light itself: the brand mark, the breathing glow, and infused gems (reading + oath progress). Does not change by Order." />

          <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 20, marginBottom: 2 }}>Identity · one per Order</div>
          <Row
            swatches={<><Dot c="#7cc4e8" /><Dot c="#6fc4a0" /><Dot c="#df9a6a" /></>}
            role="Order accent"
            use="Applied only to: eyebrow · Order glyph · primary button · active nav. That short list is the whole rule." />

          <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 20, marginBottom: 2 }}>In question</div>
          <Row dim
            swatches={<Dot c="#d8b878" />}
            role="Radiant gold"
            use="Today it carries progress + oaths. Proposing to retire it — let infused stormlight (a filling sphere) do that job instead." />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ColorRoles });
