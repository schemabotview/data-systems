import type { Section } from '../types'

export const syncVsAsync: Section = {
  id: 'sync-vs-async',
  title: 'Synchronous or asynchronous',
  scene: 'sync-vs-async',
  slide: `## Synchronous or asynchronous

One dial: **does the leader wait for the follower before saying "done"?** Both extremes are unacceptable.

### Fully synchronous
- The follower is **provably up to date** — no write can be lost
- But any follower that is slow or rebooting **blocks every write**
- More followers, more things that can stall you. Nobody runs this

### Fully asynchronous
- Writes are **never blocked**, however far behind a replica gets
- But an acknowledged write that hasn't shipped **dies with the leader**
- The common default: durability traded for throughput

### What everyone actually runs
- **Semi-synchronous**: one follower sync, the rest async`,
  narration:
    "There is one real dial in this design, and it is: when a write arrives, does the leader wait for its followers before telling the client the write succeeded? Take fully synchronous first. The leader applies the write, sends it to every follower, waits for all of them to confirm, and only then reports success. The guarantee is excellent — every follower is provably up to date, so no acknowledged write can ever be lost. But the failure mode is severe. If any follower is slow, or garbage collecting, or rebooting, or on the far end of a congested link, then every write in the entire system blocks until it comes back. And it gets worse as you add replicas, because each new one is another thing that can stall you. Essentially nobody runs fully synchronous replication for this reason. Now fully asynchronous. The leader applies the write and immediately tells the client it succeeded; the log ships to followers whenever it ships. Writes are never blocked, no matter how far behind a replica falls, and you can put replicas on another continent without slowing anything down. The problem is the one in the diagram: if the leader fails, any write it acknowledged but had not yet shipped is simply gone. It was durable on exactly one machine, and that machine is now the one that failed. And note the client was told it succeeded. That is a real trade, and most systems make it deliberately. What almost everyone actually runs is the compromise in between: semi-synchronous. Exactly one follower is synchronous, and the rest are asynchronous. So there are always at least two machines with the data — which covers you for a single leader failure — but only one follower can block you, and if that one falls behind, the system promotes a different follower into the synchronous role. One slow node is survivable; losing every acknowledged write is not.",
}
