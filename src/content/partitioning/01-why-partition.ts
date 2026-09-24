import type { Section } from '../types'

export const whyPartition: Section = {
  id: 'why-partition',
  title: 'Why partition',
  scene: 'why-partition',
  focus: 'split',
  slide: `## Why partition

Replication puts the **whole** dataset on every machine. Eventually it stops fitting on any of them.

### Three ceilings, in the order you hit them
- **Disk** — it will not fit
- **Write throughput** — you have one node's worth, however many replicas you add
- **Working set** — past RAM, reads that were memory hits become disk seeks

### The move
- **Split the data itself.** Each partition is a small, complete database
- Also called a **shard** (Mongo, Elastic), a **region** (HBase), a **vnode** (Cassandra)
- \`n\` partitions on \`n\` machines is \`n\` times the capacity and \`n\` times the write throughput

**Partitioning and replication are orthogonal, and almost every real system does both.**`,
  narration:
    "Replication and partitioning solve different problems, and it is worth being precise about the difference. Replication puts a copy of the whole dataset on every machine. That buys you availability and read capacity, and it does absolutely nothing for size — ten replicas of a fifty terabyte database is ten machines that each need fifty terabytes. Eventually the data stops fitting, and you hit that in three ways, usually in this order. First, disk: the dataset is simply larger than a machine. Second, write throughput: every write goes to the leader, so you have exactly one node's worth of write capacity no matter how many replicas you add. And third, the working set — the portion of data actively being read. Once that exceeds RAM, reads that used to be memory hits become disk seeks, and your latency does not degrade gently, it falls off a cliff. So the move is to split the data itself. Each partition holds a subset of the rows, and each partition is a small, complete database in its own right — with its own indexes, its own storage engine, its own everything from course two. The terminology is a mess: Mongo and Elasticsearch call it a shard, HBase calls it a region, Cassandra says vnode, Kafka says partition, and they are the same idea. Put n partitions on n machines and you have n times the storage and n times the write throughput, which is the scalability that replication alone cannot give you. And the key thing to hold on to: partitioning and replication are orthogonal. You do not choose one. Essentially every system at scale partitions the data and then replicates each partition, and the next section is what that looks like.",
}
