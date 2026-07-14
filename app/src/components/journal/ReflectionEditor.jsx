import Flex from "../ui/Flex";
import Title from "../ui/Title";
import Text from "../ui/Text";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import styles from "./ReflectionEditor.module.css";
import modalStyles from "../ui/Modal.module.css";
import formStyles from "../ui/Form.module.css";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import { Plus, Feather, Archive } from "lucide-react";

const ReflectionEditor = ({ entry, closeModal }) => {
  const { user, formatDate } = useAppData();
  const isNew = !entry;
  const [title, setTitle] = useState(isNew ? "" : entry.title);
  const [body, setBody] = useState(isNew ? "" : entry.body);
  const [confirm, setConfirm] = useState(false);
  // const hasCtx = themes.length || oaths.length || ideals.length || prompt;

  // const toggleDraft = (id) => {
  //   setActions((prev) =>
  //     prev.map((draft) => (draft.id === id ? { ...draft, completed: !draft.completed } : draft))
  //   );
  // };

  // const renameDraft = (id, newText) => {
  //   setActions((prev) =>
  //     prev.map((draft) => (draft.id === id ? { ...draft, title: newText } : draft))
  //   );
  // };

  // const handleSave = () => {
  //   isNew
  //     ? addOath({
  //         id: crypto.randomUUID(),
  //         userId: user.id,
  //         title: words,
  //         status: "active",
  //         archivedAt: null,
  //         createdAt: new Date().toISOString(),
  //         actions: actions,
  //       })
  //     : updateOath(oath.id, { title: words, actions });
  //   closeModal();
  // };

  // const addDraftAction = () => {
  //   setActions((prev) => [...prev, makeEmptyAction()]);
  // };

  // const deleteDraft = (id) => {
  //   setActions((prev) => prev.filter((draft) => id !== draft.id));
  // };

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
            <Flex vertical gap={"var(--sp-5)"}>
              <Text className={modalStyles.modalSublead}>
                {`Archiving sets this oath aside — it leaves your active list but you can restore it anytime, and the reflections you wrote along the way stay in your journal.`}
              </Text>
              <Flex className={modalStyles.modalQuote}>{entry.title || "Unspoken oath"}</Flex>
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
                  // archiveOath(entry.id);
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
                {isNew ? ` ${user.orderId} · Oath` : ` Edit Entry · ${formatDate(entry.createdAt)}`}
              </div>
              <Title level={2} className={modalStyles.modalTitle}>
                Whatever's on your mind
              </Title>
            </Flex>
          </Flex>

          <Flex className={modalStyles.modalBody}>
            <Flex vertical gap={"var(--sp-5)"}>
              <input
                className={`${formStyles.input} ${formStyles.inputTitle}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title — optional"
              />
              <textarea
                className={formStyles.textarea}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing. A journal entry doesn't need a prompt or an oath — attach one only if it fits. No one sees this but you."
                rows={5}
              />
            </Flex>

            <Flex vertical gap={"var(--sp-5)"}>
              <Flex gap={"var(--sp-2)"}>
                <label className={formStyles.fieldLabel}>Add Context</label>
              </Flex>

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
                  <Button size="large" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="primary" size="large" icon={<Feather />}>
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

export default ReflectionEditor;
