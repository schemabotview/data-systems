import type { Scene } from '@graphlearning/flow'

// §10 — the pessimistic answer, and the two details that make it actually serializable. Shared locks
// upgrade to exclusive, which is where deadlocks come from; and predicate/index-range locks are what
// finally close the phantom hole in §8, because they lock a CONDITION rather than a row.
export const twoPhaseLocking: Scene = {
  id: 'two-phase-locking',
  title: 'Take every lock, hold it to the end',
  flow: 'TB',
  nodes: [
    { id: 'shared', label: 'Readers share', sub: 'many at once on one row', pattern: 'service', icon: 'users' },
    { id: 'excl', label: 'A writer excludes', sub: 'and a reader upgrading blocks', pattern: 'service', icon: 'lock' },
    { id: 'range', label: 'Lock the condition', sub: 'index-range locks close phantoms', pattern: 'storage', icon: 'key' },
    {
      id: 'cost',
      label: 'And the bill',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'dead', label: 'Deadlocks', sub: 'detected, then one is killed', pattern: 'warn', icon: 'skull' },
        { id: 'tail', label: 'Unstable latency', sub: 'one slow txn stalls a queue', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'shared', target: 'excl' },
    { source: 'excl', target: 'range' },
    { source: 'range', target: 'cost' },
  ],
}
