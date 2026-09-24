import type { Scene } from '@graphlearning/flow'

// §8 — the design that made streaming useful, and the difference from a classic queue is one word:
// nothing is deleted on read. A consumer's position is a number the broker stores, which is why
// replay is free, why a new consumer can start from the beginning, and why lag is a single
// subtraction you can put on a dashboard.
export const partitionedLog: Scene = {
  id: 'partitioned-log',
  title: 'Reading does not delete',
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      kind: 'table',
      label: 'One partition of the topic',
      sub: 'append-only, ordered, retained for days',
      pattern: 'storage',
      headers: ['offset', 'event'],
      values: [
        ['1041', 'order placed'],
        ['1042', 'payment taken'],
        ['1043', 'order shipped'],
      ],
    },
    { id: 'offset', label: 'A consumer is a number', sub: 'the broker remembers it', pattern: 'service', icon: 'tag' },
    {
      id: 'buys',
      label: 'What that buys',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'replay', label: 'Replay', sub: 'set the offset back', pattern: 'service', icon: 'repeat' },
        { id: 'new', label: 'New consumers', sub: 'start from zero, free', pattern: 'service', icon: 'plug' },
        { id: 'lag', label: 'Lag is a number', sub: 'head minus your offset', pattern: 'service', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'log', target: 'offset' },
    { source: 'offset', target: 'buys' },
  ],
}
