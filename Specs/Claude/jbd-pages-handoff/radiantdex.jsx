/* RADIANTDEX — the identity anchor: Character → belongs to → Order → has → Ideals.
   Three screens in one router (index / order detail / character detail), plus the
   spoiler-aware treatment: gated entries are obscured via the Women's Script with an
   inline reading-progress control to reveal — DESIGNED here, not enforced (v1 of the
   real build ships un-gated; see 2026-07-21-radiantdex-data-and-page-design.md §3.2).
   → app terms: app/src/pages/RadiantDex.jsx, routes /radiantdex, /radiantdex/order/:orderId,
   /radiantdex/:slug. Data from app/src/data/{books,orders,characters,ideals}.js (ported in
   radiantdex-data.jsx for this sandbox). Gate is DERIVED from spoilerLevel vs. progress —
   never stored, per the repo's derive-don't-store convention. */

const HOME_ORDER = 'windrunner';
const LOCK_ICON = ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4'];
const POWER_ICON = ['M13 2 3 14h9l-1 8 10-12h-9l1-8z'];
const EXTERNAL_ICON = ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14 21 3'];
const BACK_ICON = ['M19 12H5', 'M12 19l-7-7 7-7'];

function isGated(char, progress) { return bookOrder(char.spoilerLevel) > progress; }
function gateBookTitle(char) { const b = BOOKS_BY_ID[char.spoilerLevel]; return b ? b.title : null; }

function ScriptText({ text, scale = 0.42 }) {
  if (typeof WomensScript === 'undefined') return <span className="gated-note"><PIcon d={LOCK_ICON} sw={1.8} /> Gated</span>;
  const html = WomensScript.toSVGString(text, { color: 'currentColor', strokeWidth: 1.4, scale });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ---------- reading-progress control: the inline affordance to set/adjust progress ---------- */
function ReadingProgress({ progress, onSet }) {
  return (
    <section className="glass rise" style={{ animationDelay: '0.05s' }}>
      <div className="card-label">Your reading progress</div>
      <div className="books clickable" role="group" aria-label="Set your reading progress">
        {BOOKS.map((b) => (
          <button key={b.id} type="button" className={'book' + (b.order <= progress ? ' read' : ' locked')} onClick={() => onSet(b.order)}>
            <span className="gemstone"></span> {b.title}
          </button>
        ))}
      </div>
      <div className="ladder-pop-note" style={{ margin: '14px 2px 0' }}>This gates which RadiantDex entries are revealed below — set it to wherever you've actually read.</div>
    </section>
  );
}

/* ---------- cards ---------- */
function OrderCard({ order, onOpen, featured }) {
  const count = charactersByOrder(order.id).length;
  if (featured) {
    return (
      <div className="glass glow-accent glow-br card-link order-card featured" style={{ '--accent': order.accent, '--accent-rgb': order.accentRgb, '--accent-deep': order.accentDeep }} onClick={() => onOpen(order.id)}>
        <Glyph order={order.id} h={170} className="glyph-corner" />
        <div className="order-card-top-row">
          <div className="order-ring order-card-ring"><Glyph order={order.id} h={34} /></div>
          <div style={{ minWidth: 0 }}>
            <div className="order-card-top">
              <div className="order-card-name">{order.name}</div>
              <span className="order-card-home">Your path</span>
            </div>
            <p className="order-card-desc">{order.description}</p>
          </div>
        </div>
        <div className="dex-meta-row">
          <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.shield} sw={1.8} /> Values</span><span className="dex-meta-value">{order.values.join(', ')}</span></div>
          <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.star} sw={1.8} /> Spren</span><span className="dex-meta-value">{order.spren}</span></div>
          <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={POWER_ICON} sw={1.8} /> Surges</span><span className="dex-meta-value">{order.surges.join(', ')}</span></div>
          <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.hash} sw={1.8} /> Exemplars</span><span className="dex-meta-value">{count} {count === 1 ? 'character' : 'characters'}</span></div>
        </div>
        <span className="card-launch">View your Order <PIcon d={ICONS.arrow} /></span>
      </div>
    );
  }
  return (
    <div className="glass card-link order-card" style={{ '--accent': order.accent, '--accent-rgb': order.accentRgb, '--accent-deep': order.accentDeep }} onClick={() => onOpen(order.id)}>
      <div className="order-card-top">
        <div className="order-ring order-card-ring"><Glyph order={order.id} h={26} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="order-card-name">{order.name}</div>
        </div>
      </div>
      <p className="order-card-desc">{order.description}</p>
      <div className="order-card-values">{order.values.map((v) => <span className="pill" key={v}>{v}</span>)}</div>
      <div className="order-card-count">{count} {count === 1 ? 'character' : 'characters'}</div>
    </div>
  );
}

function CharacterCard({ char, progress, onOpen }) {
  const order = ORDERS[char.orderId];
  const gated = isGated(char, progress);
  return (
    <div className={'glass card-link char-card' + (gated ? ' gated' : '')} style={{ '--accent': order.accent, '--accent-rgb': order.accentRgb, '--accent-deep': order.accentDeep }} onClick={() => onOpen(char.id)}>
      <div className="char-card-top">
        <div className="order-ring char-card-ring"><Glyph order={char.orderId} h={20} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {gated ? <div className="char-card-name-script"><ScriptText text={char.name} /></div> : <div className="char-card-name">{char.name}</div>}
          {!gated && <div className="char-card-role">{char.role}</div>}
        </div>
      </div>
      {gated ? (
        <div className="gated-note"><PIcon d={LOCK_ICON} sw={1.8} /> Gated · reveals after {gateBookTitle(char)}</div>
      ) : (
        <React.Fragment>
          <p className="char-card-hook">{char.exemplifies}</p>
          <div className="char-card-tags">{char.tags.slice(0, 3).map((t) => <span className="tag-sm" key={t}>{t}</span>)}</div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- index ---------- */
function RadiantDexIndex({ progress, onSetProgress, onOpenOrder, onOpenChar }) {
  const rest = ORDER_LIST.filter((id) => id !== HOME_ORDER);
  return (
    <React.Fragment>
      <div className="page-head">
        <div className="page-eyebrow"><span className="dot"></span> The ten Orders · Windrunner</div>
        <h1 className="page-title">RadiantDex</h1>
        <p className="page-lead">Who you're becoming, and who's walked the path before you. Browse the Orders, or the characters who exemplify their Ideals.</p>
      </div>

      <section className="rise" style={{ animationDelay: '0.05s' }}>
        <div className="section-head"><h2>The ten Orders</h2></div>
        <div className="dex-grid">
          <OrderCard order={ORDERS[HOME_ORDER]} onOpen={onOpenOrder} featured />
          {rest.map((id) => <OrderCard key={id} order={ORDERS[id]} onOpen={onOpenOrder} />)}
        </div>
      </section>

      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="section-head"><h2>Browse by character</h2><span className="section-count">{CHARACTERS.length} entries</span></div>
        <div className="char-grid">
          {CHARACTERS.map((c) => <CharacterCard key={c.id} char={c} progress={progress} onOpen={onOpenChar} />)}
        </div>
      </section>

      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
        <ReadingProgress progress={progress} onSet={onSetProgress} />
      </section>
    </React.Fragment>
  );
}

/* ---------- order detail ---------- */
function OrderDetail({ orderId, progress, onBack, onOpenChar }) {
  const order = ORDERS[orderId];
  const roster = charactersByOrder(orderId);
  const ideals = idealsForOrder(orderId);
  const isHome = orderId === HOME_ORDER;
  return (
    <React.Fragment>
      <button className="dex-back" onClick={onBack}><PIcon d={BACK_ICON} sw={2} /> Back to RadiantDex</button>

      <section className="glass glow-accent rise" style={{ '--accent': order.accent, '--accent-rgb': order.accentRgb, '--accent-deep': order.accentDeep, animationDelay: '0.05s' }}>
        <Glyph order={orderId} h={150} className="glyph-corner" />
        <div className="dex-hero">
          <div className="order-ring dex-hero-ring"><Glyph order={orderId} h={42} /></div>
          <div style={{ minWidth: 0 }}>
            <div className="page-eyebrow"><span className="dot"></span> {isHome ? 'Your path' : 'Order detail'}</div>
            <h1 className="page-title">{order.name}</h1>
            <p className="page-lead" style={{ marginTop: 12 }}>{order.description}</p>
            <div className="dex-meta-row">
              <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.shield} sw={1.8} /> Values</span><span className="dex-meta-value">{order.values.join(', ')}</span></div>
              <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.star} sw={1.8} /> Spren</span><span className="dex-meta-value">{order.spren}</span></div>
              <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.bell} sw={1.8} /> Herald{order.heralds.length > 1 ? 's' : ''}</span><span className="dex-meta-value">{order.heralds.join(', ')}</span></div>
              <div className="dex-meta-item"><span className="dex-meta-label"><PIcon d={POWER_ICON} sw={1.8} /> Surges</span><span className="dex-meta-value">{order.surges.join(', ')}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="section-head"><h2>The Ideals ladder</h2>{isHome && <span className="section-count">Full ladder on the Oaths page</span>}</div>
        <div className="mini-ladder">
          {ideals.map((ideal, i) => (
            <div className={'mini-rung' + (isHome ? ' home' : '')} key={ideal.id}>
              <div className="mini-rung-rail"><div className="mini-rung-dot"></div></div>
              <div>
                <div className="mini-rung-ord">{i === 0 ? 'First Ideal · shared' : ORDINAL_WORDS[i] + ' Ideal'}</div>
                <div className="mini-rung-text">{ideal.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
        <div className="section-head"><h2>Exemplars</h2><span className="section-count">{roster.length} {roster.length === 1 ? 'character' : 'characters'}</span></div>
        <div className="char-grid">
          {roster.map((c) => <CharacterCard key={c.id} char={c} progress={progress} onOpen={onOpenChar} />)}
        </div>
      </section>
    </React.Fragment>
  );
}
const ORDINAL_WORDS = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

/* ---------- character detail ---------- */
function CharacterDetail({ charId, progress, onSetProgress, onBack, onOpenOrder, onOpenChar }) {
  const char = CHARACTERS_BY_ID[charId];
  const order = ORDERS[char.orderId];
  const gated = isGated(char, progress);
  const needBook = BOOKS_BY_ID[char.spoilerLevel];
  const orderMates = charactersByOrder(char.orderId).filter((c) => c.id !== char.id);

  return (
    <React.Fragment>
      <button className="dex-back" onClick={onBack}><PIcon d={BACK_ICON} sw={2} /> Back to RadiantDex</button>

      <section className="glass glow-accent rise" style={{ '--accent': order.accent, '--accent-rgb': order.accentRgb, '--accent-deep': order.accentDeep, animationDelay: '0.05s' }}>
        <div className="dex-hero">
          <div className="dex-hero-text">
            <div className="order-ring dex-hero-ring" style={{ opacity: gated ? 0.4 : 1, filter: gated ? 'grayscale(1)' : 'none' }}><Glyph order={char.orderId} h={38} /></div>
            <div style={{ minWidth: 0 }}>
              <div className="page-eyebrow"><span className="dot"></span> RadiantDex · Character</div>
              {gated ? <h1 className="page-title"><ScriptText text={char.name} scale={0.6} /></h1> : <h1 className="page-title">{char.name}</h1>}
              {!gated && <p className="dex-hero-role">{char.role}</p>}
              {!gated && (
                <button className="dex-hero-order-link" onClick={() => onOpenOrder(char.orderId)}>
                  <OrderGlyph order={char.orderId} h={14} /> {order.name}
                </button>
              )}
              {!gated && (
                <div className="dex-meta-row">
                  <span className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.shield} sw={1.8} /> Values</span><span className="dex-meta-value">{order.values.join(', ')}</span></span>
                  <span className="dex-meta-item"><span className="dex-meta-label"><PIcon d={ICONS.book} sw={1.8} /> First appears</span><span className="dex-meta-value">{BOOKS_BY_ID[char.books[0]].title}</span></span>
                  <span className="dex-meta-item"><span className="dex-meta-label"><PIcon d={POWER_ICON} sw={1.8} /> Surges</span><span className="dex-meta-value">{order.surges.join(', ')}</span></span>
                </div>
              )}
            </div>
          </div>
          <div className={'dex-portrait' + (gated ? ' gated' : '')}>
            <Glyph order={char.orderId} h={110} style={{ opacity: 0.85 }} />
            <span className="dex-portrait-caption">Portrait — drop art here</span>
          </div>
        </div>
      </section>

      {gated ? (
        <section className="glass rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
          <div className="dex-gate">
            <div className="dex-gate-script"><ScriptText text={char.exemplifies} /></div>
            <div className="dex-gate-script"><ScriptText text={char.summary} scale={0.32} /></div>
            <div className="dex-gate-hint">
              This entry is written in the Women's script — you haven't read far enough for these words to be legible yet.
              Reveals after <strong>{needBook ? needBook.title : 'further reading'}</strong>.
            </div>
            <button className="btn btn-primary" onClick={() => onSetProgress(bookOrder(char.spoilerLevel))}>
              <PIcon d={ICONS.book} sw={1.9} /> I've read this far — reveal
            </button>
          </div>
        </section>
      ) : (
        <React.Fragment>
          <div className="dex-char-body" style={{ marginTop: 'var(--gap-card)' }}>
            <section className="glass rise" style={{ animationDelay: '0.12s' }}>
              <div className="dex-exemplifies">&ldquo;{char.exemplifies}&rdquo;</div>
              <p className="dex-summary-text">{char.summary}</p>
              <div style={{ marginTop: 26 }}>
                <a className="btn btn-secondary coppermind-link" href={'https://coppermind.net/wiki/' + char.id} target="_blank" rel="noreferrer">
                  <PIcon d={EXTERNAL_ICON} sw={1.9} /> View on Coppermind
                </a>
              </div>
            </section>

            <section className="glass rise" style={{ animationDelay: '0.16s' }}>
              <div className="dex-side-label">Appears in</div>
              <div className="char-books-row">
                {BOOKS.map((b) => <span key={b.id} className="pill" style={{ opacity: char.books.includes(b.id) ? 1 : 0.35 }}>{b.abbr}</span>)}
              </div>
              <div className="dex-side-label">Tags</div>
              <div className="char-card-tags">{char.tags.map((t) => <span className="tag-sm" key={t}>{t}</span>)}</div>
            </section>
          </div>

          {orderMates.length > 0 && (
            <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.19s' }}>
              <div className="section-head"><h2>Also walking the {order.name.replace(/s$/, '')} path</h2></div>
              <div className="char-grid">
                {orderMates.map((m) => <CharacterCard key={m.id} char={m} progress={progress} onOpen={onOpenChar} />)}
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

/* ---------- router ---------- */
function RadiantDexPage({ onNav }) {
  const [view, setView] = React.useState({ kind: 'index' });
  const [progress, setProgress] = React.useState(2); // read through Words of Radiance, matching the dashboard sample

  return (
    <PageShell active="RadiantDex" onNav={onNav}>
      <div className="dex-page">
      {view.kind === 'index' && (
        <RadiantDexIndex progress={progress} onSetProgress={setProgress}
          onOpenOrder={(id) => setView({ kind: 'order', orderId: id })}
          onOpenChar={(id) => setView({ kind: 'character', charId: id })} />
      )}
      {view.kind === 'order' && (
        <OrderDetail orderId={view.orderId} progress={progress}
          onBack={() => setView({ kind: 'index' })}
          onOpenChar={(id) => setView({ kind: 'character', charId: id })} />
      )}
      {view.kind === 'character' && (
        <CharacterDetail charId={view.charId} progress={progress} onSetProgress={setProgress}
          onBack={() => setView({ kind: 'index' })}
          onOpenOrder={(id) => setView({ kind: 'order', orderId: id })}
          onOpenChar={(id) => setView({ kind: 'character', charId: id })} />
      )}
      </div>
    </PageShell>
  );
}

Object.assign(window, { RadiantDexPage });
