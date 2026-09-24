import type { Section } from '../types'

export const multiLeader: Section = {
  id: 'multi-leader',
  title: 'Multi-leader replication',
  scene: 'multi-leader',
  focus: 'conflict',
  slide: `## Multi-leader replication

More than one node accepts writes, and the leaders replicate to **each other**. You give up the guarantee that made §2 simple.

### Where it genuinely fits
- **Multi-datacentre.** Writes are local and fast, and a severed link between regions stops neither side
- **Offline clients.** Your phone's calendar is a leader
- **Collaborative editing.** Google Docs is this, per keystroke

### What you traded away
- Two leaders can accept **conflicting writes to one row**, and neither knows at the time
- Auto-increment keys, uniqueness constraints and triggers all become **hazardous**
- The conflict surfaces **later, during sync** — far from the user`,
  narration:
    "Single-leader has one ceiling that is structural: one node takes all the writes. Multi-leader replication relaxes that — more than one node accepts writes, and the leaders replicate to each other as well as to their own followers. There are three situations where this genuinely fits. The first is multi-datacentre. With one leader, every write from every region crosses the internet to one place. With a leader per region, a write is fast because its leader is nearby, and if the link between regions is severed, both regions keep accepting writes and reconcile when it comes back. That tolerance is the real win — it is not just faster, it survives a partition that would take a single-leader system down. The second is clients with offline operation. The calendar app on your phone lets you add events on a plane. That is a database on your device accepting local writes, syncing later — which is exactly multi-leader replication, with every device as a leader and terrible network conditions. The third is real-time collaborative editing, and Google Docs is this pattern applied per keystroke: your local change is applied instantly, then replicated. But look at what you have traded. Two leaders can accept conflicting writes to the same row at the same moment, and neither knows about the other at the time — both writes succeed locally. The conflict surfaces later, during synchronisation, asynchronously, long after the user has moved on, which means you cannot just ask them to resolve it. And a lot of database machinery quietly assumes one leader: auto-incrementing primary keys generate duplicates, uniqueness constraints can be satisfied on both sides simultaneously and violated after the merge, and triggers fire on both sides. This is why retrofitting multi-leader onto a system designed for one leader is a well-known way to lose data. Conflict handling is the next section, and it is the whole of the difficulty.",
}
