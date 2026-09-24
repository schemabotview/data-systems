import type { Scene } from '@graphlearning/flow'

// §7 — the graph model drawn as a graph. Two things carry the section: the vertices are NOT all the
// same type (Person · Company · City · Country · Union), and every edge names its own relationship.
// The WITHIN chain is the part a table cannot answer without knowing its depth in advance.
//
// Laid out TB and with KNOWS inside a container, both deliberately. LR put six cards in one row and
// fitView shrank them to unreadable; and drawn as a top-level edge, ada→acme skipped a rank, which
// parked its WORKS_AT pill squarely on the card in between. Nesting the two people puts the
// person-to-person edge on its own horizontal axis inside the box, where nothing can collide.
export const graphShape: Scene = {
  id: 'graph-shape',
  title: 'Anything can relate to anything',
  flow: 'TB',
  nodes: [
    {
      id: 'people',
      label: 'People',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'ada', label: 'Ada', sub: 'Person', pattern: 'user', icon: 'users' },
        { id: 'ben', label: 'Ben', sub: 'Person', pattern: 'user', icon: 'users' },
      ],
      edges: [{ source: 'ada', target: 'ben', label: 'KNOWS', bidirectional: true }],
    },
    { id: 'acme', label: 'Acme', sub: 'Company', pattern: 'service', icon: 'building' },
    { id: 'berlin', label: 'Berlin', sub: 'City', pattern: 'external', icon: 'globe' },
    { id: 'germany', label: 'Germany', sub: 'Country', pattern: 'external', icon: 'globe' },
    { id: 'eu', label: 'EU', sub: 'Union', pattern: 'external', icon: 'globe' },
  ],
  edges: [
    { source: 'people', target: 'acme', label: 'WORKS_AT' },
    { source: 'acme', target: 'berlin', label: 'BASED_IN' },
    { source: 'berlin', target: 'germany', label: 'WITHIN' },
    { source: 'germany', target: 'eu', label: 'WITHIN' },
  ],
}
