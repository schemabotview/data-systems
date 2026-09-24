import type { Scene } from '@graphlearning/flow'

// §8 — the answer to §7. The ordering is the entire mechanism and it has a name, write-ahead: the
// intention is made durable BEFORE the pages it describes are touched, so a crash in the middle
// always leaves a record of what was supposed to happen. Restart is then not repair, it is replay.
export const walAndCrash: Scene = {
  id: 'wal-and-crash',
  title: 'Write what you intend, before you do it',
  flow: 'TB',
  nodes: [
    { id: 'wal', label: 'Append to the WAL', sub: 'one sequential write, then fsync', pattern: 'storage', icon: 'scroll' },
    { id: 'pages', label: 'Then modify pages', sub: 'three of them, scattered', pattern: 'service', icon: 'harddrive' },
    { id: 'crash', label: 'Power cut here', sub: 'two pages written, one not', pattern: 'warn', icon: 'skull' },
    { id: 'redo', label: 'Restart replays it', sub: 'the half-split is finished', pattern: 'service', icon: 'repeat' },
  ],
  edges: [
    { source: 'wal', target: 'pages', label: 'only now' },
    { source: 'pages', target: 'crash' },
    { source: 'crash', target: 'redo', label: 'redo' },
  ],
}
