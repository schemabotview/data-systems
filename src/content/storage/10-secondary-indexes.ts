import type { Section } from '../types'

export const secondaryIndexes: Section = {
  id: 'secondary-indexes',
  title: 'Secondary indexes',
  scene: 'secondary-indexes',
  focus: 'heap',
  slide: `## Secondary indexes

Every index so far was the **primary** one, keyed on the row's identity. A secondary index is the same structure, keyed on something else.

### The only new question: what is at the leaf?
- **A reference to the row** — one more random read to fetch it
- **The row itself** — a *clustered* index. A table can only cluster one way
- **Some columns** — a *covering* index: it answers the query alone

### The costs come back
- Every index is another structure to **update on every write**
- Keys need not be unique: a leaf holds a **list** of matching rows

### Multi-column
- An index on \`(city, name)\` sorts by city, then name
- It serves *city* and *city + name*. **Not** *name* alone`,
  narration:
    "Everything so far has been the primary index — the one keyed on whatever identifies the row, the user ID or the order ID. But most queries are not lookups by ID. They are: find all the users in Lagos. For that you need a secondary index, and the good news is there is nothing new to learn structurally. It is an LSM-tree or a B-tree, exactly as before, just keyed on city instead of user ID. One difference: the keys are not unique, because lots of users are in Lagos, so each leaf holds a list of matches rather than one. The only real design question is what sits at that leaf. The usual answer is a reference to the row — a pointer into a heap file where the rows actually live. That is space-efficient, because with several indexes on one table you store the row once and the indexes just point at it. The cost is an extra hop: you find the entry, then you do a second random read to fetch the row. On a query that matches a thousand rows, that is a thousand extra reads, and it is often the dominant cost. Two ways to avoid it. A clustered index stores the whole row inside the index itself, so there is no second read — MySQL's InnoDB does this for the primary key. But a table can only be physically clustered one way. Or a covering index: store just the few columns your query actually selects alongside the key, so the query is answered from the index without touching the row at all. Both are faster to read and both cost you on writes, because now there is more duplicated data to keep in step. Last thing: a multi-column index. An index on city then name sorts by city first, and within a city by name. So it answers queries on city, and on city plus name. It does not help you find people by name alone — the order it is stored in simply does not put those together. That is the thing people get wrong most often.",
}
