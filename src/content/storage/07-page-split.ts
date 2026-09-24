import type { Section } from '../types'

export const pageSplit: Section = {
  id: 'page-split',
  title: 'The page split',
  scene: 'page-split',
  focus: 'parent',
  slide: `## The page split

Inserting into a page with room is easy. **Inserting into a full one is the interesting case.**

### What happens
1. Page 12 is full. Insert 350
2. Allocate a **new page**, 47, and split the keys between them
3. **Rewrite the parent** so it references both

### The number to carry away
- One insert just changed **three pages**, scattered on disk
- The tree only deepens when the **root** splits — which is why it stays balanced

### And now the danger
- Those three writes must **all** happen, or **none**
- Crash after two and the tree is **corrupt** — an orphan page, a parent pointing at nothing
- No care in the code prevents a power cut mid-way`,
  narration:
    "So what happens when you insert a key into a B-tree page that is already full? This is the operation that makes a B-tree a B-tree. Say page twelve holds one hundred, two hundred, three hundred and four hundred, and it has no room left, and we insert three fifty. The engine allocates a new page — call it page forty-seven. It splits the keys between them: the low half stays where it is, the high half moves to the new page. And then it has to rewrite the parent page, because the parent used to say all of these keys are in page twelve, and now that is no longer true; it needs a second reference saying three hundred and up is in page forty-seven. Now count what just happened. One insert of one key modified three pages: the original, the new one, and the parent. And they are in different places on disk. Occasionally, if the parent is also full, the parent splits too and it cascades upward. The tree only ever gets deeper when the root itself splits, which is exactly why every leaf stays at the same depth — it is a very elegant piece of design. But look at the danger. Those three page writes have to be all-or-nothing. If the machine loses power after two of them, you do not have a slightly-out-of-date tree. You have a corrupt one: a page that nothing points to, or worse, a parent pointing at a page that was never written. And there is no way to write three separate places on a disk atomically. So the engine needs a different answer, and it is the same answer we already saw in the LSM-tree.",
}
