import type { Section } from '../types'

export const xaAndPractice: Section = {
  id: 'xa-and-practice',
  title: 'XA, and why nobody runs it',
  scene: 'xa-and-practice',
  focus: 'instead',
  slide: `## XA, and why nobody runs it

**XA** is the standard interface for 2PC across heterogeneous systems — a database *and* a broker in one transaction. It works. It is rare.

### The costs, none of them theoretical
- **A new single point of failure.** To be safe the coordinator must itself be replicated, using consensus. The problem moved, it did not go
- **Stateful application servers.** The coordinator log is in the app process, so it stops being disposable
- **Locks held across services.** One in-doubt transaction blocks unrelated work
- **Manual recovery** is a documented procedure
- **Around 10× slower** — extra syncs and round trips

### What people do instead
- **Avoid it.** Make operations **idempotent** and retry them
- Where you cannot: a **compensating action** — a refund, not an un-charge`,
  narration:
    "There is a standard for doing two-phase commit across systems from different vendors. It is called XA, for extended architecture, it dates from 1991, and it is supported by most relational databases and many message brokers. It lets you commit a database write and a queue publish in one atomic transaction, which is a genuinely useful thing to want. And it is rare in practice, for reasons worth listing because they are all operational rather than theoretical. First, you have introduced a new single point of failure. The coordinator's log holds information nothing else has, so to make the system fault-tolerant you have to replicate the coordinator — using consensus. You have not removed the problem; you have moved it and added a component. Second, the coordinator is usually a library running inside your application process, which means that process now holds critical durable state. Your application servers stop being stateless, disposable things you can kill and reschedule, which is precisely the property most modern deployment tooling assumes. Third, locks are held across service boundaries. An in-doubt transaction in a system you have never heard of can block work in yours, and debugging that is miserable because the cause is in someone else's logs. Fourth, manual recovery is a documented operational procedure rather than a theoretical possibility, and it means a human deciding the fate of a transaction under time pressure. And fifth, the measured performance cost is roughly an order of magnitude, because of the extra disk syncs and network round trips on every single transaction. So what do people actually do? Overwhelmingly, they avoid needing the distributed transaction at all. The dominant pattern is idempotence plus retries: make each operation safe to apply twice, and retry until it succeeds. Write the database row, then publish the message, and if the publish fails, retry — since the consumer can handle a duplicate, at-least-once delivery is fine. Where an operation genuinely cannot be made idempotent, use a compensating action instead: do not try to un-charge a card, issue a refund. It is messier than a clean atomic commit, it makes the intermediate states visible to your application, and it is what almost every large system actually does.",
}
