# Content Strategy
## Journey Before Destination

## Content Approach

Content will be a combination of:

1. AI-assisted original writing.
2. External sources used for research.
3. External links and attribution where appropriate.
4. Local JSON data for MVP.

Do not copy large chunks from Coppermind, 17th Shard, or official Brandon Sanderson pages. Use those sources to research themes, names, relationships, and references, then write original summaries and prompts.

## Tone

Serious and reflective with light RPG flavor.

Prompts should feel personal and useful, not cheesy.

## Radiant Order Content

Each Order should have:

- Name
- Short description
- Themes
- Strengths
- Growth challenges
- Prompt categories
- Example oaths
- Example actions

## Initial Order Theme Structure

### Windrunner
Themes:
- Protection
- Responsibility
- Leadership
- Service

Prompt categories:
- Who needs support?
- What responsibility are you avoiding?
- How can you protect without controlling?

### Lightweaver
Themes:
- Truth
- Creativity
- Self-awareness
- Honesty

Prompt categories:
- What truth are you avoiding?
- Where are you hiding?
- What story are you telling yourself?

### Bondsmith
Themes:
- Unity
- Leadership
- Connection
- Reconciliation

Prompt categories:
- What relationship needs repair?
- Where can you bring people together?
- What division are you feeding?

### Edgedancer
Themes:
- Listening
- Care
- Remembering
- Compassion

Prompt categories:
- Who is being overlooked?
- Who needs to be remembered?
- Where can you listen better?

### Elsecaller
Themes:
- Wisdom
- Potential
- Transformation
- Discipline

Prompt categories:
- What are you becoming?
- What choice moves you toward your potential?
- What requires discipline?

### Truthwatcher
Themes:
- Insight
- Healing
- Discernment
- Quiet service

Prompt categories:
- What do you see clearly that others may not?
- Where is healing needed?
- What truth needs patience?

### Willshaper
Themes:
- Freedom
- Exploration
- Courage
- Self-direction

Prompt categories:
- Where do you feel trapped?
- What would freedom require?
- What step expands your world?

### Stoneward
Themes:
- Endurance
- Dependability
- Resolve
- Being present in difficulty

Prompt categories:
- Where do you need to stand firm?
- Who depends on your consistency?
- What hard thing needs doing?

### Dustbringer
Themes:
- Self-mastery
- Power
- Restraint
- Responsibility

Prompt categories:
- Where do you need restraint?
- What power needs discipline?
- What impulse needs to be examined?

### Skybreaker
Themes:
- Justice
- Accountability
- Structure
- Commitment

Prompt categories:
- What standard are you avoiding?
- Where do you need accountability?
- What rule or commitment matters?

## Prompt Object

```js
{
  id: "windrunner-001",
  orderId: "windrunner",
  category: "Responsibility",
  text: "What responsibility are you avoiding right now?",
  sourceType: "original",
  favoriteable: true
}
```

## Oath Examples

### Family Presence
Oath:
"I will be more present with my family."

Actions:
- Put my phone away during dinner.
- Plan one daddy-daughter date this month.
- Spend one hour outside with my family this week.

### Health
Oath:
"I will care for my body with consistency instead of waiting for motivation."

Actions:
- Work out three times this week.
- Prep one gluten-free meal.
- Go to bed before 10:30 twice this week.

### Leadership
Oath:
"I will lead with patience and clarity."

Actions:
- Check in with one teammate.
- Clarify expectations before reacting.
- Write down one hard conversation I need to have.

## MVP Prompt Count

Start with:

- 10 Orders
- 5 prompts per Order
- 50 total prompts

That is enough to make the dashboard feel alive without overbuilding.
