import type { Section } from '../types'

export const followerFailure: Section = {
  id: 'follower-failure',
  title: 'When a follower fails',
  scene: 'follower-failure',
  focus: 'reconnect',
  slide: `## When a follower fails

The easy one — and worth doing precisely because it costs nothing.

### Catch-up recovery
- The follower keeps its **own log** of what it applied
- On restart it knows the **last transaction** it processed
- It reconnects, asks for *"everything since position N"*, and rejoins

### Why it is so cheap
- No election, no coordination, **no client ever notices**
- It is §4 with the copy skipped — and the same path covers a crash, a reboot and an hour of network loss

### The only real cost
- The leader had to **retain** that part of the log while it was away
- Gone too long and the log is recycled — now it needs a full snapshot`,
  narration:
    "Failures split into two cases that are wildly different in difficulty, and this is the easy one. A follower crashes, or reboots for a kernel patch, or its network link drops for an hour. What happens? The follower keeps its own log on disk of the changes it has applied, so when it comes back it knows exactly which transaction it processed last. It reconnects to the leader and says: send me everything since position N. The leader does, the follower applies that backlog, catches up, and carries on as if nothing happened. That is called catch-up recovery, and notice how little is involved. There is no election. There is no coordination between nodes. No client ever notices anything, because the other replicas were serving reads the whole time. It is literally the last two steps of the previous section with the file copy skipped, and the exact same code path handles a crash, a planned reboot, and an hour of network partition — the follower does not need to know which happened. There is one real cost, and it bites in practice more than people expect. While the follower was away, the leader had to keep that portion of the replication log around so it could be sent later. Logs get recycled to reclaim disk, so if a follower is gone long enough — and the threshold is a configuration setting, often smaller than you would like — the leader will have discarded the segment it needs. At that point catch-up is impossible and the follower has to be rebuilt from a full snapshot. Which is survivable, but it is hours instead of seconds, and it usually happens at the worst moment. Now the hard case.",
}
