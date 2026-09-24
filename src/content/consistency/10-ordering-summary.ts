import type { Section } from '../types'

export const orderingSummary: Section = {
  id: 'ordering-summary',
  title: 'What real systems give you',
  scene: 'ordering-summary',
  focus: 'table',
  slide: `## What real systems give you

The design-time question is not *"what is linearizability"* — it is **what does my system promise, by default**.

### The row that catches people
- **Single-leader, read from the leader**: linearizable
- **Single-leader, read from a replica**: eventual
- Same database, same settings. Adding a read replica **for performance** silently changes the guarantee

### The rest
- **Multi-leader** and **leaderless**: eventual. Even \`w + r > n\` is not linearizable
- **ZooKeeper, etcd**: linearizable by design — which is why others delegate
- **Kafka**: total order within a partition, none across partitions

### The takeaway
- Linearizability is **rationed, not refused**`,
  narration:
    "Let us land the course on the question you actually face, which is not what linearizability means but what your system already promises. Start with the row that catches almost everyone. A single-leader database where you read from the leader is linearizable, assuming failover is handled properly — one node decides the order and serves the reads. The same database, reading from a replica, is eventually consistent, because the replica lags. Same product, same settings, and the guarantee depends entirely on which node answered your query. Which means that adding a read replica to reduce load on the primary — a completely routine operation, done for performance, often by a different team — silently weakens the consistency of every query that gets routed to it. That is worth knowing before you do it rather than after. The rest of the table is more predictable. Multi-leader systems are eventually consistent with conflicts, by construction. Leaderless quorum systems are eventually consistent too, and it is worth repeating that w plus r greater than n does not give you linearizability — course four ended on exactly that point, and the reason is that a failed write, a sloppy quorum, or two concurrent writes all break the overlap argument. ZooKeeper and etcd are linearizable by design, which is precisely why so many other systems delegate their hard coordination to them rather than implementing it themselves — that is a good instinct, and you should copy it. And Kafka gives total order within a single partition and no ordering guarantee at all across partitions, which is why the choice of partition key is a consistency decision and not just a load-balancing one. So the takeaway. Linearizability is not something to refuse and not something to demand everywhere. It is rationed. Find the handful of operations that genuinely need it — leader election, uniqueness, a balance check — and pay for it there, usually by delegating to a system built for it. Everything else can live with causal consistency, which is far cheaper and, unlike linearizability, keeps working when the network splits. The next course is what it actually takes to provide the strong end of that.",
}
