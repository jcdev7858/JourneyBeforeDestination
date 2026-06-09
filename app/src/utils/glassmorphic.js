export const glassmorphic = ({
    tint = "rgba(13, 13, 18, 0.7)",
    blur = 20,
    saturation = 1.2,
    border = "1px solid rgba(255, 255, 255, 0.08)",
    shadow = "0 8px 32px rgba(0, 0, 0, 0.4)",
} = {}) => ({
    background: tint,
    backdropFilter: `blur(${blur}px) saturate(${saturation})`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation})`,
    border,
    boxShadow: shadow,
});