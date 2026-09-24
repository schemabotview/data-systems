import type { Section } from '../types'

export const membershipChange: Section = {
  id: 'membership-change',
  title: 'Changing the membership',
  scene: 'membership-change',
  focus: 'danger',
  slide: `## Changing the membership

Growing a cluster from three nodes to five looks routine. **It is the subtlest part of the algorithm.**

### Why it is dangerous
- "A majority" is defined **relative to the membership**, and that is changing
- Nodes learn the new configuration at **different moments** — it is itself a log entry
- So briefly, two of the old three are a majority, and three of the new five are
- **Two disjoint majorities → two leaders**, from a routine operation

### Joint consensus
- During the transition, a decision needs a majority of the **old** configuration **and** of the **new** one
- Two conditions, so the groups **must** overlap and the window closes

### In practice
- Change **one node at a time** — then old and new majorities always overlap anyway`,
  narration:
    "Adding a node to a cluster sounds like an operational chore rather than an algorithmic problem. It is in fact one of the subtlest parts of any consensus algorithm, and it is where several real implementations have had bugs. Here is why. Everything so far has depended on majorities, and a majority is defined relative to the set of members. With three nodes, a majority is two. With five, a majority is three. Now suppose you are growing from three to five. The nodes do not learn about the new configuration simultaneously — the configuration change is itself an entry in the log, and it propagates like any other entry, reaching different nodes at different times. So for a window, some nodes believe the cluster has three members and some believe it has five. And now count. Two nodes that still think the cluster is three can form what they believe is a valid majority and elect a leader. Three nodes that already know the cluster is five can form what they believe is a valid majority and elect a different leader. Those two groups can be entirely disjoint. So you have two leaders, both correctly following the protocol as they understand it, and you have split brain — produced by a routine capacity change rather than by any failure. The standard fix is joint consensus, and the idea is neat. During the transition, the cluster enters a state where a decision requires a majority of the old configuration and a majority of the new configuration, both at once. Because two conditions must be satisfied, no group can decide anything without including nodes that overlap with any other deciding group, and the dangerous window closes. Once every node has the joint configuration committed, the cluster moves to the new configuration alone and the transition is complete. There is also a simpler practical rule that most operators follow and most documentation recommends: change membership one node at a time. Going from three to four, the old majority is two and the new is three, and any two-node group and any three-node group out of four must share a member. So the overlap is guaranteed without any special protocol. It takes two steps to go from three to five instead of one, and it is much harder to get wrong.",
}
