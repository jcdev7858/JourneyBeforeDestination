export const glassmorphic = ({
  tint = "rgba(7, 11, 20, 0.64)",
  blur = 8,
  saturation = "110%",
  border = "1px solid rgba(255, 255, 255, 0.08)",
  shadow = "0 8px 32px rgba(0, 0, 0, 0.4)",
} = {}) => ({
  background: tint,
  backdropFilter: `blur(${blur}px) saturate(${saturation})`,
  WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
  border,
  boxShadow: shadow,
});
