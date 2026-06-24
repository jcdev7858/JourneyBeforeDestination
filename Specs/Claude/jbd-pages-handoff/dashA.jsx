/* Direction A — Quiet Refinement (the chosen direction), themeable by Order.
   Pass an `order` object to reskin: the blue stormlight glow stays constant,
   while --accent recolors the eyebrow, glyph, primary button and nav. */

const ORDERS = {
  windrunner: {
    name: 'Windrunner', glyph: 'windrunner',
    accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4',
    prompt: 'What responsibility are you avoiding right now?',
    themes: ['Protection', 'Leadership', 'Responsibility', 'Service'],
    oath: 'I will be more present with my family.',
    done: ['Put my phone away during dinner', 'Plan one daddy-daughter date this month'],
    todo: ['Spend one hour outside this week'],
    total: 5, more: 2,
    resume: { text: 'Last week you were sitting with being more present. Still true?', em: 'being more present' },
  },
  truthwatcher: {
    name: 'Truthwatcher', glyph: 'truthwatcher',
    accent: '#6fc4a0', accentRgb: '111, 196, 160', accentDeep: '#4a9a7a',
    prompt: 'What are you pretending not to know?',
    themes: ['Truth', 'Knowledge', 'Discernment'],
    oath: 'I will see things as they truly are.',
    done: ['Admitted I was wrong in the meeting', 'Wrote down what I actually believe, unedited'],
    todo: ['Ask the question I have been avoiding'],
    total: 4, more: 1,
    resume: { text: 'Last week you wanted to stop looking away from hard truths. Still true?', em: 'hard truths' },
  },
  dustbringer: {
    name: 'Dustbringer', glyph: 'dustbringer',
    accent: '#e58b80', accentRgb: '229, 139, 128', accentDeep: '#c75a4c',
    prompt: 'Where are you letting fear make the decision?',
    themes: ['Self-mastery', 'Courage', 'Resolve'],
    oath: 'I will master my anger before it masters me.',
    done: ['Paused and breathed before replying when heated', 'Named the fear out loud instead of acting on it'],
    todo: ['Walk away from one argument I would normally win'],
    total: 4, more: 1,
    resume: { text: 'Last week you were working on holding your temper. Still true?', em: 'holding your temper' },
  },
};

function IconRespond() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>;
}
function IconStar() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 17.3-5.6 3 1.1-6.3-4.5-4.4 6.3-.9L12 3l2.7 5.7 6.3.9-4.5 4.4 1.1 6.3z" /></svg>;
}
function IconCheck() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6 9 17l-5-5" /></svg>;
}
function IconArrow() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}
function IconBookmark() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>;
}

function Glyph({ order = 'windrunner', h, className, style }) {
  return <OrderGlyph order={order} h={h} className={className} style={{ color: 'var(--accent)', ...style }} />;
}

function ResumeText({ text, em }) {
  if (!em || text.indexOf(em) < 0) return <span>{text}</span>;
  const [pre, post] = text.split(em);
  return <span>{pre}<em>{em}</em>{post}</span>;
}

const SCHEMES = {
  stormlight: { check: 'infused', progress: 'infused', callout: 'cool' }, // no gold
  reserved:   { check: 'infused', progress: 'gold',    callout: 'gold' }, // gold only on progress
  gold:       { check: 'gold',    progress: 'gold',    callout: 'gold' }, // the original look
};

/* Type and font families are locked (Cormorant Garamond + Hanken Grotesk),
   defined once in :root — no per-instance overrides. */

function DashboardA({ order = 'windrunner', scheme = 'stormlight', accent }) {
  const base = ORDERS[order] || ORDERS.windrunner;
  const o = accent ? { ...base, ...accent } : base;
  const sc = SCHEMES[scheme] || SCHEMES.stormlight;
  const pct = Math.round((o.done.length / o.total) * 100);
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
            <a>Oaths</a>
            <a>Journal</a>
            <a>RadiantDex</a>
            <a>Profile</a>
          </nav>
        </header>

        {/* hero prompt */}
        <section className="glass prompt-card glow-accent rise" style={{ animationDelay: '0.05s' }}>
          <Glyph order={o.glyph} h={224} className="glyph-watermark" />
          <div className="eyebrow"><span className="dot"></span> Today's reflection · {o.name}</div>
          <h1 className="prompt-text">{o.prompt}</h1>
          <div className="prompt-actions">
            <button className="btn btn-primary"><IconRespond /> Respond</button>
            <button className="btn btn-ghost"><IconStar /> Favorite</button>
          </div>
        </section>

        {/* research callout: resume a thought */}
        <section className={'glass callout rise ' + (sc.callout === 'cool' ? 'cool' : '')} style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
          <div className="callout-chip"><IconBookmark /></div>
          <div className="callout-body">
            <div className="callout-kicker">Pick up where you left off</div>
            <div className="callout-text"><ResumeText text={o.resume.text} em={o.resume.em} /></div>
          </div>
          <button className="btn btn-ghost">Continue <IconArrow /></button>
        </section>

        {/* order + active oath */}
        <div className="rise" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 'var(--gap-card)', marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
          <section className="glass glow-accent glow-br" style={{ overflow: 'hidden' }}>
            <Glyph order={o.glyph} h={150} className="glyph-corner" />
            <div className="card-label">Your Order</div>
            <div className="order-head">
              <div className="order-ring" style={{ width: 46, height: 46 }}><Glyph order={o.glyph} h={26} /></div>
              <div className="order-name">{o.name}</div>
            </div>
            <div className="themes">
              {o.themes.map((t) => <span className="pill" key={t}>{t}</span>)}
            </div>
          </section>

          <section className="glass">
            <div className="card-label">Active Oath</div>
            <div className="oath-text">{o.oath}</div>
            <div className="progress-row"><span>Progress</span><span>{o.done.length} of {o.total} actions</span></div>
            <div className="progress-track"><div className={'progress-fill ' + (sc.progress === 'infused' ? 'infused' : '')} style={{ width: pct + '%' }}>{sc.progress === 'infused' && <span className="bead"></span>}</div></div>
            <div className="actions" style={{ marginTop: 22 }}>
              {o.done.map((a) => <div className="action done" key={a}><span className={'check done ' + (sc.check === 'infused' ? 'infused' : '')}><IconCheck /></span><span>{a}</span></div>)}
              {o.todo.map((a) => <div className="action" key={a}><span className="check"></span><span>{a}</span></div>)}
            </div>
            {o.more > 0 && <div className="more">{o.more} more action{o.more > 1 ? 's' : ''}</div>}
          </section>
        </div>

        {/* reading progress */}
        <section className="glass rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.26s' }}>
          <div className="card-label">Reading Progress</div>
          <div className="books">
            <span className="book read"><span className="gemstone"></span> The Way of Kings</span>
            <span className="book read"><span className="gemstone"></span> Words of Radiance</span>
            <span className="book locked"><span className="gemstone"></span> Oathbringer</span>
            <span className="book locked"><span className="gemstone"></span> Rhythm of War</span>
            <span className="book locked"><span className="gemstone"></span> Wind and Truth</span>
          </div>
        </section>

        {/* footer */}
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

Object.assign(window, { DashboardA, ORDERS });
