import React, { useState, useRef, useEffect, useCallback } from "react";
// import { Z } from "../../utils/viewport.js";

/**
 * Lightweight Select - Drop-in replacement for Ant Design's <Select>
 *
 * Supports:
 *   Value & State:    value, onChange, options, disabled
 *   Behavior:         placeholder, name, id
 *   Accessibility:    tabIndex, title
 *   Events:           onFocus, onBlur
 *   Styling:          style, className
 *
 * options shape: [{ value, label }]
 *
 * Custom dropdown rendered in a portal-free absolute div.
 * Closes on outside click and Escape. Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "value",
  "onChange",
  "options",
  "disabled",
  "placeholder",
  "name",
  "id",
  "tabIndex",
  "title",
  "onFocus",
  "onBlur",
  "style",
  "className",
  "children",
]);

const Select = (props) => {
  const {
    // Value & State
    value,
    onChange,
    options = [],
    disabled,
    // Behavior
    placeholder = "Select...",
    name,
    id,
    // Accessibility
    tabIndex,
    title,
    // Events
    onFocus,
    onBlur,
    // Styling
    style,
    className,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Select] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support AntD-specific props. " +
          "Clean up the call site."
      );
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // ========================================================================
  // OUTSIDE CLICK & ESCAPE
  // ========================================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  const handleToggle = useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  const handleSelect = useCallback(
    (optionValue) => {
      onChange?.(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      tabIndex={tabIndex}
      title={title}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        position: "relative",
        display: "inline-block",
        ...style,
      }}
    >
      {/* Trigger */}
      <div
        onClick={handleToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "4px 10px",
          minHeight: 32,
          background: "#1a1a2e",
          border: "1px solid",
          borderColor: isOpen ? "#00d4ff" : "#444",
          borderRadius: 6,
          color: selectedOption ? "#e0e0e0" : "#666",
          fontSize: 16, // ≥ 16px prevents iOS Safari auto-zoom on focus
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.4 : 1,
          transition: "border-color 0.15s",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayLabel}
        </span>
        {/* Chevron */}
        <span
          style={{
            fontSize: 10,
            flexShrink: 0,
            transition: "transform 0.15s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          &#9660;
        </span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: Z.SELECT_DROPDOWN,
            background: "#1a1a2e",
            border: "1px solid #444",
            borderRadius: 6,
            padding: "4px 0",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: "6px 12px",
                fontSize: 13,
                cursor: "pointer",
                color: option.value === value ? "#00d4ff" : "#e0e0e0",
                background: option.value === value ? "rgba(0, 212, 255, 0.08)" : "transparent",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => {
                if (option.value !== value)
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  option.value === value ? "rgba(0, 212, 255, 0.08)" : "transparent";
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
