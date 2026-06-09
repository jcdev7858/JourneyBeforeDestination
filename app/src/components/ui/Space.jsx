import React from "react";

/**
 * Lightweight Space - Drop-in replacement for Ant Design's <Space>
 *
 * Supports:
 *   size, wrap, direction, style, className, children
 *
 * Space.Compact groups children with collapsed borders.
 *
 * Zero dependencies.
 */

const SIZE_MAP = { small: 8, middle: 16, large: 24 };

const Space = ({ size = "small", wrap, direction, style, className, children }) => {
  const gap = typeof size === "number" ? size : (SIZE_MAP[size] || 8);
  const isVertical = direction === "vertical";

  const computed = {
    display: "inline-flex",
    flexDirection: isVertical ? "column" : "row",
    alignItems: isVertical ? "stretch" : "center",
    gap,
    ...(wrap && { flexWrap: "wrap" }),
    ...style,
  };

  return <div className={className} style={computed}>{children}</div>;
};

Space.Compact = ({ style, className, children }) => (
  <div className={className} style={{ display: "inline-flex", ...style }}>
    {children}
  </div>
);

export default Space;
