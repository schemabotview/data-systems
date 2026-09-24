import type { Section } from '../types'

export const timeouts: Section = {
  id: 'timeouts',
  title: 'Timeouts, and why there is no right one',
  scene: 'timeouts',
  focus: 'nobound',
  slide: `## Timeouts, and why there is no right one

The only tool you have for detecting failure is **waiting, then giving up**. Both ends of the dial are wrong.

### Too short
- A **live** node gets declared dead, and its work may run **twice**
- Under load this cascades: survivors take more traffic, slow down, and get declared dead too

### Too long
- A real failure goes unnoticed for exactly that long

### Why you cannot compute it
- The right value is *round trip + processing + queueing* — and **queueing is unbounded**
- The internet gives **no upper bound** on delivery. By design
- So **measure, don't guess**: track your response-time distribution and adapt, as TCP retransmission has for decades`,
  narration:
    "If you cannot distinguish a dead node from a slow one, what can you actually do? Only one thing: wait, and after some period, give up and assume failure. That is a timeout, and it is the only failure-detection primitive available. So how long should it be? Suppose it is too short. You declare a node dead when it was merely busy, which means you take an action it did not need — you might promote a replacement leader, or retry the work somewhere else, so now the same operation is running twice. And there is a worse version: under high load, everything is a bit slower, so nodes start getting declared dead, so their traffic moves to the survivors, which makes the survivors slower, so they get declared dead too. That is a cascading failure, and a too-aggressive timeout is one of the classic ways to build one. Now suppose it is too long. Then a genuine failure sits undetected for that whole interval, during which users are watching a spinner and their requests are going nowhere. Neither end is acceptable, which raises the obvious question: what is the correct value? And here is the uncomfortable answer. In principle the timeout should be the round-trip time, plus the processing time, plus any queueing delay. Round trips you can measure. Processing time you can often bound. Queueing delay you cannot, because nothing in the network guarantees an upper limit on how long a packet waits — the internet is designed as a best-effort packet-switched network, and unbounded delay is a design decision, not a defect. Some systems do bound it — a telephone circuit reserves fixed bandwidth end to end, so audio arrives in a guaranteed time — but that reservation wastes capacity, which is exactly why packet switching won. So there is no correct value to compute. The practical answer is to stop guessing and start measuring: watch your actual response-time distribution over many machines, and set the timeout relative to what you observe, adjusting as conditions change. TCP retransmission timeouts have worked this way for decades, and it is the right instinct for your application too.",
}
