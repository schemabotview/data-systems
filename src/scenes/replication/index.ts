import type { Scene } from '@graphlearning/flow'
import { whyReplicate } from './why-replicate'
import { singleLeader } from './single-leader'
import { syncVsAsync } from './sync-vs-async'
import { addingAFollower } from './adding-a-follower'
import { followerFailure } from './follower-failure'
import { leaderFailure } from './leader-failure'
import { replicationLogs } from './replication-logs'
import { readYourWrites } from './read-your-writes'
import { monotonicAndPrefix } from './monotonic-and-prefix'
import { multiLeader } from './multi-leader'
import { writeConflicts } from './write-conflicts'
import { leaderless } from './leaderless'

export const replicationScenes: Scene[] = [
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
]
