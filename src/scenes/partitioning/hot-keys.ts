import type { Scene } from '@graphlearning/flow'

// §5 — the case hashing does not fix, because hashing balances KEYS and this is one key. The
// workaround is deliberately drawn with its cost attached: splitting the key spreads the writes and
// makes every read a hundred-way fan-out, so it has to be applied to the few keys that need it and
// the application has to know which those are. There is no automatic version of this.
export const hotKeys: Scene = {
  id: 'hot-keys',
  title: 'One key, all the traffic',
  flow: 'TB',
  nodes: [
    { id: 'celeb', label: 'A celebrity posts', sub: 'millions of writes to one key', pattern: 'user', icon: 'star' },
    { id: 'burn', label: 'One partition', sub: 'hashing balances keys; this is one', pattern: 'warn', icon: 'zap' },
    { id: 'split', label: 'Split it artificially', sub: 'append a random 0–99 to the key', pattern: 'service', icon: 'scissors' },
    { id: 'cost', label: 'Reads now fan out', sub: '100 queries, then a merge', pattern: 'warn', icon: 'share' },
  ],
  edges: [
    { source: 'celeb', target: 'burn' },
    { source: 'burn', target: 'split', label: 'workaround' },
    { source: 'split', target: 'cost' },
  ],
}
