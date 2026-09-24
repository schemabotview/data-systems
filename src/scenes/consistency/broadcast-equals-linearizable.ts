import type { Scene } from '@graphlearning/flow'

// §9 — the equivalence, which is the deep result of the course: total order broadcast and
// linearizable storage are interchangeable, so both are equivalent to consensus. The left column is
// the construction worth remembering, because it is how a real uniqueness constraint is built: you
// do not check and then write, you append and then read back to see whether you won.
export const broadcastEqualsLinearizable: Scene = {
  id: 'broadcast-equals-linearizable',
  title: 'Each can be built from the other',
  cols: 2,
  nodes: [
    {
      id: 'lfromb',
      label: 'Linearizable storage from a log',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'a1', label: 'Append your claim', sub: '"I am taking this username"', pattern: 'service', icon: 'pencil' },
        { id: 'a2', label: 'Read the log back', sub: 'wait for your own message', pattern: 'service', icon: 'search' },
        { id: 'a3', label: 'First claim wins', sub: 'everyone reads the same order', pattern: 'service', icon: 'circlecheck' },
        { id: 'a4', label: 'Note what changed', sub: 'you did not check-then-write', pattern: 'storage', icon: 'swap' },
      ],
      edges: [
        { source: 'a1', target: 'a2' },
        { source: 'a2', target: 'a3' },
        { source: 'a3', target: 'a4' },
      ],
    },
    {
      id: 'bfroml',
      label: 'A log from linearizable storage',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'b1', label: 'A linearizable counter', sub: 'increment-and-get', pattern: 'service', icon: 'hash' },
        { id: 'b2', label: 'Take a number', sub: 'for each message you send', pattern: 'service', icon: 'tag' },
        { id: 'b3', label: 'Deliver in number order', sub: 'gaps mean wait', pattern: 'service', icon: 'sortarrows' },
        { id: 'b4', label: 'So both equal consensus', sub: 'which is course 09', pattern: 'storage', icon: 'shieldcheck' },
      ],
      edges: [
        { source: 'b1', target: 'b2' },
        { source: 'b2', target: 'b3' },
        { source: 'b3', target: 'b4' },
      ],
    },
  ],
  edges: [],
}
