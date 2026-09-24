import type { Scene } from '@graphlearning/flow'
import { dataSystemParts } from './data-system-parts'
import { relationalShape } from './relational-shape'
import { documentTree } from './document-tree'
import { manyToOne } from './many-to-one'
import { manyToMany } from './many-to-many'
import { schemaOnRead } from './schema-on-read'
import { graphShape } from './graph-shape'
import { queryLanguages } from './query-languages'
import { modelChoice } from './model-choice'

export const modelsScenes: Scene[] = [
  dataSystemParts,
  relationalShape,
  documentTree,
  manyToOne,
  manyToMany,
  schemaOnRead,
  graphShape,
  queryLanguages,
  modelChoice,
]
