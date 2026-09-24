import type { Scene } from '@graphlearning/flow'

// §1 — partitioning answers a different question from replication, and the three limits are listed
// separately because they arrive at different times: disk fills first, then throughput, then the
// working set stops fitting in RAM and everything gets slow at once. The bottom card is the frame
// for the course: a partition is not a fragment, it is a small complete database.
export const whyPartition: Scene = {
  id: 'why-partition',
  title: 'When one machine is not enough',
  flow: 'TB',
  nodes: [
    { id: 'big', label: 'One dataset, too large', sub: 'every copy is full', pattern: 'warn', icon: 'database' },
    {
      id: 'limits',
      label: 'Three ceilings, in the order you hit them',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'disk', label: 'Disk', sub: 'it simply will not fit', pattern: 'storage', icon: 'harddrive' },
        { id: 'tput', label: 'Throughput', sub: 'one node of writes', pattern: 'service', icon: 'gauge' },
        { id: 'ram', label: 'Working set', sub: 'past RAM, every read is a seek', pattern: 'service', icon: 'memory' },
      ],
    },
    { id: 'split', label: 'Split the data itself', sub: 'a small, complete database', pattern: 'service', icon: 'scissors' },
  ],
  edges: [
    { source: 'big', target: 'limits' },
    { source: 'limits', target: 'split' },
  ],
}
