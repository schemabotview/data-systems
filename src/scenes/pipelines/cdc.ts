import type { Scene } from '@graphlearning/flow'

// §9 — the payoff for course 04 §7. The replication log already exists and already contains every
// change in order; CDC just points something other than a replica at it. The card at the bottom is
// why this beats dual writes: one ordered source of truth means the derived systems converge, and
// two independent writes mean they diverge the moment one of them fails.
export const cdc: Scene = {
  id: 'cdc',
  title: 'The replication log, read by something else',
  flow: 'TB',
  nodes: [
    { id: 'db', label: 'The database', sub: 'still the system of record', pattern: 'storage', icon: 'database' },
    { id: 'log', label: 'Replication log', sub: 'every change, in order', pattern: 'storage', icon: 'scroll' },
    {
      id: 'derived',
      label: 'Derived systems, each a consumer',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'search', label: 'Search index', sub: 'never re-crawls', pattern: 'service', icon: 'search' },
        { id: 'cache', label: 'Cache', sub: 'invalidated by the log', pattern: 'service', icon: 'zap' },
        { id: 'wh', label: 'Warehouse', sub: 'no nightly dump', pattern: 'service', icon: 'warehouse' },
      ],
    },
    { id: 'why', label: 'Why not write both', sub: 'two writes can half-fail', pattern: 'warn', icon: 'scissors' },
  ],
  edges: [
    { source: 'db', target: 'log' },
    { source: 'log', target: 'derived' },
    { source: 'derived', target: 'why' },
  ],
}
