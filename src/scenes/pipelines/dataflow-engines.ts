import type { Scene } from '@graphlearning/flow'

// §6 — why Spark and Flink displaced MapReduce, and it is one idea: MapReduce writes every
// intermediate result to a distributed filesystem, replicated, because each job is independent.
// A dataflow engine knows the whole DAG up front, so it can keep intermediate state in memory and
// only materialise what someone asked for.
export const dataflowEngines: Scene = {
  id: 'dataflow-engines',
  title: 'Stop writing the middle to disk',
  cols: 2,
  nodes: [
    {
      id: 'mr',
      label: 'MapReduce — jobs that do not know each other',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'm1', label: 'Job 1 writes HDFS', sub: 'replicated three times', pattern: 'storage', icon: 'harddrive' },
        { id: 'm2', label: 'Job 2 reads it back', sub: 'and cannot start until job 1 ends', pattern: 'warn', icon: 'clock' },
        { id: 'm3', label: 'Always a full sort', sub: 'even where nothing needs it', pattern: 'warn', icon: 'sortarrows' },
      ],
      edges: [
        { source: 'm1', target: 'm2' },
        { source: 'm2', target: 'm3' },
      ],
    },
    {
      id: 'df',
      label: 'Dataflow — one DAG, known up front',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'd1', label: 'Operators, not jobs', sub: 'the whole graph is submitted at once', pattern: 'service', icon: 'workflow' },
        { id: 'd2', label: 'Intermediate stays in RAM', sub: 'nothing replicated, nothing re-read', pattern: 'service', icon: 'memory' },
        { id: 'd3', label: 'Recompute on failure', sub: 'the lineage says how it was made', pattern: 'service', icon: 'repeat' },
      ],
      edges: [
        { source: 'd1', target: 'd2' },
        { source: 'd2', target: 'd3' },
      ],
    },
  ],
  edges: [],
}
