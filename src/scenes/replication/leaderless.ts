import type { Scene } from '@graphlearning/flow'

// §12 — no leader at all: the client writes to every replica and counts acknowledgements. The
// inequality is the entire design, and it is worth stating why it works — if the write set and the
// read set must overlap, then any read is guaranteed to touch at least one replica that saw the
// write, and version numbers decide the rest.
export const leaderless: Scene = {
  id: 'leaderless',
  title: 'Count the replies instead',
  flow: 'TB',
  nodes: [
    { id: 'write', label: 'Write to all three', sub: 'no leader to route through', pattern: 'user', icon: 'pencil' },
    {
      id: 'replicas',
      label: 'n = 3 replicas',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'r1', label: 'Replica 1', sub: 'ack', pattern: 'storage', icon: 'database' },
        { id: 'r2', label: 'Replica 2', sub: 'ack', pattern: 'storage', icon: 'database' },
        { id: 'r3', label: 'Replica 3', sub: 'down — misses it', pattern: 'warn', icon: 'skull' },
      ],
    },
    { id: 'quorum', label: 'w = 2 of 3 → success', sub: 'the client does not wait for the third', pattern: 'service', icon: 'circlecheck' },
    { id: 'read', label: 'Read r = 2 of 3', sub: 'w + r > n, so one reply is current', pattern: 'service', icon: 'search' },
  ],
  edges: [
    { source: 'write', target: 'replicas' },
    { source: 'replicas', target: 'quorum' },
    { source: 'quorum', target: 'read', label: 'later' },
  ],
}
