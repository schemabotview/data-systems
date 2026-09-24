import type { Scene } from '@graphlearning/flow'

// §1 — the opening claim: nobody builds "a database app" any more. The thing you ship is a
// COMPOSITION, and the arrows out of the app are the design. The two edges that matter are the ones
// leaving the database: once a cache and an index hold copies, keeping them honest is your job, not
// the database's. That single fact is the reason every later course exists.
export const dataSystemParts: Scene = {
  id: 'data-system-parts',
  title: 'One application, four data stores',
  flow: 'LR',
  nodes: [
    { id: 'client', label: 'Client', sub: 'web · mobile · another service', pattern: 'user', icon: 'users' },
    { id: 'app', label: 'Your code', sub: 'the only part you wrote', pattern: 'service', icon: 'server' },
    { id: 'db', label: 'Database', sub: 'the system of record', pattern: 'storage', icon: 'database' },
    { id: 'cache', label: 'Cache', sub: 'reads the DB cannot take', pattern: 'storage', icon: 'zap' },
    { id: 'index', label: 'Search index', sub: 'queries SQL is bad at', pattern: 'storage', icon: 'search' },
    { id: 'queue', label: 'Queue', sub: 'work deferred to later', pattern: 'network', icon: 'swap' },
  ],
  // The write path, then the two copies it creates. Deliberately NOT the read edges as well: with
  // app→cache and app→index drawn too, the diagonals run their midpoint labels across the cards
  // below them, and the picture stops being about the thing it is about — which is that `invalidate`
  // and `reindex` are arrows no product draws for you.
  edges: [
    { source: 'client', target: 'app' },
    { source: 'app', target: 'db', label: 'write' },
    { source: 'app', target: 'queue', label: 'defer' },
    { source: 'db', target: 'cache', label: 'invalidate' },
    { source: 'db', target: 'index', label: 'reindex' },
  ],
}
