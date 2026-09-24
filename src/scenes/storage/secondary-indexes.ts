import type { Scene } from '@graphlearning/flow'

// §10 — every index in §6 and §5 was the PRIMARY one, keyed on the row's identity. A secondary index
// is the same structure keyed on something else, and the only new question is what sits at the leaf.
// The extra hop is the default and it is a real random read; the two cards at the bottom are the two
// ways to delete it, and each of them costs something back.
export const secondaryIndexes: Scene = {
  id: 'secondary-indexes',
  title: 'What sits at the leaf of the index',
  flow: 'TB',
  nodes: [
    {
      id: 'idx',
      kind: 'table',
      label: 'idx_users_city',
      sub: 'sorted by city, not by user_id',
      pattern: 'service',
      headers: ['city', 'row'],
      values: [
        ['Accra', '→ 0x4c20'],
        ['Lagos', '→ 0x18e0'],
        ['Lima', '→ 0x9a40'],
      ],
    },
    { id: 'heap', label: 'Heap file', sub: 'the row itself — a second random read', pattern: 'storage', icon: 'harddrive' },
    {
      id: 'fixes',
      label: 'Two ways to skip that hop',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'clustered', label: 'Clustered', sub: 'the row lives in the index', pattern: 'service', icon: 'boxes' },
        { id: 'covering', label: 'Covering', sub: 'copy the columns you select', pattern: 'service', icon: 'copy' },
      ],
    },
    { id: 'cost', label: 'Both cost writes', sub: 'more copies to keep in step', pattern: 'warn', icon: 'scale' },
  ],
  edges: [
    { source: 'idx', target: 'heap', label: 'the extra hop' },
    { source: 'heap', target: 'fixes' },
    { source: 'fixes', target: 'cost' },
  ],
}
