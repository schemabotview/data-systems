import type { Section } from '../types'

export const ssi: Section = {
  id: 'ssi',
  title: 'Serializable snapshot isolation',
  scene: 'ssi',
  focus: 'commit',
  slide: `## Serializable snapshot isolation

From 2008, and the modern default. **Optimistic**: assume it is fine, and check at the end.

### Pessimistic vs optimistic
- 2PL assumes conflict and blocks **in advance** — everyone pays
- SSI runs everything, then asks at commit whether it *would* have been fine
- If yes, commit, having paid **nothing**. If no, abort and retry

### Detecting a stale premise
- Runs on an MVCC snapshot, so reads never block
- Did I read something **stale**? Did my write **invalidate a read**? The second is the §7 write-skew shape, caught directly

### Where it fits
- Good when contention is **low**; bad when high — retries waste work
- **Postgres has implemented \`SERIALIZABLE\` this way since 9.1**`,
  narration:
    "The third answer is much newer — it was described in 2008 — and it is now the default way to get serializability in Postgres. The name is serializable snapshot isolation, SSI, and the idea is to be optimistic instead of pessimistic. Two-phase locking is pessimistic: it assumes something might go wrong, so it blocks in advance, and every transaction pays that cost whether or not there was ever a real conflict. SSI assumes things will probably be fine — which, in most workloads, they are. It lets every transaction run without blocking, and then at commit time asks: given everything that happened while you were running, would this have been serializable? If yes, it commits and you have paid nothing at all. If not, it aborts and the application retries. So how does it decide? It runs on top of the MVCC snapshot from section five, so reads never take locks and never block. On top of that, it tracks what each transaction's decisions depended on — which reads it did, and which rows it wrote. Then it makes two checks. First: did this transaction read something that has since been modified by a transaction that already committed? Its premise was stale even as it ran. Second: has this transaction written something that invalidates a read another in-flight transaction performed? That is the write skew shape from section seven, caught directly — Ada's write to her own row is noticed as invalidating the query Ben ran, so one of them gets aborted. Look at what that buys. Ada and Ben's doctors problem is detected even though they never touched the same row, which is the thing no lock-based mechanism could do without predicate locks. Where does it fit? SSI is excellent when contention is low — most transactions commit and pay only the bookkeeping, so throughput stays close to snapshot isolation. It is bad when contention is high, because aborts mean real work is thrown away and retried, and under heavy contention you can spend most of your capacity on retries. And unlike serial execution, it is not confined to a single core — it scales across cores and machines, because there is no single-threaded bottleneck. Postgres has implemented SERIALIZABLE this way since version 9.1, and if you have never turned it on, it is worth measuring on your workload.",
}
