/* JOURNAL — the record of a Radiant's reflections.
   The journal is now a place to just WRITE. Most entries are free brain-dumps;
   a prompt, an oath or an ideal is attached only when it fits. The feed
   interleaves free + prompted entries on one timeline and marks each with a
   badge whose kind is DERIVED from the entry's links, never stored:
       prompt?  → 'Prompt'   ·  oathId? → 'Oath'
       idealId? → 'Ideal'    ·  else    → 'Free'
   The signature net-new piece is the reflection cadence — a stormlight grid
   where each day reflected glows, brighter the deeper the entry (it measures
   the practice, so it stays blue, never the Order accent).

   → app dest: pages/Journal.jsx (feed) + components/journal/EntryCard.jsx.
     The vocabulary arrays below (THEMES/PROMPTS/OATHS/IDEALS) map to
     AppDataContext (oaths, journalEntries) + the shared IDEALS lore array.
     Kept as module constants here for the sandbox; export as ES modules in app. */

/* ---- shared journal vocabulary (exported for the composer to reuse) ---- */
const THEMES = ['Responsibility', 'Family', 'Courage', 'Truth', 'Service', 'Presence', 'Leadership', 'Growth'];
const PROMPTS = [
  'What responsibility are you avoiding right now?',
  'Who needed you this week, and were you there?',
  'What are you protecting by staying silent?',
  'What would the person you are becoming do today?',
];
const OATHS = [
  { id: 'oath-1', title: 'I will be more present with my family.' },
  { id: 'oath-2', title: 'I will see things as they truly are.' },
  { id: 'oath-3', title: 'I will master my anger before it masters me.' },
];
const IDEALS = [
  { ord: 'First Ideal',  words: 'Life before death, strength before weakness, journey before destination.' },
  { ord: 'Second Ideal', words: 'I will protect those who cannot protect themselves.' },
  { ord: 'Third Ideal',  words: 'I will protect even those I dislike, so long as it is right.' },
];

/* kind is derived from the links an entry carries — never a stored field. */
function deriveKind(e) {
  if (e.prompt) return 'prompt';
  if (e.oathId) return 'oath';
  if (e.idealId) return 'ideal';
  return 'free';
}
const KIND_LABEL = { free: 'Free', prompt: 'Prompt', oath: 'Oath', ideal: 'Ideal' };

/* ---------- reflection cadence (unchanged: measures the practice → stays blue) ---------- */
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

/* ---------- one entry card: derived badge, optional serif title, backlink ---------- */
function Entry(e) {
  const kind = deriveKind(e);
  const isIdeal = kind === 'ideal';
  // free + prompt entries lead with the title if the writer gave one; a prompt
  // entry with no title shows the prompt in the serif voice (as before).
  const heading = e.title || (kind === 'prompt' ? e.prompt : null);
  return (
    <div className="glass entry">
      <div className="entry-head">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <div className="entry-tags">
            <span className={'entry-badge entry-badge-' + kind}>{KIND_LABEL[kind]}</span>
          </div>
          {heading && (
            <div className={e.title ? 'entry-title' : 'entry-prompt'}>{heading}</div>
          )}
        </div>
        <div className="entry-date">{e.date}</div>
      </div>
      <div className="entry-body"><Emify text={e.body} em={e.em} /></div>
      {e.link && (
        <div className={'backlink' + (isIdeal ? ' ideal' : '')}>
          <PIcon d={isIdeal ? ICONS.feather : ICONS.link} sw={1.8} /> {e.link}
        </div>
      )}
      <div className="entry-foot">
        <div className="themes">{e.themes.map((t) => <span className="pill" key={t}>{t}</span>)}</div>
        <span className={'entry-fav' + (e.fav ? ' on' : '')}><PIcon d={ICONS.star} sw={1.8} /></span>
      </div>
    </div>
  );
}

/* Free + prompted entries live together, newest first. Each object shows only
   the fields it actually has — that's what makes its kind derive correctly. */
const MONTHS = [
  { month: 'June 2026', entries: [
    { date: 'Jun 23', title: 'Keeping score', body: 'Covered a shift for someone without expecting anything back. It felt lighter than I thought it would — no ledger to balance. I keep noticing how much of my week I spend keeping score.', em: 'no ledger to balance', oathId: 'oath-1', link: 'Linked · I will be more present with my family.', themes: ['Service'], fav: true },
    { date: 'Jun 22', body: 'Long day. Just needed to get the noise out of my head before bed — nothing profound, no prompt, no oath. Writing it down so I stop carrying it around.', themes: [], fav: false },
    { date: 'Jun 20', prompt: 'What responsibility are you avoiding right now?', em: 'the waiting is the avoidance', body: "The call to my brother. I keep waiting for the right moment, but the waiting is the avoidance — there isn't a clean version of it.", themes: ['Responsibility', 'Family'], fav: true },
    { date: 'Jun 18', idealId: 'ideal-3', link: 'Third Ideal · so long as it is right.', em: 'It cost me something', body: 'Protecting even those I dislike — I felt this one today with a coworker I resent. I stayed fair. It cost me something and I want to remember that it did.', themes: ['Courage'], fav: false },
  ] },
  { month: 'May 2026', entries: [
    { date: 'May 30', title: 'Morning pages', body: 'Wrote three pages of nothing in particular before work. Half of it was grocery lists. The other half surprised me — the honest part always hides underneath the boring part.', themes: ['Growth'], fav: false },
    { date: 'May 24', oathId: 'oath-1', link: 'Linked · I will be more present with my family.', em: 'She stopped asking', body: 'My daughter wanted to show me something and I was half-there, phone in hand. She stopped asking. That stayed with me all evening.', themes: ['Presence', 'Family'], fav: false },
  ] },
];

const FILTERS = ['All', 'Free', 'Prompted', 'Linked', 'Favorites'];

function JournalPage({ onNav }) {
  const nav = (n, p) => onNav && onNav(n, p);
  return (
    <PageShell active="Journal" onNav={onNav}>
      <div className="page-head">
        <div className="page-eyebrow"><span className="dot"></span> Your reflections · Windrunner</div>
        <h1 className="page-title">Journal</h1>
        <p className="page-lead">A place to write — kept private and gathered here. Most days it's just what's on your mind; some entries answer a prompt or belong to an oath. The stormlight you've drawn in, one day at a time.</p>
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
          <button className="btn btn-primary" onClick={() => nav('reflect')}><PIcon d={ICONS.feather} /> New entry</button>
        </div>

        <div className="journal-search">
          <PIcon d={ICONS.search} sw={1.9} />
          <input placeholder="Search your reflections…" />
          <button className="search-tune"><PIcon d={ICONS.tune} sw={1.9} /></button>
        </div>

        <div className="filterbar" style={{ marginBottom: 8 }}>
          <span className="chip on">All</span>
          {FILTERS.slice(1).map((f) => <span className="chip" key={f}>{f}</span>)}
        </div>
        <div className="filterbar" style={{ marginBottom: 26 }}>
          <span className="theme-lead">Themes</span>
          {['Responsibility', 'Service', 'Courage', 'Presence', 'Growth'].map((t) => <span className="chip" key={t}>{t}</span>)}
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

Object.assign(window, { JournalPage, THEMES, PROMPTS, OATHS, IDEALS, deriveKind });
