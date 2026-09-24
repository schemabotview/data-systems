import type { Section } from '../types'

export const partitionedLog: Section = {
  id: 'partitioned-log',
  title: 'The partitioned log',
  scene: 'partitioned-log',
  focus: 'offset',
  slide: `## The partitioned log

Kafka's design, and the difference from a classic queue is one sentence: **reading does not delete**.

### The structure
- A topic is split into **partitions**; each is an **append-only log** on disk
- Every message has an **offset** — its position in that partition
- A consumer's position is **just a number** the broker remembers

### What that buys
- **Replay.** Set the offset back and reprocess a week — free
- **A new consumer** starts from zero and catches up on everything
- **Lag is a subtraction**: head offset minus yours. One number

### And it does both delivery patterns
- One **group** splits the partitions; different groups each get everything`,
  narration:
    "Kafka's design, and the difference from a traditional message broker fits in one sentence: reading a message does not delete it. Here is the structure. A topic is divided into partitions, and each partition is an append-only log stored on disk — literally files, appended to. Every message gets an offset, which is just its position in that partition, a monotonically increasing number. And a consumer's position is only that number; the broker records which offset each consumer group has reached, and nothing else. Ordering is guaranteed within a partition and not across partitions, which is exactly what course eight, section ten said: choosing your partition key is a consistency decision, not just a load-balancing one, because events that must be ordered relative to each other have to be in the same partition. Now look at what not deleting buys you. Replay: set your offset back to last Tuesday and reprocess a week of events, at no cost, because the data is still there. That is not a recovery tool, it is a development tool — you fix a bug in a stream processor and reprocess, exactly as you would rerun a batch job, which brings the batch world's iterate-freely property into streaming. A brand new consumer can start from offset zero and catch up on the entire retained history, so adding a system later is not a data migration. And monitoring becomes trivial: your lag is the head offset minus your offset, one subtraction, one number on a dashboard, and if it is growing you are falling behind. Try measuring that on a traditional queue and you are guessing from queue depth. And the last thing is why the log became the standard seam between systems rather than merely a better queue. It does both delivery patterns at once. Consumers in the same group divide the partitions between them, so they share the work — that is load balancing. Different consumer groups each read the whole topic independently, each with their own offset — that is fan-out. One mechanism, both patterns, no configuration decision. That is why the next two sections can treat a log as the connective tissue of an entire architecture.",
}
