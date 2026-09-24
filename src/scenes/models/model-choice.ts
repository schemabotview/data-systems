import type { Scene } from '@graphlearning/flow'

// §9 — the recap as a decision, not a summary. The left column is a property of YOUR data, which is
// the only input you actually have; the model falls out of it. The card underneath is the honest
// ending: the question is never "which one", it is "which one for this part", and the answer is
// usually more than one — which is exactly the composition §1 opened with.
export const modelChoice: Scene = {
  id: 'model-choice',
  title: 'The data decides, not the vendor',
  nodes: [
    {
      id: 'decision',
      kind: 'table',
      label: 'Pick from the shape of the data',
      sub: 'read the left column first',
      pattern: 'service',
      headers: ['If the data is…', 'Shape that fits', 'Because'],
      values: [
        ['a self-contained tree', 'Document', 'one seek returns all of it'],
        ['full of many-to-many', 'Relational', 'the join is the whole point'],
        ['mostly relationships', 'Graph', 'traversal depth is unknown'],
        ['one huge nested doc', 'Relational', 'you cannot update a leaf cheaply'],
        ['shaped differently per row', 'Document', 'no migration for a new field'],
      ],
    },
    {
      id: 'reality',
      label: 'Nobody picks once',
      sub: 'a real system runs two or three of these',
      pattern: 'storage',
      icon: 'boxes',
    },
    {
      id: 'converge',
      label: 'And they are converging',
      sub: 'SQL reads JSON · document DBs join',
      pattern: 'external',
      icon: 'merge',
    },
  ],
  edges: [
    { source: 'decision', target: 'reality' },
    { source: 'reality', target: 'converge' },
  ],
}
