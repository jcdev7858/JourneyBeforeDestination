import { useState } from "react";

export function useReflection() {
  const [reflecting, setReflecting] = useState(null);
  const [attached, setAttached] = useState([]);
  const startReflection = (attachment) => {
    setReflecting("new");
    setAttached(attachment ? [attachment] : []);
  };
  const openEntry = (entry) => {
    setReflecting(entry);
    setAttached([]);
  };
  const closeReflection = () => (setReflecting(null), setAttached([]));

  return { reflecting, attached, openEntry, startReflection, closeReflection };
}
