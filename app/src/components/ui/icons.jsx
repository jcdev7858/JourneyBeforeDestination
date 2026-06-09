import React from "react";

/**
 * Lightweight SVG Icons - Drop-in replacements for @ant-design/icons
 *
 * Each icon is a function component rendering an inline SVG at 1em.
 * Accepts: style, className
 *
 * Zero dependencies.
 */

const Icon = ({ children, style, className }) => (
  <span
    role="img"
    className={className}
    style={{
      display: "inline-flex",
      alignItems: "center",
      lineHeight: 0,
      ...style,
    }}
  >
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </span>
);

export const ReloadOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </Icon>
);

export const SaveOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </Icon>
);

export const EyeOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const EyeInvisibleOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </Icon>
);

export const ExclamationCircleOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </Icon>
);

export const HomeOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);

export const BugOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <rect x="8" y="6" width="8" height="14" rx="4" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="8" y1="2" x2="12" y2="6" />
    <line x1="16" y1="2" x2="12" y2="6" />
    <line x1="4" y1="10" x2="8" y2="10" />
    <line x1="16" y1="10" x2="20" y2="10" />
    <line x1="4" y1="15" x2="8" y2="15" />
    <line x1="16" y1="15" x2="20" y2="15" />
  </Icon>
);

export const ZoomInOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </Icon>
);

export const ZoomOutOutlined = ({ style, className } = {}) => (
  <Icon style={style} className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </Icon>
);
