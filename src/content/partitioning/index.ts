import type { Course } from '../types'
import { whyPartition } from './01-why-partition'
import { partitionPlusReplica } from './02-partition-plus-replica'
import { byKeyRange } from './03-by-key-range'
import { byHash } from './04-by-hash'
import { hotKeys } from './05-hot-keys'
import { localSecondaryIndex } from './06-local-secondary-index'
import { globalSecondaryIndex } from './07-global-secondary-index'
import { rebalancing } from './08-rebalancing'
import { consistentHashing } from './09-consistent-hashing'
import { requestRouting } from './10-request-routing'

// Course 5 — partitioning. §1–2 place it against replication (orthogonal, and everyone does both).
// §3–5 are the assignment question, and they are built as one argument: range gives you ordering and
// a hot spot, hash gives you balance and no ordering — the same property seen twice — and §5 is the
// case neither fixes. §6–7 are the two index layouts, whose costs swap places exactly. §8–10 are
// operational: moving partitions, doing it stably, and knowing where they went — which ends at
// consensus, and hands off to course 09.
export const partitioning: Course = {
  id: 'partitioning',
  title: 'Partitioning & sharding',
  sections: [
    whyPartition,
    partitionPlusReplica,
    byKeyRange,
    byHash,
    hotKeys,
    localSecondaryIndex,
    globalSecondaryIndex,
    rebalancing,
    consistentHashing,
    requestRouting,
  ],
}
