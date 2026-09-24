import type { Scene } from '@graphlearning/flow'

// §9 — the one real fix in this course, and it is worth noticing WHY it works: it stops trying to
// make the client behave correctly and instead makes the resource able to refuse. The client is
// still confused, still convinced, still sending writes — and the storage layer, which has seen a
// higher number, simply rejects it. Never trust a node's own belief about its status.
export const fencingTokens: Scene = {
  id: 'fencing-tokens',
  title: 'Let the resource refuse',
  flow: 'TB',
  nodes: [
    { id: 'issue', label: 'A number per grant', sub: 'and it only increases', pattern: 'service', icon: 'tag' },
    {
      id: 'two',
      label: 'Two clients, two tokens',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'old', label: 'Paused client', sub: 'holds token 33', pattern: 'warn', icon: 'skull' },
        { id: 'new', label: 'New leader', sub: 'holds token 34', pattern: 'service', icon: 'usercheck' },
      ],
    },
    { id: 'store', label: 'Storage remembers the highest', sub: 'it has seen 34', pattern: 'storage', icon: 'database' },
    { id: 'reject', label: 'Token 33 refused', sub: 'still wrong, now harmless', pattern: 'service', icon: 'shieldcheck' },
  ],
  edges: [
    { source: 'issue', target: 'two' },
    { source: 'two', target: 'store' },
    { source: 'store', target: 'reject' },
  ],
}
