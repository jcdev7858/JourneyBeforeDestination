import { GLYPHS } from "../data/orderGlyphs";
import styles from "./OrderGlyph.module.css";

const ORDER_VARIANTS = { watermark: styles.glyphWatermark, corner: styles.glyphCorner };

export default function OrderGlyph({ order, h, className, style, variant }) {
  const g = GLYPHS[order] || GLYPHS.roshar;
  const parts = g.viewBox.split(" ").map(Number);
  const ratio = parts[2] / parts[3];
  const sized = h ? { width: h * ratio, height: h } : {};
  const classes = [className, ORDER_VARIANTS[variant]].filter(Boolean).join(" ");

  return (
    <svg
      viewBox={g.viewBox}
      className={classes}
      style={{ color: "var(--accent)", ...sized, ...style }}
      fill="currentColor"
    >
      {g.paths.map((d, i) => (
        <path d={d} key={i}></path>
      ))}
    </svg>
  );
}
