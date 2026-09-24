import type { Scene } from '@graphlearning/flow'

// §4 — why a mechanism that is correct on paper is rare in practice. Every row is an operational
// cost rather than a theoretical one, and together they explain the industry's actual answer: avoid
// the distributed transaction, and use idempotence and retries instead.
export const xaAndPractice: Scene = {
  id: 'xa-and-practice',
  title: 'Correct, and almost nobody runs it',
  nodes: [
    {
      id: 'costs',
      kind: 'table',
      label: 'What XA costs in production',
      sub: 'none of these are theoretical',
      pattern: 'service',
      headers: ['Cost', 'Why'],
      values: [
        ['A new single point of failure', 'the coordinator must itself be replicated'],
        ['Stateful application servers', 'the coordinator log cannot be lost'],
        ['Locks held across services', 'an in-doubt transaction blocks unrelated work'],
        ['Manual recovery', 'someone reads the log and decides, by hand'],
        ['10× slower', 'measured — fsyncs plus round trips'],
      ],
    },
    { id: 'instead', label: 'The usual answer', sub: 'idempotence and retries', pattern: 'storage', icon: 'repeat' },
  ],
  edges: [{ source: 'costs', target: 'instead' }],
}
