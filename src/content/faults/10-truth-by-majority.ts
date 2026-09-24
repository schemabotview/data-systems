import type { Section } from '../types'

export const truthByMajority: Section = {
  id: 'truth-by-majority',
  title: 'Truth is defined by the majority',
  scene: 'truth-by-majority',
  focus: 'quorum',
  slide: `## Truth is defined by the majority

If no node can be trusted about itself, who decides? **A quorum does — and the node gets no vote.**

### The rule
- A decision needs **more than half** the nodes
- More than half means **two quorums always overlap**, so they cannot decide opposite things
- Declared dead is dead, whatever you believe. Comply, or be fenced

### The one-sided-network case
- A node that receives but cannot send is alive, healthy and unreachable
- It is right about itself, and **the majority still counts**

### The assumption underneath everything
- **Nodes may be unreliable, but they do not lie**
- Tolerating liars is the **byzantine** problem: 3f+1 nodes for f liars, and you pay that in aerospace and blockchains, not in your datacentre`,
  narration:
    "So let us pull this together. No node can be trusted to know whether it is still the leader, whether it has been paused, or even whether the rest of the system can reach it. If nobody can be trusted individually, who decides what is true? The answer is a quorum: a majority of nodes. A decision requires more than half of them to agree, and the reason it is strictly more than half rather than some other fraction is elegant — two groups each containing more than half the nodes must share at least one member, so two different majorities can never decide opposite things. That overlap is the entire guarantee. And the rule that follows is blunt. If a majority of nodes declares a node dead, then that node is dead, whatever it thinks. If it turns out to be alive, it must comply with the decision — step down, stop serving — or be fenced out by the mechanism in the last section. Its own opinion of its health simply does not enter into it. There is a case that makes this vivid. Imagine a node with a network interface that can receive packets but not send them. It is running perfectly. It sees every heartbeat from everyone else. It knows for certain that it is alive and healthy. And nobody else can hear it, so the majority declares it dead and elects a replacement. The node is completely correct about itself and completely wrong about its status in the system, and the majority is what counts. Finally, the assumption sitting underneath all of this, which is worth stating explicitly because it bounds everything in these courses. We assume nodes can be unreliable but do not lie. Messages get delayed, dropped, duplicated and reordered — they do not get forged. A node may be slow or dead; it does not send deliberately false information. Systems that tolerate lying nodes are called byzantine fault tolerant, and they are much more expensive: you need three f plus one nodes to tolerate f liars, and the protocols are far more complex. That cost is worth paying in aerospace, in defence systems, and in blockchains where the participants are mutually distrustful strangers. Inside your own datacentre, where you control every machine, assuming honesty is the right engineering call — and everything in courses eight and nine is built on it.",
}
