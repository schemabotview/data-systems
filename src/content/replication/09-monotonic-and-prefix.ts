import type { Section } from '../types'

export const monotonicAndPrefix: Section = {
  id: 'monotonic-and-prefix',
  title: 'Monotonic reads and consistent prefix',
  scene: 'monotonic-and-prefix',
  slide: `## Monotonic reads and consistent prefix

Two more anomalies from the same lag — and they are genuinely different failures.

### Monotonic reads — time runs backwards
- One read hits a caught-up replica: the comment is **there**
- The next hits a lagging one: the comment is **gone**
- Nothing was deleted. The reader just moved **backwards in time**
- Fix: route each user to **one replica**, chosen by hashing their id

### Consistent prefix — effect before cause
- Only arises when writes are **spread across partitions**
- A question is written to partition 1; the answer, a moment later, to partition 2
- Partition 2 replicates faster, so a reader sees an **answer to a question that isn't there**
- Fix: keep causally related writes in **one partition** — or track causality explicitly, which is course 08`,
  narration:
    "Two more anomalies caused by the same lag, and they are worth separating because they fail differently. First, monotonic reads. A user makes two reads in a row. The first is served by a replica that is caught up, so they see a comment. The second — maybe because your load balancer picked a different backend, or their connection was re-established — is served by a replica that is a few seconds behind. So the comment they just saw is now gone. Nothing was deleted. The reader has simply moved backwards in time, which is more disorienting than seeing stale data, because they have direct evidence that the thing existed. Monotonic reads is the guarantee that this never happens: each user's reads may be stale, but they never go backwards. It is weaker than strong consistency and stronger than eventual consistency. The standard implementation is pleasingly simple: make sure each user always reads from the same replica, by hashing their user ID to pick one rather than choosing at random. The catch, which you should expect by now, is that if that replica fails the user has to be moved, and the new one may be behind. Second, consistent prefix reads, and this one only arises when writes are spread across partitions — which is course five, so treat this as a preview. Imagine a conversation. Someone asks a question; a moment later someone answers it. Those two writes are causally ordered, obviously. But suppose they land on different partitions, each with its own replication stream and its own lag. A reader watching both partitions may receive the answer before the question. So they see a reply to something that has not been said yet. Within a single partition this cannot happen, because writes are applied in order. Across partitions there is no global ordering at all, so nothing prevents it. One fix is structural: keep causally related writes in the same partition, which is why chat systems partition by conversation rather than by message. The general fix is to track causality explicitly, and that is a hard enough problem that course eight is about it.",
}
