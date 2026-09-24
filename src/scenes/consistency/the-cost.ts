import type { Scene } from '@graphlearning/flow'

// §5 — CAP stated as the choice it actually is. The theorem is routinely mangled into "pick two of
// three", which is meaningless because you do not get to decline partitions. The honest form is the
// fork in this diagram: when the network splits, one side either answers with possibly-stale data or
// refuses to answer, and there is no third option.
export const theCost: Scene = {
  id: 'the-cost',
  title: 'When the network splits, you choose',
  flow: 'TB',
  nodes: [
    { id: 'split', label: 'A partition happens', sub: 'and you did not get a vote', pattern: 'warn', icon: 'scissors' },
    {
      id: 'fork',
      label: 'The minority side must pick one',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'avail', label: 'Stay available', sub: 'answer, possibly with stale data', pattern: 'service', icon: 'circlecheck' },
        { id: 'linear', label: 'Stay linearizable', sub: 'refuse to answer until it heals', pattern: 'service', icon: 'ban' },
      ],
    },
    { id: 'cap', label: 'That is all CAP says', sub: 'you cannot decline a partition', pattern: 'storage', icon: 'scale' },
    { id: 'slow', label: 'Slow even when healthy', sub: 'every write waits for a majority', pattern: 'warn', icon: 'gauge' },
  ],
  edges: [
    { source: 'split', target: 'fork' },
    { source: 'fork', target: 'cap' },
    { source: 'cap', target: 'slow' },
  ],
}
