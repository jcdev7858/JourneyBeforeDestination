/* DASHBOARD v3 — lean integration (the chosen next step).
   Same visual language as Direction A. Three deliberate changes:
     1. Every summary card is a launch point into its full page —
        Respond / Continue → Journal, "Tend this oath" → Oaths,
        "View profile" → Profile. No dead-end cards.
     2. The active oath's actions are TICKABLE inline. The rule we settled
        on: tick anywhere, restructure in the modal. So you can answer an
        action from the home screen, but renaming / adding / removing /
        deleting still lives in the Oaths editor.
     3. A compact cadence strip carries momentum onto the dashboard —
        a spark of the streak, never the full 18-week board.
   One look-back widget only (the "pick up where you left off" callout);
   stat grid and milestone timeline stay on Profile where they belong.
   Reuses ORDERS from dashA and PIcon/ICONS/Glyph from pageshell. */

const BOOKMARK = ['M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z'];
const CAD_SPARK = [2, 0, 1, 3, 2, 1, 4, 2, 3, 2, 4, 3, 2, 4]; // last 14 days, streak alive

function ResumeLine({ text, em }) {
  if (!em || text.indexOf(em) < 0) return <span>{text}</span>;
  const [pre, post] = text.split(em);
  return <span>{pre}<em>{em}</em>{post}</span>;
}

function CadenceStrip({ onNav }) {
  return (
    <section className="glass">
      <div className="card-head">
        <div className="card-label">Reflection cadence</div>
        <button className="card-launch" onClick={onNav ? () => onNav('Journal') : undefined}>Open journal <PIcon d={ICONS.arrow} /></button>
      </div>
      <div className="cadence-strip">
        <div className="cad-streak">
          <div className="n">12<span className="sub">days</span></div>
          <div className="lbl">Current streak</div>
        </div>
        <div className="cad-spark">
          <div className="row">{CAD_SPARK.map((lv, i) => <div key={i} className={'cad' + (lv ? ' l' + lv : '')}></div>)}</div>
          <div className="meta">Last two weeks · longest run <em>41 days</em></div>
        </div>
      </div>
    </section>
  );
}

function ActiveOathCard({ o, onNav }) {
  const init = [...o.done.map((t) => ({ t, done: true })), ...o.todo.map((t) => ({ t, done: false }))];
  const [acts, setActs] = React.useState(init);
  const doneCount = acts.filter((a) => a.done).length;
  const pct = Math.round((doneCount / o.total) * 100);
  const toggle = (i) => setActs((a) => a.map((x, j) => (j === i ? { ...x, done: !x.done } : x)));
  return (
    <section className="glass">
      <div className="card-label">Active Oath</div>
      <div className="oath-text">{o.oath}</div>
      <div className="progress-row"><span>Progress</span><span>{doneCount} of {o.total} actions</span></div>
      <div className="progress-track"><div className="progress-fill infused" style={{ width: pct + '%' }}><span className="bead"></span></div></div>
      <div className="actions tickable-list" style={{ marginTop: 22 }}>
        {acts.map((a, i) => (
          <button className={'action tickable' + (a.done ? ' done' : '')} key={i} onClick={() => toggle(i)} aria-pressed={a.done}>
            <span className={'check' + (a.done ? ' done infused' : '')}>{a.done && <PIcon d={ICONS.check} sw={3} />}</span>
            <span>{a.t}</span>
          </button>
        ))}
      </div>
      <div className="oath-foot-dash">
        <span className="meta">{o.more} more action{o.more > 1 ? 's' : ''} · tap to answer, edit in Oaths</span>
        <button className="btn btn-ghost" onClick={onNav ? () => onNav('Oaths') : undefined}><PIcon d={ICONS.arrow} /> Tend this oath</button>
      </div>
    </section>
  );
}

function DashboardV3({ order = 'windrunner', onNav }) {
  const o = ORDERS[order] || ORDERS.windrunner;
  const goJournal = onNav ? () => onNav('Journal') : undefined;
  return (
    <div className="jbd" style={{ '--accent': o.accent, '--accent-rgb': o.accentRgb, '--accent-deep': o.accentDeep }}>
      <div className="aura">
        <div className="orb orb-sky"></div>
        <div className="orb orb-gold"></div>
      </div>

      <div className="jbd-scroll">
        <header className="topbar">
          <div className="wordmark">Journey <span>Before</span> Destination</div>
          <nav className="nav">
            <a className="active">Dashboard</a>
            <a onClick={onNav ? () => onNav('Oaths') : undefined}>Oaths</a>
            <a onClick={goJournal}>Journal</a>
            <a>RadiantDex</a>
            <a onClick={onNav ? () => onNav('Profile') : undefined}>Profile</a>
          </nav>
        </header>

        {/* hero prompt — Respond launches the reflection composer in Journal */}
        <section className="glass prompt-card glow-accent rise" style={{ animationDelay: '0.05s' }}>
          <Glyph order={o.glyph} h={224} className="glyph-watermark" />
          <div className="eyebrow"><span className="dot"></span> Today's reflection · {o.name}</div>
          <h1 className="prompt-text">{o.prompt}</h1>
          <div className="prompt-actions">
            <button className="btn btn-primary" onClick={goJournal}><PIcon d={ICONS.edit} /> Respond</button>
            <button className="btn btn-ghost"><PIcon d={ICONS.star} /> Favorite</button>
          </div>
        </section>

        {/* the one look-back widget — pick up where you left off → Journal */}
        <section className="glass callout cool rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
          <div className="callout-chip"><PIcon d={BOOKMARK} sw={1.8} /></div>
          <div className="callout-body">
            <div className="callout-kicker">Pick up where you left off</div>
            <div className="callout-text"><ResumeLine text={o.resume.text} em={o.resume.em} /></div>
          </div>
          <button className="btn btn-ghost" onClick={goJournal}>Continue <PIcon d={ICONS.arrow} /></button>
        </section>

        {/* identity + the work: Order card (→ Profile) and the tickable oath (→ Oaths) */}
        <div className="rise" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'var(--gap-card)', marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
          <section className="glass glow-accent glow-br" style={{ overflow: 'hidden' }}>
            <Glyph order={o.glyph} h={150} className="glyph-corner" />
            <div className="card-head">
              <div className="card-label">Your Order</div>
              <button className="card-launch" onClick={onNav ? () => onNav('Profile') : undefined}>View profile <PIcon d={ICONS.arrow} /></button>
            </div>
            <div className="order-head">
              <div className="order-ring" style={{ width: 46, height: 46 }}><Glyph order={o.glyph} h={26} /></div>
              <div className="order-name">{o.name}</div>
            </div>
            <div className="themes">
              {o.themes.map((t) => <span className="pill" key={t}>{t}</span>)}
            </div>
          </section>

          <ActiveOathCard o={o} onNav={onNav} />
        </div>

        {/* momentum + the long arc: compact cadence (→ Journal) and reading */}
        <div className="rise" style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: 'var(--gap-card)', marginTop: 'var(--gap-card)', alignItems: 'stretch', animationDelay: '0.26s' }}>
          <CadenceStrip onNav={onNav} />
          <section className="glass">
            <div className="card-label">Reading Progress</div>
            <div className="books">
              <span className="book read"><span className="gemstone"></span> The Way of Kings</span>
              <span className="book read"><span className="gemstone"></span> Words of Radiance</span>
              <span className="book locked"><span className="gemstone"></span> Oathbringer</span>
              <span className="book locked"><span className="gemstone"></span> Rhythm of War</span>
              <span className="book locked"><span className="gemstone"></span> Wind and Truth</span>
            </div>
          </section>
        </div>

        <footer className="site-footer">
          <div className="footer-oath">
            <span className="phrase">Life before death</span>
            <span className="footer-sep"></span>
            <span className="phrase">Strength before weakness</span>
            <span className="footer-sep"></span>
            <span className="phrase">Journey before destination</span>
          </div>
          <div className="footer-meta">
            <span>Private by default</span>
            <span className="footer-dot"></span>
            <a>Find support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardV3 });
