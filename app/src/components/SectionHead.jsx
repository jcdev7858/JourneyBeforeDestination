import Flex from "./ui/Flex";
import Title from "./ui/Title";
import Text from "./ui/Text";
import Button from "./ui/Button";
import styles from "./SectionHead.module.css";
import { Plus } from "lucide-react";

const PageHead = (props) => {
  const { title, lead, cta, primary, onClick } = props;
  return (
    <Flex className={styles.sectionHead}>
      {title && <Title level={2}>{title}</Title>}
      {lead && <Text className={styles.sectionLead}>{lead}</Text>}
      {cta && (
        <Button
          type={primary ? "primary" : "default"}
          size="large"
          icon={<Plus />}
          onClick={onClick}
        >
          {cta}
        </Button>
      )}
    </Flex>
  );
};

export default PageHead;
