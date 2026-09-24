import type { Section } from '../types'

export const consistentHashing: Section = {
  id: 'consistent-hashing',
  title: 'Consistent hashing',
  scene: 'consistent-hashing',
  focus: 'moved',
  slide: `## Consistent hashing

The formal answer to §8. *Consistent* here means **stable under change** — not the *consistency* of course 08.

### The property
- With \`n\` nodes, adding one should move about **1/n of the keys**, and no others
- \`hash % n\` moves nearly all of them. That is the whole difference

### How it is done
- Cut the hash space into **many fixed partitions**, once
- A new node takes a few from each. **Every other key stays put**

### Virtual nodes
- Random boundaries on a ring leave some nodes 3× their neighbours
- Give each machine **many small** pieces instead

**Cassandra, DynamoDB, Riak** — and every CDN and sticky load balancer.`,
  narration:
    "The technique from the last section has a name, and the name is worth unpacking because it confuses people. Consistent hashing. Consistent here does not mean consistency in the sense of course eight — nothing to do with replicas agreeing. It means stable under change: the mapping from keys to nodes stays as close to the same as possible when the set of nodes changes. The property you want is precise. If you have n nodes and you add one, then roughly one over n of the keys should move — the fair share the new node needs to take on — and not a single key beyond that. Hash mod n fails this completely, moving nearly everything. And the implementation, as we saw, is to introduce a fixed intermediate layer. Cut the hash space into a large number of partitions once, at creation time, and never again. Each node owns a set of those partitions. When a node joins, it takes a few partitions from each existing node, and those keys move. Every other key in the database stays exactly where it already was, because the key-to-partition mapping never changed at all — only the partition-to-node mapping did. That indirection is the entire trick. The original formulation from 1997 was slightly different: place nodes at random points on a ring of hash values, and a key belongs to the next node clockwise. That works, and it has a flaw — with only a handful of random points, the arcs between them are wildly uneven, so one node can easily end up with three times its neighbour's share. The fix is virtual nodes: give each physical machine a hundred or two hundred randomly placed points instead of one. With many small pieces the imbalance averages out, and you get a bonus — a bigger machine can simply be given more virtual nodes, so heterogeneous hardware is handled naturally. You will meet this in Cassandra, in DynamoDB, in Riak, and well outside databases: it is how CDNs decide which edge cache holds an object, and how load balancers do sticky sessions without a shared table. Any time you need a stable mapping from keys to a changing set of machines, this is the answer.",
}
