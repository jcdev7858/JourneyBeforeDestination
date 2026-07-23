import styles from "./SearchBar.module.css";
import Flex from "./ui/Flex";
import Button from "./ui/Button";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = ({ toggleFilters, setSearch }) => {
  return (
    <Flex className={styles.searchBar}>
      <Search />
      <input
        type="text"
        placeholder="Search your reflections..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <Button
        className={styles.searchTune}
        icon={<SlidersHorizontal />}
        onClick={toggleFilters}
        type="secondary"
      ></Button>
    </Flex>
  );
};

export default SearchBar;
