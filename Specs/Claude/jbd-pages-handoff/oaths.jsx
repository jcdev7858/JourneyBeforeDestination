/* OATHS — the page where a Radiant tends their vows.
   Signature net-new component: the Ideals ladder (the Five Ideals as a
   vertical progression, sworn rungs lit with stormlight, the current rung
   wearing the Order accent). Below it, personal oaths as stacked oath-cards
   with their own progress and a peek at the next actions. */

function ProgressBar({ done, total }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div>
      <div className="progress-row"><span>Progress</span><span>{done} of {total} actions</span></div>
      <div className="progress-track"><div className="progress-fill infused" style={{ width: pct + '%' }}><span className="bead"></span></div></div>
    </div>
  );
}

function ActionPeek({ done = [], todo = [] }) {
  return (
    <div className="action-peek">
      {done.map((a) => <div className="action done" key={a}><span className="check done infused"><PIcon d={ICONS.check} sw={3} /></span><span>{a}</span></div>)}
      {todo.map((a) => <div className="action" key={a}><span className="check"></span><span>{a}</span></div>)}
    </div>
  );
}

const IDEALS = [
  { ord: 'First Ideal', state: 'sworn', tag: 'Shared', words: 'Life before death. Strength before weakness. Journey before destination.', note: 'The Immortal Words — spoken by every Radiant who begins the path.' },
  { ord: 'Second Ideal', state: 'sworn', words: 'I will protect those who cannot protect themselves.', note: 'Sworn four months ago.' },
  { ord: 'Third Ideal', state: 'current', tag: 'Speaking now', words: 'I will protect even those I dislike, so long as it is right.', note: 'Living into the words — 3 of 5 actions answered.' },
  { ord: 'Fourth Ideal', state: 'unspoken', words: 'The words have not yet come to you.', note: null },
  { ord: 'Fifth Ideal', state: 'unspoken', words: 'Unknown.', note: null },
];

function IdealLadder() {
  return (
    <div className="ladder">
      {IDEALS.map((it, i) => (
        <div className={'rung ' + it.state} key={it.ord}>
          <div className="rung-rail">
            <div className={'rung-line top ' + (i === 0 ? '' : '')}></div>
            <div className="rung-node"></div>
            <div className={'rung-line ' + (it.state === 'sworn' || (it.state === 'current') ? 'lit' : '')} style={{ visibility: i === IDEALS.length - 1 ? 'hidden' : 'visible' }}></div>
          </div>
          <div className="rung-body">
            <div className="rung-ordinal">{it.ord}{it.tag && <span className="tag">{it.tag}</span>}</div>
            <div className="rung-words">{it.words}</div>
            {it.note && <div className="rung-note">{it.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function OathsPage({ empty, onNav }) {
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
        <IdealLadder />
      </section>

      {/* personal oaths */}
      <section className="rise" style={{ marginTop: 'var(--gap-card)', animationDelay: '0.12s' }}>
        <div className="section-head">
          <h2>Personal oaths</h2>
          <button className="btn btn-ghost"><PIcon d={ICONS.plus} /> Write an oath</button>
        </div>

        <div className="glass oath-card">
          <div className="oath-top">
            <div className="oath-words">I will be more present with my family.</div>
            <span className="oath-status active"><span className="seal"></span> Active</span>
          </div>
          <ProgressBar done={3} total={5} />
          <ActionPeek done={['Put my phone away during dinner', 'Planned a daddy-daughter date this month']} todo={['Spend one hour outside this week']} />
          <div className="oath-foot">
            <span className="meta">Begun 6 weeks ago · 2 more actions</span>
            <button className="btn btn-ghost"><PIcon d={ICONS.arrow} /> Open</button>
          </div>
        </div>

        <div className="glass oath-card">
          <div className="oath-top">
            <div className="oath-words">I will speak up when something is wrong, even when silence is easier.</div>
            <span className="oath-status active"><span className="seal"></span> Active</span>
          </div>
          <ProgressBar done={1} total={4} />
          <ActionPeek done={['Named the problem in the meeting instead of after it']} todo={['Tell one person the thing I keep softening']} />
          <div className="oath-foot">
            <span className="meta">Begun 9 days ago · 3 more actions</span>
            <button className="btn btn-ghost"><PIcon d={ICONS.arrow} /> Open</button>
          </div>
        </div>
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
    </PageShell>
  );
}

Object.assign(window, { OathsPage });
