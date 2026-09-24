import type { Scene } from '@graphlearning/flow'

// §7 — the move from bounded to unbounded input, and the two delivery patterns that a broker has to
// choose between. They are not variants of one thing: load balancing is for expensive work you want
// parallelised, fan-out is for independent consumers that each need everything. Kafka does both at
// once, which is §8.
export const eventStreams: Scene = {
  id: 'event-streams',
  title: 'The input never ends',
  flow: 'TB',
  nodes: [
    { id: 'prod', label: 'Producers', sub: 'an event is one small immutable fact', pattern: 'user', icon: 'pencil' },
    { id: 'broker', label: 'A broker between', sub: 'a slow consumer cannot stall', pattern: 'network', icon: 'swap' },
    {
      id: 'two',
      label: 'Two delivery patterns',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lb', label: 'Load balancing', sub: 'one consumer per message', pattern: 'service', icon: 'share' },
        { id: 'fan', label: 'Fan-out', sub: 'every consumer gets everything', pattern: 'service', icon: 'copy' },
      ],
    },
  ],
  edges: [
    { source: 'prod', target: 'broker' },
    { source: 'broker', target: 'two' },
  ],
}
