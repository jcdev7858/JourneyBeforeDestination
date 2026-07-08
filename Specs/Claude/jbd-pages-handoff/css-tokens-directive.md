# Handoff: CSS tokens directive — one `:root`, variables everywhere

This applies to the **whole** `jbd-styles.css` (both the v2 base and the
page-component layer), not to any single feature. Companion to
`ideal-ladder-redesign.md`.

## The problem

`jbd-styles.css` defines a full token `:root`, but its **page-component layer
bypasses those tokens** with hardcoded literals — **34+ raw
`rgba(124, 196, 232, …)`**, plus literal `#7cc4e8`, `#4f93c4`, `#e58b80`,
`#d8b878`, `#e9e5d7`. The handoff `:root` has also **drifted behind the real app**:
missing `--danger` / `--danger-soft`, `--pad-hero` is `40px` vs the app's `45px`,
missing `--maxw` / `--section-gap`, and gold is un-retired.

## Do two things

### 1. Adopt the app's `:root` as the source of truth

Replace the handoff's `:root` with this canonical block (from `app/src/index.css`),
verbatim:

```css
:root {
  --bg: #0b0f1c;
  --bg-elevated: #141a2c;

  --border: rgba(124, 196, 232, 0.1);
  --border-strong: rgba(124, 196, 232, 0.22);
  --rim: rgba(255, 255, 255, 0.07);

  --stormlight: #7cc4e8;
  --stormlight-deep: #4f93c4;
  --stormlight-soft: rgba(124, 196, 232, 0.14);
  --radiant-gold: #d8b878; /* RETIRED — reference only, do not use for progress */
  --radiant-gold-soft: rgba(216, 184, 120, 0.13);
  --danger: #e58b80;
  --danger-soft: rgba(229, 139, 128, 0.5);

  /* Order accent — overridden per Order on the layout root. Default Windrunner. */
  --accent: #7cc4e8;
  --accent-rgb: 124, 196, 232;
  --accent-deep: #4f93c4;
  --accent-soft: rgba(var(--accent-rgb), 0.14);

  --text: #e9e5d7;
  --text-muted: #8b95ad;
  --text-faint: #5b647d;

  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-body: "Hanken Grotesk", system-ui, sans-serif;

  /* type scale ---------------------------------------------------------- */
  --fs-display: 40px;
  --lh-display: 1.16; /* hero prompt (serif) */
  --fs-title: 30px;
  --lh-title: 1.2; /* page / Order name (serif) */
  --fs-heading: 24px;
  --lh-heading: 1.3; /* oath, section head (serif) */
  --fs-quote: 20px;
  --lh-quote: 1.35; /* callout, pull-quote (serif) */
  --fs-body-lg: 15px; /* lead body (sans) */
  --fs-body: 14px; /* default body (sans) */
  --fs-body-sm: 13px; /* secondary / muted (sans) */
  --fs-overline: 11.5px; /* uppercase labels + eyebrows */

  /* spacing ------------------------------------------------------------- */
  --sp-1: 4px;
  --sp-2: 8px;
  --sp-3: 12px;
  --sp-4: 16px;
  --sp-5: 20px;
  --sp-6: 24px;
  --pad-card: 30px; /* inner padding — regular cards */
  --pad-hero: 45px; /* inner padding — hero cards */
  --gap-card: 30px; /* space between cards, everywhere */
  --page-x: 40px;
  --page-y: 30px;

  /* app-level layout (NOT from the handoff artboard — the real-app shell) */
  --maxw: 980px; /* centered content width */
  --section-gap: 30px; /* TODO: collapse into --gap-card when Layout is reconciled */

  /* motion -------------------------------------------------------------- */
  --ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
  --dur-rise: 0.55s; /* entrance */
  --dur-ui: 0.18s; /* hover / focus transitions */

  --radius: 16px;
  --radius-sm: 10px;

  color: var(--text);
  background: var(--bg);
}
```

### 2. Use these variables *everywhere* — replace every hardcoded literal with its token

Sweep the whole stylesheet and swap raw values for `var(--…)`:

- `#7cc4e8` and `rgba(124, 196, 232, α)` → `var(--stormlight)`, or `var(--stormlight-soft)`
  / `var(--border)` / `var(--border-strong)` at their existing alphas. If the mark is an
  **Order-accented** element (eyebrow, current/accented rung, primary button, active nav,
  toggle, selected chip, card glow), use `var(--accent)` / `var(--accent-soft)` /
  `rgba(var(--accent-rgb), α)` instead so it recolors per Order.
- `#4f93c4` → `var(--stormlight-deep)` (or `var(--accent-deep)` on accented marks).
- `#e58b80` → `var(--danger)`; its faded uses → `var(--danger-soft)`.
- `#d8b878` → `var(--radiant-gold)` **only** for reference/retired uses — never for
  progress or as an accent.
- `#e9e5d7` / `#8b95ad` / `#5b647d` → `var(--text)` / `var(--text-muted)` / `var(--text-faint)`.
- Spacing/padding literals that match a token (`4/8/12/16/20/24px`, `30px`, `40px`,
  `45px`) → the matching `--sp-*` / `--pad-*` / `--gap-*` / `--page-*` token.

## Keep the accent discipline

The blue GLOW is constant (`--stormlight` family — rails, gems, checks, cadence,
progress); `--accent` recolors only the interactive marks it's already allowed to
touch. Tokenizing must **not** change which elements are accent-colored — it's a
literal-to-variable swap, not a restyle.