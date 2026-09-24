import type { Section } from '../types'

export const partialFailure: Section = {
  id: 'partial-failure',
  title: 'Partial failure',
  scene: 'partial-failure',
  focus: 'm-blind',
  slide: `## Partial failure

Distributed systems are not a bigger version of one machine. **They are a different kind of thing**, and this is why.

### One machine
- **Deterministic.** Same input, same result. A hardware fault usually means a total crash
- **All or nothing** — and you find out, because a crash is loud

### Many machines
- **Partial failure.** Some parts work, some don't, and the split changes minute to minute
- **Non-deterministic**, so the bug reproduces once in ten thousand runs
- **Nobody can see the whole thing.** Each node only has its own view of it

### The consequence for the rest of this course
- Every mechanism here exists because **no node can observe the system**, only its own experience of it`,
  narration:
    "Everything in the previous six courses assumed things mostly work. This course is about what happens when they do not, and the reason it needs its own course is that distributed systems do not fail the way single machines fail. On one computer, an operation is deterministic — same input, same result — and if the hardware breaks, you generally get a total crash rather than subtly wrong answers. We prefer computers that fail completely, because a machine returning wrong results is worse than one returning nothing. And crucially, when it crashes, you know. It is loud, it is total, and there is no ambiguity. Now put several computers on a network and the picture changes qualitatively. Some parts of the system work while others do not, and which parts are broken changes from minute to minute. That is partial failure, and it is the defining property. It is also non-deterministic: do exactly the same thing twice and it may work the first time and not the second, because the outcome depends on timing you do not control. Which is why these bugs reproduce once in ten thousand runs and are so miserable to debug. But the deepest part is the third one. There is no observer. No node can see the state of the system — each node only sees its own experience: the messages it sent, the replies it got, the silences it noticed. And that is not an engineering shortcoming you could fix with better monitoring, because your monitoring is also a node with a partial view. Every single mechanism in the rest of this course exists because of that one fact. You are never reasoning about the system. You are reasoning about one machine's incomplete and possibly outdated picture of it.",
}
