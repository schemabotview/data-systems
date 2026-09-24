import type { Section } from '../types'

export const partitionPlusReplica: Section = {
  id: 'partition-plus-replica',
  title: 'Partitions and replicas together',
  scene: 'partition-plus-replica',
  slide: `## Partitions and replicas together

Each partition is replicated. Each replica lives on **a different machine**. Read the picture both ways.

### By column, you see machines
- Every node holds a few partitions — some as **leader**, some as **follower**
- So no machine is idle, and no machine is only a backup

### By partition, you see the point
- P1's leader and P1's follower are on **different nodes**
- Lose node 1 and P1 is still live on node 2 — only that partition fails over

### What this buys
- **Storage and write throughput scale with nodes** — that is partitioning
- **Any single node can die** — that is replication
- Every choice from course 04 still applies, **per partition**`,
  narration:
    "Here is what combining them looks like, and the picture rewards reading in two directions. Read it by column and you see three machines, and every machine holds a few partitions — some of which it leads, and some of which it merely follows. That matters: there is no machine sitting idle as a pure backup. Node one is the leader for partition one, so it takes all the writes for that partition, and at the same time it is a follower for partition three, quietly applying someone else's log. Every node is doing both jobs. Now read it by partition instead, and you see the point of the arrangement. Partition one's leader is on node one, and partition one's follower is on node two. Different machines, deliberately. So if node one dies, partition one is still live on node two and can be promoted — and crucially, only partition one fails over. Partitions two and three are unaffected, because their leaders were elsewhere. The blast radius of one machine failing is one partition's worth of brief disruption rather than the whole system. And notice what each mechanism is contributing. Partitioning is what makes storage and write throughput scale with the number of nodes — that is the thing replication could not do. Replication is what makes any individual node's death survivable — that is the thing partitioning could not do. You need both, and they compose cleanly because they are answering different questions. Everything from course four still applies here, it just applies per partition: each partition has its own leader, its own replication log, its own failover, and its own lag.",
}
