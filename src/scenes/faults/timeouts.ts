import type { Scene } from '@graphlearning/flow'

// §3 — the only tool available for §2, and both ends of it are wrong. The middle card is the point:
// the reason you cannot compute the correct value is that there is no upper bound to compute it
// from, so the number is always a guess about a distribution you do not control.
export const timeouts: Scene = {
  id: 'timeouts',
  title: 'The only tool, and no correct setting',
  flow: 'TB',
  nodes: [
    {
      id: 'ends',
      label: 'Both extremes are wrong',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'short', label: 'Too short', sub: 'a live node declared dead', pattern: 'warn', icon: 'zap' },
        { id: 'long', label: 'Too long', sub: 'a real failure sits unnoticed', pattern: 'warn', icon: 'clock' },
      ],
    },
    { id: 'nobound', label: 'No upper bound exists', sub: 'packet delay is unbounded, by design', pattern: 'warn', icon: 'ban' },
    { id: 'adaptive', label: 'Measure, do not guess', sub: 'track the distribution, adapt', pattern: 'service', icon: 'gauge' },
  ],
  edges: [
    { source: 'ends', target: 'nobound' },
    { source: 'nobound', target: 'adaptive' },
  ],
}
