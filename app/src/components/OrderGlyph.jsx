import { GLYPHS } from "../data/orderGlyphs";
import styles from "./OrderGlyph.module.css";

const ORDER_VARIANTS = {
  watermark: styles.glyphWatermark,
  corner: styles.glyphCorner,
  block: styles.glyphBlock,
};

export default function OrderGlyph({ order, h, className, style, variant }) {
  const g = GLYPHS[order] || GLYPHS.roshar;
  const parts = g.viewBox.split(" ").map(Number);
  const ratio = parts[2] / parts[3];
  const sized = h ? { width: h * ratio, height: h } : {};
  const classes = [className, ORDER_VARIANTS[variant]].filter(Boolean).join(" ");

  // Noise grain only reads well on the faint, low-opacity placements; on the
  // full-color block glyph it's too harsh, so leave that one clean.
  const noise = variant === "watermark" || variant === "corner";

  // Unique ids per instance so multiple glyphs on a page don't collide.
  const clipId = `glyph-clip-${order}`;
  const noiseId = `glyph-noise-${order}`;

  return (
    <svg
      viewBox={g.viewBox}
      className={classes}
      style={{ color: "var(--accent)", ...sized, ...style }}
      fill="currentColor"
    >
      {noise && (
        <defs>
          {/* The glyph shape, reused as a clip so noise only lands on the paths. */}
          <clipPath id={clipId}>
            {g.paths.map((d, i) => (
              <path d={d} key={i}></path>
            ))}
          </clipPath>
          {/* Generate noise, then keep only the part that overlaps the source
            graphic (the clipped fill). 'in' compositing avoids relying on
            mix-blend-mode, which browsers ignore on inner SVG elements. */}
          <filter id={noiseId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0"
              result="grain"
            />
            <feComposite in="grain" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      )}

      {/* Base glyph — solid currentColor fill, inherits the variant opacity. */}
      {g.paths.map((d, i) => (
        <path d={d} key={i}></path>
      ))}

      {/* A copy of the fill, run through the noise filter and clipped to the
          glyph so darkened grain speckles sit on top of the solid color */}
      {noise && (
        <g clipPath={`url(#${clipId})`} filter={`url(#${noiseId})`}>
          {g.paths.map((d, i) => (
            <path d={d} key={i}></path>
          ))}
        </g>
      )}
    </svg>
  );
}
