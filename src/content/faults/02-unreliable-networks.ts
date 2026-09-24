import type { Section } from '../types'

export const unreliableNetworks: Section = {
  id: 'unreliable-networks',
  title: 'Unreliable networks',
  scene: 'unreliable-networks',
  focus: 'know',
  slide: `## Unreliable networks

You send a request. No reply arrives. **Six genuinely different things could have happened** — and you cannot tell which.

### The six
- The **request was lost** — a cable, a full buffer, a firewall rule
- The request is **queued** and will arrive later
- The node **crashed before** doing the work
- The node **did the work and then crashed**
- The work was done and the **reply was lost**
- The reply is **delayed** and arrives in a minute

### What you actually know
- **No reply yet.** That is the whole of it
- Three of the six mean the work is **done**, so blindly retrying may do it twice — which is why idempotence keeps coming up
- And this is not rare: one study of a mid-sized datacentre found roughly **12 network faults a month**`,
  narration:
    "Here is the central fact of this course, and it is worth sitting with. You send a request to another node. No reply comes back. What happened? Six things are possible. Your request may have been lost — a cable unplugged, a switch buffer full, a firewall rule someone added. It may be sitting in a queue, and will be delivered in a moment. The remote node may have crashed before processing it. The remote node may have processed it and then crashed. The work may have completed and the reply been lost on the way back. Or the reply may simply be delayed and will arrive in a minute. Six genuinely different situations, and from where you are sitting they are all completely indistinguishable. The only information you have is: no reply yet. That is the entire contents of your knowledge. Now look at the practical bite. Three of those six mean the work was actually done. So if you time out and retry, in half the cases you are asking for something that has already happened, which is how one payment becomes two and one order becomes two. That is why idempotence appears in every course in this series — if you cannot know whether an operation happened, the only safe design is one where doing it twice is the same as doing it once. And this is not an exotic failure. A study of a medium-sized datacentre found around twelve network faults per month, about half of which disconnected a single machine and half a whole rack. Adding redundant hardware helps less than you would think, because a large share of outages are human error — a misconfigured switch. The network is unreliable, and no amount of money makes it reliable.",
}
