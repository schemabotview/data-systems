import type { Scene } from '@graphlearning/flow'

// §1 — three reasons are listed because they are not the same requirement and they do not lead to
// the same design: geography wants copies far apart, availability wants them failure-independent,
// throughput just wants more of them. The card at the bottom is the course: the moment there is more
// than one copy, they can disagree, and every remaining section is about that disagreement.
export const whyReplicate: Scene = {
  id: 'why-replicate',
  title: 'Three reasons, three different designs',
  flow: 'TB',
  nodes: [
    { id: 'data', label: 'One dataset', sub: 'now kept on several machines', pattern: 'storage', icon: 'database' },
    {
      id: 'reasons',
      label: 'Why you would do that',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'latency', label: 'Latency', sub: 'a copy near the user', pattern: 'network', icon: 'globe' },
        { id: 'availability', label: 'Availability', sub: 'a machine dies, you serve on', pattern: 'service', icon: 'shieldcheck' },
        { id: 'throughput', label: 'Read capacity', sub: 'many machines, many reads', pattern: 'service', icon: 'gauge' },
      ],
    },
    { id: 'catch', label: 'And now they can disagree', sub: 'the whole course is this sentence', pattern: 'warn', icon: 'swap' },
  ],
  edges: [
    { source: 'data', target: 'reasons' },
    { source: 'reasons', target: 'catch' },
  ],
}
