import React, { useState } from "react";
import { Z } from "../../utils/viewport.js";

/**
 * Lightweight Tooltip - Drop-in replacement for Ant Design's <Tooltip>
 *
 * Supports:
 *   title, children
 *
 * Shows a positioned tooltip on hover. Zero dependencies.
 */

const Tooltip = ({ title, children }) => {
  const [visible, setVisible] = useState(false);

  if (!title) return children;

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a1a2e",
            border: "1px solid #444",
            borderRadius: 6,
            padding: "4px 8px",
            fontSize: 12,
            color: "#e0e0e0",
            whiteSpace: "nowrap",
            zIndex: Z.TOOLTIP,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {title}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
