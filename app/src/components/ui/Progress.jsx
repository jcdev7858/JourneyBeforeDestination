import React from "react";

/**
 * Lightweight Progress - Drop-in replacement for Ant Design's <Progress>
 *
 * Supports:
 *   percent, size, strokeColor, trailColor, format, style
 *
 * Zero dependencies.
 */

const HEIGHTS = { small: 6, default: 8 };

const Progress = ({ percent = 0, size = "default", strokeColor = "#00d4ff", trailColor = "#2a2a3e", format, style }) => {
  const height = typeof size === "number" ? size : (HEIGHTS[size] || HEIGHTS.default);
  const clamped = Math.min(Math.max(percent, 0), 100);
  const label = format ? format(clamped) : `${Math.round(clamped)}%`;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, ...style }}>
      <div style={{ flex: 1, height, borderRadius: height, background: trailColor, overflow: "hidden" }}>
        <div
          style={{
            width: `${clamped}%`,
            height: "100%",
            borderRadius: height,
            background: strokeColor,
            transition: "width 0.3s",
          }}
        />
      </div>
      {label && <span style={{ color: "#a0a0a0", fontSize: 12, flexShrink: 0 }}>{label}</span>}
    </div>
  );
};

export default Progress;
