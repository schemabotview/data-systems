import type { Section } from '../types'

export const threeSystemTypes: Section = {
  id: 'three-system-types',
  title: 'Three kinds of system',
  scene: 'three-system-types',
  focus: 'derived',
  slide: `## Three kinds of system

Almost everything you build is one of three shapes, and the difference is **what triggers the work**.

### The three
- **Service** — waits for a request, answers it. Measured by **response time**
- **Batch job** — waits for a schedule, chews through a bounded input. Measured by **throughput**
- **Stream job** — waits for an event, on an input that **never ends**

### Batch and stream both make derived data
- Read an input, compute, **write a new output**. The input is never edited
- So a failed job is just **rerun**. No partial state to clean up
- That is why they are safe to experiment with in a way a service is not

Courses 01–09 were about the **system of record**. This one is about everything built from it.`,
  narration:
    "This last course is about the systems built on top of everything so far. And almost everything you will build falls into one of three shapes, distinguished by what triggers the work. A service waits for a request and answers it, and it is measured by response time — the user is sitting there. A batch job waits for a schedule, reads a large but bounded input, and produces an output; it is measured by throughput, because nobody is waiting on any individual record. And a stream job waits for events, on an input that never ends — it is the shape of a batch job with no final record, and that one difference turns out to change nearly everything about it. The key property batch and stream share is that both produce derived data. They read an input, compute something, and write a new output. They do not edit the input. And that single discipline buys you something significant: if a job fails halfway, you throw the partial output away and run it again. There is no half-updated state to reconcile, no compensating action, no wondering which records were processed. Contrast that with a service, where a failure mid-request may have already written to three systems. It is the same immutability idea that made compaction safe in course two and rerunning a follower's log safe in course four, applied at the scale of a whole job. And that safety is why batch and stream systems are the place where experimentation is cheap. If your recommendation model is wrong, you fix the code and rerun; the input is still there, unchanged. The first nine courses were about the system of record — how to store it, replicate it, partition it, and keep it correct. This one is about everything you build from it, and about the log turning out to be the primitive that connects the two.",
}
