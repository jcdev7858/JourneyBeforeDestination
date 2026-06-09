import React from "react";

/**
 * Lightweight Title - Drop-in replacement for Ant Design's Typography.Title
 *
 * Supports:
 *   level, type, style, className, children
 *
 * level maps to heading tags: 1 → <h1>, 2 → <h2>, etc.
 *
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set(["level", "type", "style", "className", "children"]);

const TYPE_COLORS = {
  secondary: "#a0a0a0",
  success: "#52c41a",
  warning: "#faad14",
  danger: "#ff4d4f",
};

const LEVEL_STYLES = {
  1: { fontSize: 38, fontWeight: 400, marginBottom: 16 },
  2: { fontSize: 30, fontWeight: 400, marginBottom: 14 },
  3: { fontSize: 24, fontWeight: 400, marginBottom: 12 },
  4: { fontSize: 20, fontWeight: 400, marginBottom: 10 },
  5: { fontSize: 16, fontWeight: 400, marginBottom: 8 },
};

const Title = React.forwardRef((props, ref) => {
  const { level = 1, type, style, className, children } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Title] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support AntD-specific props. " +
          "Clean up the call site."
      );
    }
  }

  const Tag = `h${Math.min(Math.max(level, 1), 5)}`;

  const computed = {
    color: "#e0e0e0",
    marginTop: 0,
    lineHeight: 1.3,
    ...(LEVEL_STYLES[level] || LEVEL_STYLES[1]),
    ...(type && TYPE_COLORS[type] && { color: TYPE_COLORS[type] }),
    ...style,
  };

  return (
    <Tag ref={ref} className={className} style={computed}>
      {children}
    </Tag>
  );
});

Title.displayName = "Title";
export default Title;
