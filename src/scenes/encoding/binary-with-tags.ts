import type { Scene } from '@graphlearning/flow'

// §4 — the memory node earns its place here: the subject IS a byte layout, and what the picture has
// to show is that the field NAME is not in it. Protobuf writes the tag number from the schema
// instead, which is why renaming a field costs nothing and why changing a tag number is fatal.
export const binaryWithTags: Scene = {
  id: 'binary-with-tags',
  title: 'The name never goes on the wire',
  flow: 'TB',
  nodes: [
    {
      id: 'schema',
      kind: 'code',
      filename: 'order.proto',
      label: `message Order {
  required string user  = 1;
  optional int64  total = 2;
}`,
    },
    {
      id: 'wire',
      kind: 'memory',
      label: 'What actually gets sent',
      sub: 'tag numbers, not field names',
      pattern: 'storage',
      slots: [
        { at: '0', name: '0x0a', note: 'tag 1, type = string', group: 'user' },
        { at: '1', name: '0x03', note: 'length = 3', group: 'user' },
        { at: '2', name: 'a d a', note: 'the bytes', group: 'user' },
        { at: '5', name: '0x10', note: 'tag 2, type = varint', group: 'total' },
        { at: '6', name: '0x2a', note: '42', group: 'total' },
      ],
    },
    { id: 'rule', label: 'The tag is the contract', sub: 'rename freely — never reuse a number', pattern: 'service', icon: 'tag' },
  ],
  edges: [
    { source: 'schema', target: 'wire', label: 'encode' },
    { source: 'wire', target: 'rule' },
  ],
}
