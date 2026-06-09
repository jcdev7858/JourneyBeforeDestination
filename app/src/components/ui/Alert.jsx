import React from "react";

/**
 * Lightweight Alert - Drop-in replacement for Ant Design's <Alert>
 *
 * Supports:
 *   message, description, type, showIcon, action, icon, style
 *
 * type: "error", "warning", "success", "info"
 *
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "message", "description", "type", "showIcon", "action", "icon", "style",
]);

const colorSchemes = {
  error: { bg: "#2c1111", border: "#5c2020", color: "#f87171" },
  warning: { bg: "#2c2511", border: "#5c4c20", color: "#fbbf24" },
  success: { bg: "#112c11", border: "#205c20", color: "#4ade80" },
  info: { bg: "#111a2c", border: "#20395c", color: "#60a5fa" },
};

const defaultIcons = {
  error: "\u26D4",
  warning: "\u26A0\uFE0F",
  success: "\u2705",
  info: "\u2139\uFE0F",
};

const Alert = (props) => {
  const { message, description, type = "info", showIcon, action, icon, style } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Alert] Unknown props: ${unknown.join(", ")}. ` +
        "This component doesn't support AntD-specific props. " +
        "Clean up the call site."
      );
    }
  }

  const scheme = colorSchemes[type] || colorSchemes.info;
  const wrapperStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "12px 16px",
    borderRadius: 8,
    border: `1px solid ${scheme.border}`,
    background: scheme.bg,
    ...style,
  };

  return (
    <div style={wrapperStyle}>
      {showIcon && <span style={{ fontSize: 18, lineHeight: 1.4, flexShrink: 0 }}>{icon || defaultIcons[type]}</span>}
      <div style={{ flex: 1 }}>
        {message && <div style={{ fontWeight: 700, color: scheme.color, marginBottom: description ? 4 : 0 }}>{message}</div>}
        {description && <div style={{ color: "#c0c0c0", fontSize: 14, lineHeight: 1.6 }}>{description}</div>}
      </div>
      {action && <div style={{ flexShrink: 0 }}>{action}</div>}
    </div>
  );
};

export default Alert;
