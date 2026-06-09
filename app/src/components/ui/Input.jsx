/**
 * Lightweight Input - Drop-in replacement for Ant Design's <Input>
 *
 * Supports:
 *   Value & State:    value, defaultValue, disabled, readOnly
 *   Constraints:      maxLength, minLength, pattern, required
 *   Behavior:         type, placeholder, autoFocus, autoComplete, autoCapitalize,
 *                     inputMode, enterKeyHint, spellCheck, form, name, id
 *   Accessibility:    tabIndex, title, aria-hidden, aria-label, aria-describedby, role
 *   Events:           onChange, onFocus, onBlur, onKeyDown, onKeyUp, onInput, onPaste
 *   Ref:              ref (React 19 - regular prop, attaches to native <input>)
 *   Styling:          style, className, variant ("default" | "unstyled")
 *
 * Variants:
 *   "default"  - standard visible input with dark theme styles
 *   "unstyled" - no visual styles, consumer has full control via style prop
 *
 * Zero dependencies.
 */

const DEFAULT_STYLE = {
  background: "#1a1a2e",
  border: "1px solid #444",
  borderRadius: 6,
  color: "#e0e0e0",
  fontSize: 16, // ≥ 16px prevents iOS Safari auto-zoom on focus
  padding: "4px 12px",
  minHeight: 32,
  outline: "none",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
};

const Input = ({
  // Ref
  ref,
  // Value & State
  value,
  defaultValue,
  disabled,
  readOnly,
  // Constraints
  maxLength,
  minLength,
  pattern,
  required,
  // Behavior
  type = "text",
  placeholder,
  autoFocus,
  autoComplete,
  autoCapitalize,
  inputMode,
  enterKeyHint,
  spellCheck,
  form,
  name,
  id,
  // Accessibility
  tabIndex,
  title,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  role,
  // Events
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onInput,
  onPaste,
  // Styling
  variant = "default",
  style,
  className,
}) => (
  <input
    ref={ref}
    type={type}
    value={value}
    defaultValue={defaultValue}
    disabled={disabled}
    readOnly={readOnly}
    maxLength={maxLength}
    minLength={minLength}
    pattern={pattern}
    required={required}
    placeholder={placeholder}
    autoFocus={autoFocus}
    autoComplete={autoComplete}
    autoCapitalize={autoCapitalize}
    inputMode={inputMode}
    enterKeyHint={enterKeyHint}
    spellCheck={spellCheck}
    form={form}
    name={name}
    id={id}
    tabIndex={tabIndex}
    title={title}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    aria-describedby={ariaDescribedBy}
    role={role}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onInput={onInput}
    onPaste={onPaste}
    className={className}
    style={{
      ...(variant === "default" ? DEFAULT_STYLE : null),
      ...style,
    }}
  />
);

export default Input;
