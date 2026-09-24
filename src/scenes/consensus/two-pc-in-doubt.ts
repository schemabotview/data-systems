import type { Scene } from '@graphlearning/flow'

// §3 — the flaw, and it is not a bug but a consequence of the design. A participant that has
// promised cannot decide for itself, and cannot ask its peers either, because the decision was the
// coordinator's alone. So it holds its locks and waits, and the whole thing hinges on a single node
// that has no redundancy — which is exactly what consensus is for.
export const twoPcInDoubt: Scene = {
  id: 'two-pc-in-doubt',
  title: 'In doubt, holding every lock',
  flow: 'TB',
  nodes: [
    { id: 'yes', label: 'A node has said yes', sub: 'locks held, promise binding', pattern: 'storage', icon: 'lock' },
    { id: 'dies', label: 'Coordinator dies', sub: 'before sending anything', pattern: 'warn', icon: 'skull' },
    {
      id: 'stuck',
      label: 'Why it cannot decide for itself',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'noabort', label: 'Cannot abort', sub: 'it already promised', pattern: 'warn', icon: 'ban' },
        { id: 'nocommit', label: 'Cannot commit', sub: 'another may have said no', pattern: 'warn', icon: 'ban' },
      ],
    },
    { id: 'wait', label: 'It waits, locked', sub: 'blocking every other write', pattern: 'warn', icon: 'clock' },
  ],
  edges: [
    { source: 'yes', target: 'dies' },
    { source: 'dies', target: 'stuck' },
    { source: 'stuck', target: 'wait' },
  ],
}
