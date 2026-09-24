import type { Scene } from '@graphlearning/flow'

// §2 — a relation drawn as a relation. Three tables and two foreign keys is the entire model, and
// the point the schema makes on its own: `orders` stores IDs, not copies, so a product's price
// lives in exactly one row. Every join in the next four sections is one of these two arrows.
export const relationalShape: Scene = {
  id: 'relational-shape',
  title: 'Tables, keys, and the arrows between them',
  flow: 'LR',
  nodes: [
    {
      id: 'users',
      kind: 'table',
      label: 'users',
      sub: 'one row per person',
      pattern: 'storage',
      columns: [
        { name: 'user_id', type: 'bigint', key: 'PK' },
        { name: 'name', type: 'text' },
        { name: 'signed_up', type: 'timestamptz' },
      ],
    },
    {
      id: 'orders',
      kind: 'table',
      label: 'orders',
      sub: 'holds IDs, never copies',
      pattern: 'service',
      columns: [
        { name: 'order_id', type: 'bigint', key: 'PK' },
        { name: 'user_id', type: 'bigint', key: 'FK' },
        { name: 'product_id', type: 'bigint', key: 'FK' },
        { name: 'quantity', type: 'int' },
      ],
    },
    {
      id: 'products',
      kind: 'table',
      label: 'products',
      sub: 'the price lives here, once',
      pattern: 'storage',
      columns: [
        { name: 'product_id', type: 'bigint', key: 'PK' },
        { name: 'title', type: 'text' },
        { name: 'price_cents', type: 'int' },
      ],
    },
  ],
  edges: [
    { source: 'users', target: 'orders', label: 'user_id' },
    { source: 'products', target: 'orders', label: 'product_id' },
  ],
}
