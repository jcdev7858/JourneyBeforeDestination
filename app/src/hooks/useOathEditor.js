import { useState } from "react";

export function useOathEditor() {
  const [editing, setEditing] = useState(null);

  const openNew = () => {
    setEditing("new");
  };

  const openEdit = (oath) => {
    setEditing(oath);
  };

  const borrowIdeal = (idealId) => {
    setEditing({ fromIdeal: idealId });
  };

  const closeOathEditor = () => {
    setEditing(null);
  };

  return { editing, openNew, openEdit, borrowIdeal, closeOathEditor };
}
