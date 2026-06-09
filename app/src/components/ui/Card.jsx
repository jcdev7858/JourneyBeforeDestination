import React from "react";
import cardStyles from "./Card.module.css";

/**
 * Lightweight Card - Drop-in replacement for Ant Design's <Card>
 *
 * Preserves AntD's internal DOM structure + class names so GSAP
 * selectors (el.querySelector(".ant-card-head")) and terminal.css
 * overflow rules keep working unchanged.
 *
 * Supports:
 *   variant, styles, title, className, children, onClick, onMouseDown
 *
 * Zero dependencies.
 */

const KNOWN_PROPS = new Set([
  "variant",
  "styles",
  "style",
  "title",
  "className",
  "children",
  "onClick",
  "onMouseDown",
  "bodyRef",
]);

const Card = React.forwardRef((props, ref) => {
  const {
    variant,
    styles = {},
    style,
    title,
    className,
    children,
    onClick,
    onMouseDown,
    bodyRef,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Card] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support AntD-specific props. " +
          "Clean up the call site."
      );
    }
  }

  const classes = [className, cardStyles.card].filter(Boolean).join(" ");

  const rootStyle = {
    ...(variant === "borderless" && { border: "none" }),
    ...styles.root,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={rootStyle}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {title != null && (
        <div className="ant-card-head" style={styles.header}>
          <div className="ant-card-head-wrapper" style={{ flex: 1, minWidth: 0 }}>
            <div className={cardStyles.cardLabel} style={styles.title}>
              {title}
            </div>
          </div>
        </div>
      )}
      <div ref={bodyRef} className="ant-card-body" style={styles.body}>
        {children}
      </div>
    </div>
  );
});

Card.displayName = "Card";
export default Card;
