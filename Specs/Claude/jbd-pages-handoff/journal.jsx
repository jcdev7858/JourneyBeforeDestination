/* JOURNAL — the record of a Radiant's reflections.
   Signature net-new component: the reflection cadence — a stormlight grid
   where each day reflected glows, brighter the deeper the entry (it measures
   the practice, so it stays blue, never the Order accent). Below it, entries
   thread down a gem-gutter timeline, grouped by month. */

const CAD_WEEKS = 18;
function cadenceLevel(col, row) {
  const v = Math.abs(Math.sin(col * 7.13 + row * 3.7) * 43758.5453) % 1;
  const recency = col / CAD_WEEKS;
  const t = Math.min(1, v * 0.72 + recency * 0.42);
  return t < 0.36 ? 0 : t < 0.56 ? 1 : t < 0.73 ? 2 : t < 0.88 ? 3 : 4;
}

function Cadence() {
  const cells = [];
  for (let c = 0; c < CAD_WEEKS; c++) {
    for (let r = 0; r < 7; r++) {
      const lv = cadenceLevel(c, r);
      cells.push(<div key={c + '-' + r} className={'cad' + (lv ? ' l' + lv : '')}></div>);
    }
  }
  return (
    <div>
      <div className="cadence">{cells}</div>
      <div className="cadence-legend">
        <span>Quieter</span>
        <span className="cad"></span>
        <span className="cad l1"></span>
        <span className="cad l2"></span>
        <span className="cad l3"></span>
        <span className="cad l4"></span>
        <span>Deeper</span>
      </div>
    </div>
  );
}

function Streak({ n, sub, lbl }) {
  return (
    <div className="streak-stat">
      <div className="n">{n}{sub && <span className="sub">{sub}</span>}</div>
      <div className="lbl">{lbl}</div>
    </div>
  );
}

function Emify({ text, em }) {
  if (!em || text.indexOf(em) < 0) return <span>{text}</span>;
  const [pre, post] = text.split(em);
  return <span>{pre}<em>{em}</em>{post}</span>;
}

function Entry({ prompt, date, body, em, themes, fav }) {
  return (
    <div className="glass entry">
      <div className="entry-head">
        <div className="entry-prompt">{prompt}</div>
        <div className="entry-date">{date}</div>
      </div>
      <div className="entry-body"><Emify text={body} em={em} /></div>
      <div className="entry-foot">
        <div className="themes">{themes.map((t) => <span className="pill" key={t}>{t}</span>)}</div>
        <span className={'entry-fav' + (fav ? ' on' : '')}><PIcon d={ICONS.star} sw={1.8} /></span>
      </div>
    </div>
  );
}

const MONTHS = [
  { month: 'June 2026', entries: [
    { date: 'Jun 22', prompt: 'What responsibility are you avoiding right now?', em: 'I keep waiting for the right moment', body: "The call to my brother. I keep waiting for the right moment, but the waiting is the avoidance — there isn't a clean version of it.", themes: ['Responsibility', 'Family'], fav: true },
    { date: 'Jun 19', prompt: 'Who needed you this week, and were you there?', em: 'half-there', body: 'My daughter wanted to show me something and I was half-there, phone in hand. She stopped asking. That stayed with me all evening.', themes: ['Service', 'Presence'], fav: false },
    { date: 'Jun 14', prompt: 'What are you protecting by staying silent?', em: 'my own comfort', body: "Mostly my own comfort. Calling it 'keeping the peace' is generous — it's me not wanting the hard conversation.", themes: ['Courage', 'Truth'], fav: false },
  ] },
  { month: 'May 2026', entries: [
    { date: 'May 30', prompt: 'When did you last put someone else first without keeping score?', em: 'without expecting anything back', body: 'Covered a shift for someone without expecting anything back. It felt lighter than I thought it would — no ledger to balance.', themes: ['Leadership', 'Service'], fav: true },
    { date: 'May 24', prompt: 'What would the person you are becoming do today?', em: 'speak first', body: 'He would speak first instead of rehearsing it ten times. He would assume he was wanted in the room.', themes: ['Growth'], fav: false },
  ] },
];

function JournalPage({ onNav }) {
  return (
    <PageShell active="Journal" onNav={onNav}>
      <div className="page-head">
        <div className="page-eyebrow"><span className="dot"></span> Your reflections · Windrunner</div>
        <h1 className="page-title">Journal</h1>
        <p className="page-lead">Every prompt you've answered, kept private and gathered here — the stormlight you've drawn in one day at a time.</p>
      </div>

      {/* signature: reflection cadence + streak */}
      <section className="glass rise" style={{ animationDelay: '0.05s' }}>
        <div className="section-head">
          <h2>Reflection cadence</h2>
          <span className="section-count">Last 18 weeks</span>
        </div>
        <div className="cadence-wrap">
          <Cadence />
          <div className="streak-stats">
            <Streak n="12" sub="days" lbl="Current streak" />
            <Streak n="41" sub="days" lbl="Longest streak" />
            <Streak n="156" lbl="Reflections kept" />
          </div>
        </div>
      </section>

      {/* feed */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="section-head">
          <h2>Entries</h2>
          <button className="btn btn-primary"><PIcon d={ICONS.feather} /> New reflection</button>
        </div>
        <div className="filterbar" style={{ marginBottom: 26 }}>
          <span className="chip on">All</span>
          <span className="chip">Favorites</span>
          <span className="chip">Responsibility</span>
          <span className="chip">Courage</span>
          <span className="chip">Service</span>
          <span className="chip">Presence</span>
        </div>

        {MONTHS.map((m, mi) => (
          <div key={m.month}>
            <div className="month-mark">{m.month}</div>
            <div className="timeline">
              {m.entries.map((e, i) => (
                <div className="tl-entry" key={e.date}>
                  <div className="tl-rail">
                    <div className="tl-line top" style={{ visibility: mi === 0 && i === 0 ? 'hidden' : 'visible' }}></div>
                    <div className="tl-dot"></div>
                    <div className="tl-line"></div>
                  </div>
                  <div className="tl-body"><Entry {...e} /></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}

Object.assign(window, { JournalPage });
