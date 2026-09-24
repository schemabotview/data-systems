import type { Course } from '../types'
import { whyReplicate } from './01-why-replicate'
import { singleLeader } from './02-single-leader'
import { syncVsAsync } from './03-sync-vs-async'
import { addingAFollower } from './04-adding-a-follower'
import { followerFailure } from './05-follower-failure'
import { leaderFailure } from './06-leader-failure'
import { replicationLogs } from './07-replication-logs'
import { readYourWrites } from './08-read-your-writes'
import { monotonicAndPrefix } from './09-monotonic-and-prefix'
import { multiLeader } from './10-multi-leader'
import { writeConflicts } from './11-write-conflicts'
import { leaderless } from './12-leaderless'

// Course 4 — replication. Three designs, in order of how much they give up. §2–9 are single-leader:
// the arrangement, the one dial (sync/async), the two failures, what is actually in the log, and the
// three anomalies its lag produces. §10–11 add a second leader and spend both sections paying for
// it. §12 removes the leader entirely and replaces it with arithmetic. The thread running through
// all of it: every problem here traces back to not being able to tell a dead node from a slow one.
export const replication: Course = {
  id: 'replication',
  title: 'Replication',
  sections: [
    whyReplicate,
    singleLeader,
    syncVsAsync,
    addingAFollower,
    followerFailure,
    leaderFailure,
    replicationLogs,
    readYourWrites,
    monotonicAndPrefix,
    multiLeader,
    writeConflicts,
    leaderless,
  ],
}
