import type { Section } from '../types'

export const totalOrderBroadcast: Section = {
  id: 'total-order-broadcast',
  title: 'Total order broadcast',
  scene: 'total-order-broadcast',
  focus: 'log',
  slide: `## Total order broadcast

The primitive that fixes §7: the order is decided **as messages are delivered**, not reconstructed afterwards.

### The definition is two guarantees
- **Reliable delivery.** If a message reaches one node, it reaches all
- **Totally ordered delivery.** Every node receives them **in the same order**
- Fixed at delivery, so the decision is available *now*

### It is a log
- A log is exactly a sequence everyone agrees on: append-only, never reordered
- **Kafka is this**, per partition. So is ZooKeeper's protocol
- One log feeding several nodes keeps them identical — a **replicated state machine**

### The same problem as course 04
- The replication log, the partition map, the leader — one agreed sequence. Agreeing on it **is consensus**`,
  narration:
    "So we need something stronger than Lamport timestamps: a way to fix the order at the moment a message is delivered, rather than working it out later. That primitive is called total order broadcast, or sometimes atomic broadcast, and its definition is two guarantees. First, reliable delivery: no message is lost. If a message is delivered to one node, it is delivered to all of them. Second, totally ordered delivery: every node receives the messages in exactly the same order. Not roughly the same, not eventually the same — the same. And crucially, that order is determined as delivery happens, so when your message comes back to you, you already know where it sits relative to everyone else's. Now look at what that actually is. A sequence of messages that everyone agrees on, that is appended to and never reordered — that is a log. This is not an analogy; it is the same object. Which is why Kafka provides exactly this within a single partition, and why ZooKeeper's Zab protocol and etcd's Raft are total order broadcast implementations. And it is why the log turns out to be the central abstraction in the whole of distributed systems, which is a claim course ten will make good on. One consequence worth spelling out. If several nodes start in the same state and apply the same sequence of deterministic operations, they end in the same state. That is a replicated state machine, and it is how consensus systems keep replicas identical: they do not replicate the data, they replicate the log and let each node compute the data. You have already seen this shape — course two's write-ahead log, course four's replication log, and now this. And notice that the problems from earlier courses are the same problem restated. What is the replication log? A sequence everyone must agree on. What is the partition map from course five? A value everyone must agree on. Who is the leader? Again, one agreed fact. All of them reduce to getting a set of unreliable machines, on an unreliable network, to agree on one sequence. That is consensus, it is course nine, and the next section shows it is also exactly equivalent to linearizability.",
}
