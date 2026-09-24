import type { Scene } from '@graphlearning/flow'

// §5 — where the tree stops. A membership belongs to BOTH sides, so it belongs to neither, and a
// document has to pick an owner. Whichever it picks, the other side is a scan. The join table is
// not relational bureaucracy; it is the only honest place to put a fact about two things.
export const manyToMany: Scene = {
  id: 'many-to-many',
  title: 'The fact that belongs to both sides',
  flow: 'LR',
  nodes: [
    {
      id: 'users',
      kind: 'table',
      label: 'users',
      pattern: 'storage',
      columns: [
        { name: 'user_id', type: 'bigint', key: 'PK' },
        { name: 'name', type: 'text' },
      ],
    },
    {
      id: 'memberships',
      kind: 'table',
      label: 'memberships',
      sub: 'owned by neither side',
      pattern: 'service',
      columns: [
        { name: 'user_id', type: 'bigint', key: 'FK' },
        { name: 'team_id', type: 'bigint', key: 'FK' },
        { name: 'role', type: 'text' },
        { name: 'joined_at', type: 'date' },
      ],
    },
    {
      id: 'teams',
      kind: 'table',
      label: 'teams',
      pattern: 'storage',
      columns: [
        { name: 'team_id', type: 'bigint', key: 'PK' },
        { name: 'name', type: 'text' },
      ],
    },
    {
      id: 'cost',
      label: 'A document must pick',
      sub: 'nest it, and one side scans',
      pattern: 'warn',
      icon: 'scissors',
    },
  ],
  edges: [
    { source: 'users', target: 'memberships', label: 'user_id' },
    { source: 'teams', target: 'memberships', label: 'team_id' },
    { source: 'memberships', target: 'cost', label: 'or nest it' },
  ],
}
