import type { Scene } from '@graphlearning/flow'

// §3 — why the log does not grow forever. The two inputs are deliberately full of the same keys,
// because that is what a real log looks like: most of it is old versions of a small number of rows.
// Compaction is a merge that keeps the last value per key, and the output is smaller than either
// input — which is the answer to "you are just appending, surely you run out of disk".
export const segmentsAndCompaction: Scene = {
  id: 'segments-and-compaction',
  title: 'Keep only the last value for each key',
  flow: 'LR',
  nodes: [
    {
      id: 'seg1',
      kind: 'code',
      filename: 'segment-1.log',
      hug: true,
      label: `ada,Lagos
ben,Oslo
ada,Accra
ben,Bergen`,
    },
    {
      id: 'seg2',
      kind: 'code',
      filename: 'segment-2.log',
      hug: true,
      label: `cleo,Lima
ada,Nairobi
cleo,Quito`,
    },
    {
      id: 'merged',
      kind: 'code',
      filename: 'segment-1+2.log',
      hug: true,
      label: `ada,Nairobi
ben,Bergen
cleo,Quito`,
    },
    {
      id: 'note',
      label: 'Done in the background',
      sub: 'on a copy — reads never stop',
      pattern: 'service',
      icon: 'repeat',
    },
  ],
  edges: [
    { source: 'seg1', target: 'merged', label: 'compact' },
    { source: 'seg2', target: 'merged' },
    { source: 'merged', target: 'note' },
  ],
}
