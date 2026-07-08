# JBD — project structure for design handoffs

Read this before authoring a handoff. It explains how the design/preview world
relates to the real app, so handoff code ports cleanly instead of needing a
rewrite each time. (JBD = "Journey Before Destination," a Stormlight-inspired
React app: read a prompt → set an oath → take an action → reflect.)

## Two separate worlds — don't conflate them

**1. `Specs/Claude/jbd-pages-handoff/` — design reference + a standalone preview.**
- `preview.html` is a plain-browser harness: global `<script>` tags, a `jbd-styles.css` global stylesheet, `oaths.jsx` as a demo. It fonts from the Google CDN.
- **Nothing here is imported by the app.** It exists to look at and to translate from.
- Instructions like "drop this next to `oaths.jsx`" / "load it with `<script src=…>`" describe THIS world only.

**2. `app/` — the real, shipped product.** Vite + React. This is what actually runs.
- Handoffs land in world 1; they get **ported by hand** into world 2. Author world-1 code so that port is mechanical, not a rewrite (see "How to hand off portable code").

## The real app stack (author compatibly with this)

- **Vite + React 18. Function components + hooks ONLY** — no class components.
- **JavaScript + JSDoc typedefs**, not TypeScript. So **no `.tsx`/`.ts`**; use `.jsx`/`.js`. (TS is a planned later exercise.)
- **CSS Modules**, not global stylesheets:
  - One `Component.module.css` per component, imported `import styles from "./Component.module.css"`.
  - Class names are **camelCase** (`styles.rungNode`), applied as `className={styles.rungNode}`.
  - Use **native CSS nesting** (`&.modifier`, `&:hover`, descendant selectors) — matches the existing modules.
  - The handoff's global `jbd-styles.css` uses kebab-case global classes (`.rung-node`); that's fine for the preview, but the app port becomes camelCased CSS-Module classes.
- **Design tokens live in `app/src/index.css` `:root` — that file is the single source of truth.**
  - Reference everything as `var(--token)`. Don't hardcode brand hex/rgba that a token already covers.
  - The blue GLOW is the constant stormlight; the Order **accent** (`--accent*`) recolors only a short fixed list of marks. The glow must NEVER recolor per Order — so it uses `--stormlight-rgb` (a channel token for any-alpha rgba), never `--accent-rgb`.
  - **New token?** Add it to `index.css` FIRST, then propagate. Mark it in the handoff so it gets upstreamed. (This is why `--stormlight-rgb` / `--danger-rgb` exist.)
  - Legit-raw values (bright gradient highlights like `#aee0fb`, structural white/black overlays) stay literal — there's no token for them and shouldn't be.
- **The `ui/` kit is a hand-rolled, AntD-shaped clone — NOT `antd` from npm.** Import from `./ui/…`; props mimic AntD but only a documented subset is supported. Don't assume full AntD coverage or `@ant-design/icons`. Icons come from `lucide-react`.
- **Fonts are self-hosted in the app** (`app/public/fonts/*.woff2`, variable, `@font-face` in `index.css`). The preview harness still uses the Google CDN — that's a known, accepted divergence; don't "fix" the app to match the preview.

## How to hand off portable code (so it drops into `app/` without a rewrite)

- Ship engines/utilities as **ES modules** (`export function …`), NOT IIFE globals
  (`(function(global){…})(window)`). ES modules `import` straight into `app/src/utils/`.
  (The Women's-script engine came as an IIFE global for the preview and needs
  converting on the app port — avoid that shape for new deliverables.)
- **Keep third-party attribution + LICENSE with any ported code.** The app ships
  it, so licensing must travel (e.g. the Women's-script MIT header + LICENSE).
- Point destinations in **app terms**: "engine → `app/src/utils/`", "component →
  `app/src/components/`" — not "next to the preview file."

## Never ship verbatim

- `Specs/Reference/` (Hoid/Dragonsteel fan copy) is **inspiration only** — any
  shipped copy must be original.
- Contrast: the Women's-script engine IS shippable (MIT, attribution kept).
