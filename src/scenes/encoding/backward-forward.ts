import type { Scene } from '@graphlearning/flow'

// §6 — the two words get mixed up constantly, so the scene fixes them to a picture instead of a
// definition. During any rolling deploy both versions are live at once, and the arrow that surprises
// people is the second one: v1 is going to be handed data written by v2, by a node that was upgraded
// three minutes ago. Forward compatibility is not a nicety — it is a property of deploying at all.
export const backwardForward: Scene = {
  id: 'backward-forward',
  title: 'During a deploy, both versions are live',
  flow: 'TB',
  nodes: [
    {
      id: 'fleet',
      label: 'Mid-rollout',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'v1', label: 'Node · v1', sub: 'not upgraded yet', pattern: 'external', icon: 'server' },
        { id: 'v2', label: 'Node · v2', sub: 'upgraded, writing new fields', pattern: 'service', icon: 'server' },
      ],
      edges: [{ source: 'v2', target: 'v1', label: 'sends data', bidirectional: true }],
    },
    {
      id: 'defs',
      kind: 'table',
      label: 'The two directions',
      sub: 'name them by who is reading',
      pattern: 'service',
      headers: ['', 'Who reads', 'Why it is needed'],
      values: [
        ['Backward', 'new code reads old data', 'always — data outlives code'],
        ['Forward', 'old code reads new data', 'rolling deploys, mobile clients'],
      ],
    },
    { id: 'hard', label: 'Forward is the hard one', sub: 'old code must ignore what it cannot name', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'fleet', target: 'defs' },
    { source: 'defs', target: 'hard' },
  ],
}
