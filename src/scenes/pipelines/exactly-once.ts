import type { Scene } from '@graphlearning/flow'

// §12 — the close, and the honest version of a phrase that is usually marketing. Nothing delivers a
// message exactly once; what a good system does is make processing it twice indistinguishable from
// processing it once. Both routes below are the same idea from courses 02, 04 and 07 arriving for
// the last time: make the retry harmless, or make the effect and the bookkeeping one atomic write.
export const exactlyOnce: Scene = {
  id: 'exactly-once',
  title: 'Not delivered once — applied once',
  flow: 'TB',
  nodes: [
    { id: 'reality', label: 'A crash mid-batch', sub: 'done, but offset not moved', pattern: 'warn', icon: 'skull' },
    { id: 'again', label: 'Processed again', sub: 'at-least-once is what you get', pattern: 'warn', icon: 'repeat' },
    {
      id: 'routes',
      label: 'Two ways to make that harmless',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'idem', label: 'Idempotence', sub: 'set a value, do not increment one', pattern: 'service', icon: 'circlecheck' },
        { id: 'atomic', label: 'Output + offset', sub: 'one transaction, both or neither', pattern: 'service', icon: 'shieldcheck' },
      ],
    },
    { id: 'name', label: 'That is all it means', sub: 'effectively-once, honestly', pattern: 'storage', icon: 'shieldcheck' },
  ],
  edges: [
    { source: 'reality', target: 'again' },
    { source: 'again', target: 'routes' },
    { source: 'routes', target: 'name' },
  ],
}
