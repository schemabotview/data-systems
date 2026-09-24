import type { Section } from '../types'

export const singleLeader: Section = {
  id: 'single-leader',
  title: 'Single-leader replication',
  scene: 'single-leader',
  focus: 'leader',
  slide: `## Single-leader replication

The default in Postgres, MySQL, SQL Server, MongoDB and Kafka. **One node takes every write. Any node can serve reads.**

### How it works
- Clients send all writes to the **leader**
- The leader applies them, then ships a **change log** to each follower
- Followers apply that log **in the same order**, so they converge
- Reads go anywhere — that asymmetry is the scaling

### Why it is the default
- **No write conflicts are possible.** One node decides the order, so there is nothing to reconcile
- Everything hard in this course comes from giving that up

### The price
- Read capacity scales. **Write capacity does not** — one node is the ceiling`,
  narration:
    "The most common arrangement by a wide margin, and the default in Postgres, MySQL, SQL Server, MongoDB and Kafka, is single-leader replication. One node is designated the leader — you will also hear master, or primary. Every write from every client goes there, and only there. The leader applies the write to its own storage, and then sends a record of the change to each of its followers — replicas, secondaries, standbys, all the same thing. Each follower takes that stream and applies the changes in exactly the same order the leader did. Because the order is the same and the operations are the same, the followers converge on the same state. Reads, though, can go to any node, and that asymmetry is where the benefit comes from: one machine's worth of write capacity, but as many machines' worth of read capacity as you care to add. Now the reason this design is the default is worth saying plainly, because it is easy to miss. With one leader, write conflicts cannot happen. Ever. Two users editing the same row at the same moment both send their write to the same node, that node picks an order, and that order is simply the truth. There is nothing to reconcile, no merge function, no ambiguity. Almost everything difficult in the rest of this course — the conflict strategies, the version vectors, the CRDTs — exists only because multi-leader and leaderless systems gave that guarantee up. The price is two things. First, write throughput does not scale: one node is the ceiling, and adding followers does nothing for it. Second, that node is a single point of failure — and what happens when it dies is genuinely hard, which is section six.",
}
