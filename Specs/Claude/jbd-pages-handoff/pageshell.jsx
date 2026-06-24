/* Shared chrome for the non-dashboard pages (Oaths, Journal, Profile).
   Same shell as the Dashboard: the breathing stormlight aura, the top bar +
   nav, and the First-Ideal footer. `active` lights the current nav link;
   `order` sets the accent vars (defaults to Windrunner / stormlight). */

const WINDRUNNER = { name: 'Windrunner', glyph: 'windrunner', accent: '#7cc4e8', accentRgb: '124, 196, 232', accentDeep: '#4f93c4' };

function Glyph({ order = 'windrunner', h, className, style }) {
  return <OrderGlyph order={order} h={h} className={className} style={{ color: 'var(--accent)', ...style }} />;
}

function PageShell({ active = 'Dashboard', order = WINDRUNNER, scrollStyle, onNav, children }) {
  const nav = ['Dashboard', 'Oaths', 'Journal', 'RadiantDex', 'Profile'];
  return (
    <div className="jbd" style={{ '--accent': order.accent, '--accent-rgb': order.accentRgb, '--accent-deep': order.accentDeep }}>
      <div className="aura">
        <div className="orb orb-sky"></div>
        <div className="orb orb-gold"></div>
      </div>
      <div className="jbd-scroll" style={scrollStyle}>
        <header className="topbar">
          <div className="wordmark">Journey <span>Before</span> Destination</div>
          <nav className="nav">
            {nav.map((n) => <a key={n} className={n === active ? 'active' : undefined} onClick={onNav ? () => onNav(n) : undefined}>{n}</a>)}
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-oath">
            <span className="phrase">Life before death</span>
            <span className="footer-sep"></span>
            <span className="phrase">Strength before weakness</span>
            <span className="footer-sep"></span>
            <span className="phrase">Journey before destination</span>
          </div>
          <div className="footer-meta">
            <span>Private by default</span>
            <span className="footer-dot"></span>
            <a>Find support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* shared Lucide-equivalent line icons */
function PIcon({ d, sw = 2, fill = 'none', vb = '0 0 24 24' }) {
  return <svg viewBox={vb} fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d.map((p, i) => <path key={i} d={p} />)}</svg>;
}
const ICONS = {
  feather: ['M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z', 'M16 8 2 22', 'M17.5 15H9'],
  check: ['M20 6 9 17l-5-5'],
  plus: ['M5 12h14M12 5v14'],
  arrow: ['M5 12h14M13 6l6 6-6 6'],
  star: ['m12 17.3-5.6 3 1.1-6.3-4.5-4.4 6.3-.9L12 3l2.7 5.7 6.3.9-4.5 4.4 1.1 6.3z'],
  edit: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'],
  chevron: ['m9 6 6 6-6 6'],
  search: ['m21 21-4.3-4.3', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  bell: ['M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9', 'M10.3 21a1.94 1.94 0 0 0 3.4 0'],
  clock: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
  download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
};

Object.assign(window, { PageShell, Glyph, PIcon, ICONS, WINDRUNNER });
