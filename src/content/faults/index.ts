import type { Course } from '../types'
import { partialFailure } from './01-partial-failure'
import { unreliableNetworks } from './02-unreliable-networks'
import { timeouts } from './03-timeouts'
import { congestionAndQueueing } from './04-congestion-and-queueing'
import { timeOfDayClocks } from './05-time-of-day-clocks'
import { monotonicClocks } from './06-monotonic-clocks'
import { lwwIsLossy } from './07-lww-is-lossy'
import { processPauses } from './08-process-pauses'
import { fencingTokens } from './09-fencing-tokens'
import { truthByMajority } from './10-truth-by-majority'

// Course 7 — why distributed systems fail. Three sources of trouble, each ending in the same place.
// §2–4: the network gives you one bit of information and no upper bound on delay. §5–7: clocks are
// not comparable across machines, which is why last-write-wins from course 04 silently loses data.
// §8: a node can stop executing entirely and not notice. The last two sections are the only answers
// that survive all of it — check at the resource, and let the majority decide — and both feed
// directly into course 09.
export const faults: Course = {
  id: 'faults',
  title: 'Why distributed systems fail',
  sections: [
    partialFailure,
    unreliableNetworks,
    timeouts,
    congestionAndQueueing,
    timeOfDayClocks,
    monotonicClocks,
    lwwIsLossy,
    processPauses,
    fencingTokens,
    truthByMajority,
  ],
}
