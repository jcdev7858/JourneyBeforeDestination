import Popover from "../ui/Popover";
import styles from "./AttachChip.module.css";
import Flex from "../ui/Flex";
import Button from "../ui/Button";
import { X } from "lucide-react";
import { usePopover } from "../../hooks/usePopover";

const AttachChip = ({ icon, label, options, onSelect, onRemove }) => {
  const { open, setOpen, ref } = usePopover();

  const content = (
    <Flex vertical>
      {options?.map((o) => (
        <Button
          key={o.id}
          className={styles.popItem}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(o);
            setOpen(false);
          }}
        >
          {o.label}
        </Button>
      ))}
    </Flex>
  );

  return (
    <div
      className={`${styles[onRemove ? "linkPill" : "attachChip"]}`}
      ref={ref}
      onClick={() => setOpen((v) => !v)}
      style={{ position: "relative" }}
    >
      {icon}
      <span className={styles.linkPillLabel}>{label}</span>
      {onRemove && (
        <Button
          className={styles.linkPillX}
          icon={<X />}
          onClick={(e) => (e.stopPropagation(), onRemove())}
        ></Button>
      )}
      {!onRemove && <Popover content={content} open={open} />}
    </div>
  );
};

export default AttachChip;
