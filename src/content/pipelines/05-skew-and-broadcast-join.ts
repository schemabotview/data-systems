import type { Section } from '../types'

export const skewAndBroadcastJoin: Section = {
  id: 'skew-and-broadcast-join',
  title: 'Skew, and the join that avoids it',
  scene: 'skew-and-broadcast-join',
  slide: `## Skew, and the join that avoids it

The shuffle sends every record for one key to **one** reducer. So one very popular key is **one machine doing all the work**.

### The failure
- A celebrity with 30 million followers: 99 reducers finish in minutes, one runs for hours
- **Skew** — course 05 §5, arriving through a different door
- The job's runtime is its **slowest task**, so one key is the whole job

### Two ways out
- **Spread the hot key** — random suffix on the large side, replicate the small side
- **Broadcast join** — if one side fits in memory, copy it to every mapper and join there. **No shuffle**, and so no skew

The condition is the whole story: it works while the small side **fits**.`,
  narration:
    "The sort-merge join has a failure mode, and it is one you have already met. The shuffle sends every record with a given key to a single reducer. So what happens when one key has vastly more records than the others? A celebrity with thirty million followers. One product on sale on Black Friday. One enterprise customer fifty times bigger than any other. Ninety-nine of your hundred reducers finish in minutes, and one runs for hours, while the cluster sits mostly idle waiting for it. And because a job is not finished until its slowest task is finished, one skewed key determines the runtime of the entire job. That is skew, also called a hot spot, and it is exactly the hot-key problem from course five, section five, arriving through a different door — same cause, same shape, different symptom. There are two ways out. The first is to spread the hot key, which is the same workaround as before: detect the heavy keys, append a random number to them on the large side so they spread across reducers, and replicate the records from the small side to every partition that could need them. Spark, Hive and Flink each ship a variant of this, and they differ mainly in how much of the detection they do for you. The second is more elegant, and it is the one to reach for first. If one side of the join is small enough to fit in memory — a user table with a few million rows is a few hundred megabytes, which is nothing — then do not shuffle at all. Send a complete copy of the small side to every mapper, load it into a hash table in memory, and have each mapper join its own local slice of the large side against it. No network shuffle, no reducers, no sorting, and therefore no skew, because there is no partitioning step for skew to happen in. That is a broadcast hash join, and on the right shape of problem it is an order of magnitude faster. The condition is the whole story: it only works while the small side actually fits in memory. Forcing a broadcast join is probably the most common Spark tuning fix there is, and a broadcast of something that turned out not to be small is probably the most common Spark out-of-memory error.",
}
