import type { Section } from '../types'

export const writeSkew: Section = {
  id: 'write-skew',
  title: 'Write skew',
  scene: 'write-skew',
  focus: 'why',
  slide: `## Write skew

The hard one — because **the two transactions never touch the same row**, so there is nothing to lock.

### The on-call example
- Rule: **at least two doctors** on call. Currently exactly two
- Both feel ill, both query the count, both see **2**
- Both conclude it is safe, and each updates **their own row**
- Nobody is on call. Neither transaction broke a rule

### Why none of §6's fixes work
- Different rows, so no row lock applies and no atomic op exists
- Compare-and-set compares **the row you are writing** — untouched

### The general shape
- **Read a set, decide, write a different row**
- Doctors on call · booking a room · claiming a username`,
  narration:
    "Now the subtle one. A hospital requires at least two doctors on call at all times. Right now there are exactly two, Ada and Ben, and both feel unwell. Both open the app at the same moment. Both transactions run the same query: how many doctors are currently on call? Both get two. Both conclude that it is safe for them to go off call, because the other one will still be there. Both update their own row. And now zero doctors are on call, and the invariant the hospital depends on has been violated. Look at what happened, because it is genuinely different from the lost update. The two transactions did not write to the same row. Ada updated Ada's row; Ben updated Ben's. There is no contention on any single object, so a row lock has nothing to lock. An atomic operation does not exist, because the operation is not increment — it is: check a condition over a set of rows, then update a different row. And compare-and-set fails too, because compare-and-set compares the row you are about to write, and Ada's row was not modified by anyone. Every mechanism from the previous section is defeated, and neither transaction did anything wrong in isolation. This is write skew. The general shape is: read a set of rows, make a decision based on what you found, then write. And the write changes the result of the query the other transaction ran — so each one invalidates the other's premise, after both premises have already been checked. Once you know the shape you will see it constantly. Two people booking the same meeting room, because both checked and found it free. Two people claiming the same username. A spending limit checked against a balance while another transaction spends against the same balance. A multiplayer game where two pieces move to the same square. The only real fix in a standard database is serializable isolation, which is the last three sections — or an explicit lock on the rows you read, using SELECT FOR UPDATE, which works and which you have to remember to do everywhere.",
}
