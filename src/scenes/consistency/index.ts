import type { Scene } from '@graphlearning/flow'
import { guaranteeLadder } from './guarantee-ladder'
import { linearizability } from './linearizability'
import { notLinearizable } from './not-linearizable'
import { whereRequired } from './where-required'
import { theCost } from './the-cost'
import { causality } from './causality'
import { lamportTimestamps } from './lamport-timestamps'
import { totalOrderBroadcast } from './total-order-broadcast'
import { broadcastEqualsLinearizable } from './broadcast-equals-linearizable'
import { orderingSummary } from './ordering-summary'

export const consistencyScenes: Scene[] = [
  guaranteeLadder,
  linearizability,
  notLinearizable,
  whereRequired,
  theCost,
  causality,
  lamportTimestamps,
  totalOrderBroadcast,
  broadcastEqualsLinearizable,
  orderingSummary,
]
