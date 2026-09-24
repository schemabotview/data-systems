import type { Course } from '../types'
import { theGuaranteeLadder } from './01-the-guarantee-ladder'
import { linearizability } from './02-linearizability'
import { notLinearizable } from './03-not-linearizable'
import { whereItIsRequired } from './04-where-it-is-required'
import { theCost } from './05-the-cost'
import { causality } from './06-causality'
import { lamportTimestamps } from './07-lamport-timestamps'
import { totalOrderBroadcast } from './08-total-order-broadcast'
import { broadcastEqualsLinearizable } from './09-broadcast-equals-linearizable'
import { orderingSummary } from './10-ordering-summary'

// Course 8 — linearizability & causality. Two halves that meet at the end. §2–5 are the strong
// guarantee: what it promises, how you test it, where you cannot avoid it, and what it costs.
// §6–8 climb back from the cheaper side: causality is a partial order, Lamport timestamps track it
// with no clocks, and total order broadcast fixes the order at delivery instead of afterwards. §9 is
// the payoff — the two are inter-derivable, so both are consensus, which is course 09.
export const consistency: Course = {
  id: 'consistency',
  title: 'Linearizability & causality',
  sections: [
    theGuaranteeLadder,
    linearizability,
    notLinearizable,
    whereItIsRequired,
    theCost,
    causality,
    lamportTimestamps,
    totalOrderBroadcast,
    broadcastEqualsLinearizable,
    orderingSummary,
  ],
}
