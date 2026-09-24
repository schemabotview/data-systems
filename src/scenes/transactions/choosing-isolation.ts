import type { Scene } from '@graphlearning/flow'

// §12 — the recap as the table people actually want, with the trap named underneath. The row that
// surprises everyone is Oracle: its "SERIALIZABLE" is snapshot isolation, so it does not prevent
// write skew, and a system audited as serializable on the strength of that setting is not.
export const choosingIsolation: Scene = {
  id: 'choosing-isolation',
  title: 'Which anomalies each level still allows',
  nodes: [
    {
      id: 'matrix',
      kind: 'table',
      label: 'Level against anomaly',
      sub: 'read down a column, not across a row',
      pattern: 'service',
      headers: ['Level', 'Dirty read', 'Lost update', 'Write skew'],
      values: [
        ['Read committed', 'stopped', 'allowed', 'allowed'],
        ['Snapshot isolation', 'stopped', 'detected*', 'allowed'],
        ['Serializable (2PL)', 'stopped', 'stopped', 'stopped'],
        ['Serializable (SSI)', 'stopped', 'stopped', 'stopped'],
      ],
    },
    { id: 'names', label: 'The names lie', sub: "Oracle's is snapshot isolation", pattern: 'warn', icon: 'ban' },
  ],
  edges: [{ source: 'matrix', target: 'names' }],
}
