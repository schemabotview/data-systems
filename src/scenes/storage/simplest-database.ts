import type { Scene } from '@graphlearning/flow'

// §1 — the whole course starts from two lines of shell that really are a working database. It is
// worth writing them out rather than describing them, because the asymmetry is visible in the source:
// the write is one append and the read is a `grep` over everything ever written. Every storage engine
// after this is an attempt to keep the first line and fix the second.
export const simplestDatabase: Scene = {
  id: 'simplest-database',
  title: 'A database in two lines',
  flow: 'TB',
  nodes: [
    {
      id: 'src',
      kind: 'code',
      filename: 'db.sh',
      label: `db_set () {
  echo "$1,$2" >> db.log
}

db_get () {
  grep "^$1," db.log | tail -1 | cut -d, -f2
}`,
    },
    {
      id: 'costs',
      label: 'The two halves are nothing alike',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'w', label: 'Write: append', sub: 'sequential — a disk at full speed', pattern: 'service', icon: 'zap' },
        { id: 'r', label: 'Read: scan it all', sub: 'O(n) in everything ever written', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'src', target: 'costs' }],
}
