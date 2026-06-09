import { Modal, Button, Flex } from "../index.js";
import { Z } from "../../../utils/viewport.js";

// =============================================================================
// ConfirmModal
// Reusable confirmation dialog built on the base Modal wrapper.
// Accepts children for body content - text for confirmations, inputs for prompts.
//
// Usage:
//   <ConfirmModal open={open} onCancel={close} title="Delete?" onOk={handleDelete}>
//     <Text>Are you sure?</Text>
//   </ConfirmModal>
//
//   <ConfirmModal open={open} onCancel={close} title="Save As" okText="Create" onOk={...}>
//     <input value={name} onChange={...} />
//   </ConfirmModal>
// =============================================================================

const ConfirmModal = ({
  open,
  onCancel,
  onOk,
  title,
  children,
  okText = "OK",
  cancelText = "Cancel",
  okDanger = false,
  okDisabled = false,
  width = 320,
  zIndex = Z.CONFIRM_MODAL,
}) => (
  <Modal
    open={open}
    onCancel={onCancel}
    title={title}
    width={width}
    zIndex={zIndex}
    centered
    footer={
      <Flex justify="flex-end" gap={8}>
        <Button size="small" onClick={onCancel}>{cancelText}</Button>
        <Button
          size="small"
          type={okDanger ? "default" : "primary"}
          danger={okDanger}
          disabled={okDisabled}
          onClick={onOk}
        >
          {okText}
        </Button>
      </Flex>
    }
  >
    {children}
  </Modal>
);

export default ConfirmModal;
