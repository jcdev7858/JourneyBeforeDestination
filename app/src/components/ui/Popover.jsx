import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { positionPopover } from "../../utils/positionPopover";

const KNOWN_PROPS = new Set([
  "title",
  "content",
  "open",
  "textAlign",
  "align",
  "anchorRef",
  "className",
  "style",
  "styles",
  "classNames",
  "children",
  "onClick",
]);

const Popover = forwardRef((props, ref) => {
  const {
    title,
    content,
    open = true,
    textAlign = "left",
    align = "start",
    anchorRef,
    className,
    style,
    styles = {},
    classNames = {},
    onClick,
  } = props;

  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Popover] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support AntD-specific props. " +
          "Clean up the call site."
      );
    }
  }

  // Local ref so we can measure the panel even if the caller passes their own.
  const localRef = useRef(null);
  const setRefs = (node) => {
    localRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const [pos, setPos] = useState(null);

  useLayoutEffect(() => {
    if (!open) return;

    const reposition = () => {
      const anchor = anchorRef?.current;
      const panel = localRef.current;
      if (!anchor || !panel) return;
      const rect = anchor.getBoundingClientRect();
      const size = { width: panel.offsetWidth, height: panel.offsetHeight };
      setPos(positionPopover(rect, size, { align }));
    };

    reposition();
    // Reposition while open: layout can shift under it (scroll/resize).
    window.addEventListener("scroll", reposition, true); // capture = catch inner scrollers
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open, align, anchorRef]);

  if (!open) return null;

  const panel = (
    <div
      ref={setRefs}
      className={`ant-popover-container ${className || ""} ${classNames.container || ""}`.trim()}
      onClick={onClick}
      style={{
        position: "fixed",
        // Until measured, render off-screen so we don't flash at (0,0).
        top: pos ? pos.top : -9999,
        left: pos ? pos.left : -9999,
        visibility: pos ? "visible" : "hidden",
        background: "rgba(18, 24, 38, 0.98)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border-strong)",
        boxShadow: "0 26px 60px -20px rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(20px)",
        padding: 6,
        textAlign,
        minWidth: "196px",
        maxWidth: "min(320px, 92vw)",
        maxHeight: "min(320px, 70vh)",
        overflowY: "auto",
        overscrollBehavior: "contain",
        zIndex: 1000,
        ...style,
        ...styles.container,
      }}
    >
      {title != null && (
        <div
          className={`ant-popover-title ${classNames.title || ""}`.trim()}
          style={{
            color: "#e0e0e0",
            fontWeight: 600,
            marginBottom: 8,
            ...styles.title,
          }}
        >
          {title}
        </div>
      )}
      {content != null && (
        <div
          className={`ant-popover-content ${classNames.content || ""}`.trim()}
          style={{
            color: "#a0a0a0",
            ...styles.content,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );

  return createPortal(panel, document.body);
});

Popover.displayName = "Popover";
export default Popover;
