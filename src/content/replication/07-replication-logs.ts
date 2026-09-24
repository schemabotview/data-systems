import type { Section } from '../types'

export const replicationLogs: Section = {
  id: 'replication-logs',
  title: 'What the leader actually ships',
  scene: 'replication-logs',
  focus: 'logical',
  slide: `## What the leader actually ships

*"Sends the changes to the followers"* has been doing a lot of work. Four answers, not interchangeable.

### Statement-based
- Ship the SQL. Small, and **wrong** wherever a statement isn't deterministic
- \`NOW()\`, \`RAND()\`, auto-increment, triggers — each diverges the replicas

### WAL shipping
- Ship the storage engine's own log bytes. Exact — but **page-level**, so the replica is pinned to the same engine version. No rolling upgrades

### Row-based (logical)
- Ship **the resulting row values**. Larger log, and almost nothing else wrong
- Decoupled from the engine, so **anything can read it** — that is CDC

### Trigger-based
- You write the capture code. Slow and bug-prone, but the only flexible one`,
  narration:
    "I have been saying the leader sends the changes to its followers, and that phrase is doing a great deal of work. There are four ways to do it and they are genuinely different products. First, statement-based. Ship the actual SQL statement and let each follower run it. Compact, and broken in ways that took the industry a while to enumerate. Anything non-deterministic diverges the replicas: NOW returns a different time on each one, RAND returns different numbers, auto-increment columns depend on the exact order of execution, and triggers or stored procedures may have side effects that differ per node. MySQL defaulted to this before version five point one and it caused real problems. Second, write-ahead log shipping. Remember the WAL from course two — the leader already writes one for crash recovery, so just send those same bytes. It is exact, and Postgres uses it. The catch is that the WAL describes changes at the level of disk pages and byte offsets, which means it is tightly coupled to the storage engine. The replica must run an extremely similar version of the software, and that kills rolling upgrades — you cannot upgrade replicas first and then fail over, which is the standard zero-downtime technique. Third, row-based replication, also called a logical log. Ship the outcome rather than the instruction: for this table, this row, here are the new column values. Deterministic by construction, decoupled from the storage engine entirely, and the price is simply a larger log. This is the common modern choice. And it has a consequence far beyond replication: because a logical log is independent of the engine's internals, something that is not a database at all can read it — a search index, a cache, a data warehouse. That is change data capture, it is one of the most useful patterns in this whole series, and it is course ten. Fourth, trigger-based. You write application code that fires on changes and records them. It is slow and it is the easiest of the four to get wrong, but it is the only one where you choose exactly what gets replicated, which occasionally you need.",
}
