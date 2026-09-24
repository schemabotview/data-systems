import type { Section } from '../types'

export const linearizability: Section = {
  id: 'linearizability',
  title: 'Linearizability',
  scene: 'linearizability',
  focus: 'rule',
  slide: `## Linearizability

**Make the system look like it has exactly one copy of the data**, even though it does not.

### The definition
- Every operation appears to take effect **at one instant**, between when it was sent and when it returned
- The illusion is total: **no sequence of reads can reveal that replicas exist**

### The operational rule
- There is a moment when the value **flips** from old to new
- **Once any reader has seen the new value, no reader may see the old one again** — not a different client, not on a different replica

### What it is not
- **Not serializability.** That is transactions over many objects (course 06)
- This is **one object** and **recency**. Spanner and CockroachDB are both`,
  narration:
    "Linearizability is the strongest single-object guarantee, and the cleanest way to state it is as an illusion: make the system behave as though there is exactly one copy of the data, even though there are five replicas across three datacentres. More precisely, every operation appears to take effect at a single instant, somewhere between the moment the client sent it and the moment it got a response. And the illusion has to be total — no sequence of reads by any combination of clients can ever reveal that the copies exist. You will see this called several other things: atomic consistency, strong consistency, immediate consistency, external consistency. They mean the same property. Now, the operational way to hold it in your head, which is what you actually reason with. There is some moment at which the value flips from old to new. And once any reader anywhere has seen the new value, no reader anywhere may see the old one again — not a different client, not on a different replica, not a microsecond later. The flip is a fact about the entire system, not about the node you happen to be talking to. If that rule holds, the system is linearizable; if you can construct a sequence of observations that violates it, it is not. And one distinction worth getting right, because these two words get swapped constantly. Serializability, from course six, is about transactions: several transactions each touching several objects behave as though they ran one after another in some order. Linearizability is about one object and about recency — the read returns the most recent value, and there is a meaningful notion of “most recent“. They are genuinely different properties and a system can have either without the other. If it has both, which CockroachDB and Google's Spanner do, that is sometimes called strict serializability. The next section is how you actually test for the property, because “looks like one copy“ is not something you can check directly.",
}
