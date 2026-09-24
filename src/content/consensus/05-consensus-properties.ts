import type { Section } from '../types'

export const consensusProperties: Section = {
  id: 'consensus-properties',
  title: 'What consensus actually requires',
  scene: 'consensus-properties',
  focus: 'flp',
  slide: `## What consensus actually requires

*"Several nodes agree on something"* is too vague. Four properties — and the fourth is a different kind of thing.

### Three safety properties
- **Agreement** — no two nodes decide differently
- **Integrity** — no node decides twice
- **Validity** — the decided value was proposed. This rules out always answering 42

Safety holds **always**, including mid-partition with half the nodes down.

### One liveness property
- **Termination** — every node that does not crash eventually decides

### The FLP result
- In a **fully asynchronous** model, consensus is provably impossible
- Real algorithms escape it with **timeouts** — assuming something about time`,
  narration:
    "So let us define the problem properly, because several nodes agree on something is too vague to build on. Consensus requires four properties. The first three are safety properties. Agreement: no two nodes decide on different values. That is the core of it — if two nodes disagree about who the leader is, you have split brain. Integrity: no node decides twice. Once you have made a decision, you cannot change your mind, because other things have been built on it. Validity: if a node decides on value v, then v was proposed by some node. That sounds like a technicality and it is doing real work — it rules out the algorithm that ignores every input and always answers forty-two, which would otherwise satisfy agreement and integrity perfectly. Safety properties have to hold at all times, including while the network is partitioned, while half the nodes are down, and while messages are being delivered out of order. There is no window in which they may be violated. The fourth property is different in kind. Termination: every node that does not crash eventually decides something. This is a liveness property, and it is what makes the whole thing useful, because an algorithm that simply never decides anything satisfies all three safety properties flawlessly and is worthless. Termination is where fault tolerance lives: if a node crashes, the remaining nodes must still reach a decision, which means you cannot wait for everyone. And now the famous result, which is worth knowing precisely because it is so often misstated. Fischer, Lynch and Paterson proved in 1985 that in a fully asynchronous system — no clocks, no timeouts, nodes that may crash — there is no algorithm that always solves consensus. The proof is short and the intuition is that you can never distinguish a crashed node from a slow one, which is course seven's central fact, so any algorithm can be stalled indefinitely by an adversarial schedule. Now, what that does not mean is that consensus is impossible in practice, and this is the misstatement. It means it is impossible in that particular model. Real algorithms are allowed to use timeouts, and with timeouts consensus is entirely achievable — which is what Raft and Paxos do. The theorem's practical residue is that every one of them has a timeout you have to tune, and it is the reason course seven spent a whole section on why there is no right value.",
}
