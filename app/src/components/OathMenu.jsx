import Flex from "./ui/Flex";
import Button from "./ui/Button";
import Popover from "./ui/Popover";
import styles from "./OathMenu.module.css";
import { useState, useEffect, useRef } from "react";
import { Archive, Trash, Ellipsis } from "lucide-react";

const OathMenu = (props) => {
  const { setArchive, setDelete } = props;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (!ref.current.contains(e.target)) setOpen(false);
    };

    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const content = (
    <Flex vertical>
      {setArchive && (
        <Button className={styles.oathMenuItem} icon={<Archive />} onClick={setArchive}>
          Archive (set aside)
        </Button>
      )}
      {setDelete && (
        <Button
          className={`${styles.oathMenuItem} ${styles.danger}`}
          icon={<Trash />}
          onClick={setDelete}
        >
          Delete oath
        </Button>
      )}
    </Flex>
  );

  return (
    <div ref={ref} className={styles.oathMenu}>
      <Button
        className={styles.oathMenuTrigger}
        icon={<Ellipsis />}
        onClick={() => setOpen((v) => !v)}
      ></Button>
      <Popover content={content} open={open} />
    </div>
  );
};

export default OathMenu;
