import type { Course } from '../types'
import { threeSystemTypes } from './01-three-system-types'
import { unixPipeline } from './02-unix-pipeline'
import { mapreduceJob } from './03-mapreduce-job'
import { sortMergeJoin } from './04-sort-merge-join'
import { skewAndBroadcastJoin } from './05-skew-and-broadcast-join'
import { dataflowEngines } from './06-dataflow-engines'
import { eventStreams } from './07-event-streams'
import { partitionedLog } from './08-partitioned-log'
import { cdc } from './09-cdc'
import { eventSourcing } from './10-event-sourcing'
import { timeAndWindows } from './11-time-and-windows'
import { exactlyOnce } from './12-exactly-once'

// Course 10 — batch, streams & CDC. The closing course, and it is deliberately built to land the
// earlier ones. §2–6 are batch, starting from a Unix pipeline because the four properties that make
// it work are the same four at cluster scale; §5 is course 05's hot key arriving through a different
// door. §7–8 remove the bound on the input and arrive at the log. §9 is the answer to the problem
// course 01 §1 opened with and left standing. §10 inverts it. §11 is the one problem unique to
// unbounded input. §12 closes the series on idempotence, which has been the answer since course 02.
export const pipelines: Course = {
  id: 'pipelines',
  title: 'Batch, streams & CDC',
  sections: [
    threeSystemTypes,
    unixPipeline,
    mapreduceJob,
    sortMergeJoin,
    skewAndBroadcastJoin,
    dataflowEngines,
    eventStreams,
    partitionedLog,
    cdc,
    eventSourcing,
    timeAndWindows,
    exactlyOnce,
  ],
}
