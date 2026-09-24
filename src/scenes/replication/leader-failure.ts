import type { Scene } from '@graphlearning/flow'

// §6 — the hard failure, and the one section of this course worth reading twice. The three steps are
// mechanical; the four failure modes underneath are where real outages live, and note that every one
// of them stems from the same root — nobody can tell a dead leader from a slow one. That is not an
// implementation gap, it is a fact about networks, and course 07 is about why.
export const leaderFailure: Scene = {
  id: 'leader-failure',
  title: 'The leader dies — and now it is hard',
  flow: 'TB',
  nodes: [
    { id: 'detect', label: 'Leader stops answering', sub: 'a timeout fires — it may still be alive', pattern: 'warn', icon: 'clock' },
    { id: 'elect', label: 'Elect a new leader', sub: 'the most up-to-date follower wins', pattern: 'service', icon: 'usercheck' },
    { id: 'point', label: 'Reconfigure everyone', sub: 'clients, followers, and the old leader', pattern: 'network', icon: 'router' },
    {
      id: 'wrong',
      label: 'Four ways this goes wrong',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lost', label: 'Lost writes', sub: 'async writes the new leader never saw', pattern: 'warn', icon: 'trash' },
        { id: 'split', label: 'Split brain', sub: 'the old leader comes back, still leading', pattern: 'warn', icon: 'gitbranch' },
        { id: 'short', label: 'Timeout too short', sub: 'a load spike is enough', pattern: 'warn', icon: 'zap' },
        { id: 'long', label: 'Timeout too long', sub: 'a real outage lasts that much longer', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'detect', target: 'elect' },
    { source: 'elect', target: 'point' },
    { source: 'point', target: 'wrong' },
  ],
}
