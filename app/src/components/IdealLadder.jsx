import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import Flex from "../components/ui/Flex";
import { useAppData } from "../context/AppDataContext";
import { useState } from "react";
import { Check, Feather } from "lucide-react";
import OathEditor from "../components/OathEditor";
import styles from "./IdealLadder.module.css";

const IDEALS = [
  {
    ord: "First Ideal",
    state: "sworn",
    tag: "Shared",
    words: "Life before death. Strength before weakness. Journey before destination.",
    note: "The Immortal Words — spoken by every Radiant who begins the path.",
  },
  {
    ord: "Second Ideal",
    state: "sworn",
    words: "I will protect those who cannot protect themselves.",
    note: "Sworn four months ago.",
  },
  {
    ord: "Third Ideal",
    state: "current",
    borrowed: true,
    words: "I will protect even those I dislike, so long as it is right.",
    note: "Living into the words — 3 of 5 actions answered.",
  },
  {
    ord: "Fourth Ideal",
    state: "unspoken",
    words: "The words have not yet come to you.",
    note: null,
  },
  { ord: "Fifth Ideal", state: "unspoken", words: "Unknown.", note: null },
];

const IdealLadder = () => {
  return (
    <Card className={styles.ladder}>
      <Flex className={styles.oathTop}>
        <Title level={3} className={styles.oathText}>
          The Five Ideals
        </Title>
      </Flex>
    </Card>
  );
};
export default IdealLadder;
