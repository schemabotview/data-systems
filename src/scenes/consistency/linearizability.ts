import type { Scene } from '@graphlearning/flow'

// §2 — the definition stated as the illusion it provides. Three clients, many replicas, and the
// promise is that no sequence of observations can ever reveal that more than one copy exists. The
// bottom card is the operational form of it, and the one to remember: once ONE reader has seen the
// new value, no reader may afterwards see the old one.
export const linearizability: Scene = {
  id: 'linearizability',
  title: 'The illusion of a single copy',
  flow: 'TB',
  nodes: [
    {
      id: 'clients',
      label: 'Three clients, many replicas',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'c1', label: 'Client A', sub: 'writes x = 1', pattern: 'user', icon: 'pencil' },
        { id: 'c2', label: 'Client B', sub: 'reads x', pattern: 'user', icon: 'search' },
        { id: 'c3', label: 'Client C', sub: 'reads x', pattern: 'user', icon: 'search' },
      ],
    },
    { id: 'promise', label: 'They cannot tell', sub: 'no read reveals the copies', pattern: 'service', icon: 'copy' },
    { id: 'rule', label: 'The rule', sub: 'seen once, never unseen', pattern: 'storage', icon: 'shieldcheck' },
  ],
  edges: [
    { source: 'clients', target: 'promise' },
    { source: 'promise', target: 'rule' },
  ],
}
