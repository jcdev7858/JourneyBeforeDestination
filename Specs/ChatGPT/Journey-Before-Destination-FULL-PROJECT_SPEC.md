# Journey Before Destination
## Project Specification v1.0

---

# Overview

**Journey Before Destination** is a Stormlight Archive-inspired personal growth and reading companion application.

The application combines three core experiences:

1. Personal Development through oath tracking, reflection, and journaling.
2. Stormlight-Themed Guidance through Radiant Order-based prompts and challenges.
3. RadiantDex Exploration through a spoiler-aware character encyclopedia and Cosmere reading tracker.

The goal is not to recreate Coppermind or 17th Shard.

The goal is to help users take the ideals and themes from Stormlight Archive and apply them to their own lives while providing a companion experience for reading and exploring the Cosmere.

---

# Vision Statement

Journey Before Destination is a Stormlight-inspired personal growth and reading app that lets users choose their Radiant Order, track the books they've read, define personal oaths, break those oaths into actionable steps, journal their progress, and explore a spoiler-safe RadiantDex based on their reading progress.

---

# Target Audience

## Primary Audience

Stormlight Archive readers who:
- Have read enough of the series to understand the deeper themes
- Connect with concepts such as the Ideals, personal growth, responsibility, truth, leadership, and self-improvement
- Want a system for applying those concepts to real life

## Secondary Audience

Cosmere readers who want:
- Reading progress tracking
- Character exploration
- Spoiler-safe reference material
- A more personal alternative to traditional wiki sites

---

# Core Product Pillars

## Pillar 1: Personal Growth
Users define personal oaths and take actionable steps toward living them.

## Pillar 2: Reflection
Users journal, reflect on prompts, and connect Stormlight themes to their daily lives.

## Pillar 3: Discovery
Users explore characters, Orders, and lore through the RadiantDex.

---

# MVP Scope

## Included In MVP

### User Profiles
- Create account
- Create profile
- Select Radiant Order
- Skip Order selection
- Track books read
- Track books to read

### Dashboard

#### Today's Prompt
Displays an Order-specific reflection prompt.
Users can respond to prompts and favorite prompts.

#### Order Card
Displays:
- Order name
- Order description
- Order icon
- Order themes

#### Active Oath Card
Displays:
- Current oath
- Progress
- Remaining actions

#### Reading Progress Widget
Displays:
- Books completed
- Books currently reading
- Books planned

#### Recently Viewed Character
Displays the last viewed RadiantDex entry.

### Oaths
Users can create personal oaths.

Example:
"I will be more present with my family."

Users can:
- Create oath
- Edit oath
- Archive oath
- Complete actions

### Journal

#### Prompt Journal Entry
Created from Dashboard prompts.

#### Freeform Journal Entry
Private entry not tied to any prompt.

Entries can optionally be linked to:
- Oath
- Character
- Prompt

### RadiantDex

#### Character List
- Search
- Filter
- Favorites

#### Character Detail Page
Displays:
- Character name
- Summary
- Radiant Order
- Books appeared in
- Character tags
- External Coppermind link

### Reading Progress
- Books completed
- Books currently reading
- Books planned

---

# Out Of Scope For MVP

- XP system
- Ideal progression system
- Achievements
- Streaks
- Character relationship graph
- Roshar map
- Timeline explorer
- AI-generated coaching
- Character personality matching
- Advanced Radiant quiz
- Community features
- Social profiles
- Notifications
- Email reminders

---

# Application Pages

## Start Page
Route: /

## Onboarding
Route: /onboarding

## Dashboard
Route: /dashboard

## RadiantDex
Route: /radiantdex

## Character Detail
Route: /radiantdex/:characterSlug

## Oaths
Route: /oaths

## Journal
Route: /journal

## Profile
Route: /profile

---

# Data Model

## User
- id
- name
- email
- orderId
- booksRead[]
- booksWantToRead[]
- createdAt

## Order
- id
- name
- description
- themes[]
- icon

## Book
- id
- title
- series
- releaseDate

## Prompt
- id
- orderId
- category
- text

## Oath
- id
- userId
- title
- status
- createdAt
- archivedAt

## OathAction
- id
- oathId
- title
- completed
- completedAt

## JournalEntry
- id
- userId
- promptId
- oathId
- title
- body
- createdAt

## Character
- id
- name
- summary
- orderId
- books[]
- image
- coppermindUrl

## FavoriteCharacter
- id
- userId
- characterId

## FavoritePrompt
- id
- userId
- promptId

---

# Initial Content Sources

## Local Data
Version 1 will use:
- orders.json
- characters.json
- books.json
- prompts.json

## Future Data Sources
- Coppermind API
- Coppermind page parsing
- 17th Shard resources
- Roshar Map datasets

---

# Technical Stack

## Frontend
- React
- Vite
- React Router

## State
- React State
- Context API

## Storage
- Local Storage

## Future
- Supabase
- Authentication
- Database persistence

---

# Future Roadmap

## Version 2
- XP System
- Ideal Progression
- Radiant Quiz
- Spoiler-safe content unlocking
- Reading streaks
- Favorite quotes

## Version 3
- Character relationship graph
- Roshar map integration
- Timeline explorer
- Character alignment engine

---

# Success Criteria

A successful MVP allows a user to:

1. Select a Radiant Order
2. Track their reading progress
3. Create a meaningful personal oath
4. Define actionable steps toward that oath
5. Reflect through journaling
6. Explore Stormlight characters through the RadiantDex
7. Return regularly to engage with prompts and personal growth
