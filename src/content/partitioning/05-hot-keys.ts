import type { Section } from '../types'

export const hotKeys: Section = {
  id: 'hot-keys',
  title: 'Hot keys',
  scene: 'hot-keys',
  focus: 'cost',
  slide: `## Hot keys

Hashing balances **keys**. A celebrity is **one key** — and no hash function helps with that.

### The failure
- A million people reply to one post in one minute
- Same key → same hash → **same partition**, saturated, the rest idle
- Also: one product on sale, one viral video, one huge tenant

### The workaround
- Append a random 0–99 to the hot key. **100 keys, 100 partitions**

### Read the cost carefully
- **Every read now fans out to 100 keys** and merges them
- So it applies only to the **few** keys that need it
- Which means **the application tracks which keys are hot** — and undoes it when they cool. No mainstream database does this for you`,
  narration:
    "Hashing solves skew, but it does not solve everything, and the case it fails on is worth knowing because it shows up constantly. Hashing balances the distribution of keys. It cannot help you when the load is concentrated on one key. A celebrity with thirty million followers posts something, and a million people reply to that post within a minute. All of those writes have the same key — the post ID. The same key hashes to the same value, so it goes to the same partition, which is now taking a million writes a minute while its nine siblings sit idle. The same shape appears as one product on sale at midnight, one viral video, or one enterprise customer who is fifty times larger than every other tenant in your multi-tenant system. The workaround is crude and it works. Take the hot key and append a random number from zero to ninety-nine. Now one key has become a hundred distinct keys, they hash to a hundred different values, and they spread across the cluster. The write throughput problem is completely solved. But read the cost carefully, because it is not small. Every read of that data now has to query all hundred variants and merge the results. You have made writes a hundred times more parallel and reads a hundred times more expensive. Which means you can only do this to the small number of keys that actually need it — do it to everything and you have made the entire system slower. And that implies the hard part: your application has to know which keys are hot. Something has to detect the spike, decide to split that key, tell every reader to start fanning out, and eventually decide the key has cooled down and undo it. Almost no mainstream database does any of this for you. Detection and bookkeeping are application work, and that is the honest state of the art.",
}
