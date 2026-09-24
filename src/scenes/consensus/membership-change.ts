import type { Scene } from '@graphlearning/flow'

// §9 — the operation that looks trivial and is not. Nodes learn the new configuration at different
// moments, so for a window there are two definitions of "a majority" in play, and two disjoint
// majorities can elect two leaders. Joint consensus closes it by requiring both definitions at once
// during the transition, which makes the overlap unavoidable.
export const membershipChange: Scene = {
  id: 'membership-change',
  title: 'Two majorities, one cluster',
  flow: 'TB',
  nodes: [
    { id: 'grow', label: 'Growing 3 nodes to 5', sub: 'an ordinary operational change', pattern: 'service', icon: 'plug' },
    { id: 'skew', label: 'They learn late', sub: 'the config is a log entry', pattern: 'warn', icon: 'clock' },
    { id: 'danger', label: 'Two of five, two of three', sub: 'disjoint majorities — two leaders', pattern: 'warn', icon: 'gitbranch' },
    { id: 'joint', label: 'Joint consensus', sub: 'require BOTH majorities', pattern: 'service', icon: 'merge' },
  ],
  edges: [
    { source: 'grow', target: 'skew' },
    { source: 'skew', target: 'danger' },
    { source: 'danger', target: 'joint', label: 'the fix' },
  ],
}
