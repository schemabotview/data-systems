import type { Section } from '../types'

export const whatADataSystemIs: Section = {
  id: 'what-a-data-system-is',
  title: 'What a data system actually is',
  scene: 'data-system-parts',
  focus: 'app',
  slide: `## What a data system actually is

Nobody ships "an app with a database" any more. You ship a **composition** — and the arrows between the parts are the design.

### The usual cast
- A **database** — the system of record
- A **cache** — for reads the database cannot take
- A **search index** — for queries SQL is bad at
- A **queue** — for work that can happen later

### The moment it gets hard
- Each of those holds a **copy** of something
- No single product keeps them in agreement — **your code does**
- A write that lands in one and not the others is a **bug you shipped**
- Everything after this is that problem, in more detail`,
  narration:
    "Here is the shape of almost every backend built in the last fifteen years. You have a database, and then you have a cache in front of it because the database cannot take all the reads. You add a search index, because full-text search is something relational databases are genuinely bad at. And you add a queue, for the work that does not have to happen right now. None of that is unusual — it is the default. But look at what you have actually built. The database is the system of record, and the cache and the index both hold copies of what is in it. No vendor sells you the thing that keeps those three in agreement. That is your application code. So when someone updates a product's price, and the database has the new one while the cache still serves the old one for another ten minutes, that is not a database bug. That is a system you designed. This is why we are not going to study one database. We are going to study the arrows.",
}
