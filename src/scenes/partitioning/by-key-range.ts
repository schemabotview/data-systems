import type { Scene } from '@graphlearning/flow'

// §3 — range partitioning, and its failure drawn right next to it because they are the same
// property. Keeping keys in order is exactly what makes a range scan one partition's work, and
// exactly what sends every write of today to one machine when the key is a timestamp.
export const byKeyRange: Scene = {
  id: 'by-key-range',
  title: 'Sorted ranges — and the hot spot they create',
  flow: 'TB',
  nodes: [
    {
      id: 'ranges',
      kind: 'table',
      label: 'Boundaries chosen to balance volume',
      sub: 'not evenly — "S" holds far more names than "X"',
      pattern: 'service',
      headers: ['Partition', 'Key range'],
      values: [
        ['P1', 'a — dog'],
        ['P2', 'dom — inbox'],
        ['P3', 'inca — rat'],
        ['P4', 'rating — zzz'],
      ],
    },
    { id: 'good', label: 'Range scans are cheap', sub: 'neighbours are on one machine', pattern: 'service', icon: 'sortarrows' },
    { id: 'bad', label: 'Timestamp keys burn', sub: "today's writes all hit one partition", pattern: 'warn', icon: 'calendar' },
  ],
  edges: [
    { source: 'ranges', target: 'good' },
    { source: 'good', target: 'bad', label: 'same property' },
  ],
}
