import type { Section } from '../types'

export const eventStreams: Section = {
  id: 'event-streams',
  title: 'Event streams',
  scene: 'event-streams',
  focus: 'broker',
  slide: `## Event streams

A batch job's input is **bounded** — it has a last record. A stream's input **never ends**.

### An event
- A small, **immutable** record of something that happened, with a timestamp
- Written once by a producer; read by any number of consumers

### Why a broker in the middle
- Direct producer-to-consumer means a **slow consumer stalls the producer**, and one that is down misses everything
- A broker absorbs bursts, retries, and lets either side restart

### Two delivery patterns, and they are not variants
- **Load balancing** — each message to **one** consumer of a group
- **Fan-out** — each message to **every** consumer

Kafka does both at once, which is the next section.`,
  narration:
    "Everything so far has assumed the input is bounded — a file, a day's worth of logs, something with a last record. That is what lets a batch job know when it is finished and produce a complete answer. A stream has no last record. It is unbounded, and it is still arriving, and that one difference changes almost everything downstream. First, terminology. An event is a small, immutable record of something that happened, usually with a timestamp — a user clicked, a sensor read 21 degrees, an order was placed. It is written once by a producer and never modified, and it can be read by any number of consumers. Immutability is doing the same work here it did in the batch world: because an event never changes, consuming it twice is a question about your processing, not about the data. Now, why put a broker in the middle rather than have producers call consumers directly? Two reasons, and both are availability. If a producer sends directly and the consumer is slower than the producer, the producer either blocks — and now a downstream slowdown has propagated back to your user-facing code — or it drops messages. And if the consumer is down for a deploy, everything sent during that window is simply lost. A broker sits between them and absorbs all of that: it buffers bursts, retries delivery, and lets either side restart without the other noticing. Then there are two delivery patterns, and it is worth being clear that they are not two flavours of the same thing — they answer different questions. Load balancing sends each message to one consumer out of a group, so several consumers share the work; that is what you want when processing a message is expensive and you want to parallelise it. Fan-out sends every message to every consumer, so each one sees the complete stream; that is what you want when several independent systems each need all the events — a search index, a cache, a fraud detector. Traditional message brokers make you choose. The design in the next section does both at once, and that turns out to matter more than anything else about it.",
}
