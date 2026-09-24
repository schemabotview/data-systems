import type { Section } from '../types'

export const snapshotIsolation: Section = {
  id: 'snapshot-isolation',
  title: 'Snapshot isolation and MVCC',
  scene: 'snapshot-isolation',
  focus: 'rows',
  slide: `## Snapshot isolation and MVCC

Read committed still lets a **long-running read** see the database change beneath it. Snapshot isolation freezes a point in time.

### The anomaly it removes
- A long report reads account A **before** a transfer and B **after**
- The total is wrong, and nothing it read was dirty. A **read skew**

### The mechanism: keep every version
- An \`UPDATE\` is a **delete plus an insert**. Nothing changes in place
- Each version is stamped with the transaction that **created** it and the one that **deleted** it
- Visible if the creator committed before I started, and the deleter had not

### Why it is everywhere
- **Readers take no locks and block no writers**, and vice versa`,
  narration:
    "Read committed is not enough for one common situation. Imagine a backup, or a long-running report, that reads the whole database over several minutes. It reads account A, which has five hundred pounds. Meanwhile a transfer moves a hundred pounds from A to B and commits. Then the report reads account B, which now includes that hundred. Every value it read was committed — no dirty reads at all — but the report has seen a state that never existed, and the totals do not balance. That is called a read skew, or a non-repeatable read, and the fix is snapshot isolation: each transaction reads from a consistent snapshot of the database as it was at the moment that transaction started. Anything committed after that point is invisible to it, permanently, no matter how long it runs. The implementation generalises the trick from the last section. Read committed kept two versions of a row: the old committed value and the new uncommitted one. Snapshot isolation keeps many — hence the name multi-version concurrency control, MVCC. The key insight is that the database never modifies a row in place. An update is implemented as marking the old version deleted and inserting a new one, and every version carries two stamps: the ID of the transaction that created it, and the ID of the transaction that deleted it, if any. Then visibility is a rule rather than a lock. A transaction can see a row version if the transaction that created it committed before this one started, and the transaction that deleted it had not committed by then. Apply that rule and you get a coherent view of the database frozen at one instant, reconstructed on the fly from the versions lying around. And the property that makes this so widely deployed is the one at the bottom. Readers do not take locks, so they never block writers, and writers never block readers. A ten-minute analytical query costs you a long-lived snapshot and some extra versions the garbage collector cannot yet clean up — it does not stall your application. Postgres, MySQL's InnoDB, Oracle and SQL Server all implement some form of this, and they all call it something different, which is the subject of the last section.",
}
