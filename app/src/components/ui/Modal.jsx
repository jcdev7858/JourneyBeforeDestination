import { useEffect } from "react";
import ReactDOM from "react-dom";
import { glassmorphic as gm } from "../../utils/glassmorphic.js";

/**
 * Lightweight Modal - Drop-in replacement for Ant Design's <Modal>
 *
 * Supports:
 *   open, onCancel, footer, centered, width, closable, maskClosable,
 *   title, styles, zIndex, children, maskBlur, glassmorphic
 *
 * Uses ReactDOM.createPortal into document.body.
 * No animation, no scroll lock, no focus trap (add via GSAP if needed).
 *
 * Backdrop options:
 *   maskBlur   - blurs the backdrop behind the mask (like AntD's mask={{ blur: true }})
 *   glassmorphic - frosted glass effect on the content panel itself
 *                  (semi-transparent bg + backdrop-filter blur + noise texture)
 *
 * Zero dependencies (besides react-dom).
 */

const KNOWN_PROPS = new Set([
  "open",
  "onCancel",
  "footer",
  "centered",
  "width",
  "closable",
  "maskClosable",
  "title",
  "styles",
  "zIndex",
  "children",
  "maskBlur",
  "glassmorphic",
]);

const Modal = (props) => {
  const {
    open,
    onCancel,
    footer,
    centered,
    width = 520,
    closable = true,
    maskClosable = true,
    title,
    styles = {},
    zIndex = 999,
    children,
    maskBlur = false,
    glassmorphic = true,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Modal] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support AntD-specific props. " +
          "Clean up the call site.",
      );
    }
  }

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel?.(); // TODO: lookup the meaning of the ?.() syntax
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onCancel]);

  if (!open) return null;

  const maskStyle = {
    position: "fixed",
    inset: 0,
    zIndex,
    background: "rgba(0, 0, 0, 0.45)",
    ...(maskBlur && {
      backdropFilter: "blur(4px)",
      WebkitBackdropFilter: "blur(4px)",
    }),
    ...styles.mask,
  };

  const wrapStyle = {
    position: "fixed",
    inset: 0,
    zIndex: zIndex + 1,
    display: "flex",
    justifyContent: "center",
    alignItems: centered ? "center" : "flex-start",
    paddingTop: centered ? 0 : "min(100px, 10vh)",
  };

  const contentStyle = {
    width,
    maxWidth: "90vw",
    background: "#1a1a2e",
    borderRadius: 8,
    position: "relative",
    ...(glassmorphic &&
      gm({
        tint: "rgba(13, 13, 18, 0.7)",
        blur: 10,
        saturation: 1.75,
      })),
    ...styles.content,
  };

  // SVG noise texture for glassmorphic frosted grain
  const noiseOverlay = glassmorphic ? (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        borderRadius: "inherit",
        pointerEvents: "none",
        opacity: 0.24,
        mixBlendMode: "overlay",
      }}
    >
      <filter id="modal-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#modal-noise)" />
    </svg>
  ) : null;

  const bodyStyle = {
    padding: "clamp(12px, 4vw, 24px)",
    ...styles.body,
  };

  return ReactDOM.createPortal(
    <>
      <div style={maskStyle} onClick={maskClosable ? onCancel : undefined} />
      <div style={wrapStyle} onClick={maskClosable ? onCancel : undefined}>
        <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
          {noiseOverlay}
          {closable && (
            <span
              onClick={onCancel}
              style={{
                position: "absolute",
                top: 12,
                right: 16,
                cursor: "pointer",
                color: "#a0a0a0",
                fontSize: 18,
                lineHeight: 1,
                zIndex: 1,
              }}
            >
              &times;
            </span>
          )}
          {title != null && (
            <div
              style={{
                padding: "16px 24px 0",
                fontWeight: 600,
                fontSize: 16,
                color: "#e0e0e0",
                position: "relative",
              }}
            >
              {title}
            </div>
          )}
          <div style={{ ...bodyStyle, position: "relative" }}>{children}</div>
          {footer != null && (
            <div style={{ padding: "0 24px 16px", position: "relative" }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
