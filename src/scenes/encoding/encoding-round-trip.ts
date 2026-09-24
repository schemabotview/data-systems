import type { Scene } from '@graphlearning/flow'

// §1 — the frame for the whole course. An in-memory object is full of pointers, and a pointer is
// meaningless outside the process that made it, so crossing any boundary means flattening to bytes
// and rebuilding on the far side. The card at the bottom is the part that makes this a hard problem
// rather than a library call: the two ends are running different versions of the code, always.
export const encodingRoundTrip: Scene = {
  id: 'encoding-round-trip',
  title: 'Two processes, one byte sequence',
  flow: 'TB',
  nodes: [
    { id: 'writer', label: 'Writer · v1', sub: 'objects full of pointers', pattern: 'service', icon: 'server' },
    { id: 'bytes', label: 'A byte sequence', sub: 'self-contained — no pointers left', pattern: 'storage', icon: 'braces' },
    { id: 'reader', label: 'Reader · v2', sub: 'rebuilt as different objects', pattern: 'service', icon: 'server' },
    { id: 'skew', label: 'Both ways, at once', sub: 'v2 reads v1 · v1 reads v2', pattern: 'warn', icon: 'swap' },
  ],
  edges: [
    { source: 'writer', target: 'bytes', label: 'encode' },
    { source: 'bytes', target: 'reader', label: 'decode' },
    { source: 'reader', target: 'skew' },
  ],
}
