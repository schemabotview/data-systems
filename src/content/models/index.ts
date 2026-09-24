import type { Course } from '../types'
import { whatADataSystemIs } from './01-what-a-data-system-is'
import { relationalShape } from './02-relational-shape'
import { documentShape } from './03-document-shape'
import { manyToOne } from './04-many-to-one'
import { manyToMany } from './05-many-to-many'
import { schemaOnRead } from './06-schema-on-read'
import { graphShape } from './07-graph-shape'
import { queryLanguages } from './08-query-languages'
import { choosingAModel } from './09-choosing-a-model'

// Course 1 — data models & query shapes. The arc: a data system is a COMPOSITION, so the arrows are
// the design · the three shapes (relational · document · graph) · the two relationship cardinalities
// that decide between them (many-to-one, many-to-many) · when the schema gets enforced · declarative
// vs imperative · and the choice read off the data rather than off a vendor page.
export const models: Course = {
  id: 'models',
  title: 'Data models & query shapes',
  sections: [
    whatADataSystemIs,
    relationalShape,
    documentShape,
    manyToOne,
    manyToMany,
    schemaOnRead,
    graphShape,
    queryLanguages,
    choosingAModel,
  ],
}
