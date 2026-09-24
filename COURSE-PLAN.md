# Data Systems — course plan

The full section plot for the ten-course spine. `CLAUDE.md` is the operational summary; this is the
detail. **105 sections.**

The ordering is *Designing Data-Intensive Applications*' chapter order, used as a private syllabus:
the ideas are distilled in original words with original diagrams, and the book's name, figures and
prose appear nowhere in the product. See `CLAUDE.md` for why the repo is named `data-systems`.

**Publish order is not authoring order.** Courses are authored in syllabus order (a reader needs
`models` before `storage`), but shipped search-first — `replication` and `partitioning` carry the
highest search volume and the highest diagram dependence, and `models`/`encoding` the lowest.

---

## 01 · `models` — Data models & query shapes (9) ✅ authored

1. `what-a-data-system-is` — db + cache + index + queue as one composition; the arrows are the design
2. `relational-shape` — rows of one shape; relationships stated as keys, resolved at read time
3. `document-shape` — locality: one seek returns the whole tree, and what that costs on a write
4. `many-to-one` — store the ID, not the string; normalization as the removal of a second truth
5. `many-to-many` — the fact that belongs to both sides, and where the tree gives up
6. `schema-on-read` — both have a schema; they differ in when it is enforced and who gets the error
7. `graph-shape` — heterogeneous vertices, labelled edges, unbounded traversal depth
8. `query-languages` — declarative leaves the how empty on purpose; the loop pins the plan
9. `choosing-a-model` — read the model off the shape of the data; nobody picks once

## 02 · `storage` — Storage engines (11)

1. `the-simplest-database` — append to a file, grep it back: the log, and its O(n) read
2. `hash-index` — key → byte offset in memory; fast, and bounded by RAM
3. `segments-and-compaction` — why the log stops growing forever
4. `sstable` — sorted segments, a sparse index, and merge as the primitive
5. `lsm-tree` — memtable → flush → level merge: the write path end to end
6. `b-tree` — pages, branching factor, and a read path of fixed depth
7. `page-split` — an insert that overflows, before and after; where the WAL enters
8. `wal-and-crash` — redo on restart, and why the log is always written first
9. `lsm-vs-btree` — write amplification, read amplification, space: the trade as a table
10. `secondary-indexes` — heap file vs clustered, covering indexes, multi-column
11. `column-store` — OLTP against OLAP; columnar layout, compression, sort order

## 03 · `encoding` — Encoding & schema evolution (9)

1. `why-encoding-matters` — in-memory graph → bytes → in-memory graph, on two different versions
2. `language-formats` — pickle and Java serialization, and why they lose
3. `json-and-friends` — readable, ambiguous, large
4. `binary-with-tags` — Thrift/Protobuf field tags and the wire layout
5. `avro` — writer schema + reader schema, no tags, resolution by name
6. `backward-forward` — the two compatibility directions as old/new × read/write
7. `schema-evolution-rules` — add, remove, rename: what each one breaks
8. `dataflow-through-databases` — old code reads the new row; data outlives code
9. `dataflow-services-and-queues` — REST/RPC vs broker, and who must upgrade first

## 04 · `replication` — Replication (12)

1. `why-replicate` — latency, availability, read throughput: three reasons, three designs
2. `single-leader` — one node takes writes, any node serves reads
3. `sync-vs-async` — the one-synchronous-follower compromise and what each end loses
4. `adding-a-follower` — snapshot plus log position, with no downtime
5. `follower-failure` — catch-up recovery straight from the log
6. `leader-failure` — failover, and the four ways it goes wrong
7. `replication-logs` — statement · WAL shipping · row-based · trigger, and what each couples
8. `read-your-writes` — read-after-write consistency, and how to actually get it
9. `monotonic-and-prefix` — moving backwards in time; causality broken by a partition
10. `multi-leader` — multi-datacenter, offline clients, collaborative editing
11. `write-conflicts` — convergence: LWW, version vectors, merge, CRDT
12. `leaderless` — w + r > n, read repair, anti-entropy, sloppy quorums

## 05 · `partitioning` — Partitioning & sharding (10)

1. `why-partition` — the dataset that does not fit, sitting on top of replication
2. `partition-plus-replica` — the leader/follower grid laid over partitions
3. `by-key-range` — sorted partitions, range scans, and the hot spot
4. `by-hash` — uniform spread, range scans lost, compound keys as the fix
5. `hot-keys` — the celebrity problem and the split-key workaround
6. `local-secondary-index` — index per partition; scatter/gather on read
7. `global-secondary-index` — term-partitioned; cheap reads, distributed writes
8. `rebalancing` — fixed count · dynamic · proportional to nodes; why mod N is wrong
9. `consistent-hashing` — the ring, virtual nodes, and what moves when a node joins
10. `request-routing` — routing tier · any-node forwarding · client-aware; ZooKeeper as the map

## 06 · `transactions` — Transactions & isolation (12)

1. `what-a-transaction-buys` — the failure cases you stop writing code for
2. `acid-in-practice` — which of the four letters is marketing
3. `single-object-atomicity` — what the storage engine gives you for free
4. `read-committed` — no dirty reads, no dirty writes; row locks + the saved old value
5. `snapshot-isolation` — MVCC: versions, visibility rules, the read snapshot
6. `lost-update` — two read-modify-writes; atomic ops, explicit locks, compare-and-set
7. `write-skew` — the on-call doctor, and why row locks do not help
8. `phantoms` — a write that changes another query's precondition
9. `serial-execution` — one thread, stored procedures, and the throughput ceiling
10. `two-phase-locking` — shared/exclusive, predicate and index-range locks, deadlock
11. `ssi` — optimistic: detect a stale premise at commit time
12. `choosing-isolation` — the anomaly × level matrix, and what each level costs

## 07 · `faults` — Why distributed systems fail (10)

1. `partial-failure` — the defining property: some of it still works
2. `unreliable-networks` — the dead node and the slow node are indistinguishable
3. `timeouts` — too short and too long are both wrong, differently
4. `congestion-and-queueing` — where the delay actually accumulates
5. `time-of-day-clocks` — NTP steps and leap seconds; timestamps that go backwards
6. `monotonic-clocks` — what they measure, and what they cannot compare
7. `lww-is-lossy` — clock skew silently dropping writes
8. `process-pauses` — GC and VM migration; the lease you no longer hold
9. `fencing-tokens` — the monotonic token the resource checks: the one real fix
10. `truth-by-majority` — the quorum decides; byzantine faults and the system model

## 08 · `consistency` — Linearizability & causality (10)

1. `the-guarantee-ladder` — eventual ⊃ causal ⊃ linearizable, as containment
2. `linearizability` — one copy, one timeline; a register that never goes backwards
3. `not-linearizable` — three histories, and the rule each one breaks
4. `where-it-is-required` — leader election, uniqueness constraints, cross-channel dependencies
5. `the-cost` — CAP restated honestly: the partition forces the choice
6. `causality` — happens-before as a partial order; concurrent means neither precedes
7. `lamport-timestamps` — a total order that respects causality, and what it still cannot do
8. `total-order-broadcast` — the log as the primitive: same messages, same order, everywhere
9. `broadcast-equals-linearizable` — building one out of the other, in both directions
10. `ordering-summary` — which guarantee each real system actually gives you

## 09 · `consensus` — Consensus & coordination (10)

1. `atomic-commit` — all nodes or none; why single-node commit is the easy case
2. `two-phase-commit` — coordinator, prepare, the commit point, and the promise each node makes
3. `2pc-in-doubt` — the coordinator dies after prepare; locks held indefinitely
4. `xa-and-practice` — heterogeneous distributed transactions and their operational cost
5. `consensus-properties` — agreement, integrity, validity, termination
6. `epochs-and-quorums` — every leader is fenced by an epoch; two quorums must overlap
7. `raft-leader-election` — timeout → candidate → votes → leader
8. `raft-log-replication` — append, match index, commit index, apply
9. `membership-change` — adding and removing nodes without ever having two majorities
10. `coordination-services` — ZooKeeper/etcd: locks, leases, discovery, partition assignment

## 10 · `pipelines` — Batch, streams & CDC (12)

1. `three-system-types` — services, batch and stream by their latency/throughput contract
2. `unix-pipeline` — `sort | uniq -c` as the model: uniform interface, immutable input
3. `mapreduce-job` — map → shuffle by key → reduce over a distributed filesystem
4. `sort-merge-join` — the join *is* the shuffle; both sides land on one reducer
5. `skew-and-broadcast-join` — the hot key, and the map-side alternative
6. `dataflow-engines` — an operator DAG with no materialized intermediate state
7. `event-streams` — producer → broker → consumer; the message as the unit
8. `partitioned-log` — offsets, consumer groups, replay: the log as a durable buffer
9. `cdc` — the database's own replication log as an event stream
10. `event-sourcing` — events as the source of truth, state as a fold
11. `time-and-windows` — event time vs processing time, watermarks, the straggler
12. `exactly-once` — idempotence, and atomically committing output with the offset
