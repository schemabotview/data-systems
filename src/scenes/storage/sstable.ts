import type { Scene } from '@graphlearning/flow'

// §4 — one extra requirement, sorted keys, and three separate things get cheaper at once. The sparse
// index is the visible payoff: it holds one key in every few thousand, so it fits in memory for a
// file that never could, and the gap between two entries is a short scan rather than a search.
export const sstable: Scene = {
  id: 'sstable',
  title: 'Sort the segment, and the index gets small',
  flow: 'TB',
  nodes: [
    {
      id: 'sparse',
      kind: 'table',
      label: 'Sparse index — in RAM',
      sub: 'one key in every few thousand',
      pattern: 'service',
      headers: ['key', 'offset'],
      values: [
        ['aardvark', '0'],
        ['handbag', '81 920'],
        ['otter', '163 840'],
      ],
    },
    {
      id: 'file',
      kind: 'code',
      filename: 'segment.sst',
      label: `handbag,8786
handful,40308
handicap,65167
handiwork,16912
handkerchief,20952`,
    },
    {
      id: 'wins',
      label: 'Three things sorting bought',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'merge', label: 'Cheap merge', sub: 'like mergesort, streaming', pattern: 'service', icon: 'merge' },
        { id: 'small', label: 'Sparse index', sub: 'RAM no longer the ceiling', pattern: 'service', icon: 'memory' },
        { id: 'comp', label: 'Block compression', sub: 'neighbours are similar', pattern: 'service', icon: 'package' },
      ],
    },
  ],
  edges: [
    { source: 'sparse', target: 'file', label: 'scan the gap' },
    { source: 'file', target: 'wins' },
  ],
}
