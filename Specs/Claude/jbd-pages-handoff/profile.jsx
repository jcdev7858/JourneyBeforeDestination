/* PROFILE — who the Radiant is and how far they've come.
   Net-new components: the identity hero (glyph ring + Order + ideal reached),
   a four-tile stat grid, the path-so-far milestone timeline, and a settings
   list with accent toggles. */

function Toggle({ on: initial }) {
  const [on, setOn] = React.useState(!!initial);
  return <button className={'toggle' + (on ? ' on' : '')} onClick={() => setOn((v) => !v)} aria-pressed={on}><span className="knob"></span></button>;
}

function StatTile({ n, lbl }) {
  return <div className="stat-tile"><div className="n">{n}</div><div className="lbl">{lbl}</div></div>;
}

const MILESTONES = [
  { when: 'June 2026', what: <span>Began living the <span className="em">Third Ideal</span> — protecting even those you dislike.</span> },
  { when: 'March 2026', what: <span>Kept your first oath — <span className="em">finish what you start before beginning again</span>.</span> },
  { when: 'February 2026', what: <span>Swore the <span className="em">Second Ideal</span>: to protect those who cannot protect themselves.</span> },
  { when: 'February 2026', what: <span>Spoke the <span className="em">First Ideal</span> and joined the Windrunners.</span> },
];

const SETTINGS = [
  { t: 'Daily prompt', d: "When the day's reflection arrives", val: <span className="setting-val"><PIcon d={ICONS.clock} /> 7:00 AM <PIcon d={ICONS.chevron} /></span> },
  { t: 'Private by default', d: 'Entries are encrypted and yours alone', toggle: true },
  { t: 'Gentle reminders', d: 'A quiet nudge if two days pass in silence', toggle: true },
  { t: 'Show cadence on dashboard', d: 'Surface your streak on the home screen', toggle: false },
  { t: 'Change your Order', d: 'Retake the path and choose again', val: <span className="setting-val"><PIcon d={ICONS.shield} /> Windrunner <PIcon d={ICONS.chevron} /></span> },
  { t: 'Export your journal', d: 'Download every reflection as a file', val: <span className="setting-val"><PIcon d={ICONS.download} /></span> },
];

function ProfilePage({ onNav }) {
  return (
    <PageShell active="Profile" onNav={onNav}>
      {/* identity hero */}
      <section className="glass glow-accent glow-br rise identity" style={{ animationDelay: '0.05s' }}>
        <Glyph order="windrunner" h={170} className="glyph-corner" />
        <div className="order-ring"><Glyph order="windrunner" h={48} /></div>
        <div className="id-body">
          <div className="id-name">Daniel Rhodes</div>
          <div className="id-order">
            <span className="accent-text">Windrunner</span>
            <span className="id-sep"></span>
            <span>Third Ideal</span>
          </div>
          <div className="id-meta">ON THE PATH SINCE FEBRUARY 2026 · 156 REFLECTIONS · 12-DAY STREAK</div>
        </div>
      </section>

      {/* stat grid */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="stat-grid">
          <StatTile n="3" lbl="Oaths kept" />
          <StatTile n="156" lbl="Reflections" />
          <StatTile n="12" lbl="Day streak" />
          <StatTile n="2 / 5" lbl="Books read" />
        </div>
      </section>

      {/* order + the path */}
      <div className="rise" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'var(--gap-card)', marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
        <section className="glass" style={{ overflow: 'hidden' }}>
          <div className="card-label">Your Order</div>
          <div className="order-name" style={{ marginBottom: 14 }}>Windrunner</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-quote)', lineHeight: 'var(--lh-quote)', color: 'var(--text-muted)', marginBottom: 20, maxWidth: '32ch' }}>
            Those who lead by protecting — drawn to lift the weight others carry.
          </p>
          <div className="themes">
            {['Protection', 'Leadership', 'Responsibility', 'Service'].map((t) => <span className="pill" key={t}>{t}</span>)}
          </div>
        </section>

        <section className="glass">
          <div className="section-head" style={{ marginBottom: 22 }}>
            <h2>The path so far</h2>
          </div>
          <div className="path">
            {MILESTONES.map((m, i) => (
              <div className="milestone" key={i}>
                <div className="ms-rail">
                  <div className="ms-line top" style={{ visibility: i === 0 ? 'hidden' : 'visible' }}></div>
                  <div className="ms-dot"></div>
                  <div className="ms-line" style={{ visibility: i === MILESTONES.length - 1 ? 'hidden' : 'visible' }}></div>
                </div>
                <div className="ms-body">
                  <div className="ms-when">{m.when}</div>
                  <div className="ms-what">{m.what}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* settings */}
      <section className="glass rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.26s' }}>
        <div className="section-head"><h2>Settings</h2></div>
        <div className="settings">
          {SETTINGS.map((s) => (
            <div className="setting" key={s.t}>
              <div className="setting-text">
                <div className="t">{s.t}</div>
                <div className="d">{s.d}</div>
              </div>
              {s.toggle !== undefined ? <Toggle on={s.toggle} /> : s.val}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

Object.assign(window, { ProfilePage });
