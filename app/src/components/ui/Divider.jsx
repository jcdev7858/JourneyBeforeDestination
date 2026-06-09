import React from "react";

/**
 * Lightweight Divider - Drop-in replacement for Ant Design's <Divider>
 *
 * Supports:
 *   type, style, className
 *
 * type: "horizontal" (default) or "vertical"
 *
 * Zero dependencies.
 */

const Divider = ({ type = "horizontal", style, className }) => {
  if (type === "vertical") {
    return (
      <span
        className={className}
        style={{
          display: "inline-block",
          width: 1,
          height: "0.9em",
          background: "#444",
          verticalAlign: "middle",
          margin: "0 8px",
          ...style,
        }}
      />
    );
  }

  return (
    <hr
      className={className}
      style={{
        border: "none",
        borderTop: "1px solid #2a2a3e",
        margin: "16px 0",
        ...style,
      }}
    />
  );
};

export default Divider;
