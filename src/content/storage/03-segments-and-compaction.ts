import type { Section } from '../types'

export const segmentsAndCompaction: Section = {
  id: 'segments-and-compaction',
  title: 'Segments and compaction',
  scene: 'segments-and-compaction',
  focus: 'merged',
  slide: `## Segments and compaction

*"You only ever append — don't you run out of disk?"* No. You **throw the old versions away**.

### Segments
- Close the file at a certain size, start a new one
- A closed segment is **immutable** — which is what makes the rest safe

### Compaction
- Merge segments, keeping only the **last value per key**
- Most of a log is old versions of a few hot rows, so the output is **much smaller than the input**
- Sorted segments merge in a stream — no memory spike

### Why it doesn't stall anything
- Background thread, writing a **new file**; reads use the old ones until the swap
- A delete is a **tombstone** — a marker compaction obeys, then drops`,
  narration:
    "The obvious objection to an append-only log is: you never delete anything, so surely you run out of disk. You do not, and the answer is the idea this whole family of storage engines is named after. First, stop writing one giant file. Close the current file when it reaches a certain size and start a new one. Those closed files are called segments, and the important property is that a closed segment is immutable — no process ever goes back and rewrites it. Everything that follows depends on that. Now, compaction. Take some segments, read them through, and write out a new file that keeps only the most recent value for each key. Look at the example: ada was written three times across two segments, ben twice, cleo twice. Seven lines in, three lines out. That ratio is not contrived — in a real system most of the log is old versions of a fairly small set of hot rows, so compaction very often shrinks things dramatically. And if the segments are sorted, merging them is a streaming merge, like the merge step of mergesort: you read a little from each file, write a little out, and never hold much in memory, so you can compact files far bigger than RAM. The last thing is why this does not stop the database. Compaction runs on a background thread and writes to a brand new file. Every read keeps using the existing segments the whole time. When the new file is complete, reads switch over and the old ones get deleted. And deletion of a key works the same way: you append a special marker called a tombstone, and the next compaction sees it, drops every earlier value of that key, and then drops the tombstone too.",
}
