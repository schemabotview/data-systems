import type { Scene } from '@graphlearning/flow'

// §1 — why distributed commit is a different problem, not a bigger one. On one node the commit point
// is a single disk write, so atomicity is free; across nodes there is no single write to be the
// commit point, and the moment one node has said yes it cannot take it back.
export const atomicCommit: Scene = {
  id: 'atomic-commit',
  title: 'One node commits. Three cannot.',
  cols: 2,
  nodes: [
    {
      id: 'single',
      label: 'One node',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 's-log', label: 'Write the log record', sub: 'the data is already there', pattern: 'storage', icon: 'scroll' },
        { id: 's-point', label: 'That IS the commit', sub: 'one instant, one disk', pattern: 'service', icon: 'circlecheck' },
        { id: 's-easy', label: 'Atomicity is free', sub: 'the disk decides', pattern: 'service', icon: 'zap' },
      ],
      edges: [
        { source: 's-log', target: 's-point' },
        { source: 's-point', target: 's-easy' },
      ],
    },
    {
      id: 'multi',
      label: 'Three nodes',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'm-ask', label: 'Each writes its own log', sub: 'at its own moment', pattern: 'storage', icon: 'scroll' },
        { id: 'm-no', label: 'No single commit point', sub: 'so no instant decides', pattern: 'warn', icon: 'ban' },
        { id: 'm-stuck', label: 'And yes is irrevocable', sub: 'you cannot un-commit', pattern: 'warn', icon: 'lock' },
      ],
      edges: [
        { source: 'm-ask', target: 'm-no' },
        { source: 'm-no', target: 'm-stuck' },
      ],
    },
  ],
  edges: [],
}
