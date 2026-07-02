import { useEffect } from "react";
import ReactDOM from "react-dom";
import modalStyles from "./Modal.module.css";
import { glassmorphic as gm } from "../../utils/glassmorphic.js";
import Button from "./Button.jsx";
import { X } from "lucide-react";

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
          "Clean up the call site."
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
    background: "rgba(7, 11, 20, 0.64)",
    ...(maskBlur && {
      backdropFilter: "blur(4px) saturate(110%)",
      WebkitBackdropFilter: "blur(4px) saturate(110%)",
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
    borderRadius: "var(--radius)",
    position: "relative",
    boxShadow: "inset 0 1px 0 var(--rim), 0 50px 110px -28px rgba(0, 0, 0, 0.9)",
    ...(glassmorphic &&
      gm({
        tint: "rgba(7, 11, 20, 0.64)",
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
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#modal-noise)" />
    </svg>
  ) : null;

  const bodyStyle = {
    padding: "clamp(12px, 4vw, 30px)",
    ...styles.body,
  };

  return ReactDOM.createPortal(
    <>
      <div style={maskStyle} onClick={maskClosable ? onCancel : undefined} />
      <div style={wrapStyle} onClick={maskClosable ? onCancel : undefined}>
        <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
          {noiseOverlay}
          {closable && (
            <Button
              onClick={onCancel}
              className={modalStyles.modalClose}
              style={{
                position: "absolute",
                top: 30,
                right: 30,
                fontSize: "24px",
                zIndex: 1,
              }}
              icon={<X />}
            ></Button>
          )}
          {title != null && (
            <div
              style={{
                padding: "16px 24px 0",
                fontWeight: 600,
                fontSize: 16,
                color: "var(--text-muted)",
                position: "relative",
              }}
            >
              {title}
            </div>
          )}
          <div style={{ ...bodyStyle, position: "relative" }}>{children}</div>
          {footer != null && (
            <div style={{ padding: "0 24px 16px", position: "relative" }}>{footer}</div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;
