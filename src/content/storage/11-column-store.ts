import type { Section } from '../types'

export const columnStore: Section = {
  id: 'column-store',
  title: 'Column-oriented storage',
  scene: 'column-store',
  focus: 'col-bytes',
  slide: `## Column-oriented storage

**OLTP** fetches a few whole rows by key. **Analytics** scans millions of rows and touches three columns. Different shapes want different layouts.

### Store columns together, not rows
- One file per column; row *n* is the *n*-th entry in every file
- Sum one column: read one file, **skip the other 99** — a **30× cut** in bytes read

### Compression is the second win
- One type per column, often few distinct values
- Sorted, it becomes **long runs of repeats** — run-length, bitmap
- Columns compress an order of magnitude better than rows

### What it costs
- Inserting one row touches **every** column file — so you don't
- Writes are batched, sorted, written as a new segment. An LSM, again`,
  narration:
    "Everything up to now has been built for one access pattern: fetch a few rows by key, or a small range of them. That is the transactional workload — a checkout page, a user profile. Analytics is a completely different shape. A query like: total revenue by month, for the last three years. It touches hundreds of millions of rows, and it touches maybe three columns out of the hundred that a fact table has. On a row-oriented layout that is brutal, because the fields of one row are physically adjacent, so the engine reads whole rows off disk — all hundred columns — and throws ninety-seven of them away. The fix is to change what is adjacent to what. Store all the values of one column together, in their own file, in row order. Then summing a column means reading exactly one file and skipping the rest. On a hundred-column table where you need three, you have cut the bytes read by around thirty times, and bytes read is very often the whole cost of an analytical query. And then a second, compounding win. A column is all one type, and usually has far fewer distinct values than you would think — a country column over a billion rows still only has a couple of hundred values. Sort it and it becomes long runs of the same value, which run-length encoding or bitmap encoding crush. Columns routinely compress an order of magnitude better than rows, which means an order of magnitude less disk to read on top of the columns you already skipped. What does it cost? Inserting a single row now means touching every one of those hundred files. So you do not insert single rows. Writes get accumulated in memory, sorted, and written out as a whole new segment — which is the LSM-tree from four sections ago, applied at a different scale. And that is precisely why this layout lives in a warehouse and not behind your checkout page.",
}
