import React from "react";

/**
 * Lightweight Statistic - Drop-in replacement for Ant Design's <Statistic>
 *
 * Supports:
 *   title, value, suffix, valueStyle, style
 *
 * Zero dependencies.
 */

const Statistic = ({ title, value, suffix, valueStyle, style }) => (
  <div style={style}>
    {title && <div style={{ color: "#a0a0a0", fontSize: 12, marginBottom: 4 }}>{title}</div>}
    <div style={{ fontSize: 24, fontWeight: 600, color: "#e0e0e0", ...valueStyle }}>
      {value != null ? (typeof value === "number" ? value.toLocaleString() : value) : "\u2014"}
      {suffix && <span style={{ fontSize: "0.6em", marginLeft: 4, fontWeight: 400 }}>{suffix}</span>}
    </div>
  </div>
);

export default Statistic;
