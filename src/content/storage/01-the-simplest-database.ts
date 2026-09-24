import type { Section } from '../types'

export const theSimplestDatabase: Section = {
  id: 'the-simplest-database',
  title: 'The simplest database in the world',
  scene: 'simplest-database',
  focus: 'r',
  slide: `## The simplest database in the world

Two shell functions. It stores data, reads it back, and is **genuinely hard to beat on writes**.

### Why the write is so good
- It only ever **appends** — no seeking, no rearranging
- Sequential writes are the one thing every disk loves
- An update is just a **newer line**; \`tail -1\` makes the last one win

### Why the read is unusable
- \`grep\` walks **everything ever written**, every time
- Double the data, double the read time — **O(n)**

### So: an index
- A structure on the side that says **where to look**
- Every index makes writes slower. That trade never goes away`,
  narration:
    "I want to start with something that looks like a joke but is not. Here is a database. db_set appends a key and a value to a file. db_get greps the file for that key, takes the last matching line, and returns the value. That is it. And the surprising part is that the write half of this is genuinely excellent. It only ever appends to the end of a file. There is no seeking, no shuffling of existing data, nothing to rearrange — and appending sequentially is the single fastest thing you can ask a disk to do, whether it is spinning rust or an SSD. Updates work too: you append a new line, and because the read takes the last match, the newest value wins. Real storage engines keep this idea. Almost all of them have an append-only log at the bottom. What they fix is the other half. The read is catastrophic. Grep walks every byte ever written, every time. Write to one key ten thousand times and a single lookup scans ten thousand lines. Double your data and every read takes twice as long. That is order n, and order n is not a database. So we need an index: a separate data structure, kept on the side, whose only job is to tell us where in the file to look. And here is the rule that holds for every index you will ever add, in any system: it speeds up reads, and it slows down writes, because now there are two things to keep current instead of one. Choosing indexes is choosing where to spend that.",
}
