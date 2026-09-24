import type { Section } from '../types'

export const twoPhaseLocking: Section = {
  id: 'two-phase-locking',
  title: 'Two-phase locking',
  scene: 'two-phase-locking',
  focus: 'range',
  slide: `## Two-phase locking

The pessimistic answer, and the only algorithm for serializability for thirty years. **Take every lock, hold it until commit.**

### The locks
- **Shared** to read — many at once. **Exclusive** to write, excluding readers
- A reader that decides to write must **upgrade**, waiting for every other reader. Most deadlocks start here
- *Two-phase* = acquire in phase one, release **at once** at commit

### How it closes phantoms
- A **predicate lock** locks a *condition*, including rows that do not exist yet — approximated in practice by an **index-range lock**

### The bill
- **Deadlocks are routine** — one is killed and retried
- **Latency is unstable.** One slow transaction stalls a queue`,
  narration:
    "The second answer, and for about thirty years the only algorithm anyone had for serializability, is two-phase locking. You have seen locks already — read committed used a row lock to prevent dirty writes. Two-phase locking is much stronger in two ways. The locks are stronger: a read takes a shared lock, and several transactions can hold shared locks on the same row simultaneously. A write takes an exclusive lock, which excludes everything, including readers. So under 2PL, writers do block readers and readers do block writers, which is exactly the opposite of snapshot isolation, and it is the source of most of the cost. And if a transaction reads a row and later decides to write it, it must upgrade its shared lock to exclusive — which means waiting for every other reader to finish. That upgrade is where a great many deadlocks come from. The two-phase part names the shape: locks are only ever acquired during the first phase, and every one of them is released at the same instant, at commit or abort. You never release a lock early, which is what makes the schedule equivalent to some serial order. Now, the interesting part: how does this close the phantom hole? With a predicate lock. Instead of locking rows, you lock a condition — all bookings for room five between two and three o'clock — and that lock covers rows that do not exist yet. Any transaction wanting to insert a matching row has to wait. That is a genuine solution to phantoms, and it is also too slow to implement literally, because checking a lock means evaluating a predicate against every other transaction's predicates. So real databases approximate it with index-range locking: lock the index entry for room five, or for the whole two o'clock hour. That is coarser than needed, so it blocks some transactions that would have been fine, and it is enormously cheaper to check. Coarse and fast wins. And the bill. Deadlocks are routine rather than exceptional — two transactions each holding a lock the other wants — so the database detects cycles and kills one, and the application retries it. That is wasted work, and under contention it can be a lot of wasted work. And latency becomes unstable, which is the complaint operators actually have: one slow transaction holding a popular lock builds a queue behind it, so your median stays fine while your p99 falls apart.",
}
