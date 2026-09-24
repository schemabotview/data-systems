import type { Scene } from '@graphlearning/flow'

// §3 — before any isolation level, note what you already have for free: every storage engine makes a
// single-object write atomic, because it has to. The mechanism is the WAL from course 02 plus a
// per-object lock. The point of the scene is the last card — this is NOT a transaction, and calling
// it one is how "lightweight transactions" marketing gets people into trouble.
export const singleObjectAtomicity: Scene = {
  id: 'single-object-atomicity',
  title: 'What one object gives you free',
  flow: 'TB',
  nodes: [
    { id: 'write', label: 'Write a 20 KB document', sub: 'the power fails at 10 KB', pattern: 'user', icon: 'pencil' },
    {
      id: 'free',
      label: 'The engine already handles this',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'log', label: 'A log for recovery', sub: 'atomicity, per object', pattern: 'storage', icon: 'scroll' },
        { id: 'lock', label: 'A lock per object', sub: 'isolation, per object', pattern: 'service', icon: 'lock' },
      ],
    },
    { id: 'not', label: 'Not a transaction', sub: 'one object is not several', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'write', target: 'free' },
    { source: 'free', target: 'not' },
  ],
}
