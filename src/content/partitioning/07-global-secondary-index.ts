import type { Section } from '../types'

export const globalSecondaryIndex: Section = {
  id: 'global-secondary-index',
  title: 'Global secondary indexes',
  scene: 'global-secondary-index',
  focus: 'write',
  slide: `## Global secondary indexes

The other option: partition the **index** by the term it contains, independently of how the rows are partitioned.

### Term-partitioned
- All the *red* entries live in one place, wherever those cars are
- A read is **one request to one partition** — no fan-out, no tail amplification

### The costs swap places exactly
- One row has **several indexed columns**, so one write updates **several index partitions on several machines**
- Atomically, that is a **distributed transaction** — course 09
- So the index is updated **asynchronously**: correct within a second

**DynamoDB's global secondary indexes are exactly this**, and the docs call them eventually consistent.`,
  narration:
    "The other way to partition a secondary index is by the term it contains, rather than by the document it points at. So instead of every partition holding a slice of the colour index, the colour index itself is partitioned: all the entries for red live in one place, all the entries for blue in another, regardless of which partitions the actual cars are stored on. This is called a term-partitioned or global index. The read path is now excellent. You want red cars, you hash or range the term red, that tells you exactly one index partition, and you send one request to one machine. No fan-out, no merging, and crucially no tail latency amplification, because you are waiting on one node rather than the slowest of twenty. You can also choose how to partition the index independently of the data: hash the term for even load, or partition by range if you want range queries on the indexed column — prices between ten and twenty pounds, say — to stay efficient. And now the cost, which swaps places with the previous section in the neatest possible way. A single row has several indexed columns — colour, make, price, year. Writing that one row now requires updating the colour index partition, which is on one machine, the make index partition, which is on another, and so on. One write has become several writes to several machines. To keep the index perfectly in step with the data, those writes and the row write would all have to commit atomically, across nodes — a distributed transaction, which is expensive and which is the subject of course nine. So essentially nobody does that. In practice the global index is updated asynchronously: the row lands, and the index catches up a fraction of a second later. Which means if you write a row and immediately query the index, the row may not be there yet. DynamoDB's global secondary indexes work exactly this way, and Amazon's documentation states plainly that they are eventually consistent. That is not a bug; it is the price of the fast read.",
}
