import type { Section } from '../types'

export const lsmVsBtree: Section = {
  id: 'lsm-vs-btree',
  title: 'LSM-tree vs B-tree',
  scene: 'lsm-vs-btree',
  focus: 'table',
  slide: `## LSM-tree vs B-tree

Rule of thumb: **LSM is faster to write, B-tree is faster to read.** The decision is in the detail.

### Writes and reads
- Both write twice, but **LSM's copies are sequential** and merge whole files
- A B-tree rewrites a 4 KB page to change one row, plus its WAL record
- A B-tree read is 3–4 pages; the key exists in **exactly one place**
- An LSM read may check several files — Bloom filters remove most of that

### The row that decides arguments
- **LSM latency is usually better and occasionally far worse** — a big compaction competes with live traffic for the same disk
- A B-tree is **flat and predictable**, which some systems need more`,
  narration:
    "The rule of thumb is that LSM-trees are faster to write and B-trees are faster to read, and that is true, but the interesting part is why. On writes: both designs actually write your data more than once. A B-tree writes a WAL record and then writes a whole four-kilobyte page even if you changed twenty bytes in one row. An LSM-tree writes the memtable out and then rewrites data again during compaction — sometimes several times as it moves down the levels. So the amplification is not obviously lower. What is lower is the cost of each write, because every write an LSM-tree makes is sequential, and it can merge entire files in one pass rather than scattering four-kilobyte updates all over the disk. On reads, the B-tree has a clean advantage: three or four page reads, and each key exists in exactly one place, so you always know when you are done. An LSM read may have to check the memtable and then several files before it finds the key, or before it can conclude the key does not exist. Bloom filters make that much better but they do not make it free. Space favours LSM. Compaction periodically rewrites data and drops everything dead, whereas B-tree pages sit partly full after splits — that is fragmentation, and it does not go away. LSM blocks also compress better because they are sorted and have no per-page slack. And here is the row that decides most real arguments, which is not about averages at all. LSM latency is usually better and occasionally far worse, because a large compaction runs on the same disk your queries need, and at high write throughput compaction can fall behind and never catch up. A B-tree is flat. For some systems, predictable matters more than fast — and that is a product decision, not a benchmark.",
}
