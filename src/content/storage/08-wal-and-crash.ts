import type { Section } from '../types'

export const walAndCrash: Section = {
  id: 'wal-and-crash',
  title: 'The write-ahead log',
  scene: 'wal-and-crash',
  focus: 'wal',
  slide: `## The write-ahead log

You cannot write three pages atomically. So write down **what you are about to do**, first.

### The ordering is the mechanism
1. Append the intended change to the **WAL**, then \`fsync\`
2. *Only then* modify the pages
3. Crash anywhere after step 1 and the intention survives

### Restart is replay, not repair
- Read the WAL forward, redo every change it describes
- Redoing a completed change is **harmless** — same bytes again

### What it costs, and what it buys
- Every change is written **twice** — *write amplification*
- One of the two is sequential, which is why it is affordable
- The same log later makes **transactions** and **replication** work`,
  narration:
    "You cannot atomically write three pages to a disk. So B-tree engines do not try. Instead they use a trick whose name tells you the whole idea: the write-ahead log. Before touching a single page, append a record to a separate append-only file describing what you are about to do — this page is going to change like so, that page like so. Force it to disk with fsync. Only after that is safely on disk do you go and modify the actual pages. Now think about where a crash can land. If it happens before the log record is durable, the change never happened, and the database comes back as if you never made it — which is fine, it was never acknowledged. If it happens after the log record but during the page writes, then when the database restarts it reads the log forward and redoes everything it describes. The half-finished split gets finished. And notice why replaying is safe even for changes that had already completed: redoing them writes the same bytes to the same places, which changes nothing. That property has a name, idempotence, and it is why recovery can be a dumb replay rather than clever repair. The cost is real: every change is now written twice, once to the log and once to the page. That is write amplification, and it is the main thing people mean when they say B-trees write more than LSM-trees. It is affordable because one of the two is a purely sequential append. And you get something back for it. That same log, which exists here only for crash recovery, turns out to be exactly what you need to implement transactions, and exactly what you need to ship changes to a replica — which is where courses four and six will pick it up.",
}
