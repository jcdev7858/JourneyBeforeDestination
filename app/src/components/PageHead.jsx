import Flex from "./ui/Flex";
import Title from "./ui/Title";
import Text from "./ui/Text";
import Button from "./ui/Button";
import styles from "./PageHead.module.css";
import { Plus } from "lucide-react";

const PageHead = (props) => {
  const { title, eyebrow, lead, cta, primary, onClick } = props;
  return (
    <Flex className={styles.pageHead}>
      <Flex vertical>
        {eyebrow && (
          <Flex className={styles.pageEyebrow}>
            <Text className={styles.dot}></Text>
            {`${eyebrow} · Windrunner`}
            {/* TODO: Wire in actual user.order to keep it dynamic */}
          </Flex>
        )}
        <Title level={2} className={styles.pageTitle}>
          {title}
        </Title>
        {lead && <Text className={styles.pageLead}>{lead}</Text>}
      </Flex>
      {cta && (
        <Button
          type={primary ? "primary" : "default"}
          size="large"
          icon={primary && <Plus />}
          onClick={onClick}
        >
          {cta}
        </Button>
      )}
    </Flex>
  );
};

export default PageHead;
