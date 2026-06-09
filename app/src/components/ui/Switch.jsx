import React from "react";

/**
 * Lightweight Switch - Drop-in replacement for Ant Design's <Switch>
 *
 * Supports:
 *   Value & State:    checked, onChange, disabled
 *   Behavior:         size, autoFocus, name, id, form
 *   Accessibility:    tabIndex, title, aria-label, aria-describedby
 *   Events:           onFocus, onBlur
 *   Styling:          style, className
 *
 * Zero dependencies.
 */

const SIZES = {
  small: { width: 28, height: 16, knob: 12, travel: 12 },
  default: { width: 44, height: 22, knob: 18, travel: 22 },
};

const Switch = ({
  // Value & State
  checked = false,
  onChange,
  disabled,
  // Behavior
  size,
  autoFocus,
  name,
  id,
  form,
  // Accessibility
  tabIndex,
  title,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  // Events
  onFocus,
  onBlur,
  // Styling
  style,
  className,
}) => {
  const s = size === "small" ? SIZES.small : SIZES.default;

  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      onClick={() => !disabled && onChange?.(!checked)}
      disabled={disabled}
      autoFocus={autoFocus}
      name={name}
      id={id}
      form={form}
      tabIndex={tabIndex}
      title={title}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: s.width,
        height: s.height,
        borderRadius: s.height,
        border: "none",
        background: checked ? "#00d4ff" : "#444",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background 0.2s",
        padding: 0,
        flexShrink: 0,
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: (s.height - s.knob) / 2,
          left: checked ? s.travel : 2,
          width: s.knob,
          height: s.knob,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
};

export default Switch;
