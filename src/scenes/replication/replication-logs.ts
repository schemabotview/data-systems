import type { Scene } from '@graphlearning/flow'

// §7 — "the leader sends the log to the follower" has been hand-waved for six sections; this is what
// is actually in it, and the four answers are genuinely different products. The row that matters
// beyond this course is the third: a logical log is decoupled from the storage engine, which is what
// makes it readable by something that is not a database at all — the seed of CDC in course 10.
export const replicationLogs: Scene = {
  id: 'replication-logs',
  title: 'What is actually in the log',
  nodes: [
    {
      id: 'methods',
      kind: 'table',
      label: 'Four things the leader could ship',
      sub: 'they are not interchangeable',
      pattern: 'service',
      headers: ['Method', 'What travels', 'Where it breaks'],
      values: [
        ['Statement', 'the SQL itself', 'NOW(), RAND(), auto-increment'],
        ['WAL shipping', 'storage-engine bytes', 'replica pinned to the exact version'],
        ['Row-based', 'the resulting row values', 'larger log — and almost nothing else'],
        ['Trigger', 'whatever you write', 'slow and bug-prone, but flexible'],
      ],
    },
    { id: 'logical', label: 'A logical log', sub: 'engine-free — anything can read it', pattern: 'storage', icon: 'scroll' },
  ],
  edges: [{ source: 'methods', target: 'logical' }],
}
