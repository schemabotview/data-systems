import type { Scene } from '@graphlearning/flow'

// §4 — the other choice, and it is the exact inverse of §3: hashing destroys adjacency, which is
// what spreads the load and what makes a range scan hit every partition. The compound key at the
// bottom is the standard way to have both — hash the first column, sort within it.
export const byHash: Scene = {
  id: 'by-hash',
  title: 'Hash it, and neighbours scatter',
  flow: 'TB',
  nodes: [
    {
      id: 'hash',
      kind: 'table',
      label: 'Adjacent keys, hashed',
      sub: 'the scatter is the feature',
      pattern: 'service',
      headers: ['key', 'hash', 'partition'],
      values: [
        ['user_1000', '0x8f3a…', 'P3'],
        ['user_1001', '0x21c7…', 'P1'],
        ['user_1002', '0xd904…', 'P4'],
      ],
    },
    { id: 'good', label: 'Load spreads evenly', sub: 'no timestamp hot spot', pattern: 'service', icon: 'scale' },
    { id: 'bad', label: 'Range scans die', sub: 'every partition, then merge', pattern: 'warn', icon: 'sortarrows' },
    { id: 'fix', label: 'Compound key', sub: 'hash the first column, sort within it', pattern: 'storage', icon: 'key' },
  ],
  edges: [
    { source: 'hash', target: 'good' },
    { source: 'good', target: 'bad', label: 'same property' },
    { source: 'bad', target: 'fix' },
  ],
}
