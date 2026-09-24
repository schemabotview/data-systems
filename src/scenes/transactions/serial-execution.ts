import type { Scene } from '@graphlearning/flow'

// §9 — the first of three real answers, and the only one that removes concurrency rather than
// managing it. It became viable for a specific, checkable reason: RAM got big enough to hold an OLTP
// dataset, and OLTP transactions are short. Both conditions are in the scene because both have to
// hold, and the three constraints below are what you accept in exchange.
export const serialExecution: Scene = {
  id: 'serial-execution',
  title: 'One thread. No concurrency to reason about.',
  flow: 'TB',
  nodes: [
    {
      id: 'why',
      label: 'Two things changed by ~2007',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ram', label: 'RAM got cheap', sub: 'the dataset fits in memory', pattern: 'storage', icon: 'memory' },
        { id: 'short', label: 'OLTP is short', sub: 'no long-running analytics', pattern: 'service', icon: 'zap' },
      ],
    },
    { id: 'one', label: 'Run them one at a time', sub: 'no locks, no anomalies, no theory', pattern: 'service', icon: 'circlecheck' },
    {
      id: 'price',
      label: 'The three constraints',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'sp', label: 'Stored procs', sub: 'no client round trips', pattern: 'warn', icon: 'code' },
        { id: 'cap', label: 'One CPU core', sub: 'that is the ceiling', pattern: 'warn', icon: 'cpu' },
        { id: 'part', label: 'Partition to scale', sub: 'cross-partition is slow', pattern: 'warn', icon: 'scissors' },
      ],
    },
  ],
  edges: [
    { source: 'why', target: 'one' },
    { source: 'one', target: 'price' },
  ],
}
