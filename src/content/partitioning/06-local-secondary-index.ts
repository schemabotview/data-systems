import type { Section } from '../types'

export const localSecondaryIndex: Section = {
  id: 'local-secondary-index',
  title: 'Local secondary indexes',
  scene: 'local-secondary-index',
  focus: 'cost',
  slide: `## Local secondary indexes

Partitioning is by the **primary** key. So what happens to a query on a *different* column?

### Document-partitioned: each partition indexes its own rows
- Partition 3's index knows about red cars **in partition 3**, and nothing else
- A write touches **exactly one partition** — the row and its indexes are on one machine, so no cross-node coordination

### Reading is the expensive half
- Colour has nothing to do with the partition key, so **every partition must be asked**
- Query all, merge the results: **scatter/gather**
- Latency is the **slowest** partition's, every time — so p99 gets much worse as you add machines

**MongoDB, Cassandra, Elasticsearch and Riak all default to this.** Writes stay simple; reads are the price.`,
  narration:
    "Partitioning is by the primary key. But most queries are not by the primary key — you want the red cars, or the orders placed last week, and colour and date have nothing to do with how the data was distributed. So you need a secondary index, and there are exactly two ways to partition one. This section is the first. Document-partitioned, also called a local index: each partition maintains an index covering only its own rows. Partition three's colour index knows about red cars in partition three, and knows nothing whatsoever about the rest of the cluster. The strength of this is in the write path, and it is a big one. When you add or update a row, that row lives on one partition, and all the indexes that need updating live on the same partition. It is one machine's local work, with no coordination, no network round trips to other nodes, and nothing that can half-succeed. Writes stay simple and fast. The reading half is where you pay. Since colour is unrelated to the partition key, red cars could be on any partition, and there is no way to know in advance which. So the query has to go to every single partition, each one answers from its local index, and the results are combined. That pattern is called scatter-gather, and the thing to understand about it is the latency behaviour. You are waiting for all of them, so the response time is the slowest partition's response time, every single time. Which means as you add machines, your median stays fine and your tail latency gets steadily worse, because with more partitions you have more chances that one of them is doing a garbage collection or is on a busy disk. Scatter-gather is prone to tail-latency amplification, and it is a recurring source of mysterious p99 problems. Mongo, Cassandra, Elasticsearch and Riak all default to this design. Cheap writes, expensive reads.",
}
