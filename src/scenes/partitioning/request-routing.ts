import type { Scene } from '@graphlearning/flow'

// §10 — the question every partitioned system has to answer and none of them can answer alone: who
// holds the map? The three placements differ only in WHERE the knowledge lives, and all three end at
// the same card. Agreeing on one map, while nodes are joining and failing, is consensus — so this
// section is the seam between course 05 and course 09.
export const requestRouting: Scene = {
  id: 'request-routing',
  title: 'Who knows where the partition is?',
  flow: 'TB',
  nodes: [
    { id: 'client', label: 'A client has a key', sub: 'which machine holds it?', pattern: 'user', icon: 'search' },
    {
      id: 'three',
      label: 'Three places to put the knowledge',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'any', label: 'Any node', sub: 'ask one, it forwards', pattern: 'network', icon: 'share' },
        { id: 'tier', label: 'Routing tier', sub: 'a proxy that only routes', pattern: 'network', icon: 'router' },
        { id: 'smart', label: 'Smart client', sub: 'the client holds the map', pattern: 'user', icon: 'code' },
      ],
    },
    { id: 'map', label: 'All need one map', sub: 'and it changes as nodes fail', pattern: 'service', icon: 'tree' },
    { id: 'consensus', label: 'That is consensus', sub: 'ZooKeeper, etcd — course 09', pattern: 'storage', icon: 'shieldcheck' },
  ],
  edges: [
    { source: 'client', target: 'three' },
    { source: 'three', target: 'map' },
    { source: 'map', target: 'consensus' },
  ],
}
