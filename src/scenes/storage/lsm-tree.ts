import type { Scene } from '@graphlearning/flow'

// §5 — the whole write path on one board. The fork at the top is the point: a write goes to two
// places, and they have different jobs. The memtable is the one that gets read; the WAL exists only
// for the machine that loses power, and is thrown away the moment the memtable is safely on disk.
// Note there is no arrow out of the WAL — that is correct, and §8 is about the one time it is read.
export const lsmTree: Scene = {
  id: 'lsm-tree',
  title: 'The LSM write path',
  flow: 'TB',
  nodes: [
    { id: 'write', label: 'A write arrives', sub: 'put(key, value)', pattern: 'user', icon: 'pencil' },
    { id: 'wal', label: 'WAL', sub: 'append-only, read only after a crash', pattern: 'storage', icon: 'scroll' },
    { id: 'memtable', label: 'Memtable', sub: 'a sorted tree, in RAM', pattern: 'service', icon: 'memory' },
    { id: 'l0', label: 'L0 SSTables', sub: 'one file per flush, key ranges overlap', pattern: 'storage', icon: 'database' },
    { id: 'l1', label: 'L1 and below', sub: 'merged, ranges no longer overlap', pattern: 'storage', icon: 'database' },
  ],
  edges: [
    { source: 'write', target: 'wal', label: 'durability' },
    { source: 'write', target: 'memtable', label: 'the live copy' },
    { source: 'memtable', target: 'l0', label: 'flush at ~a few MB' },
    { source: 'l0', target: 'l1', label: 'compact' },
  ],
}
