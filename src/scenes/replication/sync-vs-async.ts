import type { Scene } from '@graphlearning/flow'

// §3 — the one real dial in single-leader replication, and both ends of it are unacceptable, which
// is why the middle setting exists. Read the bottom card of each column together: they are the same
// trade stated twice — you can block on a follower, or you can lose writes when the leader dies.
export const syncVsAsync: Scene = {
  id: 'sync-vs-async',
  title: 'Does the leader wait?',
  cols: 2,
  nodes: [
    {
      id: 'sync',
      label: 'Synchronous — the leader waits',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 's-write', label: 'Write arrives', sub: 'leader applies it', pattern: 'service', icon: 'pencil' },
        { id: 's-wait', label: 'Waits for the ack', sub: 'follower confirms it has it', pattern: 'network', icon: 'clock' },
        { id: 's-good', label: 'Never loses a write', sub: 'the copy is provably current', pattern: 'service', icon: 'shieldcheck' },
        { id: 's-bad', label: 'One slow follower', sub: 'blocks every write, fleet-wide', pattern: 'warn', icon: 'ban' },
      ],
      edges: [
        { source: 's-write', target: 's-wait' },
        { source: 's-wait', target: 's-good' },
        { source: 's-good', target: 's-bad' },
      ],
    },
    {
      id: 'async',
      label: 'Asynchronous — the leader does not',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'a-write', label: 'Write arrives', sub: 'leader applies it', pattern: 'service', icon: 'pencil' },
        { id: 'a-ack', label: 'Acks immediately', sub: 'the log ships when it ships', pattern: 'service', icon: 'zap' },
        { id: 'a-good', label: 'Never blocked', sub: 'a lagging follower costs nothing', pattern: 'service', icon: 'gauge' },
        { id: 'a-bad', label: 'Failover loses writes', sub: 'acknowledged, and not replicated', pattern: 'warn', icon: 'trash' },
      ],
      edges: [
        { source: 'a-write', target: 'a-ack' },
        { source: 'a-ack', target: 'a-good' },
        { source: 'a-good', target: 'a-bad' },
      ],
    },
  ],
  edges: [],
}
