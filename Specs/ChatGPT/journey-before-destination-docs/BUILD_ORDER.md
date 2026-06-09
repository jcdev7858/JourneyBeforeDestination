# Build Order
## Journey Before Destination

This is the practical implementation order for learning React through the project.

## Milestone 1: Create React App

Tasks:
- Create Vite React project
- Clean starter files
- Add folders:
  - components
  - pages
  - data
  - utils
  - hooks

## Milestone 2: Add Routing

Tasks:
- Install React Router
- Create routes:
  - /
  - /onboarding
  - /dashboard
  - /radiantdex
  - /radiantdex/:characterSlug
  - /oaths
  - /journal
  - /profile
- Create Layout component
- Add navigation

## Milestone 3: Add Static Data

Tasks:
- Create orders.json
- Create books.json
- Create prompts.json
- Create characters.json
- Import and render data

## Milestone 4: Build RadiantDex First

Reason:
This gives a fast visible win.

Tasks:
- Character cards
- Character list
- Character detail route
- Search
- Filter by Order
- External Coppermind link

## Milestone 5: Build Fake User Profile

Tasks:
- Create default user object
- Save/read user from localStorage
- Profile page displays user
- Edit Order
- Edit books read

## Milestone 6: Build Onboarding

Tasks:
- Choose Order
- Select books read
- Create first oath
- Save all data
- Redirect to dashboard

## Milestone 7: Build Dashboard

Tasks:
- Show today's prompt
- Show Order card
- Show active oath
- Show reading progress
- Show recently viewed character

## Milestone 8: Build Oaths

Tasks:
- Create oath form
- Add actions
- Mark complete
- Archive oath
- Show oath progress

## Milestone 9: Build Journal

Tasks:
- New freeform entry
- Prompt response entry
- Journal list
- Journal detail
- Save to localStorage

## Milestone 10: Add Favorites

Tasks:
- Favorite characters
- Favorite prompts
- Display favorites

## Milestone 11: Add Spoiler Filtering

Tasks:
- Use booksRead to filter character content
- Hide locked content
- Show message:
  "This content unlocks after reading [Book]."

## Milestone 12: MVP Polish

Tasks:
- Empty states
- Basic styling
- Responsive layout
- Better copy
- Cleanup data
- Refactor repeated components
