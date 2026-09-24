import type { Section } from '../types'

export const exactlyOnce: Section = {
  id: 'exactly-once',
  title: 'Exactly once',
  scene: 'exactly-once',
  focus: 'name',
  slide: `## Exactly once

The most oversold phrase in streaming. **Nothing delivers a message exactly once.** Good systems make processing it twice *indistinguishable* from once.

### Why duplicates are unavoidable
- A consumer processes a batch and crashes **before advancing its offset**
- The work is done; the bookkeeping is not. On restart, it runs again

### Two ways to make that harmless
- **Idempotence.** Set a value, do not increment one. Or record the event ids you have processed and skip repeats
- **Atomic output plus offset.** One transaction, so neither half lands alone — what Kafka's transactional producer does

### The honest name

**Make the retry harmless** — the last idea in the series, and the one that has been the answer since course 02.`,
  narration:
    "Let us end on the most oversold phrase in streaming: exactly-once processing. Here is what is actually true. Nothing delivers a message exactly once. It cannot, and course seven, section two, explained why: if you send a message and get no acknowledgement, you cannot distinguish between it was lost and it arrived and the reply was lost. So you either retry, risking a duplicate, or you do not, risking a loss. Those are the only two options a network offers. What good systems do instead is make processing a message twice indistinguishable from processing it once. Concretely, here is the failure. A stream processor reads a batch of events, processes them, writes the results, and then updates its offset to say it has consumed them. If it crashes between writing the results and updating the offset — a window of milliseconds, which at high throughput means several times a day — then on restart it reads from the old offset and processes those events again. The work happened; the bookkeeping did not. There are two ways to make that harmless. The first is idempotence, and it is worth designing for deliberately. Set a value rather than incrementing one: setting x to five twice is the same as setting it once, whereas adding one twice is not. Or keep a record of which event IDs you have already processed and skip the ones you have seen. The second is to make the output and the offset update atomic — write both in a single transaction, so either both land or neither does, and the window where they can disagree simply does not exist. That is what Kafka's transactional producer does, and it is also how a stream processor writing to a database can be genuinely safe: put the result and the offset in the same transaction. So the honest name for the property is effectively once. At-least-once delivery, plus processing that does not care how many times it happens. And that is the last idea in this series, because you have now seen it everywhere. It is the write-ahead log in course two, where replaying a completed change writes the same bytes again. It is the follower in course four asking for everything since position N and not caring about overlap. It is the answer in course nine to avoiding distributed transactions. In a system where you cannot know whether something happened, the only robust design is one where doing it again does not matter. Build for that, and most of the hard problems in these ten courses become manageable.",
}
