import type { Scene } from '@graphlearning/flow'

// §10 — the same picture as §2, twice, with one link between. Everything good about it follows from
// the local leader (a write is fast and survives the link going down) and everything bad follows
// from the same fact: two nodes can accept conflicting writes to one row and neither knows yet.
export const multiLeader: Scene = {
  id: 'multi-leader',
  title: 'A leader in each region',
  flow: 'LR',
  nodes: [
    {
      id: 'dc1',
      label: 'Region — Europe',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'l1', label: 'Leader', sub: 'takes local writes', pattern: 'service', icon: 'server' },
        { id: 'r1', label: 'Follower', sub: 'ordinary replication', pattern: 'storage', icon: 'database' },
      ],
      edges: [{ source: 'l1', target: 'r1' }],
    },
    {
      id: 'dc2',
      label: 'Region — Asia',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'l2', label: 'Leader', sub: 'takes local writes', pattern: 'service', icon: 'server' },
        { id: 'r2', label: 'Follower', sub: 'ordinary replication', pattern: 'storage', icon: 'database' },
      ],
      edges: [{ source: 'l2', target: 'r2' }],
    },
    { id: 'conflict', label: 'Same row, both regions', sub: 'accepted twice — nobody knows yet', pattern: 'warn', icon: 'swap' },
  ],
  edges: [
    { source: 'dc1', target: 'dc2', label: 'async, both ways', bidirectional: true },
    { source: 'dc2', target: 'conflict' },
  ],
}
