import styles from "./Backlink.module.css";
import Flex from "../ui/Flex";
import { Link, Feather, BookOpen } from "lucide-react";

const Backlink = ({ type, title }) => {
  const icon = type === "oath" ? <Link /> : type === "ideal" ? <Feather /> : <BookOpen />;
  return (
    <Flex className={`${styles.backlink} ${styles[type]}`}>
      {icon}
      {title}
    </Flex>
  );
};

export default Backlink;
