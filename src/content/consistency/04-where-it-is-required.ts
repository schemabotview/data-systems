import type { Section } from '../types'

export const whereItIsRequired: Section = {
  id: 'where-it-is-required',
  title: 'Where you actually need it',
  scene: 'where-required',
  focus: 'example',
  slide: `## Where you actually need it

Most operations do not need linearizability. **Four do** — and each fails differently.

### The four
- **Leader election.** Two leaders is split brain. This is why ZooKeeper exists
- **Uniqueness.** One username, one seat. A stale read sells it twice
- **A balance check.** Two withdrawals against the same funds
- **Cross-channel timing** — the subtle one

### The cross-channel case
- A user uploads a photo; the server writes it, then **queues a resize job**
- The queue is fast; storage replication is not
- The worker reads a replica that **does not have the photo yet**
- The bug is in no component. **A second channel overtook the first**

Pay for it on the **few operations that need it**.`,
  narration:
    "Linearizability is expensive, so the practical question is where you genuinely cannot avoid it. There are four situations, and they are worth knowing by name. First, leader election. Everything in course four depended on exactly one node being the leader. If two nodes each believe they are the leader — because they read stale information about who holds the lock — you have split brain, and split brain corrupts data. So the lock itself has to be linearizable, which is precisely why systems like ZooKeeper and etcd exist: they are small, slow, linearizable stores that everything else uses to coordinate. Second, uniqueness constraints. One username per person, one seat per ticket, one row per primary key. If two requests both read that a username is free and both take it, you have sold the same thing twice. Third, constraints on a value, like a bank balance that must not go negative, or stock that must not go below zero. Two concurrent withdrawals both checking the same balance is the write-skew problem from course six, and at a distributed scale it needs linearizability on that value. And fourth, the subtle one: cross-channel timing dependencies. This one is worth walking through, because it looks like nothing is wrong. A user uploads a photo. The web server writes the full-size image to storage, and then puts a message on a queue asking a worker to make a thumbnail. Both of those are sensible. But the message queue is fast and internal, while the storage system replicates asynchronously. So the worker picks up the job almost instantly, reads from a storage replica that has not received the photo yet, and either errors or produces a thumbnail of nothing. Look at where the bug is. It is not in the web server, not in the queue, not in the worker, and not in the storage system — each behaved exactly as documented. The problem is that there are two communication channels between the writer and the reader, and the faster one overtook the slower one. If storage were linearizable, that could not happen. The practical reading is the last line. Most of your operations do not need any of this. A handful do. Identify which, and pay the cost there rather than everywhere.",
}
