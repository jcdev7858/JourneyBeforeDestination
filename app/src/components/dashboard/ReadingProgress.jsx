import Card from "../ui/Card";
import Flex from "../ui/Flex";
import BookItem from "./BookItem";

export default function ReadingProgress() {
  return (
    <Card title="Reading Progress">
      <Flex gap={12} wrap>
        <BookItem>The Way of Kings</BookItem>
        <BookItem>Words of Radiance</BookItem>
        <BookItem>Oathbriger</BookItem>
        <BookItem>Rhythm of War</BookItem>
        <BookItem>Wind and Truth</BookItem>
      </Flex>
    </Card>
  );
}
