import type { Scene } from '@graphlearning/flow'

// §2 — the arrangement almost every relational database ships with, and the asymmetry is the whole
// of it: writes have exactly one door, reads have several. That is what makes it simple (no write
// conflicts are possible, ever) and what makes §6 hard (the one door is a single point of failure).
export const singleLeader: Scene = {
  id: 'single-leader',
  title: 'One door for writes, many for reads',
  flow: 'TB',
  nodes: [
    { id: 'writes', label: 'Every write', sub: 'one place to send them', pattern: 'user', icon: 'pencil' },
    { id: 'leader', label: 'Leader', sub: 'the only node that accepts writes', pattern: 'service', icon: 'server' },
    { id: 'f1', label: 'Follower', sub: 'applies the log, in order', pattern: 'storage', icon: 'database' },
    { id: 'f2', label: 'Follower', sub: 'applies the log, in order', pattern: 'storage', icon: 'database' },
    { id: 'reads', label: 'Reads', sub: 'any node — this is the scaling', pattern: 'user', icon: 'search' },
  ],
  edges: [
    { source: 'writes', target: 'leader' },
    { source: 'leader', target: 'f1', label: 'replication log' },
    { source: 'leader', target: 'f2' },
    { source: 'f1', target: 'reads' },
    { source: 'f2', target: 'reads' },
  ],
}
