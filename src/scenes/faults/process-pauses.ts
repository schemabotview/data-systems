import type { Scene } from '@graphlearning/flow'

// §8 — the failure that has nothing to do with the network, and is the one people forget. The node
// is healthy, the network is fine, and a stop-the-world pause means the process resumes holding a
// belief about the world that expired while it was not running. Note there is nothing it can check
// on resuming that would help: a lease it checked one instruction ago can expire before the next one.
export const processPauses: Scene = {
  id: 'process-pauses',
  title: 'Paused, and still sure it is the leader',
  flow: 'TB',
  nodes: [
    { id: 'lease', label: 'Takes a 10-second lease', sub: '"I am the leader until 10:00:10"', pattern: 'service', icon: 'key' },
    {
      id: 'pause',
      label: 'Something stops the world',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'gc', label: 'A GC pause', sub: 'minutes, on a big heap', pattern: 'warn', icon: 'trash' },
        { id: 'vm', label: 'VM migration', sub: 'suspended, moved, resumed', pattern: 'warn', icon: 'swap' },
        { id: 'swap', label: 'Page thrashing', sub: 'a memory access hits disk', pattern: 'warn', icon: 'harddrive' },
      ],
    },
    { id: 'resume', label: 'It resumes at 10:00:25', sub: 'and has no idea any time passed', pattern: 'warn', icon: 'skull' },
    { id: 'write', label: 'So it writes', sub: 'as the leader it stopped being 15 seconds ago', pattern: 'warn', icon: 'pencil' },
  ],
  edges: [
    { source: 'lease', target: 'pause' },
    { source: 'pause', target: 'resume' },
    { source: 'resume', target: 'write' },
  ],
}
