import type { Scene } from '@graphlearning/flow'

// §4 — the point worth carrying: in a batch system a join is not a lookup, it is a shuffle. Sending
// both sides to the same reducer by key turns a billion random reads into one sequential merge, and
// that is why a job that "just does a join" moves the entire dataset across the network first.
export const sortMergeJoin: Scene = {
  id: 'sort-merge-join',
  title: 'A join is a shuffle, not a lookup',
  flow: 'TB',
  nodes: [
    { id: 'naive', label: 'The obvious way', sub: 'query the DB per event', pattern: 'warn', icon: 'search' },
    { id: 'why', label: 'A billion reads', sub: 'against a live database', pattern: 'warn', icon: 'gauge' },
    {
      id: 'both',
      label: 'Instead, partition both sides by the same key',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'events', label: 'Events', sub: 'keyed by user_id', pattern: 'service', icon: 'file' },
        { id: 'users', label: 'User records', sub: 'keyed by user_id', pattern: 'storage', icon: 'database' },
      ],
    },
    { id: 'merge', label: 'One reducer, both', sub: 'sorted — a sequential merge', pattern: 'service', icon: 'merge' },
  ],
  edges: [
    { source: 'naive', target: 'why' },
    { source: 'why', target: 'both', label: 'instead' },
    { source: 'both', target: 'merge' },
  ],
}
