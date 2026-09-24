import type { Section } from '../types'

export const bTree: Section = {
  id: 'b-tree',
  title: 'The B-tree',
  scene: 'b-tree',
  focus: 'root',
  slide: `## The B-tree

The other half of the world, and the opposite instinct: **fixed-size pages, overwritten in place**.

### The structure
- The disk is a set of **pages**, usually 4 KB, each with an address
- A branch page holds keys and **references to children**; a leaf holds values
- Every leaf sits at the **same depth**

### Why it is so flat
- References per page — the **branching factor** — is in the hundreds
- Four levels at 500 each is **250 billion keys**
- So *any* lookup is 3–4 page reads, on a table of any size

### The difference that matters
- B-tree: **overwrite the page.** One authoritative copy of each key
- The default since 1970; what Postgres and MySQL run`,
  narration:
    "Now the other half of the world, and it starts from the opposite instinct. An LSM-tree never modifies anything it has written; it writes new files and merges them later. A B-tree finds the exact place a key belongs and overwrites it, in place. Here is the structure. Treat the disk as a collection of fixed-size pages, traditionally four kilobytes, each with an address, the way memory has addresses. One page is the root, and you always start there. A branch page contains a sorted list of keys and, between them, references to child pages — this reference covers keys below five hundred, that one covers five hundred and up. You follow the reference for the range your key falls in, read that page, follow again, and eventually you reach a leaf page, which holds the actual values. And critically, every leaf is at the same depth, which is what the B in B-tree is about — the tree stays balanced. Now the number that makes this work. How many references fit in one four-kilobyte page? Hundreds. Call it five hundred. Four levels of that is five hundred to the fourth power, which is around two hundred and fifty billion keys. So a lookup in a B-tree is three or four page reads — and it is three or four page reads whether the table holds a thousand rows or a billion. That flatness is why B-trees have been the default index structure since about 1970, and why Postgres, MySQL, SQL Server and Oracle all use them. But overwriting a page in place is a genuinely dangerous operation, and the next two sections are about why.",
}
