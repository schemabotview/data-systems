import type { Scene } from '@graphlearning/flow'

// §10 — the recap as the thing you actually need at design time: which guarantee real systems give
// you. The row that catches people is the second, because "strongly consistent" in a product's
// marketing usually means the default configuration is not.
export const orderingSummary: Scene = {
  id: 'ordering-summary',
  title: 'What real systems actually give you',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'By default, unless configured otherwise',
      sub: 'check your own settings — several of these are tunable',
      pattern: 'service',
      headers: ['System', 'Default guarantee'],
      values: [
        ['Single-leader, reads from leader', 'linearizable'],
        ['Single-leader, reads from replicas', 'eventual — this is the trap'],
        ['Multi-leader', 'eventual, with conflicts'],
        ['Leaderless w + r > n', 'not linearizable — see course 04'],
        ['ZooKeeper, etcd', 'linearizable, by design'],
        ['Kafka partition', 'total order, within one partition'],
      ],
    },
    { id: 'rule', label: 'Pay where it matters', sub: 'a few need it; most do not', pattern: 'storage', icon: 'scale' },
  ],
  edges: [{ source: 'table', target: 'rule' }],
}
