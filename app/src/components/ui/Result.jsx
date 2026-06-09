import React from "react";

/**
 * Lightweight Result - Drop-in replacement for Ant Design's <Result>
 *
 * Big centered status page layout for error pages, empty states, success confirmations.
 *
 * Supports:
 *   status, title, subTitle, icon, extra, style
 *
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "status", "title", "subTitle", "icon", "extra", "style", "children",
]);

const STATUS_COLORS = {
  success: "#52c41a",
  error: "#ff4d4f",
  warning: "#faad14",
  info: "#00d4ff",
  403: "#ff4d4f",
  404: "#faad14",
  500: "#ff4d4f",
};

const Result = (props) => {
  const {
    status = "info",
    title,
    subTitle,
    icon,
    extra,
    style,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Result] Unknown props: ${unknown.join(", ")}. ` +
        "This component doesn't support AntD-specific props. " +
        "Clean up the call site."
      );
    }
  }

  const accentColor = STATUS_COLORS[status] || STATUS_COLORS.info;

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "48px 24px",
        ...style,
      }}
    >
      {/* Icon */}
      {icon && (
        <div
          style={{
            fontSize: 64,
            lineHeight: 1,
            color: accentColor,
            marginBottom: 24,
          }}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      {title && (
        <h2
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#e0e0e0",
            margin: "0 0 8px",
          }}
        >
          {title}
        </h2>
      )}

      {/* Subtitle */}
      {subTitle && (
        <p
          style={{
            fontSize: 14,
            color: "#888",
            margin: "0 0 24px",
            maxWidth: 480,
          }}
        >
          {subTitle}
        </p>
      )}

      {/* Extra (actions, details, etc.) */}
      {extra && (
        <div style={{ marginTop: 8 }}>
          {extra}
        </div>
      )}
    </div>
  );
};

export default Result;
