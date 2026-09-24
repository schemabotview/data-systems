import type { Scene } from '@graphlearning/flow'

// §6 — the other clock, and the table is the whole section. The row that matters is the last: a
// monotonic clock's absolute value is meaningless, so comparing one machine's reading with another's
// is not merely inaccurate, it is undefined. Two clocks, two jobs, and neither does the other's.
export const monotonicClocks: Scene = {
  id: 'monotonic-clocks',
  title: 'Two clocks, two different jobs',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'They are not interchangeable',
      sub: 'pick by the question you are asking',
      pattern: 'service',
      headers: ['', 'Time-of-day', 'Monotonic'],
      values: [
        ['Measures', 'a point in calendar time', 'elapsed time since something'],
        ['Can jump back', 'yes — NTP, leap seconds', 'never'],
        ['Use it for', 'timestamps humans read', 'timeouts, latency, intervals'],
        ['Across machines', 'roughly comparable', 'meaningless — undefined'],
      ],
    },
    { id: 'rule', label: 'The rule', sub: 'duration → monotonic. Date → wall clock', pattern: 'storage', icon: 'shieldcheck' },
  ],
  edges: [{ source: 'table', target: 'rule' }],
}
