/* FULL COMPOSER — the complete journaling-app feature set, layered on Option B.
   NOT wired into the default preview (the shipped composer is the lean
   free-first ReflectionEditorModal in reflection-editor.jsx). This is the
   superset kept on the shelf: title, a rich-text toolbar, a "need a prompt?"
   library launch, photo / voice attachments, a mood reading, themes, a linked
   oath pill, privacy, and word-count / autosave meta. The JournalEntry model
   already holds these optional fields — ship a subset now, add the rest here.

   → app dest: an expanded components/journal/ReflectionEditor.jsx (feature
     flags per capability), or split leaf components (EditorToolbar, MoodRow,
     AttachmentRow). Depends on: pageshell (PIcon/ICONS), journal.jsx
     (OATHS/THEMES), reflection-editor.jsx (LinkPill). Load AFTER those.
     Icons below map back to their lucide-react named imports. */

const FULL_ICONS = {
  calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
  lock:     ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  bold:     ['M6 12h8a4 4 0 0 0 0-8H6z', 'M6 12h9a4 4 0 0 1 0 8H6z'],
  italic:   ['M19 4h-9', 'M14 20H5', 'M15 4 9 20'],
  list:     ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
  quote:    ['M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 3-1 4-3 5', 'M20 11h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 3-1 4-3 5'],
  sparkle:  ['M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z'],
  image:    ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'm21 15-5-5L5 21'],
  mic:      ['M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v3'],
};

const MOODS = [
  { key: 'heavy',  label: 'Heavy',  dot: '#8b95ad' },
  { key: 'unsure', label: 'Unsure', dot: '#b79bd8' },
  { key: 'steady', label: 'Steady', dot: '#7cc4e8' },
  { key: 'clear',  label: 'Clear',  dot: '#7ad0b0' },
  { key: 'lit',    label: 'Lit up', dot: '#d8b878' },
];

const fullWords = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
const fullToggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function FullComposerModal({ onClose }) {
  const [text, setText] = React.useState('Covered a shift for someone without expecting anything back. It felt lighter than I thought it would — no ledger to balance. I keep noticing how much of my week I spend keeping score.');
  const [themes, setThemes] = React.useState(['Service']);
  const [mood, setMood] = React.useState('clear');
  const [oaths, setOaths] = React.useState(['oath-1']);
  const [fav, setFav] = React.useState(true);
  const [priv, setPriv] = React.useState(true);

  return (
    <div className="modal glass">
      <span className="modal-glow"></span>
      <div className="modal-head">
        <div>
          <div className="modal-eyebrow"><span className="dot"></span> New entry · Windrunner</div>
          <div className="composer-meta-row">
            <span className="composer-meta"><PIcon d={FULL_ICONS.calendar} sw={1.8} /> Mon, Jun 23 · 9:42 PM</span>
            <button className={'composer-meta meta-toggle' + (priv ? ' on' : '')} onClick={() => setPriv((v) => !v)}>
              <PIcon d={FULL_ICONS.lock} sw={1.8} /> {priv ? 'Private' : 'Shareable'}
            </button>
          </div>
        </div>
        <button className="modal-close" onClick={onClose}><PIcon d={ICONS.x} /></button>
      </div>

      <div className="modal-body composer-scroll">
        <input className="input input-oath" placeholder="Title — optional" defaultValue="Keeping score" style={{ minHeight: 0 }} />

        <div>
          <div className="editor-toolbar">
            <button title="Bold"><PIcon d={FULL_ICONS.bold} sw={2} /></button>
            <button title="Italic"><PIcon d={FULL_ICONS.italic} sw={2} /></button>
            <button title="List"><PIcon d={FULL_ICONS.list} sw={2} /></button>
            <button title="Quote"><PIcon d={FULL_ICONS.quote} sw={1.9} /></button>
            <span className="toolbar-sep"></span>
            <button className="toolbar-inspire" title="Prompt library"><PIcon d={FULL_ICONS.sparkle} sw={1.9} /> Need a prompt?</button>
          </div>
          <textarea className="textarea" rows={5} style={{ minHeight: 150, lineHeight: 1.7, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
            value={text} onChange={(e) => setText(e.target.value)} placeholder="Write freely. No one sees this but you." />
        </div>

        <div className="attach-static">
          <button className="attach-chip"><PIcon d={FULL_ICONS.image} sw={1.8} /> Photo</button>
          <button className="attach-chip"><PIcon d={FULL_ICONS.mic} sw={1.8} /> Voice note</button>
          <button className="attach-chip"><PIcon d={ICONS.link} sw={1.8} /> Link oath / ideal</button>
        </div>

        <div className="field">
          <label className="field-label" style={{ marginBottom: 6 }}>How did it sit?</label>
          <div className="mood-row">{MOODS.map((m) => (
            <button key={m.key} className={'mood-dot' + (mood === m.key ? ' on' : '')} onClick={() => setMood(m.key)}>
              <span className="mood-swatch" style={{ background: m.dot, boxShadow: mood === m.key ? '0 0 12px ' + m.dot : 'none' }}></span>{m.label}
            </button>
          ))}</div>
        </div>

        <div className="field">
          <label className="field-label" style={{ marginBottom: 4 }}>Themes</label>
          <div className="filterbar">{THEMES.map((t) => <span key={t} className={'chip' + (themes.includes(t) ? ' on' : '')} onClick={() => setThemes((a) => fullToggle(a, t))}>{t}</span>)}</div>
        </div>

        <div className="ctx-cluster" style={{ marginTop: 2 }}>
          {oaths.map((id) => <LinkPill key={id} icon={ICONS.link} tone="oath" label={(OATHS.find((x) => x.id === id) || {}).title} onRemove={() => setOaths((a) => fullToggle(a, id))} />)}
        </div>
      </div>

      <div className="modal-foot">
        <span className="word-count">{fullWords(text)} words · saved just now</span>
        <div className="foot-right">
          <button className={'entry-fav' + (fav ? ' on' : '')} onClick={() => setFav((v) => !v)} title="Favorite" style={{ cursor: 'pointer' }}>
            <PIcon d={ICONS.star} sw={1.8} />
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary"><PIcon d={ICONS.feather} /> Keep entry</button>
        </div>
      </div>
    </div>
  );
}

/* canvas wrapper: the full composer over a blurred Journal page. */
function FullComposerPage() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <JournalPage />
      <div className="scrim"><FullComposerModal /></div>
    </div>
  );
}

Object.assign(window, { FullComposerModal, FullComposerPage });
