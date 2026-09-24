import type { Scene } from '@graphlearning/flow'

// §3 — three histories, each breaking the rule from §2 in a different way, because "it looks like
// one copy" is too vague to test against. The third row is the one people miss: a read that
// OVERLAPS a write may return either value, and that is legal — what is not legal is going back.
export const notLinearizable: Scene = {
  id: 'not-linearizable',
  title: 'Three histories that fail',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'What breaks in each',
      sub: 'the register starts at 0, and a write sets it to 1',
      pattern: 'service',
      headers: ['History', 'Verdict'],
      values: [
        ['B reads 1, then C reads 0', 'ILLEGAL — time went backwards'],
        ['B reads 0 after the write finished', 'ILLEGAL — the write had completed'],
        ['B reads 0 while the write is in flight', 'legal — the result is not decided yet'],
        ['B reads 1 while in flight, C then reads 0', 'ILLEGAL — 1 was already observed'],
      ],
    },
    { id: 'rule', label: 'One flip, one way', sub: 'and it never flips back', pattern: 'storage', icon: 'swap' },
  ],
  edges: [{ source: 'cases', target: 'rule' }],
}
