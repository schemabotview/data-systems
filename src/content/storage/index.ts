import type { Course } from '../types'
import { theSimplestDatabase } from './01-the-simplest-database'
import { hashIndex } from './02-hash-index'
import { segmentsAndCompaction } from './03-segments-and-compaction'
import { sstable } from './04-sstable'
import { lsmTree } from './05-lsm-tree'
import { bTree } from './06-b-tree'
import { pageSplit } from './07-page-split'
import { walAndCrash } from './08-wal-and-crash'
import { lsmVsBtree } from './09-lsm-vs-btree'
import { secondaryIndexes } from './10-secondary-indexes'
import { columnStore } from './11-column-store'

// Course 2 — storage engines. Built as one continuous derivation rather than a survey: two lines of
// shell, then every step is a fix for the problem the previous step left behind — index the log, cap
// the log, sort the segments, and you have arrived at an LSM-tree. §6 restarts from the opposite
// instinct (overwrite in place), §7 finds the danger in it and §8 is the answer. §9 compares the two
// families, §10 generalises to non-primary keys, §11 changes what is adjacent to what.
export const storage: Course = {
  id: 'storage',
  title: 'Storage engines',
  sections: [
    theSimplestDatabase,
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
  ],
}
