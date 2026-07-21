import Flex from "../ui/Flex";
import Title from "../ui/Title";
import Text from "../ui/Text";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import modalStyles from "../ui/Modal.module.css";
import formStyles from "../ui/Form.module.css";
import AttachChip from "./AttachChip";
import FavoriteButton from "../FavoriteButton";
import { idealsForOrder } from "../../data/ideals";
import { promptsForOrder } from "../../data/prompts";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import { Feather, Archive, Hash, Link, BookOpen } from "lucide-react";

const SUGGESTED_THEMES = [
  "Family",
  "Growth",
  "Courage",
  "Gratitude",
  "Responsibility",
  "Presence",
  "Relationships",
];

const ATTACHMENT_TYPES = {
  theme: { icon: <Hash /> },
  oath: { icon: <Link /> },
  ideal: { icon: <Feather /> },
  prompt: { icon: <BookOpen /> },
};

const ReflectionEditor = ({ entry, closeModal, themes }) => {
  const { user, oaths, formatDate, addEntry, updateEntry, archiveEntry, resolveAttachments } =
    useAppData();
  const isNew = !entry;
  const [title, setTitle] = useState(isNew ? "" : entry.title);
  const [body, setBody] = useState(isNew ? "" : entry.body);
  const [fav, setFav] = useState(isNew ? false : entry.fav);
  const [confirm, setConfirm] = useState(false);

  const oathOptions = oaths.map((o) => ({
    type: "oath",
    label: o.title,
    id: o.id,
  }));
  const idealOptions = idealsForOrder(user.orderId).map((i) => ({
    type: "ideal",
    label: i.text,
    id: i.id,
  }));
  const promptOptions = promptsForOrder(user.orderId).map((p) => ({
    type: "prompt",
    label: p.text,
    id: p.id,
  }));
  const themeOptions = Array.from(new Set([...SUGGESTED_THEMES, ...themes])).map((t) => ({
    type: "theme",
    label: t,
    id: t,
  }));
  const [attachments, setAttachments] = useState(isNew ? [] : () => resolveAttachments(entry));

  const handleAddOption = (o) => {
    setAttachments((prev) => {
      if (prev.some((a) => a.id === o.id)) return prev;
      return [...prev, o];
    });
  };

  const handleRemoveOption = (o) => {
    setAttachments((prev) => prev.filter((a) => a.id !== o.id));
  };

  const handleSave = () => {
    const oathIds = attachments.filter((a) => a.type === "oath").map((a) => a.id);
    const idealIds = attachments.filter((a) => a.type === "ideal").map((a) => a.id);
    const promptIds = attachments.filter((a) => a.type === "prompt").map((a) => a.id);
    const themes = attachments.filter((a) => a.type === "theme").map((a) => a.id);

    isNew
      ? addEntry({
          id: crypto.randomUUID(),
          userId: user.id,
          oathIds,
          idealIds,
          promptIds,
          themes,
          title,
          body,
          fav,
          status: "published",
          createdAt: new Date().toISOString(),
        })
      : updateEntry(entry.id, { title, body, oathIds, idealIds, promptIds, themes, fav });
    closeModal();
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
                {` Journal · ${user.orderId}`}
              </div>
              <Title level={2} className={modalStyles.modalTitle}>
                Archive this entry?
              </Title>
            </Flex>
          </Flex>

          <Flex className={modalStyles.modalBody}>
            <Flex vertical gap={"var(--sp-5)"}>
              <Text className={modalStyles.modalSublead}>
                This removes the entry from your journal. Archived entries can still be viewed or
                recovered from your profile.
              </Text>
              <Flex vertical>
                <Text className={modalStyles.modalQuote}>{entry.title || "Untitled entry"}</Text>
                <Text className={modalStyles.modalQuoteBody}>
                  {`${entry.body.slice(0, 150) + "..."}` || "No thoughts were put down."}
                </Text>
              </Flex>
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
                  archiveEntry(entry.id);
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

            <Flex gap={"var(--sp-2)"} align={"center"} wrap>
              {attachments.length > 0 &&
                attachments.map((a) => (
                  <AttachChip
                    key={a.id}
                    icon={ATTACHMENT_TYPES[a.type].icon}
                    label={a.label}
                    onRemove={() => handleRemoveOption(a)}
                  />
                ))}
            </Flex>

            <Flex vertical gap={"var(--sp-5)"}>
              <Flex gap={"var(--sp-2)"} align={"center"}>
                <label className={formStyles.fieldLabel}>Add Context</label>
                <AttachChip
                  icon={<Hash />}
                  label="Themes"
                  options={themeOptions}
                  onSelect={handleAddOption}
                />
                {oathOptions.length > 0 && (
                  <AttachChip
                    icon={<Link />}
                    label="Oath"
                    options={oathOptions}
                    onSelect={handleAddOption}
                  />
                )}
                <AttachChip
                  icon={<Feather />}
                  label="Ideal"
                  options={idealOptions}
                  onSelect={handleAddOption}
                />
                <AttachChip
                  icon={<BookOpen />}
                  label="Prompt"
                  options={promptOptions}
                  onSelect={handleAddOption}
                />
              </Flex>

              <Flex className={modalStyles.modalFoot}>
                {!isNew && (
                  // TODO: make place for Archived entries to live
                  <Button
                    type="archive"
                    size="large"
                    icon={<Archive />}
                    onClick={() => {
                      setConfirm(true);
                    }}
                  >
                    Archive Entry
                  </Button>
                )}
                <Flex className={modalStyles.footRight}>
                  <FavoriteButton
                    id={isNew ? "" : entry.id}
                    fav={fav}
                    toggle={() => setFav(!fav)}
                  />
                  <Button size="large" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    icon={<Feather />}
                    onClick={() => handleSave()}
                  >
                    Save Entry
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
