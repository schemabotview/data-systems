import type { Scene } from '@graphlearning/flow'

// §2 — the first real index, and the cheapest. The two cards have to be read together: the offset
// column on the left is a byte position into the file on the right, and `ada` points at 192 rather
// than 0 because the later write wins. The limits card is the part that matters — this design is
// not slow, it is bounded, and it is bounded by something you cannot grow cheaply.
export const hashIndex: Scene = {
  id: 'hash-index',
  title: 'Keep the offsets in memory',
  flow: 'TB',
  nodes: [
    {
      id: 'map',
      kind: 'table',
      label: 'Hash map — in RAM',
      sub: 'key → byte offset of the latest value',
      pattern: 'service',
      headers: ['key', 'offset'],
      values: [
        ['ada', '192'],
        ['ben', '64'],
        ['cleo', '128'],
      ],
    },
    {
      id: 'log',
      kind: 'code',
      filename: 'db.log',
      label: `0    ada,{"city":"Lagos"}
64   ben,{"city":"Oslo"}
128  cleo,{"city":"Lima"}
192  ada,{"city":"Accra"}`,
    },
    {
      id: 'limits',
      label: 'Two hard limits',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ram', label: 'Every key in RAM', sub: 'the key count, not the data size', pattern: 'warn', icon: 'memory' },
        { id: 'range', label: 'No range scans', sub: 'a hash spreads neighbours apart', pattern: 'warn', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [
    { source: 'map', target: 'log', label: 'one seek' },
    { source: 'log', target: 'limits' },
  ],
}
