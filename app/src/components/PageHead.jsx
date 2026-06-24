import Flex from "./ui/Flex";
import Title from "./ui/Title";
import Button from "./ui/Button";
import styles from "./PageHead.module.css";
import { Plus } from "lucide-react";

const PageHead = (props) => {
  const { title, cta, primary, onClick } = props;
  return (
    <Flex className={styles.pageHead}>
      <Title className={styles.pageTitle}>{title}</Title>
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
