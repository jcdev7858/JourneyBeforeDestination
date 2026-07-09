/* REFLECTION EDITOR — the free-first journal composer (chosen: Option B).
   Writing is the default act: a title and body, then an "Add context" row that
   lets the writer OPTIONALLY attach a theme, an oath, an ideal or a prompt via
   small popovers. Nothing is required — an entry can stand on its own. Attached
   context shows as removable pills; the entry's kind is derived downstream from
   whichever links survive (see journal.jsx deriveKind). Editing exposes a
   delete-with-confirm, matching the oath editor.

   → app dest: components/journal/ReflectionEditor.jsx. The optional links are
     fields on the JournalEntry model (title?, prompt?, oathId?, idealId?,
     themes[]). ContextAttach is the popover cluster; the pills are LinkPill.
     Icons map back to their lucide-react named imports. */

const RX_X = ['M6 6l12 12', 'M18 6 6 18'];
const RX_TRASH = ['M3 6h18', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M10 11v6', 'M14 11v6'];

const words = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

/* ---------- composer primitives (→ components/journal/) ---------- */

/* a removable linked pill (oath / ideal / prompt / theme) */
function LinkPill({ icon, label, tone = 'theme', onRemove }) {
  return (
    <span className={'link-pill link-pill-' + tone}>
      {icon && <PIcon d={icon} sw={1.9} />}
      <span className="link-pill-label">{label}</span>
      {onRemove && <button className="link-pill-x" onClick={onRemove} aria-label="Remove"><PIcon d={RX_X} sw={2.2} /></button>}
    </span>
  );
}

/* a dashed ghost "add context" affordance */
function AttachChip({ icon, label, active, onClick }) {
  return (
    <button className={'attach-chip' + (active ? ' on' : '')} onClick={onClick}>
      <PIcon d={icon} sw={1.9} /> {label}
    </button>
  );
}

/* a small popover list anchored under its trigger */
function Popover({ title, children }) {
  return (
    <div className="pop" onClick={(e) => e.stopPropagation()}>
      {title && <div className="pop-head">{title}</div>}
      <div className="pop-list">{children}</div>
    </div>
  );
}
function PopItem({ children, onClick, checked }) {
  return (
    <button className={'pop-item' + (checked ? ' on' : '')} onClick={onClick}>
      <span>{children}</span>
      {checked && <PIcon d={ICONS.check} sw={2.2} />}
    </button>
  );
}

/* ---------- the composer modal ---------- */
function ReflectionEditorModal({ mode = 'edit', startConfirm = false, contextPrompt, contextLabel, onClose }) {
  const isNew = mode === 'new';

  // context arriving from a ladder rung / oath ("reflect on this") pre-attaches
  // as a prompt pill — the writer can remove it and still keep a free entry.
  const [title, setTitle] = React.useState(isNew ? '' : 'Keeping score');
  const [text, setText] = React.useState(isNew ? '' :
    'Covered a shift for someone without expecting anything back. It felt lighter than I thought it would — no ledger to balance.');
  const [themes, setThemes] = React.useState(isNew ? [] : ['Service']);
  const [oaths, setOaths] = React.useState(isNew ? [] : ['oath-1']);
  const [ideals, setIdeals] = React.useState([]);
  const [prompt, setPrompt] = React.useState(contextPrompt || null);
  const [fav, setFav] = React.useState(!isNew);
  const [pop, setPop] = React.useState(null); // 'theme' | 'oath' | 'ideal' | 'prompt' | null
  const [confirm, setConfirm] = React.useState(startConfirm);

  const eyebrow = contextLabel || (isNew ? 'New entry · Windrunner' : 'Edit entry · Jun 23');
  const hasCtx = themes.length || oaths.length || ideals.length || prompt;

  if (confirm) {
    return (
      <div className="modal glass modal-sm">
        <span className="modal-glow"></span>
        <div className="modal-head">
          <div>
            <div className="modal-eyebrow"><span className="dot"></span> Journal · Windrunner</div>
            <div className="modal-title">Delete this entry?</div>
          </div>
          <button className="modal-close" onClick={() => setConfirm(false)}><PIcon d={RX_X} /></button>
        </div>
        <div className="modal-body">
          <p className="modal-sublead">This removes the entry from your journal for good and breaks the day from your cadence. There's no undo.</p>
          {(title || prompt) && <div className="modal-quote">{title || prompt}</div>}
        </div>
        <div className="modal-foot">
          <div className="foot-right">
            <button className="btn btn-ghost" onClick={() => setConfirm(false)}>Keep it</button>
            <button className="btn btn-danger-solid"><PIcon d={RX_TRASH} sw={1.8} /> Delete entry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal glass" onClick={() => setPop(null)}>
      <span className="modal-glow"></span>
      <div className="modal-head">
        <div>
          <div className="modal-eyebrow"><span className="dot"></span> {eyebrow}</div>
          <div className="modal-title" style={{ maxWidth: '30ch' }}>Whatever's on your mind</div>
        </div>
        <button className="modal-close" onClick={onClose}><PIcon d={RX_X} /></button>
      </div>

      <div className="modal-body">
        <input className="input input-oath" placeholder="Title — optional" value={title}
          onChange={(e) => setTitle(e.target.value)} style={{ minHeight: 0 }} />
        <textarea className="textarea" rows={5} style={{ minHeight: 160, lineHeight: 1.7 }}
          value={text} onChange={(e) => setText(e.target.value)}
          placeholder="Start writing. A journal entry doesn't need a prompt or an oath — attach one only if it fits. No one sees this but you." />

        {hasCtx ? (
          <div className="ctx-cluster">
            {prompt && <LinkPill icon={ICONS.book} tone="prompt" label={prompt} onRemove={() => setPrompt(null)} />}
            {oaths.map((id) => <LinkPill key={id} icon={ICONS.link} tone="oath" label={(OATHS.find((x) => x.id === id) || {}).title} onRemove={() => setOaths((a) => toggleIn(a, id))} />)}
            {ideals.map((ord) => <LinkPill key={ord} icon={ICONS.feather} tone="ideal" label={ord} onRemove={() => setIdeals((a) => toggleIn(a, ord))} />)}
            {themes.map((t) => <LinkPill key={t} icon={ICONS.hash} tone="theme" label={t} onRemove={() => setThemes((a) => toggleIn(a, t))} />)}
          </div>
        ) : null}

        <div className="attach-row" onClick={(e) => e.stopPropagation()}>
          <span className="attach-lead">Add context</span>
          <div className="attach-wrap">
            <AttachChip icon={ICONS.hash} label="Theme" active={pop === 'theme'} onClick={() => setPop(pop === 'theme' ? null : 'theme')} />
            {pop === 'theme' && <Popover title="Tag a theme">{THEMES.map((t) => <PopItem key={t} checked={themes.includes(t)} onClick={() => setThemes((a) => toggleIn(a, t))}>{t}</PopItem>)}</Popover>}
          </div>
          <div className="attach-wrap">
            <AttachChip icon={ICONS.link} label="Oath" active={pop === 'oath'} onClick={() => setPop(pop === 'oath' ? null : 'oath')} />
            {pop === 'oath' && <Popover title="Link an oath">{OATHS.map((o) => <PopItem key={o.id} checked={oaths.includes(o.id)} onClick={() => setOaths((a) => toggleIn(a, o.id))}>{o.title}</PopItem>)}</Popover>}
          </div>
          <div className="attach-wrap">
            <AttachChip icon={ICONS.feather} label="Ideal" active={pop === 'ideal'} onClick={() => setPop(pop === 'ideal' ? null : 'ideal')} />
            {pop === 'ideal' && <Popover title="Link an ideal">{IDEALS.map((i) => <PopItem key={i.ord} checked={ideals.includes(i.ord)} onClick={() => setIdeals((a) => toggleIn(a, i.ord))}>{i.ord}</PopItem>)}</Popover>}
          </div>
          <div className="attach-wrap">
            <AttachChip icon={ICONS.book} label="Prompt" active={pop === 'prompt'} onClick={() => setPop(pop === 'prompt' ? null : 'prompt')} />
            {pop === 'prompt' && <Popover title="Answer a prompt">{PROMPTS.map((p) => <PopItem key={p} checked={prompt === p} onClick={() => setPrompt(prompt === p ? null : p)}>{p}</PopItem>)}</Popover>}
          </div>
        </div>
      </div>

      <div className="modal-foot">
        {isNew
          ? <span className="word-count">{words(text)} words</span>
          : <button className="btn btn-danger" onClick={() => setConfirm(true)}><PIcon d={RX_TRASH} sw={1.8} /> Delete</button>}
        <div className="foot-right">
          <button className={'entry-fav' + (fav ? ' on' : '')} onClick={() => setFav((v) => !v)} title="Favorite" style={{ cursor: 'pointer' }}>
            <PIcon d={ICONS.star} sw={1.8} />
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary"><PIcon d={ICONS.feather} /> {isNew ? 'Keep entry' : 'Save changes'}</button>
        </div>
      </div>
    </div>
  );
}

/* canvas wrapper: composite the modal over a blurred Journal page. In the real
   app render just the modal inside your own overlay (as preview.html does). */
function ReflectionEditorPage({ mode = 'edit', startConfirm = false, contextPrompt, contextLabel }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <JournalPage />
      <div className="scrim">
        <ReflectionEditorModal mode={mode} startConfirm={startConfirm} contextPrompt={contextPrompt} contextLabel={contextLabel} />
      </div>
    </div>
  );
}

Object.assign(window, { ReflectionEditorPage, ReflectionEditorModal, LinkPill, AttachChip, Popover, PopItem });
