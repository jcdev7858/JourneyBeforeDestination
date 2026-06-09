import React, { useRef, useCallback } from "react";

/**
 * Lightweight Slider - Drop-in replacement for Ant Design's <Slider>
 *
 * Supports:
 *   Value & State:    value, onChange, onDragStart, onChangeComplete, min, max, step, disabled
 *   Visual:           marks
 *   Identity:         id, className
 *   Accessibility:    tabIndex, title
 *   Styling:          style, styles ({ track, rail, handle, mark, markLabel })
 *
 * Zero dependencies. Pure mouse/touch math against a ref'd rail.
 */

const RAIL_HEIGHT = 4;
const HANDLE_SIZE = 14;

const defaultStyles = {
  rail: { background: "#2a2a3e" },
  track: { background: "#00d4ff" },
  handle: { background: "#00d4ff", borderColor: "#00d4ff" },
  mark: { background: "#555" },
  markLabel: { color: "#888", fontSize: 11 },
};

// ==========================================================================
// VALUE HELPERS
// ==========================================================================

/** Clamp + snap to step */
const quantize = (raw, min, max, step) => {
  const clamped = Math.min(Math.max(raw, min), max);
  if (!step) return clamped;
  const stepped = Math.round((clamped - min) / step) * step + min;
  // Avoid floating point drift (e.g. 0.1 + 0.2)
  const decimals = (step.toString().split(".")[1] || "").length;
  return parseFloat(stepped.toFixed(decimals));
};

/** Convert a pixel offset on the rail to a value */
const pxToValue = (px, railWidth, min, max, step) => {
  const ratio = Math.min(Math.max(px / railWidth, 0), 1);
  const raw = min + ratio * (max - min);
  return quantize(raw, min, max, step);
};

// ==========================================================================
// COMPONENT
// ==========================================================================

const KNOWN_PROPS = new Set([
  "min", "max", "step", "value", "onChange", "onDragStart", "onChangeComplete",
  "marks", "disabled",
  "id", "className",
  "tabIndex", "title",
  "style", "styles", "children",
]);

const Slider = (props) => {
  const {
    // Value & State
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    onDragStart,
    onChangeComplete,
    disabled,
    // Visual
    marks,
    // Identity
    id,
    className,
    // Accessibility
    tabIndex,
    title,
    // Styling
    style,
    styles: styleOverrides = {},
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Slider] Unknown props: ${unknown.join(", ")}. ` +
        "This component doesn't support AntD-specific props. " +
        "Clean up the call site."
      );
    }
  }
  const railRef = useRef(null);

  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100;

  // Merge default sub-element styles with overrides
  const s = {
    rail: { ...defaultStyles.rail, ...styleOverrides.rail },
    track: { ...defaultStyles.track, ...styleOverrides.track },
    handle: { ...defaultStyles.handle, ...styleOverrides.handle },
    mark: { ...defaultStyles.mark, ...styleOverrides.mark },
    markLabel: { ...defaultStyles.markLabel, ...styleOverrides.markLabel },
  };

  // ========================================================================
  // DRAG LOGIC
  // ========================================================================

  const getValueFromEvent = useCallback((clientX) => {
    const rail = railRef.current;
    if (!rail) return value;
    const rect = rail.getBoundingClientRect();
    return pxToValue(clientX - rect.left, rect.width, min, max, step);
  }, [min, max, step, value]);

  const startDrag = useCallback((startClientX) => {
    if (disabled) return;
    onDragStart?.(getValueFromEvent(startClientX));
    // Fire immediately for the click position
    onChange?.(getValueFromEvent(startClientX));

    const onMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      onChange?.(getValueFromEvent(clientX));
    };

    const onUp = (e) => {
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      onChangeComplete?.(getValueFromEvent(clientX));
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onUp);
  }, [disabled, onChange, onDragStart, onChangeComplete, getValueFromEvent]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    startDrag(e.clientX);
  }, [startDrag]);

  const handleTouchStart = useCallback((e) => {
    startDrag(e.touches[0].clientX);
  }, [startDrag]);

  // ========================================================================
  // MARKS
  // ========================================================================

  const markEntries = marks ? Object.entries(marks).map(([k, label]) => ({
    val: parseFloat(k),
    label,
    pct: max === min ? 0 : ((parseFloat(k) - min) / (max - min)) * 100,
  })) : [];

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div
      id={id}
      className={className}
      tabIndex={tabIndex}
      title={title}
      style={{
        position: "relative",
        width: "100%",
        height: marks ? 32 : 20,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        userSelect: "none",
        touchAction: "none", // Prevent page scroll while dragging
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Rail (full background track) */}
      <div
        ref={railRef}
        style={{
          position: "absolute",
          top: (20 - RAIL_HEIGHT) / 2,
          left: 0,
          right: 0,
          height: RAIL_HEIGHT,
          borderRadius: RAIL_HEIGHT / 2,
          ...s.rail,
        }}
      />

      {/* Track (filled portion) */}
      <div
        style={{
          position: "absolute",
          top: (20 - RAIL_HEIGHT) / 2,
          left: 0,
          width: `${percent}%`,
          height: RAIL_HEIGHT,
          borderRadius: RAIL_HEIGHT / 2,
          ...s.track,
        }}
      />

      {/* Handle */}
      <div
        style={{
          position: "absolute",
          top: (20 - HANDLE_SIZE) / 2,
          left: `${percent}%`,
          width: HANDLE_SIZE,
          height: HANDLE_SIZE,
          borderRadius: "50%",
          border: "2px solid",
          transform: "translateX(-50%)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.15s",
          ...s.handle,
        }}
      />

      {/* Marks */}
      {markEntries.map(({ val, label, pct }) => (
        <React.Fragment key={val}>
          {/* Tick dot */}
          <div
            style={{
              position: "absolute",
              top: (20 - 6) / 2,
              left: `${pct}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              transform: "translateX(-50%)",
              ...s.mark,
            }}
          />
          {/* Label */}
          <div
            style={{
              position: "absolute",
              top: 22,
              left: `${pct}%`,
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              ...s.markLabel,
            }}
          >
            {label}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
