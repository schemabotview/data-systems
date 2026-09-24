import type { Section } from '../types'

export const graphShape: Section = {
  id: 'graph-shape',
  title: 'The graph shape',
  scene: 'graph-shape',
  focus: 'ada',
  slide: `## The graph shape

When **relationships** are the data — and any kind of thing may relate to any other — stop drawing tables and draw the graph.

### Two rules, and that's the model
- A **vertex** is a thing; vertices need not be the same type
- An **edge** carries a **label**: \`KNOWS\`, \`WORKS_AT\`, \`WITHIN\`
- Adding a new *kind* of relationship adds no table and no column

### What it is actually for
- Queries whose **depth you don't know in advance**
- *"Anyone at a company inside the EU"* — Berlin → Germany → EU
- In SQL that is a recursive CTE; here it is **one traversal**
- Social graphs, road networks, dependency trees, knowledge bases`,
  narration:
    "There is a third shape, and you reach for it when the relationships are more interesting than the things. The model has only two pieces. A vertex is a thing — and importantly, vertices do not have to be the same kind of thing. Here we have people, a company, a city, a country, and a union, all in one graph. Then an edge connects two vertices and carries a label saying what the relationship is: knows, works at, based in, within. That is the entire model. Notice what that buys you. If I want to add a new kind of relationship — say, invested in — I add edges with a new label. No new table, no new column, no migration. In a relational schema, each new relationship type is usually a new join table. But the real reason to use a graph is queries whose depth you do not know in advance. Ask: find everyone who works at a company inside the European Union. Berlin is within Germany, Germany is within the EU — that is two hops here, but in another country it might be three, and with a region in between, four. In SQL you express that as a recursive query, which is possible and which nobody enjoys. In a graph query language you say: follow within edges, as many as it takes. That is what graph databases are for — social networks, road networks, dependency graphs, anywhere the shape is irregular and the depth is not fixed.",
}
