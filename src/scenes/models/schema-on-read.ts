import type { Scene } from '@graphlearning/flow'

// §6 — "schemaless" is the wrong word, so the scene refuses it: both columns HAVE a schema, they
// just enforce it at different moments. The code card is the whole of schema-on-read — the branch
// is where the schema actually lives, and it never goes away, because the old rows never do.
export const schemaOnRead: Scene = {
  id: 'schema-on-read',
  title: 'Both have a schema — they check it at different times',
  cols: 2,
  nodes: [
    {
      id: 'onwrite',
      label: 'Schema on write — the database checks',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'w-migrate', label: 'ALTER TABLE', sub: 'one statement, whole table', pattern: 'service', icon: 'wrench' },
        { id: 'w-rewrite', label: 'Rows rewritten', sub: 'or defaulted, in place', pattern: 'storage', icon: 'database' },
        { id: 'w-after', label: 'One shape after', sub: 'readers assume it', pattern: 'service', icon: 'circlecheck' },
      ],
      edges: [
        { source: 'w-migrate', target: 'w-rewrite' },
        { source: 'w-rewrite', target: 'w-after' },
      ],
    },
    {
      id: 'onread',
      label: 'Schema on read — your code checks',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'r-write', label: 'New writes only', sub: 'no migration, no downtime', pattern: 'service', icon: 'pencil' },
        { id: 'r-both', label: 'Both shapes live', sub: 'old rows are never touched', pattern: 'warn', icon: 'layers' },
        {
          id: 'r-code',
          kind: 'code',
          filename: 'read.ts',
          hug: true,
          label: `const name =
  user.name ??
  \`\${user.first} \${user.last}\``,
        },
      ],
      edges: [
        { source: 'r-write', target: 'r-both' },
        { source: 'r-both', target: 'r-code' },
      ],
    },
  ],
  edges: [],
}
