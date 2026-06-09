import React from "react";

/**
 * Lightweight Flex - Drop-in replacement for Ant Design's <Flex>
 *
 * Thin div wrapper: extracts flex-specific shorthand props,
 * passes standard HTML div attributes through to the DOM.
 *
 * Supports:
 *   align, justify, vertical, gap, wrap, style, className, children,
 *   plus any standard HTML div attributes (onClick, onMouseDown, aria-*, data-*, etc.)
 *
 * Zero dependencies.
 */

const Flex = React.forwardRef(
  ({ align, justify, vertical, gap, wrap, style, children, ...htmlProps }, ref) => {
    // Warn about non-HTML props that slipped through (likely AntD-specific)
    if (!import.meta.env.PROD) {
      const suspicious = Object.keys(htmlProps).filter(
        (k) =>
          !k.startsWith("on") &&
          !k.startsWith("data-") &&
          !k.startsWith("aria-") &&
          !["className", "id", "role", "tabIndex", "title", "hidden", "dir", "lang"].includes(k)
      );
      if (suspicious.length) {
        console.error(
          `[ui/Flex] Unexpected props: ${suspicious.join(", ")}. ` +
            "Flex passes standard HTML div attributes only. " +
            "Clean up the call site."
        );
      }
    }

    const computed = {
      display: "flex",
      ...(align && { alignItems: align }),
      ...(justify && { justifyContent: justify }),
      ...(vertical && { flexDirection: "column" }),
      ...(gap != null && { gap }),
      ...(wrap && { flexWrap: wrap === true ? "wrap" : wrap }),
      ...style,
    };
    return (
      <div ref={ref} style={computed} {...htmlProps}>
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
export default Flex;
