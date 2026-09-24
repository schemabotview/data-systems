import type { Section } from '../types'

export const atomicCommit: Section = {
  id: 'atomic-commit',
  title: 'Atomic commit across nodes',
  scene: 'atomic-commit',
  focus: 'm-no',
  slide: `## Atomic commit across nodes

Course 06 gave you atomicity **on one machine**. Across several, it is a different problem.

### Why one node is easy
- The data is already written; the commit is **one small log record**
- That single disk write **is** the commit point — before it nothing, after it everything

### Why several nodes are not
- Each node writes its own log, at its own moment. **There is no single write to be the commit point**
- And a *yes* is **irrevocable**: once a node commits, others have read the value
- So you cannot commit optimistically and undo it later

### The requirement
- **All nodes commit, or none do** — agreed over a network where some may crash mid-decision`,
  narration:
    "Course six gave us transactions on a single machine, and the commit was almost anticlimactic: the data has already been written to the log, and committing is one small record saying this transaction is done. That single disk write is the commit point. Before it, the transaction never happened; after it, it definitely did. There is no in-between state, because a disk write either lands or it does not, and the recovery process knows how to tell. Now spread the transaction across three machines — maybe three partitions of one database, maybe a database and a message queue. Each machine has its own log and does its own write, at its own moment. And immediately the structure that made it easy has gone, because there is no single write to serve as the commit point. There is no instant at which the transaction goes from not-committed to committed everywhere. And there is a second property that makes this genuinely hard rather than merely fiddly: a commit cannot be undone. Once a node has committed, the data is visible, and other transactions may already have read it and made decisions on it. You cannot go back and say, actually, node two failed, so let us un-commit. In course six, aborting was always available right up to the commit point; here, once any node has committed, abort is off the table permanently. So the requirement is: all nodes commit, or none of them do. And they have to reach that agreement over an unreliable network, where messages are lost, where nodes crash midway, and where — as course seven established — you cannot tell a dead node from a slow one. That is the atomic commit problem, and the classic algorithm for it is next.",
}
