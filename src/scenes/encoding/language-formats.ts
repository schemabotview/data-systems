import type { Scene } from '@graphlearning/flow'

// §2 — the built-in serializer is always the shortest path, so it is worth being blunt about why it
// is the wrong one. Three of the four problems are inconvenient; the second is a remote code
// execution primitive, and it has shipped as a CVE in essentially every language that offers this.
export const languageFormats: Scene = {
  id: 'language-formats',
  title: 'The one your language gives you free',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'convenient.py',
      label: `import pickle

pickle.dumps(order)   # object → bytes
pickle.loads(data)    # bytes → object`,
    },
    {
      id: 'problems',
      label: 'Four reasons not to',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'lockin', label: 'One language', sub: 'the reader must be Python too', pattern: 'warn', icon: 'lock' },
        { id: 'rce', label: 'It runs code', sub: 'decoding untrusted bytes is RCE', pattern: 'warn', icon: 'skull' },
        { id: 'version', label: 'No versioning', sub: 'evolution was never designed in', pattern: 'warn', icon: 'history' },
        { id: 'slow', label: 'Bloated and slow', sub: 'efficiency was never the point', pattern: 'warn', icon: 'gauge' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'problems' }],
}
