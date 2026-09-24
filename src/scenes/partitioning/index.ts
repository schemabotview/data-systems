import type { Scene } from '@graphlearning/flow'
import { whyPartition } from './why-partition'
import { partitionPlusReplica } from './partition-plus-replica'
import { byKeyRange } from './by-key-range'
import { byHash } from './by-hash'
import { hotKeys } from './hot-keys'
import { localSecondaryIndex } from './local-secondary-index'
import { globalSecondaryIndex } from './global-secondary-index'
import { rebalancing } from './rebalancing'
import { consistentHashing } from './consistent-hashing'
import { requestRouting } from './request-routing'

export const partitioningScenes: Scene[] = [
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
]
