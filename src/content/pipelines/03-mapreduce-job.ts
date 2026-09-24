import type { Section } from '../types'

export const mapreduceJob: Section = {
  id: 'mapreduce-job',
  title: 'The MapReduce job',
  scene: 'mapreduce-job',
  focus: 'shuffle',
  slide: `## The MapReduce job

The same pipeline on a cluster. You write **two** functions; the framework does the third, and the third is where the cost is.

### The three steps
- **Map** — your function, once per record, emitting key-value pairs
- **Shuffle** — *not* your function. Sort by key, and move every record across the network so that **equal keys land on one machine**
- **Reduce** — your function, once per key, with all its values

### The shuffle is the whole cost
- A partition-by-key at full cluster scale, on **every job**

### What makes it survivable
- The job runs **where the blocks already are** — move code, not data
- Output goes to **new files**, so a failed task is simply **retried**`,
  narration:
    "Now the same pipeline across a cluster of machines. MapReduce was Google's 2004 paper, and Hadoop was the open-source implementation that made it everybody's problem for a decade. You write two functions. The mapper is called once per input record, and its job is to extract a key and emit key-value pairs — parse this log line, emit the URL as the key and the number one as the value. The reducer is called once per key, and receives all the values for that key, in a collection, and produces the output — sum those ones, that is the count. And in between is the step you do not write, and it is where all the cost is. The shuffle. Every key-value pair from every mapper has to be sorted by key and moved to whichever reducer owns that key, so that all the values for one key end up in one place. That means the entire intermediate dataset crosses the network, and it is sorted on the way. If you look at courses four and five, you will recognise exactly what this is: a partition-by-key, with a hash function deciding which reducer gets which keys — the same mechanism, arriving from a different direction. And it is worth being blunt about it. When someone says a MapReduce job is slow, the shuffle is almost always the answer. Two things make this survivable at scale. First, the job runs where the data already is. HDFS stores blocks across the cluster, and the scheduler places map tasks on machines that already hold the blocks they need, so the input never crosses the network — move the code, not the data. Second, the output goes to new files and the input is untouched, exactly as in the Unix pipeline. So if a task fails — and at cluster scale, tasks fail constantly — the framework simply runs it again somewhere else, discards the partial output, and nobody has to think about it. That fault tolerance is essentially free, and it is a direct consequence of not modifying the input.",
}
