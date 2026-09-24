import type { Course } from '../types'
import { whatATransactionBuys } from './01-what-a-transaction-buys'
import { acidInPractice } from './02-acid-in-practice'
import { singleObjectAtomicity } from './03-single-object-atomicity'
import { readCommitted } from './04-read-committed'
import { snapshotIsolation } from './05-snapshot-isolation'
import { lostUpdate } from './06-lost-update'
import { writeSkew } from './07-write-skew'
import { phantoms } from './08-phantoms'
import { serialExecution } from './09-serial-execution'
import { twoPhaseLocking } from './10-two-phase-locking'
import { ssi } from './11-ssi'
import { choosingIsolation } from './12-choosing-isolation'

// Course 6 — transactions & isolation. Built as a ladder rather than a catalogue: §4 fixes the two
// anomalies read committed forbids, §5 fixes the one that survives it, §6–8 are the three that
// survive §5 — each strictly harder than the last, ending at a conflict with no row to lock. §9–11
// are the three real answers to that, and they are genuinely different strategies (remove
// concurrency · block in advance · check at the end). §12 is the matrix, and the warning that the
// level names in real products do not mean what they say.
export const transactions: Course = {
  id: 'transactions',
  title: 'Transactions & isolation',
  sections: [
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
  ],
}
