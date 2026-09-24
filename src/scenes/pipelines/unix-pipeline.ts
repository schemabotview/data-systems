import type { Scene } from '@graphlearning/flow'

// §2 — the whole of MapReduce, in one line of shell, forty years earlier. The four properties are
// the actual content: a uniform interface, no hidden state, immutable input and composability are
// what make a pipeline work, and §3 is the same four properties on a thousand machines.
export const unixPipeline: Scene = {
  id: 'unix-pipeline',
  title: 'The design was finished in 1978',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'top-urls.sh',
      label: `cat access.log |
  awk '{print $7}' |
  sort            |
  uniq -c         |
  sort -rn        |
  head -n 5`,
    },
    {
      id: 'why',
      label: 'Why it composes',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'iface', label: 'One interface', sub: 'a stream of bytes, always', pattern: 'service', icon: 'braces' },
        { id: 'pure', label: 'No hidden state', sub: 'stdin in, stdout out', pattern: 'service', icon: 'circlecheck' },
        { id: 'immutable', label: 'Input untouched', sub: 'so rerun it as often as you like', pattern: 'service', icon: 'lock' },
        { id: 'compose', label: 'Sorting streams', sub: 'so it handles files bigger than RAM', pattern: 'service', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'why' }],
}
