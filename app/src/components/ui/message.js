/**
 * Lightweight message - Drop-in replacement for Ant Design's message toast
 *
 * Supports:
 *   message.success({ content, duration, style })
 *   message.info({ content, duration })
 *   message.error({ content, duration })
 *   message.warning({ content, duration })
 *   message.useMessage() → [api, null]
 *
 * Imperative toast rendered via DOM. No React dependency needed.
 */

import { Z } from "../../utils/viewport.js";

const TYPE_COLORS = {
  success: { bg: "#112c11", border: "#205c20", color: "#4ade80" },
  info: { bg: "#111a2c", border: "#20395c", color: "#60a5fa" },
  error: { bg: "#2c1111", border: "#5c2020", color: "#f87171" },
  warning: { bg: "#2c2511", border: "#5c4c20", color: "#fbbf24" },
};

let container = null;

const getContainer = () => {
  if (!container) {
    container = document.createElement("div");
    container.style.cssText =
      `position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:${Z.TOAST};` +
      "display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;";
    document.body.appendChild(container);
  }
  return container;
};

const show = (opts, type) => {
  const {
    content,
    duration = 3,
    style: extraStyle = {},
  } = typeof opts === "string" ? { content: opts } : opts;
  const scheme = TYPE_COLORS[type] || TYPE_COLORS.info;

  const el = document.createElement("div");
  Object.assign(el.style, {
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    pointerEvents: "auto",
    background: scheme.bg,
    border: `1px solid ${scheme.border}`,
    color: scheme.color,
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
    transition: "opacity 0.3s",
    opacity: "0",
  });
  Object.assign(el.style, extraStyle);
  el.textContent = content;

  getContainer().appendChild(el);
  // Fade in
  requestAnimationFrame(() => {
    el.style.opacity = "1";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  }, duration * 1000);
};

const message = {
  success: (opts) => show(opts, "success"),
  info: (opts) => show(opts, "info"),
  error: (opts) => show(opts, "error"),
  warning: (opts) => show(opts, "warning"),
};

// Hook-compatible API: returns [messageApi, contextHolder]
// contextHolder is null since we use imperative DOM (no React portal needed)
message.useMessage = function useMessage() {
  return [message, null];
};

export default message;
