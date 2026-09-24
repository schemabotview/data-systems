import type { Section } from '../types'

export const relationalShape: Section = {
  id: 'relational-shape',
  title: 'The relational shape',
  scene: 'relational-shape',
  focus: 'orders',
  slide: `## The relational shape

A relation is a set of rows, all the same shape. Relationships are not stored — they are **stated as keys**, and worked out at read time.

### What the schema is doing
- \`orders\` holds a **product_id**, never a copy of the price
- Change the price in one row and **every order agrees**, instantly
- The database, not your code, refuses an order for a product that isn't there

### What you pay for it
- The record is **scattered** — one order is three seeks, or a join
- The shape is **fixed up front**; a new field is a migration
- It has held up since **1970** because business data really is this shape`,
  narration:
    "The relational model is sixty years old and it is still the default, so it is worth being precise about what it actually claims. A table is a set of rows that all have the same shape. And crucially, the relationships between tables are not stored anywhere — they are stated, as keys, and resolved when you ask. Look at the orders table. It holds a product ID. It does not hold the product's title or its price. That means when the price changes, you change exactly one row in exactly one table, and every order that ever referenced it now agrees, with no update, no migration, and no window where two parts of the system disagree. That is the whole idea. Now, what does it cost? One order is now spread across three tables, so reading it back means either three lookups or a join. And the shape has to be decided before you insert anything — adding a column is a schema change. Those are real costs. The reason this model has survived anyway is that most business data genuinely is this shape: lots of things, related to lots of other things.",
}
