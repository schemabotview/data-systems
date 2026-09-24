import type { Scene } from '@graphlearning/flow'

// §2 — 2PC, and the only part worth memorising is the commit point: it is the coordinator writing
// its own decision to its own disk. Before that, anyone may abort; after it, nobody may — not even
// the coordinator, which is why the fourth step has no failure branch and must be retried forever.
export const twoPhaseCommit: Scene = {
  id: 'two-phase-commit',
  title: 'The promise, then the decision',
  flow: 'TB',
  nodes: [
    { id: 'prepare', label: 'Phase 1 — prepare', sub: 'coordinator asks: can you commit?', pattern: 'service', icon: 'search' },
    { id: 'promise', label: 'Every node answers yes', sub: 'and that yes is a binding promise', pattern: 'storage', icon: 'shieldcheck' },
    { id: 'point', label: 'It writes its choice', sub: 'THIS is the commit point', pattern: 'service', icon: 'scroll' },
    { id: 'phase2', label: 'Phase 2 — tell all', sub: 'retry forever; no abort now', pattern: 'service', icon: 'repeat' },
  ],
  edges: [
    { source: 'prepare', target: 'promise' },
    { source: 'promise', target: 'point', label: 'all yes' },
    { source: 'point', target: 'phase2' },
  ],
}
