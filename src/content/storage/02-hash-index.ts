import type { Section } from '../types'

export const hashIndex: Section = {
  id: 'hash-index',
  title: 'The hash index',
  scene: 'hash-index',
  focus: 'map',
  slide: `## The hash index

The simplest index there is: a **hash map in memory**, from key to the byte offset of its latest value.

### The read is now one seek
- Look the key up in RAM, \`seek()\` to that offset, read one value
- No scan — **constant time**, whatever the file grew to
- \`ada\` points at **192**, not 0: the later write wins

### The two ceilings
- **Every key must fit in RAM** — the key count, not the data size
- **No range scans.** A hash scatters \`user_1000\` far from \`user_1001\`

Exactly right for a few keys updated often: a counter, a session.`,
  narration:
    "So let us build the simplest index that could possibly work. Keep a hash map in memory. The key is the record's key. The value is the byte offset in the log file where that record's latest value starts. Now a read is: look up the key in the map, which is a memory access, seek directly to that offset in the file, and read one value. No scan at all. It is constant time no matter how large the file has grown. And a write is barely more expensive than before — append to the file as usual, then update that one entry in the map to point at the new offset. Notice ada in the table: it points at one ninety-two, not at zero, because ada was written twice and the index only ever remembers the most recent. This design is not a toy, by the way. It is exactly right when you have a moderate number of keys updated very frequently — a counter per video, a session per user, a play count. The values can be as large as you like, because only the keys live in memory. But it has two ceilings, and neither is fixable from inside the design. The first: every single key has to fit in RAM. Not the data, the keys — but if you have a billion of them, that is still a lot of memory, and spilling the hash map to disk performs badly because random access on disk is what we were trying to avoid. The second is subtler and it bites more often. A hash function deliberately scatters. So user one thousand and user one thousand and one land nowhere near each other, and a query for a range of keys turns back into scanning everything. Fixing that is the next idea, and it is a good one.",
}
