import type { Scene } from '@graphlearning/flow'

// §4 — the cheapest idea in the course and the one people skip: store the ID, not the string. The
// left table is not a straw man; it is what every free-text field becomes within a year. Three
// spellings of one city means no grouping, no rename, no autocomplete. The arrow is the fix.
export const manyToOne: Scene = {
  id: 'many-to-one',
  title: 'Store the ID, not the string',
  flow: 'LR',
  nodes: [
    {
      id: 'freetext',
      kind: 'table',
      label: 'city as free text',
      sub: 'three spellings, one city',
      pattern: 'warn',
      headers: ['user', 'city'],
      values: [
        ['ada', 'Greater Lagos'],
        ['ben', 'Lagos, NG'],
        ['cleo', 'lagos'],
      ],
    },
    {
      id: 'users',
      kind: 'table',
      label: 'users',
      sub: 'city_id points at the row below',
      pattern: 'service',
      columns: [
        { name: 'user_id', type: 'bigint', key: 'PK' },
        { name: 'name', type: 'text' },
        { name: 'city_id', type: 'int', key: 'FK' },
      ],
    },
    {
      id: 'cities',
      kind: 'table',
      label: 'cities',
      sub: 'one row, one spelling',
      pattern: 'storage',
      columns: [
        { name: 'city_id', type: 'int', key: 'PK' },
        { name: 'name', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
  ],
  // Two ranks, not three. Laid out as a chain (freetext → users → cities) the three tables sit in
  // one row and fitView shrinks the type until the column names are unreadable; splitting ONE table
  // into two is also the truer picture of what normalizing does.
  edges: [
    { source: 'freetext', target: 'users', label: 'normalize' },
    { source: 'freetext', target: 'cities' },
  ],
}
