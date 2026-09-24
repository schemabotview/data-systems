import type { Scene } from '@graphlearning/flow'
import { encodingRoundTrip } from './encoding-round-trip'
import { languageFormats } from './language-formats'
import { jsonAndFriends } from './json-and-friends'
import { binaryWithTags } from './binary-with-tags'
import { avro } from './avro'
import { backwardForward } from './backward-forward'
import { schemaEvolutionRules } from './schema-evolution-rules'
import { dataflowDatabases } from './dataflow-databases'
import { dataflowServices } from './dataflow-services'

export const encodingScenes: Scene[] = [
  encodingRoundTrip,
  languageFormats,
  jsonAndFriends,
  binaryWithTags,
  avro,
  backwardForward,
  schemaEvolutionRules,
  dataflowDatabases,
  dataflowServices,
]
