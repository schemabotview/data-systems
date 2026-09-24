import type { Scene } from '@graphlearning/flow'

// §6 — the first of the two index layouts. Each partition indexes only its own rows, so a write
// touches exactly one machine and a query by a non-partition key touches all of them. Worth stating
// plainly: the tail latency of a scatter/gather is the SLOWEST partition's, every time.
export const localSecondaryIndex: Scene = {
  id: 'local-secondary-index',
  title: 'Document-partitioned: ask everyone',
  flow: 'TB',
  nodes: [
    { id: 'q', label: 'Find red cars', sub: 'colour is not the partition key', pattern: 'user', icon: 'search' },
    {
      id: 'parts',
      label: 'Every partition, in parallel',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'p1', label: 'P1 index', sub: 'its own rows only', pattern: 'storage', icon: 'database' },
        { id: 'p2', label: 'P2 index', sub: 'its own rows only', pattern: 'storage', icon: 'database' },
        { id: 'p3', label: 'P3 index', sub: 'its own rows only', pattern: 'storage', icon: 'database' },
      ],
    },
    { id: 'merge', label: 'Merge the results', sub: 'scatter / gather', pattern: 'service', icon: 'merge' },
    { id: 'cost', label: 'Cheap writes', sub: 'reads wait on the slowest partition', pattern: 'warn', icon: 'gauge' },
  ],
  edges: [
    { source: 'q', target: 'parts' },
    { source: 'parts', target: 'merge' },
    { source: 'merge', target: 'cost' },
  ],
}
