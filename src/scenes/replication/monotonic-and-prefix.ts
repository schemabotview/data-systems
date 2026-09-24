import type { Scene } from '@graphlearning/flow'

// §9 — the two remaining lag anomalies, side by side because they are genuinely different failures.
// Monotonic is about ONE reader seeing time run backwards; consistent prefix is about the ORDER of
// two writes being scrambled between partitions, which is why it does not arise on a single
// partition at all and does arise on every sharded system.
export const monotonicAndPrefix: Scene = {
  id: 'monotonic-and-prefix',
  title: 'Two more ways lag shows through',
  cols: 2,
  nodes: [
    {
      id: 'mono',
      label: 'Monotonic reads — time runs backwards',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'm-a', label: 'Read hits follower A', sub: 'caught up — the comment is there', pattern: 'service', icon: 'search' },
        { id: 'm-b', label: 'Next read hits B', sub: 'lagging — the comment is gone', pattern: 'warn', icon: 'search' },
        { id: 'm-fix', label: 'Fix: pin the user', sub: 'hash the user id to one replica', pattern: 'service', icon: 'fingerprint' },
      ],
      edges: [
        { source: 'm-a', target: 'm-b' },
        { source: 'm-b', target: 'm-fix' },
      ],
    },
    {
      id: 'prefix',
      label: 'Consistent prefix — cause after effect',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'p-q', label: 'Question written', sub: 'to partition 1', pattern: 'service', icon: 'pencil' },
        { id: 'p-a', label: 'Answer written', sub: 'to partition 2, a moment later', pattern: 'service', icon: 'pencil' },
        { id: 'p-see', label: 'Answer first', sub: 'partition 2 is quicker', pattern: 'warn', icon: 'swap' },
      ],
      edges: [
        { source: 'p-q', target: 'p-a' },
        { source: 'p-a', target: 'p-see' },
      ],
    },
  ],
  edges: [],
}
