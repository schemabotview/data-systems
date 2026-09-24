import type { Section } from '../types'

export const eventSourcing: Section = {
  id: 'event-sourcing',
  title: 'Event sourcing',
  scene: 'event-sourcing',
  focus: 'fold',
  slide: `## Event sourcing

CDC inverted. There the **state** was primary and the log derived; here the **log** is primary and the state is derived from it.

### What is stored
- An append-only sequence of **immutable events**, in business language
- Current state is a **fold** over them — apply in order, then cache
- Nothing is updated or deleted. A cancellation is a **new event**

### What events give that a row cannot
- **Why**, not just what. *"Cancelled"* is a fact a deleted flag has lost
- **New questions of old data** — replay to answer what you never planned for

### The honest costs
- Events are **immutable and versioned forever**
- And *"append-only"* against *"erase this person's data"* is genuinely hard`,
  narration:
    "Event sourcing is change data capture turned inside out, and the inversion is worth seeing clearly. In CDC, the database state is primary and the log is derived from it — you write rows, and the log falls out. In event sourcing, the log is primary and the state is derived from the log — you write events, and the current state is computed by folding over them. What is actually stored is an append-only sequence of immutable events, expressed in the language of the business rather than the language of the database. Not row twelve's status column changed from A to C, but: student cancelled their enrolment. Nothing is ever updated or deleted; if something is undone, that is a new event recording the undoing. Current state is derived by applying the events in order, and in practice you cache that, but the cache is always rebuildable from the events. What does this buy you over storing rows? Two things, and the first is the one people underrate. You know why, not just what. A row with a deleted flag tells you a student is no longer enrolled; the event tells you they cancelled, and when, and — if you put it in the event — for what reason. That information is destroyed by an update and it is often the information the business actually wanted. The second is the ability to answer questions you had not thought of. Someone asks how many students enrol and then cancel within twenty-four hours. If you stored rows, that data never existed and you cannot recover it. If you stored events, you replay the log and compute it. That is genuinely powerful and it is why event sourcing tends to be popular with people who have been burned by a schema that threw away something they later needed. Now the honest costs, because this is not free. Your events are immutable and they live forever, which means every consumer must handle every version of every event you have ever emitted — that is course three's compatibility problem on hard mode, permanently. Replaying from the beginning gets slower every year, so you need periodic snapshots, and snapshots need their own versioning. And deletion is genuinely hard: an append-only log of immutable facts and a legal obligation to erase a person's data do not obviously coexist, and the workarounds — crypto-shredding, rewriting history — are all uncomfortable. Use it where the history is the point, not everywhere.",
}
