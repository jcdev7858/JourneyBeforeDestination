import Flex from "../ui/Flex";
import Title from "../ui/Title";
import Text from "../ui/Text";
import Modal from "../ui/Modal";
import modalStyles from "../ui/Modal.module.css";
import formStyles from "../ui/Form.module.css";
import ActionEditRow from "./ActionEditRow";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import Button from "../ui/Button";
import { Plus, Feather, Archive } from "lucide-react";

const OathEditor = (props) => {
  const { oath, seedWords, closeModal } = props;
  const { user, updateOath, addOath, archiveOath } = useAppData();
  const isNew = oath === undefined;
  const makeEmptyAction = () => ({
    id: crypto.randomUUID(),
    title: "",
    completed: false,
    completedAt: null,
  });
  const [words, setWords] = useState(seedWords || oath?.title || "");
  const [actions, setActions] = useState(() => (isNew ? [makeEmptyAction()] : oath.actions));
  const [confirm, setConfirm] = useState(false);

  const toggleDraft = (id) => {
    setActions((prev) =>
      prev.map((draft) => (draft.id === id ? { ...draft, completed: !draft.completed } : draft))
    );
  };

  const renameDraft = (id, newText) => {
    setActions((prev) =>
      prev.map((draft) => (draft.id === id ? { ...draft, title: newText } : draft))
    );
  };

  const handleSave = () => {
    const realActions = actions.filter((action) => action.title.trim());
    isNew
      ? addOath({
          id: crypto.randomUUID(),
          userId: user.id,
          title: words,
          status: "active",
          archivedAt: null,
          createdAt: new Date().toISOString(),
          actions: realActions,
        })
      : updateOath(oath.id, { title: words, actions: realActions });
    closeModal();
  };

  const addDraftAction = () => {
    setActions((prev) => [...prev, makeEmptyAction()]);
  };

  const deleteDraft = (id) => {
    setActions((prev) => prev.filter((draft) => id !== draft.id));
  };

  return (
    <Modal
      open={true}
      onCancel={closeModal}
      centered
      width={"650px"}
      closable
      maskBlur
      glassmorphic
      footer={null}
      styles={{
        content: {
          maxHeight: "95vh",
          overflowY: "auto",
        },
        body: {
          padding: "30px",
        },
      }}
    >
      {confirm ? (
        <>
          <Text className={modalStyles.modalGlow}></Text>
          <Flex className={modalStyles.modalHead}>
            <Flex vertical>
              <div className={modalStyles.modalEyebrow}>
                <span className={modalStyles.dot}></span>
                {` ${user.orderId} · Oath`}
              </div>
              <Title level={2} className={modalStyles.modalTitle}>
                Archive this oath?
              </Title>
            </Flex>
          </Flex>

          <Flex className={modalStyles.modalBody}>
            <Flex vertical gap={"var(--sp-2)"}>
              <Text className={modalStyles.modalSublead}>
                Archiving sets this oath aside — it leaves your active list but you can restore it
                anytime, and the reflections you wrote along the way stay in your journal.
              </Text>
              <Flex className={modalStyles.modalQuote}>{oath.title || "Unspoken oath"}</Flex>
            </Flex>
          </Flex>

          <Flex className={modalStyles.modalFoot}>
            <Flex className={modalStyles.footRight}>
              <Button type="ghost" size="large" onClick={() => setConfirm(false)}>
                Keep It
              </Button>
              <Button
                type="archive"
                size="large"
                icon={<Archive />}
                onClick={() => {
                  archiveOath(oath.id);
                  closeModal();
                }}
              >
                Archive Oath
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Text className={modalStyles.modalGlow}></Text>
          <Flex className={modalStyles.modalHead}>
            <Flex vertical>
              <div className={modalStyles.modalEyebrow}>
                <span className={modalStyles.dot}></span>
                {` ${user.orderId} · Oath`}
              </div>
              <Title level={2} className={modalStyles.modalTitle}>
                {isNew ? "Speak a new oath" : "Edit oath"}
              </Title>
            </Flex>
          </Flex>

          <Flex className={modalStyles.modalBody}>
            <Flex vertical gap={"var(--sp-2)"}>
              <label className={formStyles.fieldLabel}>The words</label>
              <textarea
                className={`${formStyles.input} ${formStyles.inputTitle}`}
                value={words}
                onChange={(e) => setWords(e.target.value)}
                placeholder="I will…"
                rows={2}
              />
            </Flex>

            <Flex vertical gap={"var(--sp-5)"}>
              <Flex align="baseline" justify="space-between" gap={12}>
                <label className={formStyles.fieldLabel}>Actions</label>
                <Text>How you will live it</Text>
              </Flex>
              <Flex gap={10} vertical>
                {actions.map((a) => (
                  <ActionEditRow
                    title={a.title}
                    key={a.id}
                    checked={a.completed}
                    onRename={(e) => renameDraft(a.id, e.target.value)}
                    onToggle={() => toggleDraft(a.id)}
                    onTrash={() => deleteDraft(a.id)}
                  />
                ))}
              </Flex>
              <Button
                type="ghost"
                size="large"
                icon={<Plus />}
                style={{ width: "fit-content", marginTop: "14px" }}
                onClick={addDraftAction}
              >
                Add action
              </Button>

              <Flex className={modalStyles.modalFoot}>
                {!isNew && (
                  <Button
                    type="archive"
                    size="large"
                    icon={<Archive />}
                    onClick={() => {
                      setConfirm(true);
                    }}
                  >
                    Archive Oath
                  </Button>
                )}
                <Flex className={modalStyles.footRight}>
                  <Button size="large" type="ghost" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="primary" size="large" icon={<Feather />} onClick={handleSave}>
                    Speak it
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </Modal>
  );
};

export default OathEditor;
