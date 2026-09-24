import type { Scene } from '@graphlearning/flow'

// §11 — the problem unique to unbounded input: you have to decide when a window is finished, and
// nothing tells you. Processing time is easy and produces wrong answers the moment anything is
// delayed; event time is right and unbounded. The watermark is the compromise, and the straggler is
// what the compromise costs.
export const timeAndWindows: Scene = {
  id: 'time-and-windows',
  title: 'When is an hour over?',
  flow: 'TB',
  nodes: [
    {
      id: 'two',
      label: 'Two clocks to choose between',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'proc', label: 'Processing time', sub: 'when you saw it. Easy, wrong', pattern: 'warn', icon: 'clock' },
        { id: 'event', label: 'Event time', sub: 'when it happened — right, and it never arrives', pattern: 'service', icon: 'calendar' },
      ],
    },
    { id: 'water', label: 'The watermark', sub: 'declare the hour closed', pattern: 'service', icon: 'ruler' },
    { id: 'strag', label: 'A straggler arrives', sub: 'ignore, or correct', pattern: 'warn', icon: 'skull' },
  ],
  edges: [
    { source: 'two', target: 'water' },
    { source: 'water', target: 'strag' },
  ],
}
