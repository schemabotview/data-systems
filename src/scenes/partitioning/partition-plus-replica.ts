import type { Scene } from '@graphlearning/flow'

// §2 — the two ideas combined, and the picture has to show that they are orthogonal. Read it by
// column and you see three machines; read it by partition and you see that P1's leader and P1's
// follower are on DIFFERENT machines, which is the whole point — every node leads something and
// follows something else, so no machine is idle and no partition dies with one box.
export const partitionPlusReplica: Scene = {
  id: 'partition-plus-replica',
  title: 'Every node leads one and follows another',
  cols: 3,
  nodes: [
    {
      id: 'n1',
      label: 'Node 1',
      pattern: 'group',
      children: [
        { id: 'n1p1', label: 'P1 · leader', sub: 'takes writes for P1', pattern: 'service', icon: 'server' },
        { id: 'n1p3', label: 'P3 · follower', sub: 'copy of P3', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'n2',
      label: 'Node 2',
      pattern: 'group',
      children: [
        { id: 'n2p2', label: 'P2 · leader', sub: 'takes writes for P2', pattern: 'service', icon: 'server' },
        { id: 'n2p1', label: 'P1 · follower', sub: 'copy of P1', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'n3',
      label: 'Node 3',
      pattern: 'group',
      children: [
        { id: 'n3p3', label: 'P3 · leader', sub: 'takes writes for P3', pattern: 'service', icon: 'server' },
        { id: 'n3p2', label: 'P2 · follower', sub: 'copy of P2', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [],
}
