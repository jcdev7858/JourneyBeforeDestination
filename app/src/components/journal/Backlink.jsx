import styles from "./Backlink.module.css";
import Flex from "../ui/Flex";
import { Link, Feather, BookOpen, Quote, Hash } from "lucide-react";

const Backlink = ({ type, label }) => {
  const icon =
    type === "oath" ? (
      <Link />
    ) : type === "ideal" ? (
      <Feather />
    ) : type === "theme" ? (
      <Hash />
    ) : type === "quote" ? (
      <Quote />
    ) : (
      <BookOpen />
    );
  return (
    <Flex className={styles.backlink}>
      {icon}
      {label}
    </Flex>
  );
};

export default Backlink;
