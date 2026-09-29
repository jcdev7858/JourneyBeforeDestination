import Popover from "../ui/Popover";
import styles from "./AttachChip.module.css";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import Button from "../ui/Button";
import { fullQuoteLabel } from "../../data/quotes";
import { X } from "lucide-react";
import { usePopover } from "../../hooks/usePopover";

const AttachChip = ({ icon, label, options, groups, onSelect, onRemove }) => {
  const { open, setOpen, ref, popRef } = usePopover();

  const content = (
    <Flex vertical>
      {options &&
        options.map((o) => (
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
      {groups &&
        groups.map((g) => (
          <div key={g.characterId}>
            <Text className={styles.popSectionLabel}>{g.characterId}</Text>
            {g.quotes.map((q) => (
              <Button
                key={q.id}
                className={styles.popItem}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect({ type: "quote", label: fullQuoteLabel(q.id), id: q.id });
                  setOpen(false);
                }}
              >
                {q.text}
              </Button>
            ))}
          </div>
        ))}
    </Flex>
  );

  if (!onRemove && !options && !groups) {
    console.error("AttachChip - No options or groups were provided");
  }

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
      {!onRemove && <Popover content={content} open={open} anchorRef={ref} ref={popRef} />}
    </div>
  );
};

export default AttachChip;
