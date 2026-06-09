/* Accent discipline — the answer to "where do we limit the Order color?"
   Three parts: (1) the surfaces that may wear the accent vs. those that stay
   stormlight, (2) all ten gem colors pinned into one tonal band, (3) the
   edge cases where a raw gem color can't be used as-is. */

const ACCENTS = [
  { name: 'Windrunner',   gem: 'Sapphire',   raw: '#0f3562', norm: '#7cc4e8' },
  { name: 'Elsecaller',   gem: 'Zircon',     raw: '#125064', norm: '#6cc1d2' },
  { name: 'Truthwatcher', gem: 'Emerald',    raw: '#1e4d39', norm: '#6fc4a0' },
  { name: 'Bondsmith',    gem: 'Heliodor',   raw: '#ebc965', norm: '#e6cd86', flag: 'gold' },
  { name: 'Stoneward',    gem: 'Topaz',      raw: '#d26840', norm: '#e7a079' },
  { name: 'Dustbringer',  gem: 'Ruby',       raw: '#b02d2c', norm: '#e58b80', flag: 'twin' },
  { name: 'Lightweaver',  gem: 'Garnet',     raw: '#6c011d', norm: '#df8398', flag: 'twin' },
  { name: 'Willshaper',   gem: 'Amethyst',   raw: '#672861', norm: '#c79ad8' },
  { name: 'Skybreaker',   gem: 'Smokestone', raw: '#5f5d68', norm: '#a7adc4', flag: 'neutral' },
  { name: 'Edgedancer',   gem: 'Diamond',    raw: '#fcf3ee', norm: '#e9ddcb', flag: 'neutral' },
];

function Chip({ c, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <span style={{ width: 30, height: 30, borderRadius: 7, background: c, border: '1px solid rgba(255,255,255,0.14)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)' }} />
      <span style={{ fontSize: 9.5, letterSpacing: 0.4, color: 'var(--text-faint)' }}>{label}</span>
    </div>
  );
}

function RuleCol({ title, tone, items }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: tone === 'accent' ? 'var(--accent)' : 'var(--stormlight)', marginBottom: 12 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', boxShadow: '0 0 9px currentColor' }} />
        {title}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.map((t) => (
          <li key={t} style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.35, display: 'flex', gap: 9 }}>
            <span style={{ color: 'var(--text-faint)', marginTop: 1 }}>{tone === 'accent' ? '+' : '–'}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EdgeCase({ swatch, title, body }) {
  return (
    <div style={{ display: 'flex', gap: 13, padding: '13px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', gap: 5, flexShrink: 0, paddingTop: 2 }}>{swatch}</div>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.5, maxWidth: '54ch' }}>{body}</div>
      </div>
    </div>
  );
}

function AccentSystem() {
  return (
    <div className="jbd">
      <div className="aura"><div className="orb orb-sky"></div></div>
      <div className="jbd-scroll" style={{ padding: '34px 40px 38px' }}>
        <div className="card-label" style={{ marginBottom: 6 }}>The system</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, marginBottom: 4 }}>Accent discipline</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: '52ch', marginBottom: 4 }}>
          The accent never carries structure — only identity. The limit is both <em>where</em> it lands and <em>how loud</em> it is.
        </p>

        {/* 1 · where it lands */}
        <div style={{ display: 'flex', gap: 30, marginTop: 26 }}>
          <RuleCol title="Wears the accent" tone="accent" items={[
            'Today\u2019s reflection eyebrow',
            'Order glyph + the small Order ring',
            'Primary button (and its soft glow)',
            'Active nav underline',
            'The two card glows — reflection & Your Order',
          ]} />
          <RuleCol title="Stays stormlight / neutral" tone="storm" items={[
            'Glass, borders, the breathing aura',
            'Wordmark — stays stormlight blue',
            'Infused gems — reading & oath progress',
            'Checkmarks',
            'All body text and serif headings',
          ]} />
        </div>
        <div style={{ marginTop: 20, padding: '12px 16px', borderRadius: 10, background: 'rgba(124,196,232,0.05)', border: '1px solid var(--border)', fontSize: 13.5, color: 'var(--text-muted)' }}>
          Rule of thumb: if the accent is touching more than <strong style={{ color: 'var(--text)' }}>~one-tenth</strong> of the screen, it has gone too far. Three to four marks plus two faint glows is the ceiling — not the floor to build up from.
        </div>

        {/* 2 · one tonal band */}
        <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 30, marginBottom: 4 }}>One tonal band · raw gem → pinned accent</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: '58ch', marginBottom: 16, lineHeight: 1.5 }}>
          Raw gem colors run from near-black garnet to near-white diamond — used as-is they fight the dark glass. Pin every hue to one lightness + chroma (≈ <code style={{ fontSize: 12 }}>oklch(0.80 0.11 h)</code>) and they become siblings: same brightness, only the hue rotates.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', rowGap: 18, columnGap: 10 }}>
          {ACCENTS.map((a) => (
            <div key={a.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Chip c={a.raw} label="raw" />
                <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>→</span>
                <Chip c={a.norm} label="accent" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12.5, color: 'var(--text)' }}>{a.name}</div>
                <div style={{ fontSize: 10.5, color: 'var(--text-faint)', letterSpacing: 0.3 }}>{a.gem}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 · edge cases */}
        <div style={{ fontSize: 11, letterSpacing: 1.3, textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 32, marginBottom: 6 }}>Where a gem can&rsquo;t go in raw — the four to watch</div>
        <EdgeCase
          swatch={<><Chip c="#5f5d68" label="" /><Chip c="#fcf3ee" label="" /></>}
          title="Smokestone & Diamond have no hue"
          body="Grey and near-white can’t read as an accent on a dark UI — a grey eyebrow is invisible, a white glow is just haze. These two wear stormlight blue and carry identity through the glyph alone. Don’t invent a color for them." />
        <EdgeCase
          swatch={<Chip c="#e6cd86" label="" />}
          title="Heliodor is the gold we just retired"
          body="Bondsmith’s color is the exact radiant-gold we pulled from progress. It only works as an accent because gold no longer means anything else in the UI — keep it off progress and gems, or it re-muddies that signal." />
        <EdgeCase
          swatch={<><Chip c="#e58b80" label="" /><Chip c="#df8398" label="" /></>}
          title="Two reds, two blues — lean on the glyph"
          body="After pinning, Ruby and Garnet both read as one red; Sapphire and Zircon both read as one blue. Some Orders will share a hue family, so identity has to come from the glyph shape, never color alone." />
      </div>
    </div>
  );
}

Object.assign(window, { AccentSystem, ACCENTS });
