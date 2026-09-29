import { Popover } from "../ui";
import { usePopover } from "../../hooks/usePopover";
import Flex from "../ui/Flex";
import styles from "./LadderPopover.module.css";

const LadderPopover = ({ label, children }) => {
  const { open, setOpen, ref, popRef } = usePopover();

  // what gets rendered inside the popup itself
  const content = <Flex vertical>{children && children({ close: () => setOpen(false) })}</Flex>;

  // the interactive part, the button that toggles the popover
  return (
    <div className={styles.lsOrders} ref={ref} style={{ position: "relative" }}>
      {label({ open, toggle: () => setOpen((v) => !v) })}
      <Popover content={content} open={open} anchorRef={ref} ref={popRef} />
    </div>
  );
};

export default LadderPopover;
