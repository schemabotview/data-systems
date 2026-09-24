import type { Course } from '../types'
import { atomicCommit } from './01-atomic-commit'
import { twoPhaseCommit } from './02-two-phase-commit'
import { twoPcInDoubt } from './03-2pc-in-doubt'
import { xaAndPractice } from './04-xa-and-practice'
import { consensusProperties } from './05-consensus-properties'
import { epochsAndQuorums } from './06-epochs-and-quorums'
import { raftLeaderElection } from './07-raft-leader-election'
import { raftLogReplication } from './08-raft-log-replication'
import { membershipChange } from './09-membership-change'
import { coordinationServices } from './10-coordination-services'

// Course 9 — consensus & coordination. §1–4 are the naive answer and its failure: 2PC is correct,
// and it hangs the whole transaction on one unreplicated node, which is the problem consensus
// solves. §5 defines the problem properly and names FLP. §6 is the two mechanisms every real
// algorithm shares — and both are course 07's ideas (a fencing token, a majority) reapplied. §7–9
// are Raft concretely. §10 is the practical ending: use it, do not write it.
export const consensus: Course = {
  id: 'consensus',
  title: 'Consensus & coordination',
  sections: [
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
  ],
}
