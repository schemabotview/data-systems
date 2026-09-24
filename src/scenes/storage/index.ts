import type { Scene } from '@graphlearning/flow'
import { simplestDatabase } from './simplest-database'
import { hashIndex } from './hash-index'
import { segmentsAndCompaction } from './segments-and-compaction'
import { sstable } from './sstable'
import { lsmTree } from './lsm-tree'
import { bTree } from './b-tree'
import { pageSplit } from './page-split'
import { walAndCrash } from './wal-and-crash'
import { lsmVsBtree } from './lsm-vs-btree'
import { secondaryIndexes } from './secondary-indexes'
import { columnStore } from './column-store'

export const storageScenes: Scene[] = [
  simplestDatabase,
  hashIndex,
  segmentsAndCompaction,
  sstable,
  lsmTree,
  bTree,
  pageSplit,
  walAndCrash,
  lsmVsBtree,
  secondaryIndexes,
  columnStore,
]
