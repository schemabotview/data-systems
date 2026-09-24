import type { Scene } from '@graphlearning/flow'

// §8 — starts with the wrong answer, because the wrong answer is the one everybody writes first and
// its failure is not obvious until you count. hash % n is perfectly balanced and moves almost
// EVERYTHING when n changes, which is the one thing rebalancing must not do. The three real
// strategies all share the same fix: decouple the number of partitions from the number of nodes.
export const rebalancing: Scene = {
  id: 'rebalancing',
  title: 'Why mod N is the wrong answer',
  flow: 'TB',
  nodes: [
    {
      id: 'modn',
      kind: 'code',
      filename: 'naive.py',
      label: `partition = hash(key) % n_nodes

# n = 10 → key lands on node 3
# n = 11 → key lands on node 7
# almost every key moves. all of them, at once.`,
    },
    {
      id: 'strategies',
      kind: 'table',
      label: 'Three that actually work',
      sub: 'all decouple partition count from node count',
      pattern: 'service',
      headers: ['Strategy', 'How', 'Watch out for'],
      values: [
        ['Fixed count', 'make 1000 partitions, hand out sets', 'the count is fixed at creation'],
        ['Dynamic', 'split when big, merge when small', 'one partition until the first split'],
        ['Per node', 'a fixed number of partitions each', 'needs hashing to keep them fair'],
      ],
    },
    { id: 'manual', label: 'Keep a human in it', sub: 'a false failover stampedes', pattern: 'warn', icon: 'usercheck' },
  ],
  edges: [
    { source: 'modn', target: 'strategies', label: 'instead' },
    { source: 'strategies', target: 'manual' },
  ],
}
