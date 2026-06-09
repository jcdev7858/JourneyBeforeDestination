# Data Architecture
## Journey Before Destination

## MVP Storage Strategy

Version 1 uses:

- Local JSON for static data.
- localStorage for user data.
- Fake user profile.

No real authentication or database in MVP.

## Static JSON Files

```txt
/src/data/orders.json
/src/data/books.json
/src/data/prompts.json
/src/data/characters.json
```

## localStorage Keys

```txt
jbd:user
jbd:oaths
jbd:oathActions
jbd:journalEntries
jbd:favoriteCharacters
jbd:favoritePrompts
jbd:recentlyViewedCharacters
```

## Entities

### User

```js
{
  id: "user-001",
  name: "Jeremy",
  orderId: "windrunner",
  booksRead: ["way-of-kings", "words-of-radiance"],
  booksWantToRead: ["oathbringer"],
  createdAt: "2026-06-01"
}
```

### Order

```js
{
  id: "windrunner",
  name: "Windrunner",
  description: "An Order associated with protection, leadership, and responsibility.",
  themes: ["Protection", "Leadership", "Responsibility", "Service"],
  icon: "windrunner.svg"
}
```

### Book

```js
{
  id: "way-of-kings",
  title: "The Way of Kings",
  series: "Stormlight Archive",
  order: 1
}
```

### Prompt

```js
{
  id: "windrunner-001",
  orderId: "windrunner",
  category: "Responsibility",
  text: "What responsibility are you avoiding right now?"
}
```

### Oath

```js
{
  id: "oath-001",
  userId: "user-001",
  title: "I will be more present with my family.",
  status: "active",
  createdAt: "2026-06-01",
  archivedAt: null
}
```

### OathAction

```js
{
  id: "action-001",
  oathId: "oath-001",
  title: "Phone away during dinner",
  completed: false,
  completedAt: null
}
```

### JournalEntry

```js
{
  id: "journal-001",
  userId: "user-001",
  promptId: "windrunner-001",
  oathId: "oath-001",
  characterId: null,
  title: "Today's reflection",
  body: "I need to be more present in the evenings.",
  entryType: "prompt",
  createdAt: "2026-06-01"
}
```

### Character

```js
{
  id: "kaladin",
  slug: "kaladin",
  name: "Kaladin",
  summary: "A spoiler-safe local summary.",
  orderId: "windrunner",
  books: ["way-of-kings", "words-of-radiance"],
  tags: ["Bridge Four", "Surgebinder"],
  image: null,
  coppermindUrl: "https://coppermind.net/wiki/Kaladin",
  spoilerLevelBookId: "way-of-kings"
}
```

## Relationships

```txt
User
 ├── Oaths
 │    └── OathActions
 ├── JournalEntries
 ├── FavoriteCharacters
 ├── FavoritePrompts
 └── ReadingProgress

Order
 ├── Prompts
 └── Characters

Character
 └── Books
```

## Future Database Tables

- users
- orders
- books
- reading_progress
- prompts
- oaths
- oath_actions
- journal_entries
- characters
- favorite_characters
- favorite_prompts
- xp_events
- achievements
