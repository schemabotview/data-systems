import type { Section } from '../types'

export const serialExecution: Section = {
  id: 'serial-execution',
  title: 'Actual serial execution',
  scene: 'serial-execution',
  focus: 'one',
  slide: `## Actual serial execution

The first of three real answers, and the only one that **removes** concurrency rather than managing it.

### Just run them one at a time
- One thread, one transaction at a time. **Serializable by construction**
- No locks, no anomalies, no theory
- Absurd for thirty years, then around 2007 **RAM got cheap** enough to hold an OLTP dataset, and OLTP transactions turned out to be **short**

### Three constraints you accept
- **Stored procedures only.** A client round trip would idle the one thread
- **One CPU core.** That is the ceiling, permanently
- **Partition to scale** — until a transaction spans partitions

**VoltDB, Redis and Datomic all work this way.**`,
  narration:
    "There are three real ways to get serializable isolation, and the first is the one that sounds like a joke. Just do not run transactions concurrently. Execute them one at a time, in order, on a single thread. If there is no concurrency, there are no concurrency anomalies — not write skew, not lost updates, not phantoms, nothing. It is serializable by construction rather than by argument. This was dismissed as absurd for about thirty years, and then two things changed around 2007. First, RAM got cheap enough that an OLTP dataset fits in memory, so a transaction no longer waits on disk for every access — and a transaction that never waits finishes in microseconds. Second, people noticed that OLTP transactions are short: they touch a handful of rows and do a small amount of work. The long-running queries are analytics, and analytics runs somewhere else, usually on the column store from course two. So one thread executing microsecond-long transactions back to back can handle a genuinely useful throughput. Now the constraints, because they are real. First, you cannot have a client round trip inside a transaction. In the normal interactive style, the application sends a query, thinks, sends another — and with one thread, every one of those network waits is the entire database sitting idle. So the whole transaction has to be submitted as a single unit, ahead of time, as a stored procedure. That is a genuine change to how you write applications, and stored procedures have a bad historical reputation for poor languages and awkward deployment — though modern systems use general-purpose languages, so it is less painful than it was. Second, your throughput ceiling is one CPU core, forever. Adding cores does nothing. Third, to scale past that you partition, giving each partition its own thread on its own core, which works beautifully as long as every transaction touches one partition. The moment a transaction spans partitions, it needs coordination across them, and measured throughput drops by an order of magnitude. VoltDB, Redis and Datomic all work this way, and the design is a legitimate choice when your workload fits the shape.",
}
