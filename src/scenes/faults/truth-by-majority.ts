import type { Scene } from '@graphlearning/flow'

// §10 — the closing move: if no node can be trusted about itself, decisions are taken by a quorum,
// and a node's own opinion of its status is irrelevant. The byzantine row is included to be precise
// about scope — everything in this course assumes nodes are honest but unreliable, and if a node can
// lie you are in a different and much more expensive problem.
export const truthByMajority: Scene = {
  id: 'truth-by-majority',
  title: 'A node does not get a vote about itself',
  flow: 'TB',
  nodes: [
    { id: 'claim', label: 'A node says it is fine', sub: 'and it may be right', pattern: 'user', icon: 'server' },
    { id: 'quorum', label: 'The majority decides', sub: 'two majorities always overlap', pattern: 'service', icon: 'users' },
    { id: 'declared', label: 'Declared dead is dead', sub: 'whatever the node itself believes', pattern: 'service', icon: 'circlecheck' },
    { id: 'byz', label: 'Nodes do not lie', sub: 'byzantine is another problem', pattern: 'warn', icon: 'skull' },
  ],
  edges: [
    { source: 'claim', target: 'quorum' },
    { source: 'quorum', target: 'declared' },
    { source: 'declared', target: 'byz', label: 'scope' },
  ],
}
