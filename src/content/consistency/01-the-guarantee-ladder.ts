import type { Section } from '../types'

export const theGuaranteeLadder: Section = {
  id: 'the-guarantee-ladder',
  title: 'The guarantee ladder',
  scene: 'guarantee-ladder',
  focus: 'lin',
  slide: `## The guarantee ladder

Courses 04 to 07 built a system full of stale reads, conflicts and skew. **This course asks what a real guarantee would cost.**

### Three rings, each inside the last
- **Eventual consistency** — stop writing and the replicas converge. Says **nothing** about when, so any read may be arbitrarily old
- **Causal consistency** — effects never appear before their causes. Preserves what matters, and permits concurrent writes to be seen in any order
- **Linearizable** — behaves as if there were exactly **one copy**

### Reading the nesting
- Every linearizable system is causal; every causal system is eventual
- Each ring inwards buys a stronger promise and costs **more coordination**
- The innermost one costs **availability during a partition**, which is §5`,
  narration:
    "The last four courses built a system that is full of holes. Replicas lag, so a user does not see their own comment. Multi-leader setups accept conflicting writes. Clocks skew, so last-write-wins discards the later write. Every one of those was a consequence of a design decision that bought something else — throughput, availability, latency. This course asks the opposite question: what would a real guarantee cost, and what exactly would it guarantee? There are three levels worth naming, and they nest inside one another. The outermost is eventual consistency, which is what most distributed databases give you by default. It promises that if you stop writing and wait long enough, all replicas converge on the same value. Notice how weak that is. It says nothing about how long, and it says nothing about what you might read in the meantime. A read can return an arbitrarily old value and the system is still, technically, correct. Kyle Kingsbury has pointed out that a better name would be “eventually, probably, converges“ — as a guarantee it is almost vacuous. Inside that is causal consistency. It promises that if one thing caused another, everyone sees them in that order. A question always appears before its answer; a comment always appears after the post it is on. But two events that are genuinely unrelated can be seen in different orders by different observers, and that is fine, because nobody can tell. Causal consistency preserves what matters and leaves the rest free. And inside that is linearizability, the strongest of the three: the system behaves as if there were exactly one copy of the data, and every operation happened at one instant. No lag, no staleness, no ambiguity. Now read the nesting, because it is the shape of the whole course. Every linearizable system is also causal, and every causal system is also eventual. Each ring inwards is a stronger promise, and each costs more coordination between nodes. And the innermost ring has a particular price: during a network partition, you cannot have it and stay available. That result is section five.",
}
