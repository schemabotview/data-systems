import type { Scene } from '@graphlearning/flow'

// §5 — the definition, and the reason the fourth property is separated out. Agreement, integrity and
// validity are safety: they must never be violated. Termination is liveness, and FLP proves it is
// impossible in a fully asynchronous model — which real algorithms escape by using timeouts, that is
// to say by assuming something about time after all.
export const consensusProperties: Scene = {
  id: 'consensus-properties',
  title: 'Three you always get, one you must buy',
  flow: 'TB',
  nodes: [
    {
      id: 'safety',
      label: 'Safety — never violated, even while everything is broken',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'agree', label: 'Agreement', sub: 'no two nodes decide differently', pattern: 'service', icon: 'circlecheck' },
        { id: 'integrity', label: 'Integrity', sub: 'nobody decides twice', pattern: 'service', icon: 'shieldcheck' },
        { id: 'validity', label: 'Validity', sub: 'the value was proposed', pattern: 'service', icon: 'key' },
      ],
    },
    { id: 'termination', label: 'Termination', sub: 'every live node decides', pattern: 'warn', icon: 'clock' },
    { id: 'flp', label: 'FLP', sub: 'impossible with no timeouts', pattern: 'storage', icon: 'gauge' },
  ],
  edges: [
    { source: 'safety', target: 'termination' },
    { source: 'termination', target: 'flp' },
  ],
}
