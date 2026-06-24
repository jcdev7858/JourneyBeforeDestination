/* REFLECTION EDITOR — the modal for writing, editing and deleting a journal
   reflection. A glass dialog over the blurred Journal page. The prompt being
   answered is shown in the serif voice (read-only); below it the response
   textarea, selectable theme chips, and a favorite toggle. Editing exposes a
   delete-with-confirm, matching the oath editor. */

const RX_X = ['M6 6l12 12', 'M18 6 6 18'];
const RX_TRASH = ['M3 6h18', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M10 11v6', 'M14 11v6'];

const ALL_THEMES = ['Responsibility', 'Family', 'Courage', 'Truth', 'Service', 'Presence', 'Leadership', 'Growth'];

function ThemeChips({ chosen, onToggle }) {
  return (
    <div className="filterbar">
      {ALL_THEMES.map((t) => (
        <span key={t} className={'chip' + (chosen.includes(t) ? ' on' : '')} onClick={() => onToggle(t)}>{t}</span>
      ))}
    </div>
  );
}

function ReflectionEditorModal({ mode = 'edit', startConfirm = false, onClose }) {
  const isNew = mode === 'new';
  const prompt = 'What responsibility are you avoiding right now?';
  const [text, setText] = React.useState(isNew ? '' : "The call to my brother. I keep waiting for the right moment, but the waiting is the avoidance — there isn't a clean version of it.");
  const [themes, setThemes] = React.useState(isNew ? [] : ['Responsibility', 'Family']);
  const [fav, setFav] = React.useState(!isNew);
  const [confirm, setConfirm] = React.useState(startConfirm);

  const toggleTheme = (t) => setThemes((xs) => (xs.includes(t) ? xs.filter((x) => x !== t) : [...xs, t]));

  if (confirm) {
    return (
      <div className="modal glass modal-sm">
        <span className="modal-glow"></span>
        <div className="modal-head">
          <div>
            <div className="modal-eyebrow"><span className="dot"></span> Journal · Windrunner</div>
            <div className="modal-title">Delete this reflection?</div>
          </div>
          <button className="modal-close" onClick={() => setConfirm(false)}><PIcon d={RX_X} /></button>
        </div>
        <div className="modal-body">
          <p className="modal-sublead">This removes the entry from your journal for good and breaks the day from your cadence. There's no undo.</p>
          <div className="modal-quote">{prompt}</div>
        </div>
        <div className="modal-foot">
          <div className="foot-right">
            <button className="btn btn-ghost" onClick={() => setConfirm(false)}>Keep it</button>
            <button className="btn btn-danger-solid"><PIcon d={RX_TRASH} sw={1.8} /> Delete reflection</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal glass">
      <span className="modal-glow"></span>
      <div className="modal-head">
        <div>
          <div className="modal-eyebrow"><span className="dot"></span> {isNew ? "Today's reflection · Windrunner" : 'Edit reflection · Jun 22'}</div>
          <div className="modal-title" style={{ maxWidth: '32ch' }}>{prompt}</div>
        </div>
        <button className="modal-close" onClick={onClose}><PIcon d={RX_X} /></button>
      </div>

      <div className="modal-body">
        <div className="field">
          <label className="field-label">Your reflection</label>
          <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} rows={5}
            placeholder="Write freely. No one sees this but you." style={{ minHeight: 150, lineHeight: 1.7 }} />
        </div>

        <div className="field">
          <label className="field-label" style={{ marginBottom: 4 }}>Themes</label>
          <ThemeChips chosen={themes} onToggle={toggleTheme} />
        </div>
      </div>

      <div className="modal-foot">
        {!isNew && (
          <button className="btn btn-danger" onClick={() => setConfirm(true)}><PIcon d={RX_TRASH} sw={1.8} /> Delete</button>
        )}
        <div className="foot-right">
          <button className={'entry-fav' + (fav ? ' on' : '')} onClick={() => setFav((v) => !v)} title="Favorite" style={{ cursor: 'pointer' }}>
            <PIcon d={ICONS.star} sw={1.8} />
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary"><PIcon d={ICONS.feather} /> {isNew ? 'Keep reflection' : 'Save changes'}</button>
        </div>
      </div>
    </div>
  );
}

function ReflectionEditorPage({ mode = 'edit', startConfirm = false }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <JournalPage />
      <div className="scrim">
        <ReflectionEditorModal mode={mode} startConfirm={startConfirm} />
      </div>
    </div>
  );
}

Object.assign(window, { ReflectionEditorPage, ReflectionEditorModal });
