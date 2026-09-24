import type { Section } from '../types'

export const dataflowThroughDatabases: Section = {
  id: 'dataflow-through-databases',
  title: 'Dataflow through databases',
  scene: 'dataflow-databases',
  focus: 'gone',
  slide: `## Dataflow through databases

Writing to a database is a message to **every version of the code that will ever read that row**.

### Data outlives code
- Code is replaced weekly. A row written five years ago is still there
- Nobody rewrites the table on deploy, so \`NULL\` for a new column is the norm

### The bug no test catches
1. A **v2** node writes a row with a new \`currency\` field
2. A **v1** node reads it — into a struct with no such field
3. v1 changes the total and **writes the whole row back**
4. \`currency\` is **gone.** No error, anywhere

### The fix is in the decoder, not the schema
- Keep the fields you didn't understand; write them back out
- Most codecs support this. Almost nobody turns it on`,
  narration:
    "When you write a value into a database, you are sending a message to your future self, and to every version of your code that will ever read that row. And the timescale is completely different from a network request. A network payload lives for milliseconds. A database row lives for years. Your code gets replaced every week; the data does not. People summarise this as data outlives code, and it is the entire reason backward compatibility is non-negotiable — five-year-old rows written by a version nobody remembers are still sitting there, and today's code has to read them. In principle you could rewrite the whole table on every schema change, but nobody does that at scale, so most databases let you add a nullable column without touching existing rows, and reading an old row just gives you null for the new field. Now here is a bug that is much nastier, and it has no error message anywhere in it. Suppose a v2 node writes a row that includes a new field, currency. A v1 node reads that row. It decodes it into a struct that v1 defines, and v1's struct has no currency field, so the value is dropped at decode time. Then the v1 node does something completely ordinary — changes the total, and writes the whole record back. And currency is now gone from the database. Permanently. Every service behaved correctly. The encoding format was forward compatible, and it did its job — it skipped the unknown field. The data loss happened in the round trip, between decode and re-encode, in code nobody thought of as being about compatibility at all. The fix is not a schema rule. It is in the decoder: keep the fields you did not understand as raw bytes, and write them back out when you re-encode. Most libraries can do this. Almost nobody turns it on, and it is worth checking whether yours has.",
}
