import type { Section } from '../types'

export const epochsAndQuorums: Section = {
  id: 'epochs-and-quorums',
  title: 'Epochs and quorums',
  scene: 'epochs-and-quorums',
  focus: 'overlap',
  slide: `## Epochs and quorums

Every consensus algorithm — Paxos, Raft, Zab, VSR — is built from the same two pieces.

### An epoch number
- Every election **raises a number** that only increases
- It is the **fencing token of course 07**, applied to leadership

### A quorum
- The leader decides nothing alone: it collects votes from a **majority**
- A node only votes if it has not already voted in a **higher** epoch

### Why the two together suffice
- Two majorities **always overlap**, so the shared node refuses the older epoch
- An old leader can come back **utterly convinced** and commit nothing
- **Two rounds of voting**: once to elect, once per decision`,
  narration:
    "Every consensus algorithm in real use — Paxos, Raft, Zab in ZooKeeper, Viewstamped Replication — is built from the same two mechanisms, and once you see them the individual algorithms become variations rather than separate subjects. The first is an epoch number. Every time an election happens, the number goes up, and it only ever goes up. Raft calls it a term, Paxos calls it a ballot number, Viewstamped Replication calls it a view number, Zab calls it an epoch, and they are the same thing. You have met it before: it is the fencing token from course seven, applied to leadership rather than to a lock. And its job is the same — to let everyone else recognise and ignore a leader from an earlier era. The second is the quorum. A leader does not get to decide anything on its own authority. Before committing any decision, it must collect votes from a majority of nodes, and a node will only vote if it has not already voted in a higher epoch. Now watch why those two together are sufficient. Suppose a leader from epoch four was garbage-collecting for thirty seconds. While it was frozen, the others held an election and epoch five began. The old leader wakes up, still absolutely convinced it is the leader — nothing has told it otherwise, and as course seven showed, nothing can. It tries to commit something. To do that it needs a majority of votes. But a majority for epoch five and a majority for epoch four must share at least one node, and that node has already voted in five, so it refuses. The old leader cannot assemble a quorum, and therefore cannot commit anything at all. It is completely convinced and completely powerless, which is exactly the outcome you want. So the shape of every consensus algorithm is two rounds of voting: one to elect a leader, and then one more for every decision that leader wants to make. Which also tells you the cost — every committed decision is a network round trip to a majority, and that is why course eight said linearizability is slow even when the network is perfectly healthy.",
}
