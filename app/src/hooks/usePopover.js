import { useState, useEffect, useRef } from "react";

export function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) setOpen(false);
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

  return { open, setOpen, ref };
}
