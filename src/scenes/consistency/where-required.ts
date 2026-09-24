import type { Scene } from '@graphlearning/flow'

// §4 — four places you cannot get away without it, chosen because each fails differently. The
// cross-channel one is the most instructive and the least obvious: the system is internally
// consistent and still broken, because a second communication path outran the first.
export const whereRequired: Scene = {
  id: 'where-required',
  title: 'Four places you cannot avoid it',
  flow: 'TB',
  nodes: [
    {
      id: 'four',
      label: 'Where a stale read is a real failure',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'elect', label: 'Leader election', sub: 'two leaders is split brain', pattern: 'warn', icon: 'usercheck' },
        { id: 'unique', label: 'Uniqueness', sub: 'one seat, sold twice', pattern: 'warn', icon: 'key' },
        { id: 'balance', label: 'A balance check', sub: 'spending money twice', pattern: 'warn', icon: 'scale' },
        { id: 'cross', label: 'Two channels', sub: 'the second one overtakes', pattern: 'warn', icon: 'share' },
      ],
    },
    { id: 'example', label: 'The cross-channel case', sub: 'the queue outran the storage', pattern: 'storage', icon: 'bug' },
  ],
  edges: [{ source: 'four', target: 'example' }],
}
