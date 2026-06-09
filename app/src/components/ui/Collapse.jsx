import React, { useState, useRef, useLayoutEffect, useCallback } from "react";

/**
 * Lightweight Collapse - Drop-in replacement for Ant Design's <Collapse>
 *
 * Supports:
 *   items, defaultActiveKey, ghost, size, style, disabled
 *
 * items shape: [{ key, label, children }]
 *
 * Animated expand/collapse via measured height transitions.
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "items", "defaultActiveKey", "ghost", "size", "style", "disabled", "children",
]);

const SIZES = {
  small: { headerPadding: "4px 8px", fontSize: 12, contentPadding: "4px 8px 8px" },
  middle: { headerPadding: "8px 12px", fontSize: 13, contentPadding: "8px 12px 12px" },
  large: { headerPadding: "12px 16px", fontSize: 14, contentPadding: "12px 16px 16px" },
};

// ==========================================================================
// PANEL (individual collapsible section)
// ==========================================================================

const Panel = ({ label, children, isOpen, onToggle, ghost, sizing }) => {
  const contentRef = useRef(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  // Measure content height whenever children change or panel opens
  useLayoutEffect(() => {
    if (contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [children, isOpen]);

  return (
    <div
      style={{
        borderBottom: ghost ? "none" : "1px solid #2a2a3e",
      }}
    >
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: sizing.headerPadding,
          fontSize: sizing.fontSize,
          cursor: "pointer",
          userSelect: "none",
          color: "#e0e0e0",
          background: "transparent",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        {/* Chevron */}
        <span
          style={{
            display: "inline-block",
            fontSize: 10,
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          &#9654;
        </span>
        {/* Label (can be string or JSX) */}
        <span style={{ flex: 1 }}>{label}</span>
      </div>

      {/* Content (animated) */}
      <div
        style={{
          overflow: "hidden",
          transition: "height 0.2s ease",
          height: isOpen ? measuredHeight : 0,
        }}
      >
        <div ref={contentRef} style={{ padding: sizing.contentPadding }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ==========================================================================
// COLLAPSE
// ==========================================================================

const Collapse = (props) => {
  const {
    items = [],
    defaultActiveKey = [],
    ghost = false,
    size = "middle",
    style,
    disabled,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Collapse] Unknown props: ${unknown.join(", ")}. ` +
        "This component doesn't support AntD-specific props. " +
        "Clean up the call site."
      );
    }
  }

  const [activeKeys, setActiveKeys] = useState(
    () => new Set(defaultActiveKey),
  );

  const sizing = SIZES[size] || SIZES.middle;

  const toggle = useCallback((key) => {
    if (disabled) return;
    setActiveKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, [disabled]);

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div
      style={{
        border: ghost ? "none" : "1px solid #2a2a3e",
        borderRadius: ghost ? 0 : 6,
        overflow: "hidden",
        opacity: disabled ? 0.4 : 1,
        ...style,
      }}
    >
      {items.map((item) => (
        <Panel
          key={item.key}
          label={item.label}
          isOpen={activeKeys.has(item.key)}
          onToggle={() => toggle(item.key)}
          ghost={ghost}
          sizing={sizing}
        >
          {item.children}
        </Panel>
      ))}
    </div>
  );
};

export default Collapse;
