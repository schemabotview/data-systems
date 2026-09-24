import type { Section } from '../types'

export const choosingAModel: Section = {
  id: 'choosing-a-model',
  title: 'Choosing a model',
  scene: 'model-choice',
  focus: 'decision',
  slide: `## Choosing a model

The question is never *"which database"*. It is **what shape is this data** — and the answer differs per part of your system.

### Read the left column first
- Self-contained tree, fetched whole → **document**
- Many-to-many anywhere in it → **relational**
- Irregular, unbounded-depth relationships → **graph**

### Two honest endings
- **Nobody picks once.** Orders relational, sessions document, the social graph a graph — all in one product
- **They are converging.** Postgres indexes JSON; document stores added joins. The shapes stay different; the products stop being
- Next: how any of these actually **puts bytes on a disk**`,
  narration:
    "So let us land this. The question people argue about is which database to use, and that is the wrong question, because it has no answer without the data. The right question is what shape the data is, and the shape tells you the model. If a record is a self-contained tree that you almost always fetch whole, the document shape fits, and you get locality for free. If there are many-to-many relationships anywhere in it — and there usually are — relational fits, because a join table is the only honest place to put a fact about a pair. And if the relationships are irregular and the depth is unbounded, use a graph, because that is a traversal, not a join. Two things to leave you with. First, nobody picks once. A real system very often stores orders relationally, sessions as documents, and a social graph as a graph, all in the same product — which is exactly the composition we drew in the first section. Second, the products are converging even though the models are not. Postgres will index inside a JSON column. Document databases have grown joins. The shapes are still genuinely different, with genuinely different costs — but you are less and less forced to run three servers to get them. Next course: we stop asking how data is shaped, and start asking what actually happens when a database writes it to a disk.",
}
