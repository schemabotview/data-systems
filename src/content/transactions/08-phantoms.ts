import type { Section } from '../types'

export const phantoms: Section = {
  id: 'phantoms',
  title: 'Phantoms',
  scene: 'phantoms',
  focus: 'clash',
  slide: `## Phantoms

Write skew generalised — and named for the case where **the row you would lock does not exist yet**.

### The definition
- A write in one transaction **changes the result of a query** in another
- If the query matched rows, \`SELECT … FOR UPDATE\` locks them
- If it matched **nothing**, there is nothing to lock. A **phantom**

### It is the common shape
- *"Is this room free?"* · *"Is this username taken?"* — both queries **expect** an empty result

### Materializing conflicts
- Pre-create a row per room-hour, so there is always something to lock
- It works, and it leaks a **concurrency mechanism into your schema**
- Reach for it last. The next three sections are the real answers`,
  narration:
    "Write skew has a more general name, and the name comes from the hardest case. Define it precisely: a phantom is when a write in one transaction changes the result of a search query in another transaction. That is the whole mechanism behind write skew. Now here is why it is called a phantom. If the query matched some existing rows, you can lock those rows — SELECT FOR UPDATE — and the problem goes away, because anyone who wants to change them has to wait for you. But if the query matched nothing, there is nothing to lock. You cannot take a lock on a row that does not exist. And the conflicting write is precisely an insert that would have matched, if it had been there. So the object you needed to lock is a row that will exist in a moment, and it is not there when you need it. A phantom. And this is not the rare case, it is the common one. Think about the queries that actually guard invariants in real applications. Is this meeting room free at two o'clock? That query is asking for no rows, and success means the result was empty. Is this username taken? Also asking for emptiness. Does this account have any pending holds? Almost every uniqueness check and every availability check is a query whose desired answer is nothing, and there is nothing there to lock. There is a workaround, and it has a name: materializing conflicts. If the problem is that there is no row to lock, create one. Pre-populate a table with a row for every room and every fifteen-minute slot for the next six months, so that booking a room means locking a row that definitely exists. It works. But it is ugly: you are inventing rows that have no meaning in your domain purely to have something to lock, you have to keep that table populated, and you have leaked a concurrency-control mechanism into your data model where the next developer will not understand what it is for. Treat it as a last resort. The real answer is serializable isolation, and that is what the remaining sections are.",
}
