import type { Scene } from '@graphlearning/flow'

// §11 — the optimistic answer, and the one modern default. The shape to carry away: it runs like
// snapshot isolation, records what each transaction's decision DEPENDED on, and at commit asks
// whether that premise is still true. So the cost is paid only by transactions that actually
// conflict, instead of by every transaction in advance — which is the whole argument for it.
export const ssi: Scene = {
  id: 'ssi',
  title: 'Assume it is fine, check at the end',
  flow: 'TB',
  nodes: [
    { id: 'run', label: 'Run on a snapshot', sub: 'no blocking, exactly as §5', pattern: 'service', icon: 'copy' },
    { id: 'track', label: 'Record the premise', sub: 'which reads the decision rested on', pattern: 'storage', icon: 'scroll' },
    { id: 'commit', label: 'At commit, re-check', sub: 'did anyone invalidate it?', pattern: 'service', icon: 'search' },
    {
      id: 'outcome',
      label: 'Two outcomes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'ok', label: 'Still true', sub: 'commit — nothing was paid', pattern: 'service', icon: 'circlecheck' },
        { id: 'abort', label: 'Gone stale', sub: 'abort, and the app retries', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'run', target: 'track' },
    { source: 'track', target: 'commit' },
    { source: 'commit', target: 'outcome' },
  ],
}
