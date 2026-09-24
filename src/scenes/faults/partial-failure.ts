import type { Scene } from '@graphlearning/flow'

// §1 — the property that makes distributed systems a different subject rather than a bigger one. A
// single machine is deterministic and fails completely; a distributed system fails in patches, and
// worse, no participant can see which patches. Read the right column as the reason every later
// section exists: you are never reasoning about the system, only about your view of it.
export const partialFailure: Scene = {
  id: 'partial-failure',
  title: 'Some of it works. That is the problem.',
  cols: 2,
  nodes: [
    {
      id: 'one',
      label: 'One machine',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'o-det', label: 'Deterministic', sub: 'same input, same result', pattern: 'service', icon: 'circlecheck' },
        { id: 'o-all', label: 'All or nothing', sub: 'it works, or it crashes', pattern: 'service', icon: 'power' },
        { id: 'o-know', label: 'You find out', sub: 'a crash is loud and total', pattern: 'service', icon: 'bell' },
      ],
      edges: [
        { source: 'o-det', target: 'o-all' },
        { source: 'o-all', target: 'o-know' },
      ],
    },
    {
      id: 'many',
      label: 'Many machines',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'm-part', label: 'Partial failure', sub: 'some of it still works', pattern: 'warn', icon: 'scissors' },
        { id: 'm-nd', label: 'Non-deterministic', sub: 'and rarely reproducible', pattern: 'warn', icon: 'bug' },
        { id: 'm-blind', label: 'Nobody can see it', sub: 'each node has only its view', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'm-part', target: 'm-nd' },
        { source: 'm-nd', target: 'm-blind' },
      ],
    },
  ],
  edges: [],
}
