/* Foundations — the standards every other page is built on: type scale,
   spacing rhythm, motion, button + input states, and the empty-state pattern.
   Live samples, not screenshots, so the tokens are the source of truth. */

function FIconFeather() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><path d="M16 8 2 22" /><path d="M17.5 15H9" /></svg>;
}
function FIconCheck() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>;
}
function FIconPlus() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14" /></svg>;
}
function FIconBook() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
}

function Section({ kicker, children }) {
  return (
    <div style={{ marginTop: 30 }}>
      <div style={{ fontSize: 'var(--fs-overline)', letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>{kicker}</div>
      {children}
    </div>
  );
}

function TypeRow({ cls, fontFamily, sample, spec }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '11px 0' }}>
      <div style={{ flex: 1, minWidth: 0, fontFamily, fontSize: `var(--fs-${cls.size})`, lineHeight: cls.lh ? `var(--lh-${cls.size})` : 1.3, fontWeight: cls.w || 400, letterSpacing: cls.ls || 'normal', textTransform: cls.upper ? 'uppercase' : 'none', color: cls.upper ? 'var(--text-faint)' : 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sample}</div>
      <div style={{ width: 188, flexShrink: 0, fontSize: 12, color: 'var(--text-faint)', textAlign: 'right' }}>{spec}</div>
    </div>
  );
}

function Foundations() {
  return (
    <div className="jbd">
      <div className="aura"><div className="orb orb-sky"></div></div>
      <div className="jbd-scroll" style={{ padding: '34px 40px 40px' }}>
        <div className="card-label" style={{ marginBottom: 6 }}>The system</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, marginBottom: 4 }}>Foundations</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: '52ch' }}>
          The shared standards every page inherits — so Oaths, Journal and the RadiantDex never drift. Desktop, dark only, Cormorant Garamond + Hanken Grotesk, Lucide icons.
        </p>

        {/* TYPE SCALE */}
        <Section kicker="Type scale · Cormorant (serif) for voice, Hanken (sans) for UI">
          <TypeRow cls={{ size: 'display', lh: 1, w: 400 }} fontFamily="var(--font-display)" sample="What are you avoiding?" spec="Display · 40 / 1.16 · serif" />
          <TypeRow cls={{ size: 'title', lh: 1, w: 500 }} fontFamily="var(--font-display)" sample="Truthwatcher" spec="Title · 30 / 1.2 · serif" />
          <TypeRow cls={{ size: 'heading', lh: 1, w: 400 }} fontFamily="var(--font-display)" sample="I will see things as they are." spec="Heading · 24 / 1.3 · serif" />
          <TypeRow cls={{ size: 'quote', lh: 1, w: 400 }} fontFamily="var(--font-display)" sample="Pick up where you left off" spec="Quote · 20 / 1.35 · serif" />
          <TypeRow cls={{ size: 'body-lg', w: 400 }} fontFamily="var(--font-body)" sample="Lead paragraph and intros." spec="Body L · 15 · sans" />
          <TypeRow cls={{ size: 'body', w: 400 }} fontFamily="var(--font-body)" sample="Default body copy and actions." spec="Body · 14 · sans" />
          <TypeRow cls={{ size: 'body-sm', w: 400 }} fontFamily="var(--font-body)" sample="Secondary and muted detail." spec="Body S · 13 · sans" />
          <TypeRow cls={{ size: 'overline', w: 600, ls: 1.4, upper: true }} fontFamily="var(--font-body)" sample="Today's reflection" spec="Overline · 11.5 · sans" />
        </Section>

        {/* SPACING */}
        <Section kicker="Spacing · 4px micro-scale inside, 30px rhythm between cards">
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', marginBottom: 34 }}>
            {[['1', 4], ['2', 8], ['3', 12], ['4', 16], ['5', 20], ['6', 24]].map(([n, px]) => (
              <div key={n} style={{ textAlign: 'center', width: 40 }}>
                <div style={{ width: px, height: px, background: 'rgba(var(--accent-rgb),0.4)', borderRadius: 3, margin: '0 auto 8px' }} />
                <div style={{ fontSize: 10.5, color: 'var(--text-faint)', lineHeight: 1.4 }}>sp-{n}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-faint)', lineHeight: 1.4 }}>{px}px</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--gap-card)' }}>
            <div className="glass" style={{ flex: 1, padding: 'var(--pad-card)' }}>
              <div className="card-label" style={{ marginBottom: 8 }}>Regular card</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>30px inner padding</div>
            </div>
            <div className="glass" style={{ flex: 1, padding: 'var(--pad-card)' }}>
              <div className="card-label" style={{ marginBottom: 8 }}>Regular card</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>30px gap between</div>
            </div>
          </div>
        </Section>

        {/* BUTTONS + STATES */}
        <Section kicker="Buttons · primary intensifies its glow on focus; outline takes the Order border on hover + focus">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: '14px 26px', alignItems: 'center' }}>
            <div style={{ fontSize: 11.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1 }}>Rest</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1 }}>Hover</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1 }}>Focus</div>

            <button className="btn btn-primary"><FIconFeather /> Respond</button>
            <button className="btn btn-primary" style={{ boxShadow: '0 0 36px rgba(var(--accent-rgb), 0.52)' }}><FIconFeather /> Respond</button>
            <button className="btn btn-primary" style={{ boxShadow: '0 0 48px rgba(var(--accent-rgb), 0.75), 0 0 0 1px rgba(var(--accent-rgb), 0.7)' }}><FIconFeather /> Respond</button>

            <button className="btn btn-ghost"><FIconPlus /> Add action</button>
            <button className="btn btn-ghost" style={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 1px rgba(var(--accent-rgb), 0.4)' }}><FIconPlus /> Add action</button>
            <button className="btn btn-ghost" style={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 1px rgba(var(--accent-rgb), 0.4)' }}><FIconPlus /> Add action</button>
          </div>
        </Section>

        {/* FORM FIELDS */}
        <Section kicker="Inputs · same focus language — Order border + faint ring">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--gap-card)' }}>
            <div className="field">
              <label className="field-label">Oath title</label>
              <input className="input" defaultValue="I will master my anger before it masters me." />
            </div>
            <div className="field">
              <label className="field-label">Focused</label>
              <input className="input" style={{ borderColor: 'var(--accent)', boxShadow: '0 0 0 1px rgba(var(--accent-rgb), 0.4), 0 0 18px rgba(var(--accent-rgb), 0.12)' }} defaultValue="Today I noticed…" />
            </div>
          </div>
          <div className="field" style={{ marginTop: 'var(--gap-card)' }}>
            <label className="field-label">Reflection</label>
            <textarea className="textarea" defaultValue="The fear was about being seen as weak. Naming it out loud made it smaller." />
          </div>
        </Section>

        {/* ICONS + MOTION */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <Section kicker="Icons · Lucide · 24px · 1.5–2 stroke · currentColor">
            <div style={{ display: 'flex', gap: 22, color: 'var(--accent)' }}>
              <FIconFeather /><FIconCheck /><FIconPlus /><FIconBook />
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 14, lineHeight: 1.55 }}>
              Same family as the glyphs — line, not fill, inheriting color. The Order seals are the only filled marks.
            </p>
          </Section>
          <Section kicker="Motion · transform-only, so capture & reduced-motion show the end state">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9, fontSize: 13, color: 'var(--text-muted)' }}>
              <li><strong style={{ color: 'var(--text)' }}>rise</strong> — 0.55s ease-out, entrance (staggered)</li>
              <li><strong style={{ color: 'var(--text)' }}>breathe</strong> — 7–9s loop, the aura only</li>
              <li><strong style={{ color: 'var(--text)' }}>ui</strong> — 0.18s, hover &amp; focus transitions</li>
              <li style={{ fontSize: 12, color: 'var(--text-faint)' }}>ease-out = cubic-bezier(0.2, 0.7, 0.2, 1)</li>
            </ul>
          </Section>
        </div>

        {/* EMPTY STATE */}
        <Section kicker="Empty states · a designed feature, never a blank box (scaffold, then personalize)">
          <div className="glass" style={{ padding: 0 }}>
            <div className="empty">
              <OrderGlyph order="windrunner" h={56} className="empty-glyph" />
              <div className="empty-title">No oaths yet</div>
              <div className="empty-text">Every Radiant starts with the same words and means something personal by them. Take the next step.</div>
              <button className="btn btn-primary" style={{ marginTop: 4 }}><FIconPlus /> Write your first oath</button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

Object.assign(window, { Foundations });
