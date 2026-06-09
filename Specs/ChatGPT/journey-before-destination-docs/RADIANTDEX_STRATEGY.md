# RadiantDex Strategy
## Journey Before Destination

## Purpose

The RadiantDex gives the app its Stormlight identity.

It should attract users who love the world and characters, while the personal growth system keeps them returning.

## MVP Data Approach

Use local JSON for MVP.

Reasons:

- Faster to build.
- Easier to learn React.
- Avoids API issues.
- Lets us control spoiler-safe summaries.
- Keeps the UI independent from the data source.

## Future Data Approach

Explore Coppermind API later.

Potential API uses:

- Search pages.
- Fetch page summaries.
- Fetch parsed page content.
- Link users to full external entries.

## Important Coppermind Note

Coppermind appears to expose a MediaWiki API, but the API sandbox can return HTML help output if the request is not formatted correctly. MVP should not depend on this integration.

## MVP Character Count

Start with 10 to 20 characters.

Suggested first set:

- Kaladin
- Shallan
- Dalinar
- Adolin
- Syl
- Jasnah
- Szeth
- Navani
- Lift
- Renarin
- Teft
- Rock
- Lopen
- Moash
- Wit

## Character Schema

```js
{
  id: "kaladin",
  slug: "kaladin",
  name: "Kaladin",
  summary: "Spoiler-safe local summary.",
  orderId: "windrunner",
  books: ["way-of-kings"],
  tags: ["Bridge Four", "Surgebinder"],
  image: null,
  coppermindUrl: "https://coppermind.net/wiki/Kaladin",
  spoilerLevelBookId: "way-of-kings"
}
```

## Spoiler Strategy

MVP spoiler handling is simple by book.

If a user has not marked a book as read, content tagged to that book should be hidden or blurred.

Example:

```txt
User has read:
- The Way of Kings
- Words of Radiance

Show:
- Content marked book 1 or book 2

Hide:
- Content marked Oathbringer+
```

## Character Detail Page Sections

MVP:

- Name
- Summary
- Order
- Books appeared in
- Tags
- Favorite button
- External Coppermind link

Future:

- Quotes
- Relationships
- Timeline appearances
- Map locations
- Spoiler-safe sections by book
- Character inspiration prompts
