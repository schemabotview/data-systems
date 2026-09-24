import type { Scene } from '@graphlearning/flow'

// §6 — the two mechanisms every consensus algorithm shares, drawn together because they only work
// together. The epoch is the fencing token from course 07, applied to leadership; the quorum is the
// majority from course 07 §10. Together they mean an old leader can still believe it leads and
// cannot get a single decision through, because the votes it needs have moved on.
export const epochsAndQuorums: Scene = {
  id: 'epochs-and-quorums',
  title: 'Every leader is fenced by a number',
  flow: 'TB',
  nodes: [
    { id: 'epoch', label: 'Elections raise it', sub: 'term, ballot, view — one idea', pattern: 'service', icon: 'tag' },
    { id: 'vote', label: 'A quorum decides', sub: 'voting for this epoch', pattern: 'service', icon: 'users' },
    { id: 'overlap', label: 'Quorums overlap', sub: 'the shared voter refuses', pattern: 'storage', icon: 'shieldcheck' },
    { id: 'old', label: 'The old leader', sub: 'convinced, and powerless', pattern: 'service', icon: 'ban' },
  ],
  edges: [
    { source: 'epoch', target: 'vote' },
    { source: 'vote', target: 'overlap' },
    { source: 'overlap', target: 'old' },
  ],
}
