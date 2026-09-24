import type { Section } from '../types'

export const theCost: Section = {
  id: 'the-cost',
  title: 'The cost, and what CAP really says',
  scene: 'the-cost',
  focus: 'cap',
  slide: `## The cost, and what CAP really says

A partition happens. **You did not get a vote.** Now one side of the split has to choose.

### The choice
- **Stay available** — answer, possibly with stale data
- **Stay linearizable** — refuse to answer until it heals
- No third option, and this part **is** a theorem

### What CAP does not say
- *"Pick two of three"* is meaningless — **you never get to decline partitions**
- It covers linearizability only, during a partition only, and says nothing about latency

### The bigger reason nobody uses it
- Even on a healthy network, a linearizable write **waits for a majority**
- Across regions that is tens of milliseconds, on every operation
- Most systems decline linearizability for **speed**, not availability`,
  narration:
    "Now the cost, and this is where CAP comes in — a theorem that is quoted constantly and understood rarely. Start with the situation. A network partition happens: some nodes cannot reach others. You did not choose this and you cannot prevent it; cables get cut, switches get misconfigured, and a partition is a fact about the world. Now consider a client that can only reach the minority side of the split. That side has two options. It can answer the request with the data it has, which may be stale because it cannot see the writes happening on the other side — so it stays available and is not linearizable. Or it can refuse to answer until the partition heals, which keeps linearizability intact and makes the system unavailable for that client. There is no third option, and that part genuinely is a theorem: you cannot be both linearizable and available when the network is partitioned. Now what CAP does not say, because the popular version does real damage. It is usually stated as pick two of consistency, availability and partition tolerance — as though you could build a system that declines partitions. You cannot. Partitions are not a feature you enable; they happen to you. So the choice is never among three things, it is between two, and only during a partition. CAP is also narrower than people think: the C is specifically linearizability, not the C in ACID, not consistency in any general sense. And it says nothing at all about latency, which is what you actually experience most days. Martin Kleppmann has argued the acronym is misleading enough that it should be retired, and that is a fair position. Here is the part that matters more in practice anyway. Most systems that are not linearizable did not give it up for availability. They gave it up for speed. Even when the network is perfectly healthy, a linearizable write has to wait for a majority of nodes to acknowledge it. If those nodes are in different regions, that is tens of milliseconds on every single operation, forever. Multiprocessor CPUs make the same trade internally, incidentally — each core has its own cache, and memory is not linearizable by default unless you use a memory barrier, for exactly the same performance reason. Linearizability is slow, always, and that is why it is rationed.",
}
