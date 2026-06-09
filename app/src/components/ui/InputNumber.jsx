import React, { useCallback } from "react";

/**
 * Lightweight InputNumber - Drop-in replacement for Ant Design's <InputNumber>
 *
 * Supports:
 *   Value & State:    value, onChange, disabled, readOnly
 *   Constraints:      min, max, step, required
 *   Behavior:         placeholder, autoFocus, autoComplete, form, name, id
 *   Formatting:       formatter, parser
 *   Accessibility:    tabIndex, title
 *   Events:           onFocus, onBlur, onKeyDown
 *   Styling:          style, className
 *
 * Zero dependencies.
 */

const InputNumber = ({
  // Value & State
  value,
  onChange,
  disabled,
  readOnly,
  // Constraints
  min,
  max,
  step = 1,
  required,
  // Behavior
  placeholder,
  autoFocus,
  autoComplete,
  form,
  name,
  id,
  // Formatting
  formatter,
  parser,
  // Accessibility
  tabIndex,
  title,
  // Events
  onFocus,
  onBlur,
  onKeyDown,
  // Styling
  style,
  className,
}) => {
  const handleChange = useCallback((e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-") {
      onChange?.(raw === "" ? undefined : raw);
      return;
    }
    const parsed = parser ? parser(raw) : parseFloat(raw);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min ?? -Infinity), max ?? Infinity);
      onChange?.(clamped);
    }
  }, [onChange, min, max, parser]);

  const displayValue = formatter && value != null ? formatter(value) : (value ?? "");

  return (
    <input
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      form={form}
      name={name}
      id={id}
      tabIndex={tabIndex}
      title={title}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={className}
      style={{
        background: "#1a1a2e",
        border: "1px solid #444",
        borderRadius: 6,
        color: "#e0e0e0",
        fontSize: 16, // ≥ 16px prevents iOS Safari auto-zoom on focus
        padding: "4px 8px",
        minHeight: 32,
        outline: "none",
        width: 80,
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    />
  );
};

export default InputNumber;
