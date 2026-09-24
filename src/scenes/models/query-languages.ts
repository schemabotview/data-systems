import type { Scene } from '@graphlearning/flow'

// §8 — the two cards say the same thing, and that is the point: the difference is not syntax, it is
// who owns the strategy. Once the loop is written, the order of evaluation is in your source code,
// and no index, no statistic and no new join algorithm can reach it. Declarative leaves that space
// empty on purpose.
export const queryLanguages: Scene = {
  id: 'query-languages',
  title: 'Same answer — one of them left room to improve',
  cols: 2,
  nodes: [
    {
      id: 'declarative',
      label: 'Declarative — say WHAT you want',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'd-code',
          kind: 'code',
          filename: 'query.sql',
          hug: true,
          label: `SELECT name
FROM users
WHERE city_id = 42
ORDER BY name`,
        },
        { id: 'd-free', label: 'Engine picks how', sub: 'index · order · parallelism', pattern: 'service', icon: 'gears' },
        { id: 'd-later', label: 'Faster next year', sub: 'same query, new planner', pattern: 'service', icon: 'zap' },
      ],
      edges: [
        { source: 'd-code', target: 'd-free' },
        { source: 'd-free', target: 'd-later' },
      ],
    },
    {
      id: 'imperative',
      label: 'Imperative — say HOW to get it',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'i-code',
          kind: 'code',
          filename: 'query.js',
          hug: true,
          label: `const out = []
for (const u of users) {
  if (u.cityId === 42) out.push(u)
}
out.sort(byName)`,
        },
        { id: 'i-own', label: 'You picked how', sub: 'full scan, one core, in order', pattern: 'warn', icon: 'lock' },
        { id: 'i-stuck', label: 'An index cannot help', sub: 'the loop is the plan', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 'i-code', target: 'i-own' },
        { source: 'i-own', target: 'i-stuck' },
      ],
    },
  ],
  edges: [],
}
