import type { Scene } from '@graphlearning/flow'

// §2 — ACID is a marketing word as often as a technical one, so the table separates the letter from
// what a product actually gives you. The row worth stopping on is C: atomicity, isolation and
// durability are properties of the database, and consistency is a property of YOUR data that only
// your application can define. It is in the acronym because ACID is easier to say than AID.
export const acidInPractice: Scene = {
  id: 'acid-in-practice',
  title: 'Four letters, and one of them is not like the others',
  nodes: [
    {
      id: 'acid',
      kind: 'table',
      label: 'ACID, letter by letter',
      sub: 'what it promises, and who provides it',
      pattern: 'service',
      headers: ['', 'What it means', 'Whose job'],
      values: [
        ['Atomicity', 'abortability — all or nothing', 'the database'],
        ['Consistency', 'your invariants hold', 'YOUR application'],
        ['Isolation', 'concurrent txns do not see each other', 'the database'],
        ['Durability', 'a commit survives a crash', 'the database'],
      ],
    },
    { id: 'weak', label: 'The words are vague', sub: 'two "ACID" stores differ', pattern: 'warn', icon: 'ban' },
  ],
  edges: [{ source: 'acid', target: 'weak' }],
}
