import type { Section } from '../types'

export const coordinationServices: Section = {
  id: 'coordination-services',
  title: 'Coordination services',
  scene: 'coordination-services',
  focus: 'outsource',
  slide: `## Coordination services

**You will almost certainly never implement consensus. You will use it constantly.** ZooKeeper and etcd exist to be that dependency.

### What they are for
- **Locks and leases** — with a fencing token, as course 07 §9 requires
- **Leader election** — course 04's failover, done correctly
- **Partition assignment** — course 05's map, somewhere everyone trusts

### The design rule
- Keep the data **tiny** — kilobytes, not gigabytes. Coordination, not storage

### Why this is the right instinct
- Kafka, HBase and Kubernetes all outsource their coordination this way
- Getting it right is a **multi-year** project with rare, catastrophic bugs`,
  narration:
    "Let us end the course somewhere practical. You are almost certainly never going to implement a consensus algorithm. You are going to use one constantly, and usually without noticing. ZooKeeper and etcd exist precisely to be that dependency: small, slow, strongly consistent stores that everything else leans on for the handful of decisions that genuinely need agreement. What are they actually for? Four things, and every one of them is a problem an earlier course left open. Locks and leases — with a fencing token, exactly as course seven required, because a lock without one does not protect you from a paused client. Leader election — this is course four's failover done correctly, with epochs and quorums rather than a timeout and hope. Membership: which nodes are alive, agreed by consensus rather than taken from any one node's opinion, which matters because course seven showed a node's opinion of itself is worthless. And partition assignment: course five's map of which partition lives where, held somewhere every router can trust. Then the design rule, and it is the one people get wrong. Keep the data in there tiny. This is coordination, not storage. Kilobytes, not gigabytes. Consensus does not scale with data volume — every single write is a network round trip to a majority of nodes, with disk syncs, so throughput is measured in thousands of operations per second rather than millions. Your actual data lives in your actual database; only the decisions about it live here. If you find yourself putting application data in ZooKeeper, that is the signal you have taken a wrong turn. And why is this the right instinct? Because Kafka does it, HBase does it, Solr does it, and Kubernetes does it — etcd is the entire state store behind a Kubernetes cluster. These are teams with the ability to implement consensus themselves, and they all chose not to. Getting it right is a multi-year effort, and the bugs are subtle, rare, and catastrophic when they fire: they show up as split brain and lost data, months later, under an unusual failure. Use something that has been Jepsen-tested to death, keep the data small, and spend your effort on the part of the system that is actually yours.",
}
