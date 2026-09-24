import type { Scene } from '@graphlearning/flow'

// §4 — the procedure that makes replication operational rather than theoretical: you can add a node
// to a live system without stopping it. The load-bearing detail is the position recorded WITH the
// snapshot. Without it the new node cannot know where in the stream to start, and the choice is
// between missing writes and replaying them.
export const addingAFollower: Scene = {
  id: 'adding-a-follower',
  title: 'A new replica, with no downtime',
  flow: 'TB',
  nodes: [
    { id: 'snap', label: 'Snapshot the leader', sub: 'no lock — MVCC gives a consistent view', pattern: 'storage', icon: 'copy' },
    { id: 'copy', label: 'Copy it to the new node', sub: 'minutes or hours; nobody waits', pattern: 'network', icon: 'swap' },
    { id: 'ask', label: 'Ask for the log', sub: 'from the position stamped on the snapshot', pattern: 'service', icon: 'scroll' },
    { id: 'caught', label: 'Catch up, then stay', sub: 'it is now an ordinary follower', pattern: 'service', icon: 'circlecheck' },
  ],
  edges: [
    { source: 'snap', target: 'copy' },
    { source: 'copy', target: 'ask' },
    { source: 'ask', target: 'caught' },
  ],
}
