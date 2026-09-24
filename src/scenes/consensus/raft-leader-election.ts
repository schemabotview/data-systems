import type { Scene } from '@graphlearning/flow'

// §7 — Raft's election, and the two details that make it terminate. The randomised timeout is what
// breaks symmetry: without it every follower becomes a candidate at the same instant, splits the
// vote, and the cycle repeats forever. The log-completeness check is what makes it SAFE — a
// candidate missing committed entries cannot win, so no committed entry is ever lost.
export const raftLeaderElection: Scene = {
  id: 'raft-leader-election',
  title: 'A randomised timeout breaks the tie',
  flow: 'TB',
  nodes: [
    { id: 'quiet', label: 'No heartbeat', sub: 'for a randomised 150–300 ms', pattern: 'warn', icon: 'clock' },
    { id: 'cand', label: 'It becomes a candidate', sub: 'raises the term and votes for itself', pattern: 'service', icon: 'usercheck' },
    { id: 'ask', label: 'Asks for votes', sub: 'one per node, per term', pattern: 'network', icon: 'share' },
    {
      id: 'check',
      label: 'A voter says yes only if',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'term', label: 'The term is newer', sub: 'and it has not voted yet', pattern: 'service', icon: 'tag' },
        { id: 'log', label: 'Its log is complete', sub: 'so nothing committed is lost', pattern: 'service', icon: 'scroll' },
      ],
    },
    { id: 'win', label: 'A majority wins it', sub: 'and starts sending heartbeats', pattern: 'service', icon: 'circlecheck' },
  ],
  edges: [
    { source: 'quiet', target: 'cand' },
    { source: 'cand', target: 'ask' },
    { source: 'ask', target: 'check' },
    { source: 'check', target: 'win' },
  ],
}
