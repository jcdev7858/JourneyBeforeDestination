import styles from "./FavoriteButton.module.css";
import Button from "./ui/Button";
import { Star } from "lucide-react";

const FavoriteButton = ({ id, fav, toggle }) => {
  return (
    <Button
      className={`${styles.entryFav} ${fav ? styles.on : ""}`}
      icon={<Star />}
      onClick={(evt) => {
        evt.stopPropagation();
        toggle(id);
      }}
    />
  );
};

export default FavoriteButton;
