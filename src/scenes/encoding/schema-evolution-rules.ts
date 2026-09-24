import type { Scene } from '@graphlearning/flow'

// §7 — the operational answer, as a table of changes rather than a discussion of formats. The two
// rows that actually cause outages are the required ones, and they fail in opposite directions:
// adding a required field breaks old WRITERS, removing one breaks old READERS. Both are avoided by
// the same discipline — every new field is optional, and every new field has a default.
export const schemaEvolutionRules: Scene = {
  id: 'schema-evolution-rules',
  title: 'Which changes are safe',
  nodes: [
    {
      id: 'rules',
      kind: 'table',
      label: 'One row per change you might make',
      sub: 'read the middle column',
      pattern: 'service',
      headers: ['Change', 'Safe?', 'What breaks'],
      values: [
        ['add an optional field', 'yes', 'old readers skip the unknown tag'],
        ['add a required field', 'NO', 'old writers omit it — new readers fail'],
        ['remove an optional field', 'yes', 'new readers use the default'],
        ['remove a required field', 'NO', 'old readers demand it'],
        ['rename a field', 'tags: yes', 'Avro: only via an alias'],
        ['change a field type', 'risky', 'widening is fine; narrowing loses data'],
        ['reuse a tag number', 'NEVER', 'old data decodes into the wrong field'],
      ],
    },
    { id: 'rule', label: 'One habit', sub: 'new fields optional, with a default', pattern: 'storage', icon: 'shieldcheck' },
  ],
  edges: [{ source: 'rules', target: 'rule' }],
}
