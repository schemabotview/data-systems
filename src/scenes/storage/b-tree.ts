import type { Scene } from '@graphlearning/flow'

// §6 — the other half of the world, and the opposite idea: overwrite a fixed page in place instead
// of appending a new file. The number worth carrying away is the branching factor. Three levels of
// several hundred references each is already billions of keys, which is why a B-tree lookup is
// four disk reads whether the table has a thousand rows or a billion.
export const bTree: Scene = {
  id: 'b-tree',
  title: 'Fixed-size pages, four levels deep',
  flow: 'TB',
  nodes: [
    { id: 'root', label: 'Root page', sub: 'hundreds of references, one per key range', pattern: 'service', icon: 'tree' },
    { id: 'b1', label: 'Branch', sub: 'key < 500', pattern: 'network', icon: 'gitbranch' },
    { id: 'b2', label: 'Branch', sub: 'key ≥ 500', pattern: 'network', icon: 'gitbranch' },
    { id: 'l1', label: 'Leaf', sub: '100–199', pattern: 'storage', icon: 'file', variant: 'tile' },
    { id: 'l2', label: 'Leaf', sub: '200–499', pattern: 'storage', icon: 'file', variant: 'tile' },
    { id: 'l3', label: 'Leaf', sub: '500–799', pattern: 'storage', icon: 'file', variant: 'tile' },
    { id: 'l4', label: 'Leaf', sub: '800–999', pattern: 'storage', icon: 'file', variant: 'tile' },
  ],
  edges: [
    { source: 'root', target: 'b1' },
    { source: 'root', target: 'b2' },
    { source: 'b1', target: 'l1' },
    { source: 'b1', target: 'l2' },
    { source: 'b2', target: 'l3' },
    { source: 'b2', target: 'l4' },
  ],
}
