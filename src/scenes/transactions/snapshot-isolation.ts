import type { Scene } from '@graphlearning/flow'

// §5 — MVCC, shown as the rows actually stored rather than described. Read the table as the real
// contents of the page: an UPDATE is a delete plus an insert, both stamped with the transaction that
// did it, and nothing is ever modified in place. The visibility rule then falls out of the stamps,
// and that is why a reader needs no locks at all — which is the whole win.
export const snapshotIsolation: Scene = {
  id: 'snapshot-isolation',
  title: 'Nothing is overwritten — only stamped',
  flow: 'TB',
  nodes: [
    {
      id: 'rows',
      kind: 'table',
      label: 'What the page really holds',
      sub: 'an UPDATE is a delete plus an insert',
      pattern: 'service',
      headers: ['created by', 'deleted by', 'balance'],
      values: [
        ['txn 12', 'txn 13', '500'],
        ['txn 13', '—', '400'],
        ['txn 13', '—', '600'],
      ],
    },
    { id: 'rule', label: 'Visibility rule', sub: 'creator committed, deleter not', pattern: 'service', icon: 'circlecheck' },
    { id: 'win', label: 'Readers never lock', sub: 'and never block a writer', pattern: 'storage', icon: 'zap' },
  ],
  edges: [
    { source: 'rows', target: 'rule' },
    { source: 'rule', target: 'win' },
  ],
}
