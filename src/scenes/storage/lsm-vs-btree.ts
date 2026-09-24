import type { Scene } from '@graphlearning/flow'

// §9 — the comparison people want, laid out so that neither column is the winner. The row that
// decides most real arguments is the last one: LSM latency is usually better and occasionally far
// worse, because a big compaction competes with live traffic for the same disk. "Usually faster,
// sometimes unpredictable" is a different product decision from "always the same".
export const lsmVsBtree: Scene = {
  id: 'lsm-vs-btree',
  title: 'Neither one wins',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'The trade, row by row',
      sub: 'pick the column whose weakness you can live with',
      pattern: 'service',
      headers: ['', 'LSM-tree', 'B-tree'],
      values: [
        ['On write', 'append, then merge later', 'overwrite the page in place'],
        ['Write amplification', 'lower — sequential merges', 'higher — WAL plus the page'],
        ['On read', 'check memtable, then levels', 'walk 3–4 pages, done'],
        ['Disk space', 'smaller — compacts away dead data', 'fragmented — pages left part-full'],
        ['A key exists', 'in several files at once', 'in exactly one place'],
        ['Latency', 'better, until compaction hits', 'flat and predictable'],
      ],
    },
    { id: 'use', label: 'Where each one ended up', sub: 'LSM: Cassandra · RocksDB. B-tree: Postgres · MySQL', pattern: 'external', icon: 'database' },
  ],
  edges: [{ source: 'table', target: 'use' }],
}
