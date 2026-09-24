import type { Scene } from '@graphlearning/flow'
import { partialFailure } from './partial-failure'
import { unreliableNetworks } from './unreliable-networks'
import { timeouts } from './timeouts'
import { congestionAndQueueing } from './congestion-and-queueing'
import { timeOfDayClocks } from './time-of-day-clocks'
import { monotonicClocks } from './monotonic-clocks'
import { lwwIsLossy } from './lww-is-lossy'
import { processPauses } from './process-pauses'
import { fencingTokens } from './fencing-tokens'
import { truthByMajority } from './truth-by-majority'

export const faultsScenes: Scene[] = [
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
]
