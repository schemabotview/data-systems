import type { Section } from '../types'

export const rebalancing: Section = {
  id: 'rebalancing',
  title: 'Rebalancing partitions',
  scene: 'rebalancing',
  focus: 'modn',
  slide: `## Rebalancing partitions

Nodes get added, nodes die, data grows. Partitions have to move — **while the system stays up**.

### First: why \`hash % n\` is wrong
- Change \`n\` from 10 to 11 and **almost every key maps somewhere new**
- A rebalance that moves everything at once is an outage

### Three that work — all decouple partitions from nodes
- **Fixed count.** 1000 partitions up front, each node gets a set. Riak, Elasticsearch, Couchbase
- **Dynamic.** Split when big, merge when small. HBase, MongoDB — but one partition until the first split
- **Per node.** A fixed number each; a new node splits some at random

### Keep a human in the loop
- Auto-rebalance plus a **false** failure detection is a stampede
- The node was only slow. Now it is slow **and** moving terabytes`,
  narration:
    "Partitions do not stay where you put them. You add nodes for capacity, machines fail and get replaced, and some partitions grow much faster than others. So data has to move between nodes — and it has to move while the database is serving traffic. Start with the wrong answer, because it is the one everybody writes first. Take the hash and mod it by the number of nodes. It distributes beautifully, and it is a one-liner. The problem shows up the moment n changes. With ten nodes, a key hashing to a thousand and twenty-three goes to node three. Add an eleventh node and the same key goes to node seven. And that is true of nearly every key in the database. Adding one machine means moving almost all your data, all at once, over the network, while serving traffic. That is not a rebalance, it is an outage with extra steps. The three strategies that work all share one idea: decouple the number of partitions from the number of nodes. First, a fixed partition count. Decide up front that there are a thousand partitions — far more than you will ever have machines — and give each node a set of them. With ten nodes each holds a hundred; add an eleventh and it takes roughly nine from each existing node. Only those partitions move. Riak, Elasticsearch and Couchbase do this. The catch is that the count is chosen at creation and is painful to change, so you are guessing at your eventual scale. Second, dynamic partitioning. Start with few partitions and split one when it exceeds a size threshold, merging them back when they shrink. HBase and MongoDB do this, and it adapts to the actual data volume. The catch is the beginning: with one partition, one node is doing all the work until the first split, so these systems let you pre-split an empty database. Third, a fixed number of partitions per node, which is what Cassandra does — when a node joins, it randomly picks some existing partitions to split and takes half of each. And one operational point that matters more than any of the three. Fully automatic rebalancing is dangerous, because it combines with automatic failure detection in a bad way. A node is slow, so the system declares it dead and starts moving its partitions elsewhere — which adds enormous network and disk load to an already overloaded cluster, making other nodes look slow too. That is a cascading failure, and it is why most systems keep a human in the loop: the cluster proposes the rebalance, and an operator confirms it.",
}
