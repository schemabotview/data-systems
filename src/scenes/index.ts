import type { Scene } from '@graphlearning/flow'
import { modelsScenes } from './models'
import { storageScenes } from './storage'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored: models · storage · encoding ·
// replication · partitioning · transactions · faults · consistency · consensus · pipelines.
const ALL: Scene[] = [...modelsScenes, ...storageScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
