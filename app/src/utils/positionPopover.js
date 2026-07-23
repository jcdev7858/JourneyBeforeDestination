/**
 * Minimal "flip + shift" positioning for the Popover, in the spirit of
 * Floating UI / Popper but hand-rolled and tiny.
 *
 * Given the trigger's on-screen rectangle and the popover's measured size,
 * it returns fixed-position `top`/`left` coordinates that:
 *   - FLIP: open above the trigger if there isn't room below, else below.
 *   - SHIFT: nudge horizontally so the popover stays inside the viewport.
 *
 * Coordinates are viewport-relative, meant for `position: fixed`, so the
 * popover escapes any ancestor `overflow`/`transform` that would clip it.
 */

const GAP = 8; // space between trigger and popover
const MARGIN = 8; // min distance we keep from the viewport edge

/**
 * @param {DOMRect} triggerRect - trigger's getBoundingClientRect()
 * @param {{ width: number, height: number }} popoverSize - measured popover box
 * @param {{ align?: "start" | "end" }} [opts] - horizontal alignment to trigger
 * @returns {{ top: number, left: number, placement: "top" | "bottom" }}
 */
export function positionPopover(triggerRect, popoverSize, opts = {}) {
  const { align = "start" } = opts;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // --- FLIP: decide vertical side ---
  const roomBelow = vh - triggerRect.bottom;
  const roomAbove = triggerRect.top;
  const fitsBelow = roomBelow >= popoverSize.height + GAP + MARGIN;
  const fitsAbove = roomAbove >= popoverSize.height + GAP + MARGIN;
  // Prefer below; flip up only if it doesn't fit below but does fit above.
  const placement = !fitsBelow && fitsAbove ? "top" : "bottom";

  let top =
    placement === "bottom"
      ? triggerRect.bottom + GAP
      : triggerRect.top - popoverSize.height - GAP;

  // --- SHIFT: horizontal alignment, then clamp into the viewport ---
  let left =
    align === "end"
      ? triggerRect.right - popoverSize.width
      : triggerRect.left;

  const maxLeft = vw - popoverSize.width - MARGIN;
  left = Math.max(MARGIN, Math.min(left, maxLeft));

  // Clamp top too, so a too-tall popover never spills off either edge.
  const maxTop = vh - popoverSize.height - MARGIN;
  top = Math.max(MARGIN, Math.min(top, maxTop));

  return { top, left, placement };
}
