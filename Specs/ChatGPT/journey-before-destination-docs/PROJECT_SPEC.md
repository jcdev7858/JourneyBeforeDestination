# Journey Before Destination
## Project Specification v1.0

## Vision Statement

Journey Before Destination is a Stormlight-inspired personal growth and reading app that lets users choose their Radiant Order, track the books they have read, define personal oaths, break those oaths into actionable steps, journal their progress, and explore a spoiler-safe RadiantDex based on their reading progress.

## Product Summary

The app combines three core experiences:

1. Personal growth through oaths, actions, and reflection.
2. Stormlight-themed guidance through Radiant Order-based prompts.
3. RadiantDex exploration through a spoiler-aware character reference system.

The goal is not to recreate Coppermind or 17th Shard. The goal is to help Stormlight fans turn ideals into real-life action.

## MVP Decisions

- Tone: serious and reflective with light RPG flavor.
- MVP data: local JSON first.
- Future lore data: Coppermind/API later.
- User persistence: fake user profile and localStorage for v1.
- Spoilers: simple by book.
- Content: AI-assisted original content plus external sources used carefully for research, attribution, and links.

## MVP Features

### User/Profile
- Fake user profile
- Select Radiant Order manually
- Option to skip Order selection
- Track books read
- Track books to read

### Dashboard
- Today's Order-specific prompt
- Order card
- Active oath card
- Reading progress widget
- Recently viewed RadiantDex character

### Oaths
- Create oath
- Add oath actions
- Mark actions complete
- Edit/archive oath

### Journal
- Prompt-based entries
- Freeform private entries
- Optional links to prompts, oaths, and characters

### RadiantDex
- Character list
- Search/filter
- Favorite characters
- Character detail pages
- External Coppermind links
- Simple book-based spoiler filtering

## Out of Scope for MVP

- Real authentication
- Supabase/database
- XP and Ideal progression
- Achievements
- Streaks
- Advanced Radiant quiz
- Roshar map
- Character relationship graph
- AI coaching
- Social/community features
- Email reminders

## Pages

- `/`
- `/onboarding`
- `/dashboard`
- `/radiantdex`
- `/radiantdex/:characterSlug`
- `/oaths`
- `/journal`
- `/profile`

## Success Criteria

The MVP is successful if a user can:

1. Choose or skip a Radiant Order.
2. Track their reading progress.
3. Create a personal oath.
4. Add actions to that oath.
5. Respond to a prompt or create a freeform journal entry.
6. Browse characters in the RadiantDex.
7. See content filtered by books read.
