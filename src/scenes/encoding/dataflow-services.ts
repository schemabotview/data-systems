import type { Scene } from '@graphlearning/flow'

// §9 — the same compatibility question, asked of two topologies, and the answer differs because of
// who controls the upgrade. Through a service the SERVER must tolerate old callers indefinitely,
// because a mobile app on a phone is never going to be upgraded on your schedule. Through a broker
// the producer is decoupled from every consumer, which is why the log ends up being the easier seam.
export const dataflowServices: Scene = {
  id: 'dataflow-services',
  title: 'Who you can force to upgrade',
  cols: 2,
  nodes: [
    {
      id: 'svc',
      label: 'Through a service — request/response',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 's-client', label: 'Clients', sub: 'a mobile app you cannot recall', pattern: 'user', icon: 'users' },
        { id: 's-server', label: 'Server', sub: 'upgrade this side first', pattern: 'service', icon: 'server' },
        { id: 's-rule', label: 'Server carries it', sub: 'old requests answered for years', pattern: 'warn', icon: 'clock' },
      ],
      edges: [
        { source: 's-client', target: 's-server', label: 'v1 request' },
        { source: 's-server', target: 's-rule' },
      ],
    },
    {
      id: 'broker',
      label: 'Through a broker — async messages',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'b-prod', label: 'Producer', sub: 'sends and forgets', pattern: 'service', icon: 'server' },
        { id: 'b-queue', label: 'Broker', sub: 'buffers, retries, fans out', pattern: 'network', icon: 'swap' },
        { id: 'b-cons', label: 'Consumers', sub: 'each upgrades on its own clock', pattern: 'service', icon: 'boxes' },
      ],
      edges: [
        { source: 'b-prod', target: 'b-queue' },
        { source: 'b-queue', target: 'b-cons' },
      ],
    },
  ],
  edges: [],
}
