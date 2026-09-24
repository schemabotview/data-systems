import type { Scene } from '@graphlearning/flow'

// §6 — causality drawn as the partial order it is. The chain is the causal part: each of those three
// events depends on the one before it. The two unconnected nodes are the interesting half —
// "concurrent" does not mean simultaneous, it means NEITHER knew about the other, which is a
// statement about information flow rather than about time.
export const causality: Scene = {
  id: 'causality',
  title: 'A partial order, not a line',
  flow: 'TB',
  nodes: [
    { id: 'ask', label: 'Ada asks a question', sub: 'nothing precedes it', pattern: 'user', icon: 'pencil' },
    { id: 'read', label: 'Ben reads it', sub: 'so this depends on it', pattern: 'user', icon: 'search' },
    { id: 'answer', label: 'Ben answers', sub: 'which depends on having read it', pattern: 'user', icon: 'pencil' },
    {
      id: 'conc',
      label: 'Meanwhile, elsewhere',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'cleo', label: 'Cleo posts', sub: 'never saw the question', pattern: 'external', icon: 'pencil' },
        { id: 'dev', label: 'Dev posts', sub: 'never saw Cleo', pattern: 'external', icon: 'pencil' },
      ],
    },
    { id: 'def', label: 'Concurrent ≠ simultaneous', sub: 'it means neither one knew about the other', pattern: 'storage', icon: 'swap' },
  ],
  edges: [
    { source: 'ask', target: 'read', label: 'happens-before' },
    { source: 'read', target: 'answer', label: 'happens-before' },
    { source: 'answer', target: 'conc', label: 'unrelated to' },
    { source: 'conc', target: 'def' },
  ],
}
