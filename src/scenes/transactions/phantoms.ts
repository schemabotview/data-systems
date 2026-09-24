import type { Scene } from '@graphlearning/flow'

// §8 — the generalisation of §7, and the name for the thing that has no row to lock: the write
// changes the RESULT OF A QUERY, not a row. The materializing-conflict trick is included because it
// is real and because seeing how ugly it is explains why the next three sections exist.
export const phantoms: Scene = {
  id: 'phantoms',
  title: 'You cannot lock a row that is not there',
  flow: 'TB',
  nodes: [
    { id: 'q', label: 'SELECT … no booking', sub: 'room 5, Tuesday, 2pm — empty', pattern: 'service', icon: 'search' },
    { id: 'act', label: 'So both insert one', sub: 'each acting on an empty result', pattern: 'service', icon: 'pencil' },
    { id: 'clash', label: 'Two bookings', sub: 'the query result changed, not a row', pattern: 'warn', icon: 'calendar' },
    { id: 'hack', label: 'Materialize the conflict', sub: 'pre-create a row per room-hour to lock', pattern: 'storage', icon: 'key' },
  ],
  edges: [
    { source: 'q', target: 'act' },
    { source: 'act', target: 'clash' },
    { source: 'clash', target: 'hack', label: 'one workaround' },
  ],
}
