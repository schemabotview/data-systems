import type { Scene } from '@graphlearning/flow'

// §10 — CDC inverted. In §9 the state was primary and the log was derived from it; here the log is
// primary and the state is a fold over it. The difference in practice is what the events mean: a
// CDC record says a row changed, an event says a customer cancelled — and only the second one
// survives a change of mind about what you wanted to compute.
export const eventSourcing: Scene = {
  id: 'event-sourcing',
  title: 'The log is the truth; state is a fold',
  flow: 'TB',
  nodes: [
    {
      id: 'events',
      kind: 'table',
      label: 'What is actually stored',
      sub: 'immutable facts, in business language',
      pattern: 'storage',
      headers: ['event'],
      values: [
        ['student enrolled in course'],
        ['student cancelled enrolment'],
        ['course capacity raised to 40'],
      ],
    },
    { id: 'fold', label: 'State is derived', sub: 'apply in order, then cache', pattern: 'service', icon: 'sigma' },
    {
      id: 'buys',
      label: 'What the events buy that a row does not',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'why', label: 'You know why', sub: 'cancelled, not just absent', pattern: 'service', icon: 'search' },
        { id: 'new', label: 'New questions', sub: 'of data already stored', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'events', target: 'fold' },
    { source: 'fold', target: 'buys' },
  ],
}
