import React from "react";
// import useBreakpoint, { resolveResponsive } from "../../hooks/useBreakpoint";

/**
 * Lightweight Row - flex container for Col children with responsive gutter
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │ HOW IT WORKS (study guide)                                         │
 * │                                                                     │
 * │ GUTTER creates spacing BETWEEN columns, not outside them.          │
 * │ It works via negative margins on Row + padding on each Col:        │
 * │                                                                     │
 * │   Row: marginLeft: -8px, marginRight: -8px                        │
 * │   Col: paddingLeft: 8px, paddingRight: 8px                        │
 * │                                                                     │
 * │ This is the same trick Bootstrap/AntD use. The negative margin     │
 * │ on the row cancels out the outer padding on the first/last cols,   │
 * │ so the row edges align flush with the parent container.            │
 * │                                                                     │
 * │ GUTTER FORMATS:                                                    │
 * │   gutter={16}              → 16px horizontal gap                  │
 * │   gutter={[16, 8]}         → 16px horizontal, 8px vertical        │
 * │   gutter={{ xs: 8, md: 16, lg: 24 }}  → responsive horizontal    │
 * │                                                                     │
 * │ RESPONSIVE GUTTER: The object form uses useBreakpoint() to        │
 * │   resolve the current value. Same resolution as Col: largest       │
 * │   active breakpoint with a defined value wins.                     │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 * USAGE:
 *   <Row gutter={16}>
 *     <Col xs={24} md={12}>Left</Col>
 *     <Col xs={24} md={12}>Right</Col>
 *   </Row>
 *
 *   <Row gutter={{ xs: 8, md: 16, lg: 24 }}>
 *     <Col xs={24} md={8}>A</Col>
 *     <Col xs={24} md={8}>B</Col>
 *     <Col xs={24} md={8}>C</Col>
 *   </Row>
 */

const Row = ({ gutter = 0, align, justify, wrap, style, className, children }) => {
  // const bp = useBreakpoint();

  // ==========================================================================
  // GUTTER RESOLUTION - normalize all formats to [horizontal, vertical]
  // ==========================================================================
  let gH, gV;

  if (typeof gutter === "object" && !Array.isArray(gutter)) {
    // Responsive object: { xs: 8, md: 16, lg: 24 }
    const resolved = resolveResponsive(gutter, bp) || 0;
    [gH, gV] = Array.isArray(resolved) ? resolved : [resolved, 0];
  } else {
    // Number or [horizontal, vertical] array
    [gH, gV] = Array.isArray(gutter) ? gutter : [gutter, 0];
  }

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexWrap: wrap === false ? "nowrap" : "wrap",
        // Negative margins cancel out first/last Col padding
        ...(gH && { marginLeft: -gH / 2, marginRight: -gH / 2 }),
        ...(gV && { rowGap: gV }),
        ...(align && {
          alignItems:
            align === "middle"
              ? "center"
              : align === "top"
                ? "flex-start"
                : align === "bottom"
                  ? "flex-end"
                  : align,
        }),
        ...(justify && {
          justifyContent:
            justify === "center" ? "center" : justify === "end" ? "flex-end" : justify,
        }),
        ...style,
      }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        // Inject gutter padding into Col children
        if (gH && child.props != null) {
          return React.cloneElement(child, {
            style: {
              ...child.props.style,
              paddingLeft: gH / 2,
              paddingRight: gH / 2,
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default Row;
