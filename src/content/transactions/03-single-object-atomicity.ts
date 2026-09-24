import type { Section } from '../types'

export const singleObjectAtomicity: Section = {
  id: 'single-object-atomicity',
  title: 'What one object gives you free',
  scene: 'single-object-atomicity',
  focus: 'not',
  slide: `## What one object gives you free

Before any isolation level: **every storage engine already makes a single-object write atomic**, because it has to.

### Two guarantees, already there
- **Atomicity per object** — a 20 KB document interrupted at 10 KB does not leave half of it. The recovery log from course 02
- **Isolation per object** — a reader never sees a half-written value. A lock on that one object

### So single-object operations are safe
- \`INCR\` on a counter, compare-and-set, appending to a list
- Most "lightweight transaction" features are exactly this

### But one object is not several
- Nothing here helps you debit **one** row and credit **another**
- Multi-object atomicity is a different mechanism, and it is what the rest of this course is about`,
  narration:
    "Before we get into isolation levels, it is worth knowing what you already have without asking for it, because a lot of confusion comes from not distinguishing the two. Every storage engine makes a write to a single object atomic. If you write a twenty kilobyte JSON document and the power fails when ten kilobytes have been written, the database does not leave you with half a document. When it restarts, either the whole new value is there or the whole old value is. That is exactly the crash recovery log from course two, applied to one object. It also gives you isolation on that object: if another client reads while you are writing, it sees either the old value or the new one, never a torn mix. That is a lock on one object, held only for the duration of the write. Those two properties are cheap, and they are universal — every database does this, including ones with no transactions at all. Which means single-object operations are safe without any transaction machinery. Incrementing a counter, compare-and-set, appending to a list, adding a member to a set — all safe. Most of what NoSQL databases market as lightweight transactions or atomic operations is exactly this, and it genuinely does cover a lot of real use cases. But — and this is the part that matters — one object is not several. None of this helps you debit one row and credit another, or insert an order and decrement stock, or write a record and enqueue the notification that goes with it. The moment your operation spans two objects, you need a genuinely different mechanism, and that mechanism is what the remaining nine sections are about.",
}
