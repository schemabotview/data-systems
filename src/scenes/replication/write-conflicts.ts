import type { Scene } from '@graphlearning/flow'

// §11 — the conflict itself, then the menu. The table is ordered by how much data each option
// destroys, which is the honest ordering: last-write-wins is one line of code and silently discards
// a user's work, and everything below it costs more and loses less. There is no option that is both
// automatic and lossless for arbitrary data — that is why the last row exists.
export const writeConflicts: Scene = {
  id: 'write-conflicts',
  title: 'Two writes, one row, no order',
  flow: 'TB',
  nodes: [
    {
      id: 'both',
      label: 'The same second, two regions',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'ua', label: 'Ada renames it', sub: '→ "Q3 plan"', pattern: 'user', icon: 'pencil' },
        { id: 'ub', label: 'Ben renames it', sub: '→ "Q3 roadmap"', pattern: 'user', icon: 'pencil' },
      ],
    },
    { id: 'accepted', label: 'Both succeed locally', sub: 'the conflict surfaces later', pattern: 'warn', icon: 'circlecheck' },
    {
      id: 'ways',
      kind: 'table',
      label: 'Ways to converge',
      sub: 'ordered by how much they throw away',
      pattern: 'service',
      headers: ['Strategy', 'What it costs'],
      values: [
        ['Last write wins', 'one line of code — and silent data loss'],
        ['Highest replica id wins', 'the same loss, less randomly'],
        ['Keep both, ask the user', 'honest; needs UI nobody wants to build'],
        ['Merge automatically', 'only works if the type has a merge'],
        ['CRDTs', 'types designed to merge — sets, counters, text'],
      ],
    },
  ],
  edges: [
    { source: 'both', target: 'accepted' },
    { source: 'accepted', target: 'ways' },
  ],
}
