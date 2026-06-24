/* OATH EDITOR — the modal for adding, editing, updating and deleting an oath
   and its actions. A glass dialog over a blurred Oaths page. Fully interactive:
   edit the words, toggle an action done, rename it, add or delete actions, and
   arm the delete-oath confirmation. The "new" and "delete-confirm" states are
   shown as their own artboards. */

const EX_X = ['M6 6l12 12', 'M18 6 6 18'];
const EX_TRASH = ['M3 6h18', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', 'M10 11v6', 'M14 11v6'];

const SEED_ACTIONS = [
  { id: 1, text: 'Put my phone away during dinner', done: true },
  { id: 2, text: 'Plan one daddy-daughter date this month', done: true },
  { id: 3, text: 'Coach the team without checking email', done: true },
  { id: 4, text: 'Spend one hour outside this week', done: false },
];

function ActionEditRow({ a, onToggle, onText, onDelete }) {
  return (
    <div className="action-edit">
      <span className={'check' + (a.done ? ' done infused' : '')} onClick={onToggle} role="checkbox" aria-checked={a.done} title={a.done ? 'Mark not done' : 'Mark done'}>
        {a.done && <PIcon d={ICONS.check} sw={3} />}
      </span>
      <input className={'input' + (a.done ? ' is-done' : '')} value={a.text} onChange={(e) => onText(e.target.value)} placeholder="Describe a concrete action…" />
      <button className="icon-btn danger" onClick={onDelete} title="Delete action"><PIcon d={EX_TRASH} sw={1.8} /></button>
    </div>
  );
}

function OathEditorModal({ mode = 'edit', startConfirm = false, onClose }) {
  const isNew = mode === 'new';
  const [words, setWords] = React.useState(isNew ? '' : 'I will be more present with my family.');
  const [actions, setActions] = React.useState(isNew ? [{ id: 1, text: '', done: false }] : SEED_ACTIONS.map((a) => ({ ...a })));
  const [confirm, setConfirm] = React.useState(startConfirm);
  const nextId = React.useRef(100);

  const doneCount = actions.filter((a) => a.done).length;

  const patch = (id, p) => setActions((xs) => xs.map((a) => (a.id === id ? { ...a, ...p } : a)));
  const addAction = () => setActions((xs) => [...xs, { id: nextId.current++, text: '', done: false }]);
  const delAction = (id) => setActions((xs) => xs.filter((a) => a.id !== id));

  if (confirm) {
    return (
      <div className="modal glass modal-sm">
        <span className="modal-glow"></span>
        <div className="modal-head">
          <div>
            <div className="modal-eyebrow"><span className="dot"></span> Windrunner · Oath</div>
            <div className="modal-title">Release this oath?</div>
          </div>
          <button className="modal-close" onClick={() => setConfirm(false)}><PIcon d={EX_X} /></button>
        </div>
        <div className="modal-body" style={{ overflow: 'visible' }}>
          <p className="modal-sublead">Deleting an oath removes it and its {actions.length} actions for good. The reflections you wrote along the way stay in your journal.</p>
          <div className="modal-quote">{words || 'Untitled oath'}</div>
        </div>
        <div className="modal-foot">
          <div className="foot-right">
            <button className="btn btn-ghost" onClick={() => setConfirm(false)}>Keep it</button>
            <button className="btn btn-danger-solid"><PIcon d={EX_TRASH} sw={1.8} /> Delete oath</button>
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
          <div className="modal-eyebrow"><span className="dot"></span> Windrunner · Oath</div>
          <div className="modal-title">{isNew ? 'Speak a new oath' : 'Edit oath'}</div>
        </div>
        <button className="modal-close" onClick={onClose}><PIcon d={EX_X} /></button>
      </div>

      <div className="modal-body">
        <div className="field">
          <label className="field-label">The words</label>
          <textarea className="input input-oath" value={words} onChange={(e) => setWords(e.target.value)}
            placeholder="I will…" rows={2} />
        </div>

        <div className="field">
          <div className="actions-edit-head" style={{ marginBottom: 4 }}>
            <label className="field-label">Actions</label>
            <span className="section-count">{isNew ? 'How you will live it' : doneCount + ' of ' + actions.length + ' done'}</span>
          </div>
          <div className="action-edit-list">
            {actions.map((a) => (
              <ActionEditRow key={a.id} a={a}
                onToggle={() => patch(a.id, { done: !a.done })}
                onText={(t) => patch(a.id, { text: t })}
                onDelete={() => delAction(a.id)} />
            ))}
          </div>
          <button className="btn btn-ghost" style={{ marginTop: 14, alignSelf: 'flex-start' }} onClick={addAction}>
            <PIcon d={ICONS.plus} /> Add action
          </button>
        </div>
      </div>

      <div className="modal-foot">
        {!isNew && (
          <button className="btn btn-danger" onClick={() => setConfirm(true)}><PIcon d={EX_TRASH} sw={1.8} /> Delete oath</button>
        )}
        <div className="foot-right">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary"><PIcon d={ICONS.feather} /> {isNew ? 'Speak it' : 'Save oath'}</button>
        </div>
      </div>
    </div>
  );
}

function OathEditorPage({ mode = 'edit', startConfirm = false }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <OathsPage />
      <div className="scrim">
        <OathEditorModal mode={mode} startConfirm={startConfirm} />
      </div>
    </div>
  );
}

Object.assign(window, { OathEditorPage, OathEditorModal });
