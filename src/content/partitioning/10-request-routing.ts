import type { Section } from '../types'

export const requestRouting: Section = {
  id: 'request-routing',
  title: 'Request routing',
  scene: 'request-routing',
  focus: 'consensus',
  slide: `## Request routing

A client has a key. Which machine holds it? The partitions just moved. **Who knows?**

### Three places to put the knowledge
- **Any node.** Ask whichever; it forwards if it isn't the owner
- **Routing tier.** A partition-aware proxy; clients stay dumb
- **Smart client.** Holds the map, connects directly

### All three need the same map
- Everyone must agree, and it changes as nodes join and fail

### How the map is agreed
- Many systems hand it to **ZooKeeper or etcd** and subscribe
- Cassandra and Riak **gossip** it — no external dependency
- Agreeing on one value across unreliable nodes is **consensus**`,
  narration:
    "One last problem, and it sounds trivial until you look at it. A client wants the row with a particular key. Which machine should it connect to? And remember that partitions have been moving around, so the answer changes over time. There are three places you can put that knowledge, and every system picks one. First: let the client contact any node. If that node happens to hold the partition, it answers. If not, it forwards the request to the node that does, and relays the reply. Simple, no extra infrastructure, and it costs one extra network hop on most requests. Second: a routing tier. A proxy sits in front of the cluster, knows the partition map, and forwards every request to the right node. It is a partition-aware load balancer, and it means the clients stay dumb — which matters a lot when your clients are many different services written by many different teams. Third: a smart client. The client library itself holds the map and connects directly to the right node, so there is no extra hop at all. Fastest, and now every client in your organisation needs to hold and refresh that map. All three need the same underlying thing: a partition map that everybody agrees on, and that stays correct as nodes join, leave and fail. And that is genuinely hard, because if two routers disagree — even for a few seconds during a rebalance — requests get sent to a node that no longer owns that data, and you either get an error or, much worse, a stale answer from a partition that is no longer authoritative. So how do you get agreement? Many systems delegate it: they keep the map in ZooKeeper or etcd, every node registers itself there, and the routing tier subscribes to changes. Kafka, HBase and SolrCloud all do this. Others avoid the external dependency and have the nodes gossip the map among themselves — Cassandra and Riak take that route, which is more complex internally but is one fewer system to operate. Either way, the underlying problem is getting a set of unreliable machines to agree on a single value. That problem is called consensus, it is one of the genuinely deep results in distributed systems, and it is course nine.",
}
