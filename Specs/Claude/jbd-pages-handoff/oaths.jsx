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
const TRASH_ICON = ['M3 6h18', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M10 11v6', 'M14 11v6'];

/* ---------- ⋯ overflow menu — the card's rare, per-view actions ----------
   The frequent action (Reflect) stays a visible button; Archive / Delete /
   permanent-delete live here so they never crowd the footer. Opens upward,
   closes on click-outside or Escape. stopPropagation so the trigger and items
   don't also fire the whole-card "open" click. */
function OathMenu({ items }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  if (!items || !items.length) return null;
  return (
    <div className="oath-menu" ref={ref} onClick={(e) => e.stopPropagation()}>
      <button className="btn btn-ghost oath-menu-trigger" title="More actions" onClick={() => setOpen((v) => !v)}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /></svg>
      </button>
      {open && (
        <div className="oath-menu-pop" role="menu">
          {items.map((it, i) => (
            <button key={i} role="menuitem" className={'oath-menu-item' + (it.danger ? ' danger' : '')} onClick={() => { setOpen(false); it.onClick && it.onClick(); }}>
              <PIcon d={it.icon} sw={1.8} /> {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- the Ideals ladder — a ladder of REVELATION, not progress ----------
   Replaces the old sworn / current / unspoken (progress) model. The ladder never
   counts or completion-gates anything. Each of the five rungs is always shown —
   the shape of the path is always visible — in one of three honest states:
     • Hidden   — the reader hasn't earned SIGHT of these words. Obscured behind
                  the Women's script (the real words, rendered illegibly) or, when
                  the words are unknown even to the world, the Order glyph.
     • Revealed — the gating book has been read; the words are legible but not yet
                  claimed. Offers Speak, Reflect, Borrow.
     • Spoken   — the reader has deliberately claimed these words as their own
                  (lit rail + infused gem). Offers Reflect and Borrow.
   Reveal is DERIVED from which books the reader has read (never a click, never
   stored). Spoken is the only user-driven state change, and it is ungated —
   the reader decides when they are ready. Cross-order browsing lets a reader
   visit any Order's ladder; foreign rungs can be Reflected on or Borrowed, but
   never Spoken (you speak your own Order's Ideals; you borrow others'). */

const SPEAK_ICON = ['M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v3'];
const BOOK_ICON = ['M4 19.5A2.5 2.5 0 0 1 6.5 17H20', 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'];
const INFO_ICON = ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 16v-4', 'M12 8h.01'];
// lucide chevrons-up-down — the affordance that a control opens a menu
const CHEVRON_UD = ['m7 15 5 5 5-5', 'm7 9 5-5 5 5'];

const ORDER_LIST = ['windrunner', 'skybreaker', 'edgedancer', 'truthwatcher', 'lightweaver', 'elsecaller', 'dustbringer', 'willshaper', 'stoneward', 'bondsmith'];
const ORDER_META = {
  windrunner:   { name: 'Windrunner',   accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  skybreaker:   { name: 'Skybreaker',   accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  edgedancer:   { name: 'Edgedancer',   accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  truthwatcher: { name: 'Truthwatcher', accent: '#6fc4a0', accentRgb: '111, 196, 160', accentDeep: '#4a9a7a' },
  lightweaver:  { name: 'Lightweaver',  accent: '#df8398', accentRgb: '223, 131, 152', accentDeep: '#c25a73' },
  elsecaller:   { name: 'Elsecaller',   accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  dustbringer:  { name: 'Dustbringer',  accent: '#e58b80', accentRgb: '229, 139, 128', accentDeep: '#c75a4c' },
  willshaper:   { name: 'Willshaper',   accent: '#c79ad8', accentRgb: '199, 154, 216', accentDeep: '#a06fc0' },
  stoneward:    { name: 'Stoneward',    accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' },
  bondsmith:    { name: 'Bondsmith',    accent: '#e6cd86', accentRgb: '230, 205, 134', accentDeep: '#c9a94f' },
};

// The books a reader picks in onboarding. Reading a book earns SIGHT of the
// Ideals it gates — the only thing stored for reveal is which books are read.
const BOOKS = [
  { id: 'b1', title: 'The Way of Kings' },
  { id: 'b2', title: 'Words of Radiance' },
  { id: 'b3', title: 'Oathbringer' },
  { id: 'b4', title: 'Rhythm of War' },
  { id: 'b5', title: 'Wind and Truth' },
];
const BOOK_TITLE = (id) => { const b = BOOKS.find((x) => x.id === id); return b ? b.title : null; };
// gate[i] = the book that must be read to REVEAL the (i+1)th Ideal. The First is
// gated on nothing — every reader has read enough to see the Immortal Words.
const IDEAL_GATE = [null, 'b1', 'b2', 'b3', 'b5'];
const ORDINALS = ['First Ideal', 'Second Ideal', 'Third Ideal', 'Fourth Ideal', 'Fifth Ideal'];

// The First Ideal is the shared Immortal Words for every Order. Past the First,
// null = not yet chronicled (unknown even once revealed) — lore-accurate, since
// most Orders' later Ideals are not known.
const SHARED_FIRST = 'Life before death. Strength before weakness. Journey before destination.';
const ORDER_IDEALS = {
  windrunner: [SHARED_FIRST,
    'I will protect those who cannot protect themselves.',
    'I will protect even those I dislike, so long as it is right.',
    'I accept that there will be those I cannot protect.',
    null],
  edgedancer: [SHARED_FIRST,
    'I will listen to those who have been ignored.',
    'I will remember those who have been forgotten.',
    null, null],
};
const idealWords = (order, i) => (i === 0 ? SHARED_FIRST : (ORDER_IDEALS[order] && ORDER_IDEALS[order][i]) || null);

// Notes shown on the reader's own Spoken rungs; anything spoken live in-session
// reads "Spoken just now."
const SPOKEN_NOTES = {
  'windrunner:0': 'The Immortal Words — spoken when you first stepped onto the path.',
  'windrunner:1': 'Spoken four months ago.',
};

/* Hidden-rung obscuring: the REAL words rendered in the Women's script (the
   reader can see there ARE words, just not read them), or the Order glyph as a
   watermark when the words are unknown to the world. */
function IdealScript({ words, order, overlay }) {
  const cls = 'rung-script' + (overlay ? ' overlay' : '');
  if (typeof WomensScript !== 'undefined') {
    // Obscured Hidden words rendered in the Women's script. When the words are
    // unknown even to the world (e.g. an unchronicled Fifth Ideal) we still show
    // script — of an honest placeholder that decodes to exactly that.
    const source = words || 'The words are not yet known.';
    const lined = source.replace(/\.\s+/g, '.\n');
    return <div className={cls} aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: WomensScript.toSVGString(lined, { color: 'currentColor', strokeWidth: 1.4, scale: 0.5 }) }} />;
  }
  // Only if the script engine failed to load: fall back to the Order glyph.
  return <div className={(overlay ? 'overlay ' : '') + 'rung-hidden-glyph'} aria-hidden="true"><OrderGlyph order={order} h={56} /></div>;
}

function Rung({ ord, i, order, isHome, words, state, gateBook, borrowed, revealing, spokenNote, onSpeak, onBorrow, onReflect }) {
  const has = !!words;
  const hidden = state === 'hidden';
  const canSpeak = isHome && state === 'revealed' && has;
  const canBorrow = !hidden && has;
  const canReflect = !hidden && has;
  const tag = (i === 0)
    ? 'Shared'
    : (borrowed && !hidden) ? 'Speaking now'
    : (state === 'spoken') ? 'Spoken' : null;
  const showActions = canSpeak || canBorrow || canReflect;
  const payload = { ord, words, order: ord };
  return (
    <div className={'rung ' + state + (revealing ? ' revealing' : '') + ' interactive'}>
      <div className="rung-rail">
        <div className="rung-line top"></div>
        <div className="rung-node"></div>
        <div className={'rung-line ' + (state === 'spoken' ? 'lit' : '')} style={{ visibility: i === ORDINALS.length - 1 ? 'hidden' : 'visible' }}></div>
      </div>
      <div className="rung-body">
        <div className="rung-ordinal">{ord}{tag && <span className={'tag' + (tag === 'Spoken' ? ' spoken-tag' : '')}>{tag}</span>}</div>

        <div className="rung-reveal">
          {hidden
            ? <IdealScript words={words} order={order} />
            : <div className={'rung-words' + (has ? '' : ' unknown')}>{has ? words : 'These words are not yet chronicled.'}</div>}
          {revealing && <IdealScript words={words} order={order} overlay />}
        </div>

        {hidden && (
          <div className="rung-hidden-hint">
            <PIcon d={BOOK_ICON} sw={1.8} />
            {gateBook ? 'Revealed as you read further into the Archive.' : 'Not yet within sight.'}
          </div>
        )}

        {showActions && (
          <div className="rung-actions">
            {canSpeak && (
              <button className="rung-link speak" onClick={() => onSpeak(i)}>
                <PIcon d={SPEAK_ICON} sw={1.9} /> Speak this Ideal
              </button>
            )}
            {canBorrow && (
              <button className="rung-link" onClick={() => onBorrow && onBorrow(payload)}>
                <PIcon d={ICONS.plus} /> Borrow this Ideal
              </button>
            )}
            {canReflect && (
              <button className="rung-link reflect" onClick={() => onReflect && onReflect(payload)}>
                <PIcon d={ICONS.feather} /> Reflect on this Ideal
              </button>
            )}
            {/* Reserved slot — the "Understanding" ideal-breakdown ships in a later pass. */}
            {canReflect && (
              <span className="rung-understanding" title="Understanding — what living this looks like day to day (coming soon)" aria-disabled="true">
                <PIcon d={INFO_ICON} sw={1.8} /> Understanding
              </span>
            )}
          </div>
        )}

        {state === 'spoken' && spokenNote && <div className="rung-spoke-meta">{spokenNote}</div>}
      </div>
    </div>
  );
}

/* ---------- a small popover — trigger button + glass panel ----------
   Collapses the Order switcher and Books-read toggles (two heavy, wrapping
   rows) behind compact icon buttons. Closes on click-outside or Escape;
   the panel opens downward, aligned to the trigger's left edge. */
function LadderPopover({ className, label, children }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return (
    <div className={'ladder-switch' + (className ? ' ' + className : '')} ref={ref}>
      {label({ open, toggle: () => setOpen((v) => !v) })}
      {open && <div className="ladder-pop">{children({ close: () => setOpen(false) })}</div>}
    </div>
  );
}

function IdealLadder({ homeOrder = 'windrunner', onBorrow, onReflect }) {
  // Stored state (the ONLY things persisted for the ladder): which books the
  // reader has read, and which of their own Ideals they've spoken. Revealed is
  // always derived from booksRead — never stored — so it can't drift.
  const [order, setOrder] = React.useState(homeOrder);
  const [booksRead, setBooksRead] = React.useState(['b1', 'b2']);
  const [spoken, setSpoken] = React.useState([homeOrder + ':0', homeOrder + ':1']);
  const [revealing, setRevealing] = React.useState([]);
  const borrowedKey = homeOrder + ':2'; // the Third's words are borrowed by an active oath → "Speaking now"

  const isHome = order === homeOrder;
  const meta = ORDER_META[order] || ORDER_META.windrunner;
  const isRevealed = (i) => IDEAL_GATE[i] === null || booksRead.includes(IDEAL_GATE[i]);
  const stateOf = (i) => {
    if (!isRevealed(i)) return 'hidden';
    if (isHome && spoken.includes(order + ':' + i)) return 'spoken';
    return 'revealed';
  };

  // Toggling a book read is the reveal INPUT (stands in for onboarding). Newly
  // sighting an Ideal plays the script-dissolve once, on this first mount after
  // the unlock — not a ceremony, just the moment the obscuring lifts.
  const toggleBook = (id) => {
    setBooksRead((prev) => {
      if (prev.includes(id)) return prev.filter((b) => b !== id);
      const keys = ORDINALS.map((_, i) => i).filter((i) => IDEAL_GATE[i] === id).map((i) => order + ':' + i);
      if (keys.length) {
        setRevealing((r) => Array.from(new Set([...r, ...keys])));
        setTimeout(() => setRevealing((r) => r.filter((k) => !keys.includes(k))), 1300);
      }
      return [...prev, id];
    });
  };
  const speak = (i) => setSpoken((prev) => (prev.includes(order + ':' + i) ? prev : [...prev, order + ':' + i]));

  return (
    <div className="ladder-wrap" style={{ '--accent': meta.accent, '--accent-rgb': meta.accentRgb, '--accent-deep': meta.accentDeep }}>
      {/* the section head doubles as the ladder's control bar: the title on the
          left, the Order switcher + Books-read input (each collapsed behind an
          icon button that opens a popover) on the right */}
      <div className="section-head ladder-head">
        <h2>The Five Ideals</h2>
        <div className="ladder-controls">
        <LadderPopover className="ls-orders" label={({ open, toggle }) => (
          <button className={'ladder-switch-btn' + (open ? ' open' : '')} aria-expanded={open} aria-haspopup="true" onClick={toggle}>
            <OrderGlyph order={order} h={17} />
            <span className="lsb-name">{meta.name}</span>
            {!isHome && <span className="lsb-tag">viewing</span>}
            <PIcon d={CHEVRON_UD} sw={1.9} />
          </button>
        )}>
          {({ close }) => (
            <React.Fragment>
              <div className="ladder-pop-head">Browse an Order&rsquo;s Ideals</div>
              <div className="ladder-pop-orders" role="tablist" aria-label="Browse an Order's Ideals">
                {ORDER_LIST.map((o) => (
                  <button key={o} role="tab" aria-selected={o === order} className={'chip' + (o === order ? ' on' : '')} onClick={() => { setOrder(o); close(); }}>
                    {o === homeOrder && <span className="home-gem" title="Your Order"></span>}
                    {ORDER_META[o].name}
                  </button>
                ))}
              </div>
            </React.Fragment>
          )}
        </LadderPopover>

        <LadderPopover className="ls-books" label={({ open, toggle }) => (
          <button className={'ladder-switch-btn' + (open ? ' open' : '')} aria-expanded={open} aria-haspopup="true" onClick={toggle}>
            <PIcon d={BOOK_ICON} sw={1.8} />
            <span className="lsb-name">Books read</span>
            <span className="lsb-count">{booksRead.length}<span className="of">/{BOOKS.length}</span></span>
            <PIcon d={CHEVRON_UD} sw={1.9} />
          </button>
        )}>
          {() => (
            <React.Fragment>
              <div className="ladder-pop-head">Which of the Archive have you read?</div>
              <div className="ladder-pop-books">
                {BOOKS.map((b) => {
                  const read = booksRead.includes(b.id);
                  return (
                    <button key={b.id} className={'book' + (read ? ' read' : '')} onClick={() => toggleBook(b.id)} aria-pressed={read}>
                      <span className="gemstone"></span>{b.title}
                    </button>
                  );
                })}
              </div>
              <div className="ladder-pop-note">Reading a book reveals the Ideals it gates.</div>
            </React.Fragment>
          )}
        </LadderPopover>
        </div>
      </div>

      <div className="ladder-context">
        {isHome
          ? <span>The {meta.name} Ideals. You speak each when you&rsquo;re ready.</span>
          : <span><span className="ladder-foreign-note">The {meta.name} Ideals.</span> You can reflect on or borrow these words, but only your own Order&rsquo;s can be spoken.</span>}
      </div>

      <div className="ladder">
        {ORDINALS.map((ord, i) => (
          <Rung key={order + ':' + i} ord={ord} i={i} order={order} isHome={isHome}
            words={idealWords(order, i)} state={stateOf(i)} gateBook={BOOK_TITLE(IDEAL_GATE[i])}
            borrowed={isHome && (order + ':' + i) === borrowedKey}
            revealing={revealing.includes(order + ':' + i)}
            spokenNote={stateOf(i) === 'spoken' ? (SPOKEN_NOTES[order + ':' + i] || 'Spoken just now.') : null}
            onSpeak={speak} onBorrow={onBorrow} onReflect={onReflect} />
        ))}
      </div>
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
function CommitmentCard({ oath, onOpen, onReflect }) {
  const [actions, setActions] = React.useState(oath.actions);
  const [kept, setKept] = React.useState(false);
  const done = actions.filter((a) => a.done).length;
  const total = actions.length;
  const pct = Math.round((done / total) * 100);
  const allDone = done === total;
  const toggle = (i) => { setKept(false); setActions((xs) => xs.map((a, j) => (j === i ? { ...a, done: !a.done } : a))); };
  const remaining = total - done;

  return (
    <div className={'glass oath-card' + (kept ? '' : ' card-link')} onClick={kept ? undefined : () => onOpen && onOpen(oath)}>
      <div className="oath-top">
        <div className="oath-words">{oath.words}</div>
        <span className={'oath-status ' + (kept ? 'kept' : 'active')}><span className="seal"></span> {kept ? 'Kept' : 'Active'}</span>
      </div>
      <div>
        <div className="progress-row"><span>Progress</span><span>{done} of {total} actions</span></div>
        <div className="progress-track"><div className="progress-fill infused" style={{ width: pct + '%' }}><span className="bead"></span></div></div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <TickableActions actions={actions} onToggle={toggle} />
      </div>
      <div className="oath-foot">
        <div className="foot-left">
          {kept ? (
            <span className="meta">Kept just now · all {total} actions answered</span>
          ) : allDone ? (
            <div className="oath-ready" onClick={(e) => e.stopPropagation()}>
              <span className="ready-note">Every action answered.</span>
              <button className="btn btn-primary" onClick={() => setKept(true)}><PIcon d={ICONS.check} sw={2.4} /> Mark as kept</button>
            </div>
          ) : (
            <span className="open-hint">{oath.begun} · {remaining} more · <span className="oh">Open <PIcon d={ICONS.arrow} /></span></span>
          )}
        </div>
        <div className="foot-actions" onClick={(e) => e.stopPropagation()}>
          <button className="btn btn-secondary" onClick={() => onReflect && onReflect(oath)}><PIcon d={ICONS.feather} /> Reflect</button>
          <OathMenu items={[
            { label: 'Archive (set aside)', icon: ARCHIVE_ICON },
            { label: 'Delete oath', icon: TRASH_ICON, danger: true },
          ]} />
        </div>
      </div>
    </div>
  );
}

/* ---------- practice oath (no actions) ---------- */
const PRACTICE_CAD = [
  0,0,1,2,0,0,0, 2,1,0,3,2,1,0, 3,2,4,3,2,3,1, 2,4,3,2,4,3,2, 4,3,4,2,3,4,3, 3,4,3,4,4,3,4,
];
function PracticeCard({ oath, onOpen, onReflect }) {
  const [practiced, setPracticed] = React.useState(false);
  const streak = oath.streak + (practiced ? 1 : 0);
  const cells = practiced ? [...PRACTICE_CAD.slice(1), 4] : PRACTICE_CAD;
  return (
    <div className="glass oath-card practice card-link" onClick={() => onOpen && onOpen(oath)}>
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
        <span className="open-hint">{oath.begun} · <span className="oh">Open <PIcon d={ICONS.arrow} /></span></span>
        <div className="foot-actions" onClick={(e) => e.stopPropagation()}>
          <button className={'btn btn-ghost' + (practiced ? ' is-practiced' : '')} onClick={() => setPracticed((v) => !v)}>
            <PIcon d={ICONS.check} sw={practiced ? 2.6 : 2} /> {practiced ? 'Practiced today' : 'Practice today'}
          </button>
          <button className="btn btn-secondary" onClick={() => onReflect && onReflect(oath)}><PIcon d={ICONS.feather} /> Reflect</button>
          <OathMenu items={[
            { label: 'Archive (set aside)', icon: ARCHIVE_ICON },
            { label: 'Delete oath', icon: TRASH_ICON, danger: true },
          ]} />
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
  const reflect = (o) => onNav && onNav('reflect', o);
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
        <IdealLadder
          homeOrder="windrunner"
          onBorrow={(it) => onNav && onNav('oath-new-ideal', it)}
          onReflect={(it) => onNav && onNav('reflect-ideal', it)} />
      </section>

      {/* personal oaths — both treatments live here, derived from actions */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="section-head">
          <h2>Personal oaths</h2>
          <button className="btn btn-ghost" onClick={() => onNav && onNav('oath-new')}><PIcon d={ICONS.plus} /> Write an oath</button>
        </div>
        <CommitmentCard oath={COMMITMENTS[0]} onOpen={open} onReflect={reflect} />
        <PracticeCard oath={PRACTICE} onOpen={open} onReflect={reflect} />
        <CommitmentCard oath={COMMITMENTS[1]} onOpen={open} onReflect={reflect} />
      </section>

      {/* kept oaths */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
        <div className="section-head">
          <h2>Kept</h2>
          <span className="section-count">1 fulfilled</span>
        </div>
        <div className="glass oath-card card-link" onClick={() => open()}>
          <div className="oath-top">
            <div className="oath-words">I will finish what I start before beginning something new.</div>
            <span className="oath-status kept"><span className="seal"></span> Kept</span>
          </div>
          <div className="oath-foot">
            <span className="open-hint">Fulfilled March 2026 · <span className="oh">Open <PIcon d={ICONS.arrow} /></span></span>
            <div className="foot-actions" onClick={(e) => e.stopPropagation()}>
              <button className="btn btn-secondary" onClick={() => reflect()}><PIcon d={ICONS.feather} /> Reflect</button>
              <OathMenu items={[
                { label: 'Archive', icon: ARCHIVE_ICON },
                { label: 'Delete oath', icon: TRASH_ICON, danger: true },
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* archived oaths — set aside, not deleted; same weight as Kept */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.26s' }}>
        <div className="section-head">
          <h2>Archived</h2>
          <span className="section-count">1 set aside</span>
        </div>
        <div className="glass oath-card archived card-link" onClick={() => open()}>
          <div className="oath-top">
            <div className="oath-words">I will train for the mountain climb this spring.</div>
            <span className="oath-status archived"><span className="seal"></span> Archived</span>
          </div>
          <div className="oath-foot">
            <span className="open-hint">Set aside April 2026 · <span className="oh">Open <PIcon d={ICONS.arrow} /></span></span>
            <div className="foot-actions" onClick={(e) => e.stopPropagation()}>
              <button className="btn btn-secondary"><PIcon d={ICONS.arrow} /> Restore</button>
              <OathMenu items={[
                { label: 'Delete permanently', icon: TRASH_ICON, danger: true },
              ]} />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

Object.assign(window, { OathsPage });
