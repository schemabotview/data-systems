import type { Scene } from '@graphlearning/flow'

// §7 — the inverse trade, and the costs swap places exactly. Partitioning the index by TERM means
// "red" lives in one place, so the read is a single request; but one row has several indexed
// columns, so one write now touches several index partitions on several machines — which is a
// distributed transaction, and nobody wants one of those, so in practice the index is async.
export const globalSecondaryIndex: Scene = {
  id: 'global-secondary-index',
  title: 'Term-partitioned: one place per term',
  flow: 'TB',
  nodes: [
    { id: 'q', label: 'Find red cars', sub: 'the same query as §6', pattern: 'user', icon: 'search' },
    {
      id: 'idx',
      kind: 'table',
      label: 'The index is partitioned by term',
      sub: 'colour a–r here, s–z elsewhere',
      pattern: 'service',
      headers: ['term', 'rows'],
      values: [
        ['colour:red', '→ 306, 768, 1150'],
        ['colour:blue', '→ 122, 991'],
        ['make:volvo', '→ 306, 1150'],
      ],
    },
    { id: 'read', label: 'One request, done', sub: 'no fan-out, no merge', pattern: 'service', icon: 'zap' },
    { id: 'write', label: 'A write hits several', sub: 'so the index runs async', pattern: 'warn', icon: 'swap' },
  ],
  edges: [
    { source: 'q', target: 'idx' },
    { source: 'idx', target: 'read' },
    { source: 'read', target: 'write', label: 'the trade' },
  ],
}
