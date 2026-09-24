import type { Section } from '../types'

export const raftLeaderElection: Section = {
  id: 'raft-leader-election',
  title: 'Raft: electing a leader',
  scene: 'raft-leader-election',
  focus: 'log',
  slide: `## Raft: electing a leader

Raft was designed in 2013 to be **understandable** — a legitimate goal, and why it has largely displaced Paxos in new systems.

### Three states
- **Follower** (default) · **candidate** (standing) · **leader**

### The election
- A follower hears no heartbeat for **150–300 ms** and becomes a candidate
- It raises the term, votes for itself, and asks everyone for a vote
- A majority makes it leader, and it starts sending heartbeats

### The two details that make it work
- **The timeout is randomised, per node.** Otherwise every follower stands at the same instant, splits the vote, and the cycle repeats forever
- **A voter checks the candidate's log is at least as complete as its own** — so a node missing committed entries can never win`,
  narration:
    "Paxos was published in 1989 and is notoriously hard to understand — Lamport's original paper was written as an allegory about a Greek parliament, and the practical versions differ substantially from the published algorithm. In 2013, Diego Ongaro and John Ousterhout designed Raft with an explicit goal of being understandable, and it worked: Raft is now what most new systems use, including etcd, Consul and TiKV. Here is the election. A node is in one of three states: follower, which is the default; candidate, meaning it is trying to be elected; or leader. The leader sends periodic heartbeats to everyone, and as long as those keep arriving, followers stay followers. If a follower hears nothing for its election timeout — typically somewhere between a hundred and fifty and three hundred milliseconds — it assumes the leader is gone. It increments the term number, switches to candidate, votes for itself, and asks every other node for a vote. Each node gets one vote per term, and gives it to the first qualifying candidate that asks. Win a majority and you are the leader; start sending heartbeats immediately so nobody else starts an election. Two details make this actually work, and both are worth knowing. The first is that the election timeout is randomised, independently on each node. If every follower used exactly the same timeout, they would all become candidates at the same instant, all vote for themselves, nobody would get a majority, and they would all time out and try again — forever. Randomising means one node almost always times out first and wins before the others have started. It is a tiny detail and the algorithm does not terminate without it. The second detail is the safety one. A node only grants its vote if the candidate's log is at least as up to date as its own — a comparison of the last entry's term and index. So a node that is missing committed entries cannot be elected, because a majority of nodes have those entries and will all refuse it. That single rule is why leader election in Raft never loses committed data, which is exactly the failure mode that took down GitHub in course four, section six.",
}
