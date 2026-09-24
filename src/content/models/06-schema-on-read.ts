import type { Section } from '../types'

export const schemaOnRead: Section = {
  id: 'schema-on-read',
  title: 'Schemaless is the wrong word',
  scene: 'schema-on-read',
  slide: `## Schemaless is the wrong word

Both of these have a schema. They differ in **when it is enforced** — and who gets the error.

### Schema on write
- \`ALTER TABLE\` states the new shape once, for every row
- The database rewrites or defaults the old rows
- Afterwards, **every reader can assume one shape**

### Schema on read
- Write the new shape; **old rows are never touched**
- Both shapes now live in the table, **indefinitely**
- The schema didn't vanish — it is the \`??\` in your read path
- Honest trade: **no migration**, in exchange for **branching forever**`,
  narration:
    "Document databases are often called schemaless, and that word does real damage, because it suggests there is no schema. There always is. The question is only when it gets enforced. With schema on write, you run an ALTER TABLE. The database takes the new shape, applies it to every existing row — rewriting them or filling in a default — and from that moment on, every piece of code that reads the table can assume one shape. The check happened once, at the database, and the error arrived at migration time when you were watching. With schema on read, you skip all of that. You just start writing the new shape. Old rows are never touched, which means the old shape and the new shape now coexist in the same collection, and they will coexist for as long as those rows live — which in practice is forever. The schema did not disappear. It moved into that null-coalescing expression in your read path: use the name field if it is there, otherwise build it from first and last. That is the schema. It is written in application code, it runs on every read, and nothing reminds you to keep it. Which one is right genuinely depends. If your records really are heterogeneous, schema on read is honest. If they are all the same shape, you have just traded a one-time migration for a branch you will maintain for years.",
}
