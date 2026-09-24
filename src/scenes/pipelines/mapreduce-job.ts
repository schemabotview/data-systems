import type { Scene } from '@graphlearning/flow'

// §3 — the same pipeline across a cluster, and the middle step is the one nobody writes and everyone
// pays for. Map and reduce are your functions; the shuffle is the framework moving every record
// across the network so that equal keys land together. It is where the time goes, and courses 04–05
// are why: it is a partition-by-key, at full cluster scale, on every job.
export const mapreduceJob: Scene = {
  id: 'mapreduce-job',
  title: 'You write two functions. The middle one costs.',
  flow: 'TB',
  nodes: [
    { id: 'files', label: 'Input files on HDFS', sub: 'the job runs where they are', pattern: 'storage', icon: 'harddrive' },
    { id: 'map', label: 'Map — your function', sub: 'one record in, key-value pairs out', pattern: 'service', icon: 'gears' },
    { id: 'shuffle', label: 'Shuffle — not yours', sub: 'equal keys to one machine', pattern: 'network', icon: 'swap' },
    { id: 'reduce', label: 'Reduce — yours', sub: 'one key, all its values', pattern: 'service', icon: 'sigma' },
    { id: 'out', label: 'A new set of files', sub: 'the input is untouched', pattern: 'storage', icon: 'folder' },
  ],
  edges: [
    { source: 'files', target: 'map' },
    { source: 'map', target: 'shuffle' },
    { source: 'shuffle', target: 'reduce' },
    { source: 'reduce', target: 'out' },
  ],
}
