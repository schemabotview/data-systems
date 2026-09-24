import type { Course } from '../types'
import { whyEncodingMatters } from './01-why-encoding-matters'
import { languageFormats } from './02-language-formats'
import { jsonAndFriends } from './03-json-and-friends'
import { binaryWithTags } from './04-binary-with-tags'
import { avro } from './05-avro'
import { backwardForward } from './06-backward-forward'
import { schemaEvolutionRules } from './07-schema-evolution-rules'
import { dataflowThroughDatabases } from './08-dataflow-through-databases'
import { dataflowServicesAndQueues } from './09-dataflow-services-and-queues'

// Course 3 — encoding & schema evolution. §1–5 are the formats, ordered by what they put on the
// wire: everything (language-native), the field names (JSON), a tag number (Protobuf/Thrift),
// nothing at all (Avro). §6–7 turn that into the two compatibility directions and a table of safe
// changes. §8–9 ask the same question of the three places data actually flows — a database, a
// request/response call, and a broker — because who controls the upgrade changes the answer.
export const encoding: Course = {
  id: 'encoding',
  title: 'Encoding & schema evolution',
  sections: [
    whyEncodingMatters,
    languageFormats,
    jsonAndFriends,
    binaryWithTags,
    avro,
    backwardForward,
    schemaEvolutionRules,
    dataflowThroughDatabases,
    dataflowServicesAndQueues,
  ],
}
