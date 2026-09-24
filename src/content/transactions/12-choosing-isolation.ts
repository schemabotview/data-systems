import type { Section } from '../types'

export const choosingIsolation: Section = {
  id: 'choosing-isolation',
  title: 'Choosing an isolation level',
  scene: 'choosing-isolation',
  focus: 'names',
  slide: `## Choosing an isolation level

Read the matrix by **anomaly**, not by level name — because **the names lie**.

### The traps
- **Oracle's \`SERIALIZABLE\` is snapshot isolation.** It does not prevent write skew, so a system audited on that setting is not serializable
- **"Repeatable read"** means something different in almost every product

### How to actually decide
- Start at the default (**read committed**) and know what it allows
- Find where you **read a set, decide, then write** — the write-skew shape, and where invariants live
- For those, use **serializable**, or lock explicitly and never forget

### The honest summary
- Weak isolation trades correctness for performance
- Its bugs are unreproducible, so they surface as **quietly wrong data**`,
  narration:
    "Let us land this. The matrix shows which anomalies each level still allows, and the single most useful habit is to reason about anomalies rather than level names — because the names genuinely lie. The most important example: Oracle's isolation level called SERIALIZABLE is snapshot isolation. It does not provide serializability, and it does not prevent write skew. So if someone tells you the system is serializable because Oracle says SERIALIZABLE in the configuration, the on-call doctors bug is still live, and an audit that stopped at the setting name has missed it. Repeatable read is even worse: the term is used for meaningfully different guarantees by different products, and the original SQL standard definition is ambiguous enough that reasonable people implement it differently. Postgres's REPEATABLE READ is snapshot isolation. MySQL's is something else. IBM DB2 uses repeatable read to mean serializable. Never assume; check what your specific database actually does. So how do you decide? Start from your default, which is almost certainly read committed, and know precisely what it allows: lost updates and write skew, both silently. Then go looking for the shape. Anywhere your code reads a set of rows, makes a decision based on what it found, and then writes — that is where write skew lives, and it is exactly where your invariants are enforced. Uniqueness checks. Capacity checks. Balance checks. Approval workflows. For those specific paths, either turn on genuine serializable isolation, which on Postgres means SSI and is usually affordable, or take an explicit SELECT FOR UPDATE lock and accept that you must never forget it on any code path, forever. And the honest summary to leave with. Weak isolation levels are a performance optimisation, and what they trade away is correctness. The bugs they permit are rare, timing-dependent, and essentially impossible to reproduce — which means they do not show up as failures you can debug. They show up as data that is quietly wrong, discovered months later, by someone reconciling numbers. That is why it is worth knowing which level you are on and exactly what it lets through.",
}
