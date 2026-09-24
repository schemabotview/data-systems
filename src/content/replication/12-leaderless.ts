import type { Section } from '../types'

export const leaderless: Section = {
  id: 'leaderless',
  title: 'Leaderless replication and quorums',
  scene: 'leaderless',
  focus: 'read',
  slide: `## Leaderless replication and quorums

Dynamo, Cassandra, Riak. **No leader at all** — the client writes to every replica and counts the acknowledgements.

### The inequality that makes it work
- \`n\` replicas · write needs \`w\` acks · read needs \`r\` replies
- If **w + r > n**, the write set and the read set must **overlap**
- So every read touches a replica that saw the write; **version numbers** decide the rest
- Typical: n=3, w=2, r=2. One node down, nothing stops

### Why it is appealing
- A dead node needs **no failover** — no election, no split brain
- The failure mode is *worse latency*, not an outage

### And the catch
- **Read repair** and **anti-entropy** bring stragglers back
- Quorums are **probabilistic, not a guarantee**`,
  narration:
    "Third and last design: no leader at all. Amazon's Dynamo paper made this famous, and Cassandra, Riak and Voldemort followed it. The client sends every write to every replica directly, and counts how many acknowledge. Here is the arithmetic that makes it work, and it is the whole idea. Say you have n replicas. On a write you send to all of them and require w acknowledgements before calling it successful. On a read you query all of them and wait for r responses. If w plus r is greater than n, then the set of replicas that accepted the write and the set that answered the read must overlap in at least one node — by pigeonhole. So every read is guaranteed to reach at least one replica holding the latest value, and since every value carries a version number, the client can tell which of the responses is current and discard the stale ones. The usual configuration is n equals three, w equals two, r equals two. Two plus two is four, which is greater than three, so the guarantee holds — and any one node can be down without stopping either reads or writes. And that is the appeal. There is no failover at all. No election, no promotion, no split brain, no timeout to tune, because there was never a special node to lose. A dead replica means slightly worse latency, not an outage — which for an always-on shopping cart was exactly the trade Amazon wanted. Two mechanisms bring a lagging replica back. Read repair: when a client reads and notices one replica returned an old version, it writes the current value back to it. That works well for frequently-read data and does nothing for data nobody reads. So there is also anti-entropy: a background process that continuously compares replicas and copies missing values, typically using Merkle trees so the comparison is cheap. Now the catch, and it is important because the arithmetic looks like a proof. Quorums are probabilistic, not a guarantee. If a write fails after reaching only one node it is not rolled back, so a later read may or may not see it. If two writes happen concurrently the overlap tells you nothing about which should win. And under a network partition, systems often use sloppy quorums, accepting writes on any reachable nodes rather than the designated ones — which increases availability and means the w nodes and the r nodes may not intersect at all. The inequality is a good heuristic. It is not a proof of anything, and course eight is where we find out what an actual guarantee would cost.",
}
