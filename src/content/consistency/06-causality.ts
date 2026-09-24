import type { Section } from '../types'

export const causality: Section = {
  id: 'causality',
  title: 'Causality is a partial order',
  scene: 'causality',
  focus: 'def',
  slide: `## Causality is a partial order

If linearizability is too expensive, what is the strongest thing that is not? **Causality** — and it is much cheaper.

### Happens-before
- A **happens-before** B if B could have been influenced by A
- Ada asks → Ben reads → Ben answers. Each depends on the last

### Concurrent is not simultaneous
- If neither A → B nor B → A, the two are **concurrent**
- That is about **information flow**, not time. Two events a week apart are concurrent if neither writer knew of the other

### Why this is the useful level
- Enough to stop every anomaly in course 04 — read-your-writes, monotonic reads and consistent prefix are all **causal**
- And unlike linearizability, it **survives a partition**`,
  narration:
    "If linearizability is that expensive, the natural question is what the strongest useful guarantee below it is. The answer is causality, and it is much cheaper for a reason worth understanding. Start with the relation. Event A happens-before event B if B could possibly have been influenced by A — if there is any chain of information flow from one to the other. Ada asks a question. Ben reads Ada's question. Ben posts an answer. Each of those depends on the previous one, so they are causally ordered, and we write A arrow B. Now the important half, and it is the part that trips people up. If neither A happens-before B nor B happens-before A, the two events are concurrent. And concurrent does not mean simultaneous. It is not a claim about time at all — it is a claim about information. Two events that occurred a week apart are still concurrent in this sense if neither writer had any way of knowing about the other. Conversely two events a microsecond apart are causally ordered if the second one read the first. Causality is about what could have influenced what, and that is why physical clocks are the wrong tool for it, as course seven showed. So causality gives you a partial order: some pairs of events are ordered and some are simply not comparable, and the mathematics is comfortable with that. Linearizability, by contrast, gives you a total order — every pair of operations is comparable, because the system behaves as though there is one copy and one timeline. That is stronger, and paying for it means ordering pairs of events that nobody ever needed ordered. Here is why causality is the useful level. It is strong enough to eliminate every anomaly from course four. Read-your-writes is causal: your read depends on your write. Monotonic reads is causal: your second read should not precede your first. Consistent prefix is causal: the answer must not arrive before the question. All three are consequences of causal consistency, and you get them for free. And unlike linearizability, causal consistency can be maintained during a network partition — a system can keep accepting reads and writes on both sides and still never show you an effect before its cause. So the natural question becomes: how do you actually track it?",
}
