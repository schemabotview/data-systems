import type { Scene } from '@graphlearning/flow'

// §8 — the data-loss bug that no type checker catches and no test suite has, because every service
// in it behaves correctly. v1 decodes the row into a struct it understands, and `currency` is simply
// not a field of that struct; when it writes the struct back, the value is gone. The fix is not a
// schema rule, it is a decode/re-encode rule: keep the fields you did not understand.
export const dataflowDatabases: Scene = {
  id: 'dataflow-databases',
  title: 'The field that disappears on a round trip',
  flow: 'TB',
  nodes: [
    { id: 'w2', label: 'v2 writes the row', sub: 'user · total · currency', pattern: 'service', icon: 'pencil' },
    { id: 'r1', label: 'v1 reads it', sub: 'decodes into a struct with two fields', pattern: 'external', icon: 'server' },
    { id: 'w1', label: 'v1 writes it back', sub: 'having changed the total', pattern: 'external', icon: 'pencil' },
    { id: 'gone', label: 'currency is gone', sub: 'no error, anywhere, ever', pattern: 'warn', icon: 'trash' },
  ],
  edges: [
    { source: 'w2', target: 'r1' },
    { source: 'r1', target: 'w1', label: 'update' },
    { source: 'w1', target: 'gone' },
  ],
}
