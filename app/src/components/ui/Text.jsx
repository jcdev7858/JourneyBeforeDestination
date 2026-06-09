import React from "react";

/**
 * Lightweight Text - Drop-in replacement for Ant Design's Typography.Text
 *
 * Supports:
 *   strong, type, code, style, className, children
 *
 * type values: "secondary", "success", "warning", "danger"
 *
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "strong", "type", "code", "style", "className", "children",
]);

const TYPE_COLORS = {
  secondary: "#a0a0a0",
  success: "#52c41a",
  warning: "#faad14",
  danger: "#ff4d4f",
};

const codeStyle = {
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontSize: "0.9em",
  background: "rgba(255, 255, 255, 0.06)",
  border: "1px solid #333",
  borderRadius: 4,
  padding: "1px 6px",
};

const Text = React.forwardRef((props, ref) => {
  const { strong, type, code, style, className, children } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Text] Unknown props: ${unknown.join(", ")}. ` +
        "This component doesn't support AntD-specific props. " +
        "Clean up the call site."
      );
    }
  }

  const computed = {
    ...(strong && { fontWeight: 700 }),
    ...(type && TYPE_COLORS[type] && { color: TYPE_COLORS[type] }),
    ...(code && codeStyle),
    ...style,
  };

  return (
    <span ref={ref} className={className} style={computed}>
      {children}
    </span>
  );
});

Text.displayName = "Text";
export default Text;
