import type { Scene } from '@graphlearning/flow'
import { threeSystemTypes } from './three-system-types'
import { unixPipeline } from './unix-pipeline'
import { mapreduceJob } from './mapreduce-job'
import { sortMergeJoin } from './sort-merge-join'
import { skewAndBroadcastJoin } from './skew-and-broadcast-join'
import { dataflowEngines } from './dataflow-engines'
import { eventStreams } from './event-streams'
import { partitionedLog } from './partitioned-log'
import { cdc } from './cdc'
import { eventSourcing } from './event-sourcing'
import { timeAndWindows } from './time-and-windows'
import { exactlyOnce } from './exactly-once'

export const pipelinesScenes: Scene[] = [
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
]
