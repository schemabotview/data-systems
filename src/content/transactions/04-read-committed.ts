import type { Section } from '../types'

export const readCommitted: Section = {
  id: 'read-committed',
  title: 'Read committed',
  scene: 'read-committed',
  slide: `## Read committed

The most common default — Postgres, Oracle, SQL Server. Defined entirely by **two things it forbids**.

### No dirty reads
- You only ever see data that has been **committed**
- Otherwise you could act on a value that is about to be rolled back, or see half of someone's multi-row write

### No dirty writes
- You only ever overwrite data that has been **committed**
- Mechanism: a **row lock**, held until the writing transaction ends. The second writer waits

### Note the mechanisms are different, deliberately
- Dirty reads are **not** stopped with a read lock — one long writer would block every reader
- Instead the engine keeps the **old committed value** and serves that
- Which is the seed of the next section`,
  narration:
    "The most common default isolation level, in Postgres, Oracle, SQL Server and many others, is read committed. It makes exactly two guarantees, and it is easiest to understand as two things it forbids. First: no dirty reads. You will only ever see data that has been committed. Why does that matter? Two reasons. If a transaction writes several rows and you can see some of them before it commits, you are seeing a state that never validly existed — the debit without the credit. And if the transaction then aborts, you acted on a value that was rolled back, which means you have made a decision on data that officially never existed. Second: no dirty writes. You will only ever overwrite data that has been committed. Without this, two concurrent transactions each writing two rows could interleave so that row one has the first transaction's value and row two has the second's — a combination neither transaction ever intended. The mechanism here is straightforward: a row-level lock, taken when a transaction writes a row and held until it commits or aborts. A second writer to that row simply waits. Now here is the detail worth noticing, because it drives the rest of the course. The two guarantees use different mechanisms on purpose. You might think dirty reads could be prevented with the same lock — take a read lock, wait for the writer. But that would mean one long-running write transaction blocks every reader of that row, which is a disaster for latency: a single slow transaction stalls the whole application. So instead the database remembers the old committed value alongside the new uncommitted one, and serves the old value to any reader until the writer commits. Readers never wait for writers, and writers never wait for readers. Hold on to that idea, because generalising it is the next section.",
}
