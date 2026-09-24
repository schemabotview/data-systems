import type { Section } from '../types'

export const dataflowServicesAndQueues: Section = {
  id: 'dataflow-services-and-queues',
  title: 'Dataflow through services and queues',
  scene: 'dataflow-services',
  slide: `## Dataflow through services and queues

The same compatibility question, asked of two topologies. The answer differs because of **who controls the upgrade**.

### Through a service — REST or RPC
- The **server** must tolerate old callers, often for **years**
- You cannot recall a mobile app, so the rule is: **upgrade servers first, clients whenever**
- RPC frameworks work hard to look like a local call. The network is still there — it fails, it delays, it retries

### Through a broker — async messages
- Producer → broker → consumers, with **nobody waiting**
- The broker buffers, retries, and fans one message out to many consumers
- Each consumer upgrades **on its own clock**, which is why the log is the easier seam
- Messages are just bytes, so the broker never needs to understand the schema`,
  narration:
    "Finally, the same question asked of the two ways services talk. First, request and response — REST, or an RPC framework like gRPC. The asymmetry here is about control. You can upgrade your own servers whenever you like. You cannot upgrade your callers, especially if a caller is a mobile app sitting on someone's phone, or another team's service on their own release schedule. So the standing rule is: upgrade servers first, and make them tolerate old requests essentially indefinitely. In practice API versioning is how this gets managed — a version in the URL, or a header — but underneath, it is the same backward and forward compatibility problem, just with a longer tail. One aside on RPC. These frameworks are designed to make a network call look like a local function call, and that abstraction is useful right up until it lies to you. A local call either runs or it doesn't; a network call can time out with the work already done, which means retries need idempotence, and it can be a thousand times slower with no warning. The abstraction is convenient, not honest. Second, asynchronous message passing through a broker — Kafka, RabbitMQ, SQS. Here the producer sends a message and does not wait. The broker buffers it, retries delivery, and can fan one message out to many independent consumers. And that decoupling changes the compatibility picture in your favour. The producer does not know who its consumers are, so it cannot be blocked by them, and each consumer team upgrades on its own clock. A new consumer can even be added later and replay messages from the past. The broker itself never needs to understand your schema; to it a message is just bytes with some metadata. That is why the log ends up being the easiest seam to evolve — and it is the thing the last course of this series is built on.",
}
