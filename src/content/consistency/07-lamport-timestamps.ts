import type { Section } from '../types'

export const lamportTimestamps: Section = {
  id: 'lamport-timestamps',
  title: 'Lamport timestamps',
  scene: 'lamport-timestamps',
  focus: 'cannot',
  slide: `## Lamport timestamps

A total order that **respects causality**, built from a counter — no clocks involved.

### The algorithm
- Each node keeps a counter, incremented on every local event
- **Every message carries the sender's counter**
- On receipt: \`counter = max(counter, received) + 1\`
- Order by \`(counter, node id)\` — the id only breaks ties

### Why the \`max\` is the whole idea
- Receiving a message **drags your counter past the sender's**
- So if A caused B, B's stamp is larger. **Causality, in one integer**
- Nothing here can skew, unlike a wall clock

### The limitation that needs §8
- The order only emerges **once all the messages have arrived**`,
  narration:
    "So how do you track causality without clocks? Leslie Lamport published the answer in 1978, in one of the most-cited papers in computer science, and the algorithm is three lines. Each node keeps a counter. Every time something happens locally, increment it. Every message you send carries your current counter value. And when you receive a message, you set your counter to the maximum of your own value and the one in the message, then add one. That is it. Then you order events by the pair of counter and node ID, where the node ID is only there to break ties between two events that happen to land on the same counter value. Now, why does that work? The max is doing all the work. When you receive a message, your counter jumps forward past the sender's, which encodes the fact that you have now seen everything the sender had seen. So if A causally precedes B, then B's counter is strictly greater than A's, always — the information about A had to flow to B for the causality to exist in the first place, and that flow carried the counter with it. One integer per node, and causality is preserved. And note what is not involved: no clocks. Nothing here can skew, drift, or step backwards, which is exactly the failure that made last-write-wins lose data in course seven. A logical counter is not measuring anything physical, so there is nothing for it to be wrong about. Lamport timestamps give you a total order — every pair of events is comparable — and it is consistent with causality, meaning it never contradicts the partial order, though it does impose an arbitrary order on events that were genuinely concurrent. Now the limitation, and it is the reason there is another section. The order only emerges once all the messages have been exchanged. If two users try to claim the same username at the same instant, Lamport timestamps will eventually tell you which one came first — but eventually is too late. You needed to know at the moment of the request, so you could tell the loser no. Finding out afterwards that you granted the same username twice is not a solution. To decide as it happens, you need the order fixed at the moment a message is delivered, not reconstructed later. And that primitive has a name.",
}
