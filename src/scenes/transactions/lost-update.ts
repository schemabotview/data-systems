import type { Scene } from '@graphlearning/flow'

// §6 — the first anomaly snapshot isolation does NOT prevent, and the simplest one to draw: two
// read-modify-write cycles interleave and one of them evaporates. Worth noting that every node here
// read a committed value and wrote a committed value; nothing is dirty, and the count is still wrong.
export const lostUpdate: Scene = {
  id: 'lost-update',
  title: 'Two increments, one result',
  flow: 'TB',
  nodes: [
    {
      id: 'both',
      label: 'Both read 42',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'a', label: 'Txn A', sub: 'reads 42, adds 1', pattern: 'service', icon: 'pencil' },
        { id: 'b', label: 'Txn B', sub: 'reads 42, adds 1', pattern: 'service', icon: 'pencil' },
      ],
    },
    { id: 'write', label: 'Both write 43', sub: 'two increments, one applied', pattern: 'warn', icon: 'trash' },
    {
      id: 'fixes',
      kind: 'table',
      label: 'Four ways out',
      sub: 'the first is the one to reach for',
      pattern: 'service',
      headers: ['Fix', 'How'],
      values: [
        ['Atomic op', 'UPDATE … SET n = n + 1 — no read'],
        ['Explicit lock', 'SELECT … FOR UPDATE, then write'],
        ['Auto-detect', 'the engine aborts and you retry'],
        ['Compare-and-set', 'write only if it still reads 42'],
      ],
    },
  ],
  edges: [
    { source: 'both', target: 'write' },
    { source: 'write', target: 'fixes' },
  ],
}
