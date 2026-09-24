import type { Section } from '../types'

export const timeAndWindows: Section = {
  id: 'time-and-windows',
  title: 'Time, windows and the straggler',
  scene: 'time-and-windows',
  focus: 'water',
  slide: `## Time, windows and the straggler

A batch job knows when it is done: the input runs out. **A stream never runs out**, so you must decide when an hour is over.

### Two clocks
- **Processing time** — when *you* saw it. Trivial, and wrong after any delay: restart after an outage and an hour of backlog lands in one minute, as a spike that never happened
- **Event time** — when it happened. Correct, and never certainly complete

### The watermark
- *"I believe I have seen everything up to 10:59."* Close it and publish

### The straggler
- An event for 10:58 arrives at 11:05, after you published
- **Ignore it** — and count how often; that rate is a data-quality metric
- Or **publish a correction**, which every consumer must then handle`,
  narration:
    "Here is the problem unique to unbounded input. A batch job knows when it is finished, because the input has a last record. A stream has no last record, so if you want to count events per hour, you have to decide, at some moment, that the hour is over — and nothing tells you that. There are two clocks you could use and they give different answers. Processing time is when your system saw the event. It is trivial to implement and it is wrong as soon as anything is delayed. The classic demonstration: your consumer is down for an hour and then restarts. An hour of backlog arrives in the next sixty seconds, and if you are windowing by processing time, you see a colossal spike in that one minute followed by an hour of nothing — a pattern that describes your consumer's outage rather than anything your users did. Event time is when the event actually happened, carried in the event itself. That is the right answer, and its problem is that you can never be certain the last event for an hour has arrived. Events are delayed by network congestion, by a mobile phone that was offline in a tunnel, by a consumer restarting. You could wait forever and never be sure. So real systems use a watermark, which is an explicit statement: I believe I have now seen everything up to 10:59. When the watermark passes the end of a window, the window closes and the result is published. And how long you wait before declaring that is a dial with no correct setting — wait longer and your results are more complete but later; wait less and you publish sooner and more often wrong. That is the latency versus completeness trade, it is the central design decision in any streaming system, and it has to be made per use case rather than once. Then there is the straggler: an event timestamped 10:58 that arrives at 11:05, after the window was published. You have two options. Ignore it, which is what most systems do — and if you do, count them, because the rate of dropped late events is a genuine data-quality metric that will tell you when something upstream has broken. Or publish a correction, which is more honest and means every downstream consumer now has to handle a restated value, including the dashboard that already showed the old number to someone.",
}
