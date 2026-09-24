import type { Section } from '../types'

export const lsmTree: Section = {
  id: 'lsm-tree',
  title: 'The LSM-tree',
  scene: 'lsm-tree',
  focus: 'memtable',
  slide: `## The LSM-tree

Log-Structured Merge-tree: the memtable, the segments and the compaction of the last three sections, assembled.

### A write goes to two places
- The **memtable** — the sorted tree that will be read
- The **WAL** — append-only, read *only* after a crash, then discarded

### A read walks down
- Memtable → newest SSTable → older ones, until found
- A **missing** key is the slow case: it checks everything
- Fix: a **Bloom filter** per file — *"definitely not here"*, in a few bits

### Compaction never stops
- Background merges keep the file count bounded
- Cassandra, RocksDB, LevelDB and HBase are all this design`,
  narration:
    "Put the last three sections together and you have a real storage engine, the log-structured merge-tree. Here is the whole write path. A write arrives and goes to two places. It goes into the memtable, the sorted tree in memory, which is the copy that will actually be read. And it gets appended to a write-ahead log, which nothing ever reads — unless the machine loses power, in which case it is the only record that the write happened at all, because the memtable was in RAM. When the memtable fills up, it gets written out sorted as a new SSTable, and at that moment the write-ahead log can be thrown away, because the data is now durable on disk in its proper form. A read works down through the layers. Check the memtable first, since it has the newest data. If it is not there, check the newest SSTable, then the next one, and so on backwards in time. The slow case is a key that does not exist anywhere, because then you have checked every single file for nothing. The standard fix is a Bloom filter per file: a tiny probabilistic structure that can tell you, in a few bits, that a key is definitely not in this file — so most files get skipped without being touched. And in the background, compaction runs forever, merging files so their number stays bounded. There are two common strategies. Size-tiered merges files of similar size together. Levelled splits the key range across levels, so within a level the files do not overlap. Cassandra, RocksDB, LevelDB, HBase — they are all this design, and the reason they are so good at write-heavy workloads is that every disk write they make is sequential.",
}
