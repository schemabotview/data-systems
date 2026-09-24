import type { Section } from '../types'

export const manyToOne: Section = {
  id: 'many-to-one',
  title: 'Many-to-one: store the ID',
  scene: 'many-to-one',
  focus: 'cities',
  slide: `## Many-to-one: store the ID

Many users live in one city. Write the city as **text** and you have three spellings by Friday.

### What the ID buys
- **One spelling**, so grouping and counting are correct
- **Rename once** — the city changes, every user follows
- A clean list for **autocomplete**, and somewhere to hang timezone or country
- The duplicated string had no home; the row does

### The name for it
- Removing that duplication is **normalization**
- The cost is a **join** — you now need two reads, or one with a lookup
- Document databases support this badly: **joins move into your code**`,
  narration:
    "This is the smallest idea in the course and the one that gets skipped most often. Lots of users live in one city — that is a many-to-one relationship. The tempting move is to store the city as a string on each user. And it works, right up until you look at real data. Someone typed Greater Lagos. Someone typed Lagos comma N G. Someone typed lagos in lower case. Now you cannot group by city, you cannot count users per city, and a rename is a find-and-replace across your whole table. So instead, store an ID that points at a cities row. The ID is meaningless to a human, which is the point: there is no ambiguity, nothing to misspell, and a rename touches one row. You also now have somewhere to put the country, the timezone, the coordinates — facts about the city rather than about the user. Removing duplication like this is what normalization means. It is not bureaucracy, it is the removal of a second source of truth. The price is a join: two reads instead of one. And here is where it starts to matter which model you chose, because document databases support joins weakly, which means the join does not disappear — it moves into your application code.",
}
