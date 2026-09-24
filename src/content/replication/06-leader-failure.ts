import type { Section } from '../types'

export const leaderFailure: Section = {
  id: 'leader-failure',
  title: 'When the leader fails',
  scene: 'leader-failure',
  focus: 'detect',
  slide: `## When the leader fails

Failover. Three mechanical steps, and **four ways it goes wrong** — all from one root cause.

### The steps
1. **Decide it is dead.** There is no signal. Just a timeout
2. **Choose a new leader** — usually the most up-to-date follower
3. **Reconfigure** clients, followers, and the old leader

### The four failure modes
- **Lost writes.** GitHub lost data this way in 2012 — a stale replica was promoted, and its auto-increment IDs collided with live ones
- **Split brain.** The old leader returns, still believing it leads
- **Timeout too short** — a load spike forces a needless failover
- **Timeout too long** — a real outage lasts longer

**You cannot tell a dead node from a slow one.**`,
  narration:
    "Now the hard case: the leader fails. The process is called failover, and it is where real outages live. Three steps. First, decide the leader is dead. And here is the thing — there is no signal for this. No node sends a message saying I have crashed. All you have is a timeout: the leader has not responded in thirty seconds, so we will assume it is gone. Second, choose a new leader, usually by election among the followers, and usually the one with the most recent data, because that loses the least. Third, reconfigure the system: clients must send writes to the new node, the other followers must follow it, and crucially, the old leader must be told it is no longer in charge if and when it comes back. Now the four ways this goes wrong. Number one: lost writes. With asynchronous replication, the old leader may have acknowledged writes the new leader never received. When the old node rejoins, those writes conflict with what has happened since, and the usual resolution is to discard them — writes a client was told had succeeded. GitHub had a well-documented incident exactly like this in 2012, where a promoted MySQL replica was not fully caught up, and its stale auto-increment counter handed out primary keys that had already been used, which meant private data was served to the wrong users. Number two: split brain. The old leader comes back and still believes it is the leader. Now two nodes accept writes, and unless something forcibly shuts one down, you are corrupting data — and the shutdown mechanism itself can go wrong, in one famous configuration shutting down both nodes. Number three and four are the same dial. Set the timeout too short and an ordinary load spike triggers a failover you did not need, which is itself disruptive and can cascade into a loop. Set it too long and every genuine leader failure means that much more downtime. And every one of these four has the same root. You cannot distinguish a dead node from a slow node. Not because the software is not good enough — because a network does not offer that information. Course seven is entirely about what follows from that.",
}
