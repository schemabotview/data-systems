import type { Scene } from '@graphlearning/flow'

// §3 — JSON is the right default and it still has sharp edges, so the table names the exact ones
// rather than hand-waving about "text formats". Every row is a bug someone has shipped: the Twitter
// tweet-ID problem is row one, and it is why their API returns the id twice, once as a string.
export const jsonAndFriends: Scene = {
  id: 'json-and-friends',
  title: 'Readable, universal, and quietly lossy',
  flow: 'TB',
  nodes: [
    {
      id: 'doc',
      kind: 'code',
      filename: 'event.json',
      label: `{
  "id": 9007199254740993,
  "amount": 0.1,
  "photo": "iVBORw0KGgoAAAA…",
  "when": "2026-03-04T11:02Z"
}`,
    },
    {
      id: 'issues',
      kind: 'table',
      label: 'What the reader may actually get',
      sub: 'every row is a bug someone has shipped',
      pattern: 'warn',
      headers: ['You wrote', 'The problem'],
      values: [
        ['a 64-bit id', 'JavaScript rounds past 2⁵³ — silently'],
        ['0.1', 'no decimal type; floats are approximate'],
        ['a photo', 'no binary type — base64, +33% size'],
        ['a timestamp', 'just a string; the schema is in your head'],
      ],
    },
  ],
  edges: [{ source: 'doc', target: 'issues' }],
}
