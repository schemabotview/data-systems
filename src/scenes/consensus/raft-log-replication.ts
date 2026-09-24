import type { Scene } from '@graphlearning/flow'

// §8 — what the leader does for the rest of its term, and the distinction people miss: committed and
// applied are not the same moment. An entry is committed once a majority has it durably, which is
// the point of no return; applying it to the state machine happens afterwards, and a follower may
// apply it later still. The commit index is how everyone learns which entries have crossed the line.
export const raftLogReplication: Scene = {
  id: 'raft-log-replication',
  title: 'Committed, then applied',
  flow: 'TB',
  nodes: [
    { id: 'append', label: 'Leader appends', sub: 'not committed, not visible', pattern: 'service', icon: 'pencil' },
    { id: 'ship', label: 'Sends it out', sub: 'with the previous entry', pattern: 'network', icon: 'share' },
    { id: 'majority', label: 'A majority has it', sub: 'THIS is the commit point', pattern: 'storage', icon: 'shieldcheck' },
    { id: 'apply', label: 'Now apply it', sub: 'and answer the client', pattern: 'service', icon: 'gears' },
  ],
  edges: [
    { source: 'append', target: 'ship' },
    { source: 'ship', target: 'majority' },
    { source: 'majority', target: 'apply', label: 'only now' },
  ],
}
