import type { Scene } from '@graphlearning/flow'

// §10 — the practical ending. Almost nobody should implement consensus; almost everybody uses it,
// through a service built for it. The four uses are the four problems earlier courses left open, and
// the last card is the design rule: keep the coordination data small, because consensus does not
// scale with data volume — it scales with nothing at all.
export const coordinationServices: Scene = {
  id: 'coordination-services',
  title: 'You use consensus. You do not write it.',
  flow: 'TB',
  nodes: [
    {
      id: 'uses',
      label: 'What ZooKeeper and etcd are actually for',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lock', label: 'Locks and leases', sub: 'with a fencing token', pattern: 'service', icon: 'lock' },
        { id: 'elect', label: 'Leader election', sub: 'course 04, done properly', pattern: 'service', icon: 'usercheck' },
        { id: 'member', label: 'Membership', sub: 'who is alive, by consensus', pattern: 'service', icon: 'users' },
        { id: 'alloc', label: 'Partition assignment', sub: 'course 05, the map', pattern: 'service', icon: 'tree' },
      ],
    },
    { id: 'small', label: 'Keep the data tiny', sub: 'coordination, not storage', pattern: 'storage', icon: 'memory' },
    { id: 'outsource', label: 'Outsource it', sub: 'Kafka and Kubernetes do', pattern: 'service', icon: 'shieldcheck' },
  ],
  edges: [
    { source: 'uses', target: 'small' },
    { source: 'small', target: 'outsource' },
  ],
}
