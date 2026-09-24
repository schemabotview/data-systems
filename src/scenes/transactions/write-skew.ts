import type { Scene } from '@graphlearning/flow'

// §7 — the anomaly that is genuinely hard, because unlike §6 the two transactions never touch the
// same row. Each reads a set, checks a condition on it, and writes a DIFFERENT row; a row lock has
// nothing to lock. The premise each one checked was invalidated by the other's write, and nothing in
// the design of snapshot isolation is capable of noticing that.
export const writeSkew: Scene = {
  id: 'write-skew',
  title: 'Two doctors, no shared row',
  flow: 'TB',
  nodes: [
    {
      id: 'check',
      label: 'Both check: are 2 of us on call?',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'ada', label: 'Ada checks', sub: 'sees 2 — safe to leave', pattern: 'service', icon: 'search' },
        { id: 'ben', label: 'Ben checks', sub: 'sees 2 — safe to leave', pattern: 'service', icon: 'search' },
      ],
    },
    { id: 'write', label: 'Each writes its own row', sub: 'no shared row to lock', pattern: 'warn', icon: 'pencil' },
    { id: 'zero', label: 'Nobody is on call', sub: 'and no rule was broken', pattern: 'warn', icon: 'skull' },
    { id: 'why', label: 'The premise went stale', sub: 'read a set, write elsewhere', pattern: 'storage', icon: 'ban' },
  ],
  edges: [
    { source: 'check', target: 'write' },
    { source: 'write', target: 'zero' },
    { source: 'zero', target: 'why' },
  ],
}
