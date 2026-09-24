import { models } from './models'
import { storage } from './storage'
import { encoding } from './encoding'
import { replication } from './replication'
import { partitioning } from './partitioning'
import { transactions } from './transactions'
import { faults } from './faults'
import { consistency } from './consistency'
import { consensus } from './consensus'
import { pipelines } from './pipelines'
import type { Course, Section } from './types'

// Course registry, in syllabus order. Courses are added here as each is authored:
// models · storage · encoding · replication · partitioning · transactions · faults · consistency ·
// consensus · pipelines.
export const COURSES: Record<string, Course> = {
  [models.id]: models,
  [storage.id]: storage,
  [encoding.id]: encoding,
  [replication.id]: replication,
  [partitioning.id]: partitioning,
  [transactions.id]: transactions,
  [faults.id]: faults,
  [consistency.id]: consistency,
  [consensus.id]: consensus,
  [pipelines.id]: pipelines,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
