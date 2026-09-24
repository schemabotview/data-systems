import type { Scene } from '@graphlearning/flow'

// §1 — the frame for the course, and the row that actually matters is the third: what triggers the
// work. A service waits for a request, a batch job waits for a clock, a stream job waits for an
// event. Everything else — latency, sizing, failure handling — follows from that one difference.
export const threeSystemTypes: Scene = {
  id: 'three-system-types',
  title: 'Three shapes, one difference',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Services, batch jobs and stream jobs',
      sub: 'read the "triggered by" row first',
      pattern: 'service',
      headers: ['', 'Service', 'Batch', 'Stream'],
      values: [
        ['Triggered by', 'a request', 'a schedule', 'an event'],
        ['Input', 'one request', 'a bounded file', 'an unbounded log'],
        ['Measured by', 'response time', 'throughput', 'both, uneasily'],
        ['When it ends', 'milliseconds', 'when the input runs out', 'never'],
        ['On failure', 'return an error', 'rerun the whole job', 'resume from an offset'],
      ],
    },
    { id: 'derived', label: 'Both make derived data', sub: 'new output, input untouched', pattern: 'storage', icon: 'copy' },
  ],
  edges: [{ source: 'table', target: 'derived' }],
}
