import type { Scene } from '@graphlearning/flow'

// §4 — where the delay in §3 actually comes from, and it is queues all the way down. Four of them,
// each a place a packet waits for something busy. The last card is the design consequence: every one
// of these gets worse under load, so response times spread out exactly when you most need them tight.
export const congestionAndQueueing: Scene = {
  id: 'congestion-and-queueing',
  title: 'Four queues between you and the answer',
  flow: 'TB',
  nodes: [
    { id: 'switch', label: 'The switch queue', sub: 'several senders, one destination port', pattern: 'network', icon: 'router' },
    { id: 'os', label: 'The receiver OS', sub: 'all cores busy — the packet waits', pattern: 'service', icon: 'cpu' },
    { id: 'vm', label: 'The hypervisor', sub: 'your VM paused while a neighbour runs', pattern: 'service', icon: 'layers' },
    { id: 'tcp', label: 'TCP retransmission', sub: 'a lost packet costs a full round trip', pattern: 'network', icon: 'repeat' },
    { id: 'load', label: 'All four worsen', sub: 'exactly when load is high', pattern: 'warn', icon: 'gauge' },
  ],
  edges: [
    { source: 'switch', target: 'os' },
    { source: 'os', target: 'vm' },
    { source: 'vm', target: 'tcp' },
    { source: 'tcp', target: 'load' },
  ],
}
