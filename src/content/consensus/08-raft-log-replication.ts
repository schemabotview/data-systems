import type { Section } from '../types'

export const raftLogReplication: Section = {
  id: 'raft-log-replication',
  title: 'Raft: replicating the log',
  scene: 'raft-log-replication',
  focus: 'majority',
  slide: `## Raft: replicating the log

Once elected, the leader provides the total order broadcast of course 08 — **one agreed sequence, everywhere**.

### The path of one entry
1. The leader **appends it**. Not committed, not visible
2. It sends the entry with the **previous entry's index and term**, so a follower with a gap rejects it and the leader backs up until they match
3. A **majority** stores it durably — **that is the commit point**
4. Only now does the leader apply it and answer the client

### Committed and applied are different moments
- **Committed** = a majority has it durably. The point of no return
- **Applied** = the state machine has run it. Followers apply later`,
  narration:
    "Once a leader is elected, its job is to maintain the log — and what it is providing is exactly the total order broadcast from course eight. One agreed sequence of commands, identical on every node. Here is the path of a single entry. A client sends a command to the leader. The leader appends it to its own log, and at this point nothing has been committed and no client has been told anything. Then it sends the entry to every follower. And it sends it together with the index and term of the entry immediately before it, which is a small detail doing important work: if a follower's log does not match at that point, it rejects the append, and the leader walks backwards until it finds where the two logs agree, then overwrites everything after that. That mechanism is how a follower with a divergent or incomplete log gets repaired automatically, with no special case. Once a majority of nodes have stored the entry durably, the entry is committed — and that is the commit point, the moment of no return. The leader can now apply it to its state machine and tell the client it succeeded. Now, committed and applied are two different moments and the distinction matters. Committed means a majority holds it on disk and it will survive any tolerable failure, including the leader dying immediately afterwards — whoever is elected next is guaranteed to have it, because of the log-completeness check from the last section. Applied means the state machine has actually executed it and the effect is visible. The leader applies as soon as it commits; followers apply later, when they learn the entry was committed, which they do from a commit index the leader includes in its next heartbeat. Followers therefore lag slightly, and that is fine — nobody is reading from them. And here is why this generalises well beyond Raft. The log is the primitive, and the state is derived from it by applying entries in order. Any two nodes that start identical and apply the same log end up identical. That is the replicated state machine, and it is the idea the last course of this series is built on.",
}
