import type { Scene } from '@graphlearning/flow'

// §7 — the payoff for §5 and §6, and the reason to care: last-write-wins from course 04 depends on
// comparing timestamps across machines, which §6 just said is undefined. The sequence is drawn in
// real time deliberately — B genuinely happened after A, and the clocks disagree by more than the
// gap between them, so the later write is the one that gets discarded. Silently.
export const lwwIsLossy: Scene = {
  id: 'lww-is-lossy',
  title: 'Last write wins, by the wrong clock',
  flow: 'TB',
  nodes: [
    { id: 'skew', label: 'A is 5 ms ahead', sub: 'inside NTP tolerance', pattern: 'warn', icon: 'clock' },
    { id: 'a', label: 'A writes first', sub: 'and stamps it 10:00:00.105', pattern: 'service', icon: 'pencil' },
    { id: 'b', label: 'B writes 2 ms later', sub: 'and stamps it 10:00:00.102', pattern: 'service', icon: 'pencil' },
    { id: 'drop', label: "B's write dropped", sub: 'later, smaller number', pattern: 'warn', icon: 'trash' },
  ],
  edges: [
    { source: 'skew', target: 'a' },
    { source: 'a', target: 'b', label: 'really after' },
    { source: 'b', target: 'drop', label: 'LWW compares' },
  ],
}
