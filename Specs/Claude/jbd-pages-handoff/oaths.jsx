/* OATHS — the page where a Radiant tends their vows.
   Signature net-new component: the Ideals ladder (the Five Ideals as a
   vertical progression). Now interactive: unspoken + current rungs read as
   touchable and every rung reveals actions — "Borrow this Ideal" (opens the
   oath editor pre-filled with the Ideal's words) and "Reflect on this Ideal"
   (opens the reflection editor with the Ideal as context).

   Personal oaths carry two treatments, DERIVED from whether an oath has
   actions — never a type the user picks up front:
     • has actions → a commitment oath: progress bar + tickable checklist,
       and when every action is answered a "Mark as kept" moment (keeping is
       a confirmed act, never automatic);
     • no actions → a practice oath: a scoped cadence + streak and a single
       "Practiced today" tap.
   Below the personal oaths sit Kept and Archived (set aside, not deleted). */

const ARCHIVE_ICON = ['M3 4h18v4H3z', 'M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8', 'M10 12h4'];

/* ---------- the Ideals ladder ---------- */
const IDEALS = [
  { ord: 'First Ideal', state: 'sworn', tag: 'Shared', words: 'Life before death. Strength before weakness. Journey before destination.', note: 'The Immortal Words — spoken by every Radiant who begins the path.' },
  { ord: 'Second Ideal', state: 'sworn', words: 'I will protect those who cannot protect themselves.', note: 'Sworn four months ago.' },
  { ord: 'Third Ideal', state: 'current', borrowed: true, words: 'I will protect even those I dislike, so long as it is right.', note: 'Living into the words — 3 of 5 actions answered.' },
  { ord: 'Fourth Ideal', state: 'unspoken', words: 'The words have not yet come to you.', note: null },
  { ord: 'Fifth Ideal', state: 'unspoken', words: 'Unknown.', note: null },
];

function IdealLadder({ onBorrow, onReflect }) {
  return (
    <div className="ladder">
      {IDEALS.map((it, i) => {
        const canBorrow = it.state === 'current' || it.state === 'unspoken';
        // "Speaking now" is shown dynamically: a rung wears it once its words
        // are borrowed by an active personal oath (the current rung, here).
        const tag = it.tag || (it.borrowed ? 'Speaking now' : null);
        return (
          <div className={'rung ' + it.state + ' interactive'} key={it.ord}>
            <div className="rung-rail">
              <div className="rung-line top"></div>
              <div className="rung-node"></div>
              <div className={'rung-line ' + (it.state === 'sworn' || it.state === 'current' ? 'lit' : '')} style={{ visibility: i === IDEALS.length - 1 ? 'hidden' : 'visible' }}></div>
            </div>
            <div className="rung-body">
              <div className="rung-ordinal">{it.ord}{tag && <span className="tag">{tag}</span>}</div>
              <div className="rung-words">{it.words}</div>
              {it.note && <div className="rung-note">{it.note}</div>}
              <div className="rung-actions">
                {canBorrow && (
                  <button className="rung-link" onClick={() => onBorrow && onBorrow(it)}>
                    <PIcon d={ICONS.plus} /> Borrow this Ideal
                  </button>
                )}
                <button className="rung-link reflect" onClick={() => onReflect && onReflect(it)}>
                  <PIcon d={ICONS.feather} /> Reflect on this Ideal
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- shared: a tickable action list (tick anywhere, restructure in modal) ---------- */
function TickableActions({ actions, onToggle }) {
  return (
    <div className="actions tickable-list">
      {actions.map((a, i) => (
        <button className={'action tickable' + (a.done ? ' done' : '')} key={i} onClick={() => onToggle(i)} aria-pressed={a.done}>
          <span className={'check' + (a.done ? ' done infused' : '')}>{a.done && <PIcon d={ICONS.check} sw={3} />}</span>
          <span>{a.t}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- commitment oath (has actions) ---------- */
function CommitmentCard({ oath, onOpen }) {
  const [actions, setActions] = React.useState(oath.actions);
  const [kept, setKept] = React.useState(false);
  const done = actions.filter((a) => a.done).length;
  const total = actions.length;
  const pct = Math.round((done / total) * 100);
  const allDone = done === total;
  const toggle = (i) => { setKept(false); setActions((xs) => xs.map((a, j) => (j === i ? { ...a, done: !a.done } : a))); };
  const remaining = total - done;

  return (
    <div className="glass oath-card">
      <div className="oath-top">
        <div className="oath-words">{oath.words}</div>
        <span className={'oath-status ' + (kept ? 'kept' : 'active')}><span className="seal"></span> {kept ? 'Kept' : 'Active'}</span>
      </div>
      <div>
        <div className="progress-row"><span>Progress</span><span>{done} of {total} actions</span></div>
        <div className="progress-track"><div className="progress-fill infused" style={{ width: pct + '%' }}><span className="bead"></span></div></div>
      </div>
      <TickableActions actions={actions} onToggle={toggle} />
      <div className="oath-foot">
        {kept ? (
          <span className="meta">Kept just now · all {total} actions answered</span>
        ) : allDone ? (
          <div className="oath-ready">
            <span className="ready-note">Every action answered.</span>
            <button className="btn btn-primary" onClick={() => setKept(true)}><PIcon d={ICONS.check} sw={2.4} /> Mark as kept</button>
          </div>
        ) : (
          <span className="meta">{oath.begun} · {remaining} more action{remaining > 1 ? 's' : ''}</span>
        )}
        {!kept && (
          <button className="btn btn-ghost" onClick={() => onOpen && onOpen(oath)}><PIcon d={ICONS.edit} /> Edit</button>
        )}
      </div>
    </div>
  );
}

/* ---------- practice oath (no actions) ---------- */
const PRACTICE_CAD = [
  0,0,1,2,0,0,0, 2,1,0,3,2,1,0, 3,2,4,3,2,3,1, 2,4,3,2,4,3,2, 4,3,4,2,3,4,3, 3,4,3,4,4,3,4,
];
function PracticeCard({ oath, onOpen }) {
  const [practiced, setPracticed] = React.useState(false);
  const streak = oath.streak + (practiced ? 1 : 0);
  const cells = practiced ? [...PRACTICE_CAD.slice(1), 4] : PRACTICE_CAD;
  return (
    <div className="glass oath-card practice">
      <div className="oath-top">
        <div className="oath-words">{oath.words}</div>
        <span className="oath-status active"><span className="seal"></span> Practice</span>
      </div>
      <div className="oath-practice">
        <div className="oath-mini-cad">
          {cells.map((lv, i) => <div key={i} className={'cad' + (lv ? ' l' + lv : '')}></div>)}
        </div>
        <div className="oath-practice-stat">
          <div className="n">{streak}<span className="sub">days</span></div>
          <div className="lbl">Current streak</div>
        </div>
      </div>
      <div className="oath-foot">
        <span className="meta">{oath.begun}</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className={'btn btn-ghost' + (practiced ? ' is-practiced' : '')} onClick={() => setPracticed((v) => !v)}>
            <PIcon d={ICONS.check} sw={practiced ? 2.6 : 2} /> {practiced ? 'Practiced today' : 'Practice today'}
          </button>
          <button className="btn btn-ghost" onClick={() => onOpen && onOpen(oath)}><PIcon d={ICONS.edit} /> Edit</button>
        </div>
      </div>
    </div>
  );
}

const COMMITMENTS = [
  { id: 'c1', kind: 'commitment', words: 'I will be more present with my family.', begun: 'Begun 6 weeks ago', actions: [
    { t: 'Put my phone away during dinner', done: true },
    { t: 'Planned a daddy-daughter date this month', done: true },
    { t: 'Coach the team without checking email', done: true },
    { t: 'Spend one hour outside this week', done: false },
    { t: 'Call my brother back', done: false },
  ] },
  { id: 'c2', kind: 'commitment', words: 'I will speak up when something is wrong, even when silence is easier.', begun: 'Begun 9 days ago', actions: [
    { t: 'Named the problem in the meeting instead of after it', done: true },
    { t: 'Told one person the thing I keep softening', done: true },
    { t: 'Gave the hard feedback, kindly', done: true },
    { t: 'Wrote the email I kept avoiding', done: true },
  ] },
];
const PRACTICE = { id: 'p1', kind: 'practice', words: 'I will sit in stillness each morning, before the day claims me.', begun: 'A practice · no checklist, just the habit', streak: 9 };

function OathsPage({ empty, onNav }) {
  const open = (o) => onNav && onNav('oath-editor', o);
  if (empty) {
    return (
      <PageShell active="Oaths" onNav={onNav}>
        <div className="page-head">
          <div className="page-eyebrow"><span className="dot"></span> Your oaths · Windrunner</div>
          <h1 className="page-title">Oaths</h1>
        </div>
        <section className="glass glow-accent rise" style={{ padding: 0, animationDelay: '0.05s' }}>
          <div className="empty">
            <OrderGlyph order="windrunner" h={60} className="empty-glyph" />
            <div className="empty-title">No oaths yet</div>
            <div className="empty-text">Every Radiant begins with the same words and comes to mean something personal by them. Speak the First Ideal to start your path.</div>
            <button className="btn btn-primary" style={{ marginTop: 4 }}><PIcon d={ICONS.feather} /> Speak the First Ideal</button>
          </div>
        </section>
      </PageShell>
    );
  }
  return (
    <PageShell active="Oaths" onNav={onNav}>
      <div className="page-head">
        <div className="page-eyebrow"><span className="dot"></span> Your oaths · Windrunner</div>
        <h1 className="page-title">The words you live by</h1>
        <p className="page-lead">Two oaths run in parallel: the Ideals that mark how far you've walked the path, and the personal vows you keep day to day.</p>
      </div>

      {/* signature: the Ideals ladder */}
      <section className="glass glow-accent rise" style={{ animationDelay: '0.05s' }}>
        <Glyph order="windrunner" h={150} className="glyph-corner" />
        <div className="section-head">
          <h2>The Five Ideals</h2>
          <span className="section-count">2 sworn · 1 in progress</span>
        </div>
        <IdealLadder
          onBorrow={(it) => onNav && onNav('oath-new-ideal', it)}
          onReflect={(it) => onNav && onNav('reflect-ideal', it)} />
      </section>

      {/* personal oaths — both treatments live here, derived from actions */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="section-head">
          <h2>Personal oaths</h2>
          <button className="btn btn-ghost" onClick={() => onNav && onNav('oath-new')}><PIcon d={ICONS.plus} /> Write an oath</button>
        </div>
        <CommitmentCard oath={COMMITMENTS[0]} onOpen={open} />
        <PracticeCard oath={PRACTICE} onOpen={open} />
        <CommitmentCard oath={COMMITMENTS[1]} onOpen={open} />
      </section>

      {/* kept oaths */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
        <div className="section-head">
          <h2>Kept</h2>
          <span className="section-count">1 fulfilled</span>
        </div>
        <div className="glass oath-card">
          <div className="oath-top">
            <div className="oath-words">I will finish what I start before beginning something new.</div>
            <span className="oath-status kept"><span className="seal"></span> Kept</span>
          </div>
          <div className="oath-foot">
            <span className="meta">Fulfilled March 2026 · all 5 actions answered</span>
            <button className="btn btn-ghost">Reflect <PIcon d={ICONS.arrow} /></button>
          </div>
        </div>
      </section>

      {/* archived oaths — set aside, not deleted; same weight as Kept */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.26s' }}>
        <div className="section-head">
          <h2>Archived</h2>
          <span className="section-count">1 set aside</span>
        </div>
        <div className="glass oath-card archived">
          <div className="oath-top">
            <div className="oath-words">I will train for the mountain climb this spring.</div>
            <span className="oath-status archived"><span className="seal"></span> Archived</span>
          </div>
          <div className="oath-foot">
            <span className="meta">Set aside April 2026 · plans changed, not a failure</span>
            <button className="btn btn-ghost">Restore <PIcon d={ICONS.arrow} /></button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

Object.assign(window, { OathsPage });
