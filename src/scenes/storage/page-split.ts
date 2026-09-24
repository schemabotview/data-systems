import type { Scene } from '@graphlearning/flow'

// §7 — the one B-tree operation worth drawing, as before and after. The engine does static layout,
// not animation, so the split is two states with the insert on the arrow between them. What the
// picture is really for is the count: ONE insert has just dirtied three pages, and all three have to
// survive a crash together. That is the sentence §8 exists to answer.
export const pageSplit: Scene = {
  id: 'page-split',
  title: 'One insert, three pages changed',
  flow: 'LR',
  nodes: [
    {
      id: 'before',
      kind: 'code',
      filename: 'page 12 · before',
      hug: true,
      label: `| 100 | 200 | 300 | 400 |
  full — 350 will not fit`,
    },
    {
      id: 'after',
      label: 'After the split',
      pattern: 'group',
      children: [
        {
          id: 'p12',
          kind: 'code',
          filename: 'page 12',
          hug: true,
          label: `| 100 | 200 |`,
        },
        {
          id: 'p47',
          kind: 'code',
          filename: 'page 47 · new',
          hug: true,
          label: `| 300 | 350 | 400 |`,
        },
      ],
    },
    { id: 'parent', label: 'Parent rewritten', sub: 'a new reference: 300 → page 47', pattern: 'warn', icon: 'pencil' },
  ],
  edges: [
    { source: 'before', target: 'after', label: 'insert 350' },
    { source: 'after', target: 'parent' },
  ],
}
