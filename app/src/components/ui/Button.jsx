import styles from "./Button.module.css";
/**
 * Lightweight Button - Drop-in replacement for Ant Design's <Button>
 *
 * Supports:
 *   Visual:           type ("primary"/"default"), size, icon, danger
 *   Value & State:    disabled
 *   Behavior:         htmlType (native "button"/"submit"/"reset"), autoFocus,
 *                     name, value, form, id
 *   Accessibility:    tabIndex, title
 *   Events:           onClick, onDoubleClick, onFocus, onBlur, onKeyDown,
 *                     onMouseEnter, onMouseLeave
 *   Styling:          style, className
 *
 * type: "primary" → cyan bg / black text, "default" → transparent / light text
 *
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "type",
  "size",
  "icon",
  "danger",
  "disabled",
  "htmlType",
  "autoFocus",
  "name",
  "value",
  "form",
  "id",
  "tabIndex",
  "title",
  "onClick",
  "onDoubleClick",
  "onFocus",
  "onBlur",
  "onKeyDown",
  "onMouseEnter",
  "onMouseLeave",
  "style",
  "className",
  "children",
]);

const Button = (props) => {
  const {
    // Visual
    type = "default",
    size = "middle",
    icon,
    danger,
    // Value & State
    disabled,
    // Behavior
    htmlType,
    autoFocus,
    name,
    value,
    form,
    id,
    // Accessibility
    tabIndex,
    title,
    // Events
    onClick,
    onDoubleClick,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    // Styling
    style,
    className,
    children,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Button] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support AntD-specific props. " +
          "Clean up the call site."
      );
    }
  }

  const isPrimary = type === "primary";
  const isGhost = type === "ghost";
  // const isSecondary = type === "secondary";
  const classes = [
    styles.btn,
    isPrimary && styles.btnPrimary,
    isGhost && styles.btnGhost,
    danger && styles.btnDanger,
    className,
  ]
    .filter(Boolean)
    .join(" "); // NOTE: className combining pattern - joining classes and filtering out falsy items
  const computed = {
    ...(disabled && { opacity: 0.4, cursor: "not-allowed" }),
    ...style,
  };

  return (
    <button
      type={htmlType}
      className={classes}
      style={computed}
      onClick={disabled ? undefined : onClick}
      onDoubleClick={onDoubleClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      autoFocus={autoFocus}
      name={name}
      value={value}
      form={form}
      id={id}
      tabIndex={tabIndex}
      title={title}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
