import Flex from "./ui/Flex";
import Text from "./ui/Text";
import Pill from "./Pill";
import styles from "./FilterBar.module.css";

const FilterBar = ({ data, label, setFilter, activeValue }) => {
  return (
    <Flex wrap gap={9}>
      {label && <Text className={styles.themeLead}>{label}</Text>}
      <Pill clickable active={activeValue === "All"} onClick={() => setFilter("All")}>
        All
      </Pill>
      {data.map((e) => (
        <Pill clickable active={activeValue === e} onClick={() => setFilter(e)} key={e}>
          {e}
        </Pill>
      ))}
    </Flex>
  );
};

export default FilterBar;
