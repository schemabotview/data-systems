import type { Section } from '../types'

export const lostUpdate: Section = {
  id: 'lost-update',
  title: 'The lost update',
  scene: 'lost-update',
  focus: 'write',
  slide: `## The lost update

Snapshot isolation handles readers. **Two concurrent writers to one row is a separate problem**, and it starts here.

### The read-modify-write cycle
- Both transactions read the counter: **42**
- Both add one in application code, both write **43**
- One increment vanished. No error anywhere

### Anywhere you read, compute, write back
- A counter · editing a wiki page · adding to a JSON list

### Four ways out, best first
- **Atomic operation.** \`SET n = n + 1\` — the read never leaves the database
- **Explicit lock.** \`SELECT … FOR UPDATE\`, then write
- **Automatic detection.** The engine aborts; you retry
- **Compare-and-set.** Write only if it still reads 42`,
  narration:
    "Snapshot isolation solves the reader's problem completely. Two concurrent writers to the same data is a separate problem, and it has several forms. The simplest is the lost update. The pattern is the read-modify-write cycle: read a value, compute a new one in application code, write it back. Two transactions do this at the same time on a counter holding forty-two. Both read forty-two. Both add one. Both write forty-three. Two increments happened, one increment took effect, and nothing anywhere reported an error. And this is everywhere. Incrementing a view count. Two people editing the same wiki page, where the second save silently overwrites the first. Reading a JSON document, adding an element to a list, and writing the whole document back. There are four ways out, and they are worth knowing in order of preference. Best is an atomic operation: instead of reading the value into your application, write UPDATE counters SET value equals value plus one. The read and the write happen inside the database, under the row lock read committed already gives you, so there is no window for anyone to interleave. Most databases support this, and MongoDB and Redis have equivalent atomic operators. Prefer it whenever the operation can be expressed that way. Second, an explicit lock: SELECT FOR UPDATE, which locks the rows you are about to modify, so any other transaction that tries to read them for update has to wait. That works when the computation genuinely has to happen in your application — a chess move that must be validated, for example. The danger is forgetting it in one code path, and nothing will tell you. Third, automatic detection: some databases, including Postgres under repeatable read and Oracle under serializable, will notice a lost update and abort the transaction. That is excellent, because it is easy to get right — you just need a retry loop. Note MySQL's InnoDB under repeatable read does not detect it. Fourth, compare-and-set: write only if the value is still exactly what you read. Effective, and watch out — if the comparison itself reads from an old snapshot, it can pass when it should not.",
}
