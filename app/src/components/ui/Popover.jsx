import { forwardRef } from "react";

const KNOWN_PROPS = new Set([
  "title",
  "content",
  "open",
  "textAlign",
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

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`ant-popover ${className || ""}`.trim()}
      style={style}
      onClick={onClick}
    >
      <div
        className={`ant-popover-container ${classNames.container || ""}`.trim()}
        style={{
          background: "rgba(13, 13, 18, 0.96)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 12px 34px -14px rgba(0, 0, 0, 0.85)",
          padding: 6,
          textAlign,
          minWidth: "196px",
          bottom: "calc(100% + 8px)",
          right: 0,
          position: "absolute",
          zIndex: 20,
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
    </div>
  );
});

Popover.displayName = "Popover";
export default Popover;
