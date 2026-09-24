import type { Scene } from '@graphlearning/flow'

// §5 — Avro's trick is that there are no tag numbers either, so the bytes are pure values and
// nothing in them says where one field ends. That only works if the reader knows the exact schema
// the writer used, which is why the two cards are both inputs to the middle: resolution is a
// function of BOTH schemas, matched by field name, and it is what makes the format evolvable.
export const avro: Scene = {
  id: 'avro',
  title: 'Two schemas, matched by name',
  flow: 'TB',
  nodes: [
    {
      id: 'writer',
      kind: 'code',
      filename: 'writer.avsc',
      hug: true,
      label: `{"name": "user",  "type": "string"}
{"name": "total", "type": "long"}`,
    },
    {
      id: 'reader',
      kind: 'code',
      filename: 'reader.avsc',
      hug: true,
      label: `{"name": "total",    "type": "long"}
{"name": "currency", "type": "string",
 "default": "USD"}`,
    },
    { id: 'resolve', label: 'Resolution', sub: 'both → copy · reader → default', pattern: 'service', icon: 'merge' },
    { id: 'where', label: 'Schema source', sub: 'a file header, or a registry', pattern: 'external', icon: 'scroll' },
  ],
  edges: [
    { source: 'writer', target: 'resolve', label: 'written with' },
    { source: 'reader', target: 'resolve', label: 'expected' },
    { source: 'resolve', target: 'where' },
  ],
}
