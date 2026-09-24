import type { Scene } from '@graphlearning/flow'

// §1 — the ladder drawn as containment, because that is literally what it is: every linearizable
// system is causal, every causal system is eventual. Nesting says that in a way a list cannot, and
// it makes the price visible — each ring inwards costs more coordination, and the innermost one
// costs availability during a partition, which is §5.
export const guaranteeLadder: Scene = {
  id: 'guarantee-ladder',
  title: 'Each one contains the next',
  nodes: [
    {
      id: 'eventual',
      label: 'Eventual consistency — "stop writing and they converge"',
      pattern: 'group',
      children: [
        {
          id: 'causal',
          label: 'Causal — effects never precede their causes',
          pattern: 'group',
          children: [
            { id: 'lin', label: 'Linearizable', sub: 'as if there were one copy', pattern: 'service', icon: 'circlecheck' },
          ],
        },
      ],
    },
    { id: 'price', label: 'Inwards costs more', sub: 'more coordination, less availability', pattern: 'warn', icon: 'scale' },
  ],
  edges: [{ source: 'eventual', target: 'price' }],
}
