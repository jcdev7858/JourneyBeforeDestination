import { useState, useEffect, useRef } from "react";

export function usePopover() {
  const [open, setOpen] = useState(false);
  // ref  -> the trigger wrapper (anchor we position against)
  // popRef -> the popover panel itself (may be portaled out of the wrapper)
  const ref = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      const inTrigger = ref.current?.contains(e.target);
      const inPopover = popRef.current?.contains(e.target);
      if (!inTrigger && !inPopover) setOpen(false);
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKey, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKey, true);
    };
  }, [open]);

  return { open, setOpen, ref, popRef };
}
