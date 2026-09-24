import type { Scene } from '@graphlearning/flow'

// §9 — consistent hashing drawn as what it actually does rather than as a ring, because the ring is
// a picture of the mechanism and this is a picture of the RESULT: adding a fourth node moves a
// quarter of the data and nothing else. Every key that stays put, stays put — that is the whole
// property, and it is what mod N cannot do.
export const consistentHashing: Scene = {
  id: 'consistent-hashing',
  title: 'Add a node, move a quarter',
  flow: 'TB',
  nodes: [
    { id: 'space', label: '256 fixed partitions', sub: 'the hash space, cut once and never again', pattern: 'storage', icon: 'scissors' },
    {
      id: 'before',
      label: 'Three nodes — ~85 partitions each',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'a', label: 'Node A', sub: '85 partitions', pattern: 'service', icon: 'server' },
        { id: 'b', label: 'Node B', sub: '85 partitions', pattern: 'service', icon: 'server' },
        { id: 'c', label: 'Node C', sub: '86 partitions', pattern: 'service', icon: 'server' },
      ],
    },
    { id: 'add', label: 'Node D joins', sub: 'each of A, B, C hands over ~21', pattern: 'network', icon: 'plug' },
    { id: 'moved', label: 'Only those 64 move', sub: 'every other key is exactly where it was', pattern: 'service', icon: 'circlecheck' },
  ],
  edges: [
    { source: 'space', target: 'before' },
    { source: 'before', target: 'add' },
    { source: 'add', target: 'moved' },
  ],
}
