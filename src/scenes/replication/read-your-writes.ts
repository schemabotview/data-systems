import type { Scene } from '@graphlearning/flow'

// §8 — the first replication-lag anomaly, and the one users report as a bug. It is worth drawing as
// a sequence because the surprise is temporal, not structural: every node here is behaving exactly
// as designed, and the user still watched their own comment vanish.
export const readYourWrites: Scene = {
  id: 'read-your-writes',
  title: 'They posted it. Now it is gone.',
  flow: 'TB',
  nodes: [
    { id: 'post', label: 'User posts a comment', sub: 'the write goes to the leader', pattern: 'user', icon: 'pencil' },
    { id: 'leader', label: 'Leader has it', sub: 'acknowledged, committed, fine', pattern: 'service', icon: 'server' },
    { id: 'follower', label: 'Follower lags 1s', sub: 'the comment is not there yet', pattern: 'warn', icon: 'clock' },
    { id: 'refresh', label: 'They refresh — nothing', sub: 'to them, the site lost their data', pattern: 'warn', icon: 'search' },
  ],
  edges: [
    { source: 'post', target: 'leader' },
    { source: 'leader', target: 'follower', label: 'async' },
    { source: 'follower', target: 'refresh', label: 'reads from' },
  ],
}
