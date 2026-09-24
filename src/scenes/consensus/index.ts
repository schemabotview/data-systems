import type { Scene } from '@graphlearning/flow'
import { atomicCommit } from './atomic-commit'
import { twoPhaseCommit } from './two-phase-commit'
import { twoPcInDoubt } from './two-pc-in-doubt'
import { xaAndPractice } from './xa-and-practice'
import { consensusProperties } from './consensus-properties'
import { epochsAndQuorums } from './epochs-and-quorums'
import { raftLeaderElection } from './raft-leader-election'
import { raftLogReplication } from './raft-log-replication'
import { membershipChange } from './membership-change'
import { coordinationServices } from './coordination-services'

export const consensusScenes: Scene[] = [
  atomicCommit,
  twoPhaseCommit,
  twoPcInDoubt,
  xaAndPractice,
  consensusProperties,
  epochsAndQuorums,
  raftLeaderElection,
  raftLogReplication,
  membershipChange,
  coordinationServices,
]
