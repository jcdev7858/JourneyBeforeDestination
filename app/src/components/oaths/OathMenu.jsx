import Flex from "../ui/Flex";
import Button from "../ui/Button";
import Popover from "../ui/Popover";
import styles from "./OathMenu.module.css";
import { usePopover } from "../../hooks/usePopover";
import { Archive, Trash, Ellipsis } from "lucide-react";

const OathMenu = ({ setArchive, setDelete }) => {
  const { open, setOpen, ref, popRef } = usePopover();
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
        type="ghost"
        onClick={() => setOpen((v) => !v)}
      ></Button>
      <Popover content={content} open={open} anchorRef={ref} align="end" ref={popRef} />
    </div>
  );
};

export default OathMenu;
