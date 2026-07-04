import React from "react";
// import useBreakpoint, { BP_ORDER } from "../../hooks/useBreakpoint";

/**
 * Lightweight Col - responsive 24-column grid unit
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ HOW IT WORKS (study guide)                                         │
 * │                                                                     │
 * │ BASE SYSTEM: 24 columns = 100% width (same as AntD/Bootstrap).    │
 * │   span={6}  → 6/24 = 25%   (quarter width)                       │
 * │   span={12} → 12/24 = 50%  (half width)                          │
 * │   span={24} → 24/24 = 100% (full width)                          │
 * │                                                                     │
 * │ RESPONSIVE: xs/sm/md/lg/xl/xxl props override span at breakpoints. │
 * │   The LARGEST active breakpoint wins.                              │
 * │                                                                     │
 * │   <Col xs={24} md={12} xl={8}>                                    │
 * │     Phone (< 768px):   xs=24 → full width (stacked)              │
 * │     Tablet (768-1199):  md=12 → half width (2 columns)           │
 * │     Desktop (1200+):    xl=8  → third width (3 columns)          │
 * │                                                                     │
 * │ RESOLUTION ORDER: xxl → xl → lg → md → sm → xs → span → flex:1   │
 * │   Walk from largest to smallest. First breakpoint that's BOTH:    │
 * │     1. Active (viewport >= its min-width), AND                    │
 * │     2. Has a value defined in props                               │
 * │   ...wins. If nothing matches, falls back to `span`. If no span, │
 * │   the Col takes flex:1 (fills remaining space).                   │
 * │                                                                     │
 * │ IMPLEMENTATION: Uses useBreakpoint() hook which subscribes to     │
 * │   matchMedia. Only re-renders when an actual breakpoint boundary  │
 * │   is crossed (e.g., viewport crosses 768px), not on every pixel.  │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * USAGE:
 *   <Row gutter={16}>
 *     <Col span={6}>Always 25%</Col>
 *     <Col xs={24} md={12} lg={6}>Responsive</Col>
 *     <Col>Fills remaining space</Col>
 *   </Row>
 */

const Col = ({ span, xs, sm, md, lg, xl, xxl, style, className, children }) => {
  // const bp = useBreakpoint();

  // Walk breakpoints largest → smallest.
  // First one that's both active AND has a value = our span.
  const responsive = { xs, sm, md, lg, xl, xxl };
  let activeSpan = span;

  for (const key of BP_ORDER) {
    if (bp[key] && responsive[key] != null) {
      activeSpan = responsive[key];
      break;
    }
  }

  // span=0 is valid - it hides the column (0% width)
  const pct = activeSpan != null ? `${(activeSpan / 24) * 100}%` : null;

  return (
    <div
      className={className}
      style={{
        // span defined → fixed fraction of 24-column grid
        ...(pct && { flex: `0 0 ${pct}`, maxWidth: pct }),
        // No span → flex:1 (fill remaining space)
        ...(!pct && { flex: 1 }),
        boxSizing: "border-box",
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Col;
