import React, { useRef, useCallback, useState, useEffect } from "react";

/**
 * Lightweight ColorPicker - Drop-in replacement for Ant Design's <ColorPicker>
 *
 * Supports:
 *   Value & State:    value, onChange, disabled
 *   Visual:           showText, size
 *   Identity:         id, className
 *   Accessibility:    tabIndex, title
 *   Styling:          style
 *
 * onChange signature: (colorObj, hexString) => void
 *   - Matches AntD's (color, hex) pattern so call sites don't change.
 *   - colorObj is kept minimal: { toHexString() }
 *
 * Uses native <input type="color"> under the hood for the actual picker.
 * Zero dependencies.
 */

const SWATCH_SIZES = {
  small: 24,
  middle: 32,
  large: 40,
};

const FONT_SIZES = {
  small: 12,
  middle: 13,
  large: 14,
};

/** Normalize shorthand/mixed-case hex to 6-digit lowercase */
const normalizeHex = (hex) => {
  if (!hex) return "#000000";
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  return `#${h.toLowerCase()}`;
};

const KNOWN_PROPS = new Set([
  "value", "onChange", "disabled",
  "showText", "size",
  "id", "className",
  "tabIndex", "title",
  "style", "children",
]);

const ColorPicker = (props) => {
  const {
    // Value & State
    value = "#000000",
    onChange,
    disabled,
    // Visual
    showText = false,
    size = "middle",
    // Identity
    id,
    className,
    // Accessibility
    tabIndex,
    title,
    // Styling
    style,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/ColorPicker] Unknown props: ${unknown.join(", ")}. ` +
        "This component doesn't support AntD-specific props. " +
        "Clean up the call site."
      );
    }
  }
  const inputRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(normalizeHex(value));

  // Sync external value changes
  useEffect(() => {
    setDisplayValue(normalizeHex(value));
  }, [value]);

  const handleChange = useCallback((e) => {
    const hex = e.target.value;
    setDisplayValue(hex);
    // Match AntD's onChange(color, hexString) signature
    onChange?.({ toHexString: () => hex }, hex);
  }, [onChange]);

  const handleSwatchClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const swatchSize = SWATCH_SIZES[size] || SWATCH_SIZES.middle;
  const fontSize = FONT_SIZES[size] || FONT_SIZES.middle;

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
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        ...style,
      }}
      onClick={handleSwatchClick}
    >
      {/* Color swatch */}
      <div
        style={{
          width: swatchSize,
          height: swatchSize,
          borderRadius: 6,
          border: "1px solid #444",
          background: displayValue,
          flexShrink: 0,
          transition: "background 0.15s",
        }}
      />

      {/* Hex label */}
      {showText && (
        <span
          style={{
            color: "#e0e0e0",
            fontSize,
            fontFamily: "monospace",
            userSelect: "all",
          }}
        >
          {displayValue}
        </span>
      )}

      {/* Hidden native picker */}
      <input
        ref={inputRef}
        type="color"
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          padding: 0,
          border: "none",
          opacity: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
      />
    </div>
  );
};

export default ColorPicker;
