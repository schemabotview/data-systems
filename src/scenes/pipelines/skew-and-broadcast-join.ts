import type { Scene } from '@graphlearning/flow'

// §5 — the failure of §4 and the way out. Skew is course 05's hot key again, arriving through a
// different door: the shuffle sends every record for one key to one reducer, so a celebrity is one
// machine doing all the work. The broadcast join avoids the shuffle entirely — but only when one
// side is small enough to fit in memory, which is the whole condition.
export const skewAndBroadcastJoin: Scene = {
  id: 'skew-and-broadcast-join',
  title: 'One reducer, all the work',
  cols: 2,
  nodes: [
    {
      id: 'skew',
      label: 'The skew',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 's-hot', label: 'One celebrity key', sub: 'millions of records', pattern: 'warn', icon: 'star' },
        { id: 's-one', label: 'All to one reducer', sub: 'the other 99 finish and wait', pattern: 'warn', icon: 'gauge' },
        { id: 's-fix', label: 'Spread the hot key', sub: 'a random suffix on it', pattern: 'service', icon: 'scissors' },
      ],
      edges: [
        { source: 's-hot', target: 's-one' },
        { source: 's-one', target: 's-fix' },
      ],
    },
    {
      id: 'broadcast',
      label: 'The map-side alternative',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'b-small', label: 'One side is small', sub: 'it fits in each mapper memory', pattern: 'service', icon: 'memory' },
        { id: 'b-copy', label: 'Send it everywhere', sub: 'a hash table in every mapper', pattern: 'service', icon: 'copy' },
        { id: 'b-none', label: 'No shuffle at all', sub: 'and so no skew to suffer', pattern: 'service', icon: 'zap' },
      ],
      edges: [
        { source: 'b-small', target: 'b-copy' },
        { source: 'b-copy', target: 'b-none' },
      ],
    },
  ],
  edges: [],
}
