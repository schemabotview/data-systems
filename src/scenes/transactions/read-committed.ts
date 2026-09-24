import type { Scene } from '@graphlearning/flow'

// §4 — the weakest level worth having, defined entirely by the two things it forbids. Both halves
// are one mechanism each, and they are deliberately different mechanisms: dirty writes are stopped
// by a lock, dirty reads are NOT, because a read lock would let one long writer block every reader.
// Serving the old value instead is the design decision that makes this level cheap.
export const readCommitted: Scene = {
  id: 'read-committed',
  title: 'Two things it forbids, two mechanisms',
  cols: 2,
  nodes: [
    {
      id: 'dr',
      label: 'No dirty reads',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'dr-w', label: 'A txn writes x=2', sub: 'not committed yet', pattern: 'service', icon: 'pencil' },
        { id: 'dr-r', label: 'Another reads x', sub: 'and gets 1, the old value', pattern: 'storage', icon: 'search' },
        { id: 'dr-m', label: 'Mechanism', sub: 'keep the old value, serve that', pattern: 'service', icon: 'copy' },
        { id: 'dr-why', label: 'Not a read lock', sub: 'one writer would block everyone', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'dr-w', target: 'dr-r' },
        { source: 'dr-r', target: 'dr-m' },
        { source: 'dr-m', target: 'dr-why' },
      ],
    },
    {
      id: 'dw',
      label: 'No dirty writes',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'dw-a', label: 'A txn writes x', sub: 'uncommitted', pattern: 'service', icon: 'pencil' },
        { id: 'dw-b', label: 'Another writes x', sub: 'same row, same moment', pattern: 'service', icon: 'pencil' },
        { id: 'dw-m', label: 'Mechanism', sub: 'a row lock until commit', pattern: 'service', icon: 'lock' },
        { id: 'dw-why', label: 'The second waits', sub: 'no half-and-half row', pattern: 'service', icon: 'clock' },
      ],
      edges: [
        { source: 'dw-a', target: 'dw-b' },
        { source: 'dw-b', target: 'dw-m' },
        { source: 'dw-m', target: 'dw-why' },
      ],
    },
  ],
  edges: [],
}
