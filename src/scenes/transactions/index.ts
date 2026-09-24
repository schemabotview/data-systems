import type { Scene } from '@graphlearning/flow'
import { whatATransactionBuys } from './what-a-transaction-buys'
import { acidInPractice } from './acid-in-practice'
import { singleObjectAtomicity } from './single-object-atomicity'
import { readCommitted } from './read-committed'
import { snapshotIsolation } from './snapshot-isolation'
import { lostUpdate } from './lost-update'
import { writeSkew } from './write-skew'
import { phantoms } from './phantoms'
import { serialExecution } from './serial-execution'
import { twoPhaseLocking } from './two-phase-locking'
import { ssi } from './ssi'
import { choosingIsolation } from './choosing-isolation'

export const transactionsScenes: Scene[] = [
  whatATransactionBuys,
  acidInPractice,
  singleObjectAtomicity,
  readCommitted,
  snapshotIsolation,
  lostUpdate,
  writeSkew,
  phantoms,
  serialExecution,
  twoPhaseLocking,
  ssi,
  choosingIsolation,
]
