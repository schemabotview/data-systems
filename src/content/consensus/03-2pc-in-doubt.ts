import type { Section } from '../types'

export const twoPcInDoubt: Section = {
  id: '2pc-in-doubt',
  title: 'The coordinator dies',
  scene: 'two-pc-in-doubt',
  focus: 'wait',
  slide: `## The coordinator dies

A participant has voted **yes**. The coordinator crashes before sending the decision. **The participant is stuck** — and this is not a bug.

### Why it cannot decide for itself
- It **cannot abort** — it already promised, and others may have committed
- It **cannot commit** — another participant may have voted no

### What stuck means
- It holds its **locks** throughout. Every transaction on those rows waits
- Minutes if the coordinator restarts; **indefinitely** if its log is lost
- The last resort is a human reading logs and deciding by hand

### The structural point
- 2PC hinges on **one node with no redundancy** — which is what consensus is for`,
  narration:
    "Here is where two-phase commit breaks, and it is important to understand that this is not an implementation bug. It is a consequence of the design. A participant has voted yes. It has made its binding promise, written everything to its log, and is holding its locks. And then the coordinator crashes before it manages to send the decision. What should the participant do? It cannot abort. It promised it would commit if asked, and if it aborts unilaterally it may diverge from other participants who did receive a commit message and went ahead. It cannot commit either, because it has no idea whether everyone else voted yes — another participant may have said no, in which case the correct outcome was abort. And it cannot resolve this by asking the other participants, because the decision was the coordinator's to make, and the coordinator may have crashed before making it at all, in which case there is no answer anywhere in the system to discover. This state has a name: in doubt, or uncertain. And what stuck means in practice is that the participant is holding its locks the entire time. Every other transaction that wants those rows is blocked behind it. If the coordinator restarts quickly and reads its log, that is a few minutes of stalled writes, which is bad but survivable. If the coordinator's disk is lost, or the coordinator was an application server that has been terminated and will never come back, those locks are held indefinitely. And at that point the only remaining option is an operator connecting to each database, reading the in-doubt transaction list, working out what the decision should have been, and forcing it by hand — under pressure, from incomplete information, on a live system. Several databases provide a command specifically for that, which tells you how routinely it happens. Now step back and look at the shape. Two-phase commit makes the whole transaction depend on a single node with no redundancy, and the coordinator's log is a single point of failure holding data nobody else has. Which is precisely the class of problem consensus exists to solve. And that is what the rest of this course is.",
}
