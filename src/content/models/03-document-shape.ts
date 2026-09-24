import type { Section } from '../types'

export const documentShape: Section = {
  id: 'document-shape',
  title: 'The document shape',
  scene: 'document-tree',
  focus: 'doc',
  slide: `## The document shape

Store the record the way your code already holds it: **one nested tree**, written and read in one piece.

### Why it feels better
- **Locality** — one seek returns the whole order, lines included
- **No joins** — the nesting *is* the join, done at write time
- **No migration** — a new field is just a new key on new documents
- The object in memory and the row on disk finally **look the same**

### The fine print
- Locality only pays if you usually need **the whole document**
- A 2 MB document rewritten to flip one boolean is **2 MB of writes**
- It is a *tree*, and the next two sections are about data that isn't one`,
  narration:
    "Here is the other way to store the same order. Instead of scattering it across three tables, you store it as one nested document — the customer inside the order, the line items inside that. And the first thing to say about this is that it is genuinely nicer to work with. The record on disk looks like the object in your program. Reading an order is one lookup, not a join. Adding a field costs nothing, because there is no table-wide schema to alter. That property has a name: locality. Everything about one record is physically next to everything else about that record. But notice the condition hiding in it. Locality only pays off if you usually want the whole document. If you load the order just to check whether it has shipped, the database still reads all of it — every line item, the whole customer block — to hand you one boolean. And writes are worse: most document databases rewrite the entire document, so flipping that boolean on a two megabyte document writes two megabytes. So keep documents small, and keep them the thing you actually fetch. There is a second limit too, and it is the bigger one. This is a tree. Not all data is.",
}
