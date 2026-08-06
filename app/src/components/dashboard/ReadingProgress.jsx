import { useAppData } from "../../context/AppDataContext";
import { BOOKS } from "../../data/books";
import Card from "../ui/Card";
import Flex from "../ui/Flex";
import Text from "../ui/Text";
import BookItem from "./BookItem";

export default function ReadingProgress({ footer }) {
  const { user, setUser } = useAppData();

  return (
    <Card title="Your Reading Progress">
      <Flex gap={12} wrap>
        {BOOKS.map((b) => {
          return (
            <BookItem
              key={b.id}
              title={b.title}
              read={user.booksRead.includes(b.id)}
              onToggle={() => {
                if (!user.booksRead.includes(b.id)) {
                  setUser({ ...user, booksRead: [...user.booksRead, b.id] });
                } else {
                  setUser({
                    ...user,
                    booksRead: user.booksRead.filter((id) => id !== b.id),
                  });
                }
              }}
            />
          );
        })}
      </Flex>
      {footer && (
        <Text
          style={{
            fontSize: "12px",
            lineHeight: "1.3em",
            color: "var(--text-faint)",
            marginTop: "20px",
            display: "block",
          }}
        >
          {footer}
        </Text>
      )}
    </Card>
  );
}
