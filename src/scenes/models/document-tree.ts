import type { Scene } from '@graphlearning/flow'

// §3 — the document model as an actual document, because the argument for it is visual: everything
// about one order is inside one pair of braces, so one seek returns the whole thing. The three tiles
// name what that buys; §4 and §5 are where the same picture starts costing something.
export const documentTree: Scene = {
  id: 'document-tree',
  title: 'The whole record, in one place',
  flow: 'LR',
  nodes: [
    {
      id: 'doc',
      kind: 'code',
      filename: 'order-8812.json',
      hug: true,
      label: `{
  "order_id": 8812,
  "placed_at": "2026-03-04T11:02Z",
  "customer": {
    "name": "Ada Okafor",
    "city": "Lagos"
  },
  "lines": [
    { "sku": "KB-21", "qty": 1 },
    { "sku": "MS-04", "qty": 2 }
  ]
}`,
    },
    {
      id: 'buys',
      label: 'What one tree buys',
      pattern: 'group',
      children: [
        { id: 'locality', label: 'Locality', sub: 'one seek, whole record', pattern: 'service', icon: 'zap', variant: 'tile' },
        { id: 'nojoin', label: 'No joins', sub: 'the tree is the join', pattern: 'service', icon: 'merge', variant: 'tile' },
        { id: 'flexible', label: 'Flexible', sub: 'no migration to add a field', pattern: 'service', icon: 'layers', variant: 'tile' },
      ],
    },
  ],
  edges: [{ source: 'doc', target: 'buys', label: 'one read' }],
}
