import type { Section } from '../types'

export const sstable: Section = {
  id: 'sstable',
  title: 'Sort the segment: the SSTable',
  scene: 'sstable',
  focus: 'sparse',
  slide: `## Sort the segment: the SSTable

Add one requirement — **keys written in sorted order** — and three problems get easier at once.

### What sorting buys
- **Streaming merge.** Emit the smallest head, advance. Files bigger than RAM, merged in constant memory
- **A sparse index.** One key per few thousand: find the two that bracket yours, scan the gap
- **Block compression.** \`handbag\`, \`handful\`, \`handicap\` share a prefix

### But writes arrive in random order
- So sort them **in memory**, in a balanced tree — the **memtable**
- Past a few MB, write it out sorted. That file is an **SSTable**

Sort in RAM, write sequentially. That swap is the whole trick.`,
  narration:
    "Now one change, and it looks small. Require that within each segment file, the keys appear in sorted order. That is all. A file like that has a name — a sorted string table, or SSTable — and three separate things immediately get easier. First, merging. If both files are sorted, you merge them the way mergesort does: look at the first key in each, write out whichever is smaller, advance that file, repeat. You never hold more than a couple of entries in memory, which means you can merge files far larger than RAM. And when the same key appears in both, the one from the more recent segment wins. Second, and this is the one that removes the ceiling from the last section: the index no longer needs every key. Because the file is sorted, if I want handiwork and my index holds handbag at offset eighty-one thousand and otter at one sixty-three thousand, I know handiwork is somewhere between them. I jump to handbag and scan forward a few kilobytes. So the index can hold one key in every few thousand — sparse enough to describe an enormous file in a small amount of memory. Third, compression. Sorted neighbours are similar, so a block of them compresses well, and you also save disk bandwidth reading it. Now, the obvious problem. Writes do not arrive in sorted order; they arrive in whatever order users do things. So you do not sort on disk — you sort in memory. Incoming writes go into a balanced tree in RAM, which is cheap to keep sorted, and that is called the memtable. When it grows past a few megabytes, you walk it in order and write the whole thing out as a new sorted file. That swap — keep the sorting in memory where it is easy, and only ever write sequentially to disk — is the entire trick.",
}
