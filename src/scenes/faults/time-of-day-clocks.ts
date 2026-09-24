import type { Scene } from '@graphlearning/flow'

// §5 — the wall clock, and the three ways it lies. All three are the same underlying fact: a
// time-of-day clock is SYNCHRONISED to an external authority, and synchronisation means correction,
// and correction means the number can move by an amount unrelated to elapsed time — including
// backwards. Which is exactly what makes it useless for ordering events.
export const timeOfDayClocks: Scene = {
  id: 'time-of-day-clocks',
  title: 'The wall clock can go backwards',
  flow: 'TB',
  nodes: [
    { id: 'what', label: 'Time-of-day clock', sub: 'seconds since 1970, synchronised by NTP', pattern: 'service', icon: 'clock' },
    {
      id: 'lies',
      label: 'Three ways it moves oddly',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'step', label: 'NTP steps it', sub: 'far enough off, it jumps', pattern: 'warn', icon: 'swap' },
        { id: 'leap', label: 'Leap seconds', sub: 'a minute with 61 seconds', pattern: 'warn', icon: 'calendar' },
        { id: 'drift', label: 'Quartz drifts', sub: 'seconds a day, with heat', pattern: 'warn', icon: 'gauge' },
      ],
    },
    { id: 'useless', label: 'It cannot order events', sub: 'not comparable across machines', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'what', target: 'lies' },
    { source: 'lies', target: 'useless' },
  ],
}
