import type { Section } from '../types'

export const dataflowEngines: Section = {
  id: 'dataflow-engines',
  title: 'Dataflow engines',
  scene: 'dataflow-engines',
  focus: 'd2',
  slide: `## Dataflow engines

Why Spark, Flink and Tez displaced MapReduce. **One idea: stop writing the middle to disk.**

### What MapReduce had to do
- Each job is independent, so every intermediate result goes to **HDFS, replicated three times**
- The next job cannot start until the previous one **fully finishes**
- Every stage sorts, whether or not anything needs it

### What knowing the whole DAG buys
- You submit the **entire graph of operators** at once
- Intermediate state stays **in memory**, unreplicated, consumed as produced
- Sorting happens only where it is required

### Fault tolerance without the replication
- Lose a partition and **recompute** it — the **lineage** says how it was made
- Which is why Spark's operations must be **deterministic**`,
  narration:
    "MapReduce dominated for about a decade and was then largely replaced by Spark, Flink and Tez. There is one idea behind all three, and understanding it explains most of the performance difference. In MapReduce, each job is a separate, independent thing. It reads from the distributed filesystem and writes back to it. So a realistic workload, which is usually a chain of ten or twenty jobs, writes every intermediate result to HDFS, replicated three times across the cluster, and then reads it all back for the next stage. That is enormous, and almost all of it is waste: the intermediate data is not something anyone wants, it is scaffolding, and it is being given the same durability treatment as your actual data. There is a second cost too. A job cannot start until the previous job has completely finished, so one straggler task holds up the whole pipeline — even though most of the next job's input has been ready for ages. And MapReduce sorts between every map and reduce, which is necessary for some operations and pure overhead for others, like a simple filter. Dataflow engines fix this by knowing more. Instead of submitting a chain of independent jobs, you submit the entire graph of operators at once, and the engine sees the whole thing before it starts. That lets it do three things. It can keep intermediate results in memory, or spill them to local disk, with no replication, because they are recomputable rather than precious. It can start a downstream operator as soon as its input begins arriving, rather than waiting for the upstream to finish entirely. And it can skip the sort wherever the operation does not need one. And then the interesting part: how do you get fault tolerance without replicating the intermediates? You recompute. The engine records the lineage of every partition — which inputs it came from and which operators produced it — so if a machine dies and a partition is lost, it re-derives that partition from its inputs. That is Spark's RDD model. It has one strict requirement, and it catches people out: the operations have to be deterministic. If your function calls a random number generator or reads the current time or depends on hash iteration order, recomputation gives a different answer, and your fault tolerance has quietly become data corruption.",
}
