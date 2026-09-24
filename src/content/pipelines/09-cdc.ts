import type { Section } from '../types'

export const cdc: Section = {
  id: 'cdc',
  title: 'Change data capture',
  scene: 'cdc',
  focus: 'why',
  slide: `## Change data capture

Course 01 §1 ended on a problem: a database, a cache and a search index, and **your code** keeping them in step. This is the answer.

### The realisation
- The database **already has** an ordered log of every change — course 04 §7
- CDC points something **other than a replica** at it
- Debezium, Maxwell and Postgres logical replication all do this

### Why this beats writing to both
- Two independent writes can **half-fail**, and then the systems disagree forever, with no record of which is right
- Two writes can also **race** and land in different orders
- One ordered log has neither problem

### Derived means rebuildable
- Reset the offset and **rebuild the index from scratch** — no migration`,
  narration:
    "Course one opened with a problem and did not solve it. You have a database, a cache and a search index, all holding copies of the same data, and no product on the market keeps them in agreement — your application code does. Here is the answer, and it is one of the most useful patterns in this whole series. The realisation is that the database already has what you need. From course four, section seven: every leader maintains an ordered log of every change, so that followers can apply them. That log exists whether or not you use it, it contains every insert, update and delete, and it is in a definite order. Change data capture is simply pointing something other than a replica at that log. Debezium does this for MySQL and Postgres and Mongo, Maxwell does it for MySQL, and Postgres has logical replication built in. The connector reads the log and publishes each change onto a Kafka topic, and now your search index, your cache and your warehouse are just consumers of that topic. Now, why is that better than the obvious alternative of having your application write to the database and then also write to the search index? Two reasons, and they are both failure reasons. First, two independent writes can half-fail. The database write succeeds, the index write times out, and the two systems now disagree — permanently, with nothing anywhere recording which one is right. That is the dual-write problem and it is very common. Second, two writes can race: two concurrent updates can land in one order in the database and the opposite order in the index, so the index ends up holding a value the database never had. With a single ordered log, neither of those is possible. The database is the system of record, the log is the single ordered source of changes, and every other system is derived from it. And derived has a precise meaning: rebuildable. If your search mapping changes, you do not run a migration and you do not dual-write during a transition — you reset the consumer's offset to zero and rebuild the index from the log. It is the same freedom to iterate that made batch jobs safe, applied to your live serving infrastructure. And note this only works because the log is logical rather than the storage engine's WAL, which is why that distinction in course four mattered.",
}
