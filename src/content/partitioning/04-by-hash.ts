import type { Section } from '../types'

export const byHash: Section = {
  id: 'by-hash',
  title: 'Partitioning by hash of key',
  scene: 'by-hash',
  focus: 'bad',
  slide: `## Partitioning by hash of key

Run the key through a hash function and partition on the result. **Adjacency is destroyed on purpose.**

### Why that is the point
- A good hash turns skewed input into **uniformly distributed** output
- \`user_1000\` and \`user_1001\` land on different partitions, so the timestamp hot spot is gone

### Use the database's hash, not the language's
- Java's \`hashCode\` and Ruby's \`Object#hash\` can differ **per process**
- Cassandra uses Murmur3, Mongo MD5 — boring, stable, deterministic

### The cost is the mirror image
- **Range scans are gone** — a scan is every partition, plus a merge
- **Compound key** is the answer: hash the first column, sort within it
- Cassandra's partition key / clustering columns is exactly this`,
  narration:
    "The alternative is to run the key through a hash function first, and partition on the hash rather than on the key. A good hash function takes skewed, clumpy input and produces uniformly distributed output — so user one thousand and user one thousand and one, which are adjacent as keys, get hashes that are nothing like each other and land on entirely different partitions. Destroying adjacency is not a side effect here, it is the entire purpose, and it makes the timestamp hot spot from the last section disappear. Sequential timestamps hash to scattered values, so sequential writes spread evenly across the cluster. One practical warning that has bitten real systems: use the hash function your database provides, not your programming language's. Java's hashCode and Ruby's Object hash are not guaranteed to return the same value for the same input in different processes — Ruby randomises string hashing per process by default, as a security measure. If you partition on that, a key can map to different partitions from different application servers, and you will spend a long time debugging it. Databases use deliberately boring, stable functions: Cassandra uses Murmur3, Mongo uses MD5. And the cost is precisely the mirror image of the benefit, which is the pattern you should now be expecting. You have thrown away ordering. Adjacent keys are deliberately scattered, so a range query cannot be answered by one partition — it has to go to every partition and merge, which is the scatter-gather we will meet again in two sections. The usual answer is a compound key: hash only the first part of the key to choose the partition, and keep the remaining columns sorted within it. Cassandra calls this the partition key plus clustering columns, and it is exactly the sensor-then-timestamp idea from the last section, made a first-class feature. You get even distribution across sensors and efficient time-range scans within one sensor.",
}
