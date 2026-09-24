import type { Section } from '../types'

export const acidInPractice: Section = {
  id: 'acid-in-practice',
  title: 'ACID, in practice',
  scene: 'acid-in-practice',
  focus: 'acid',
  slide: `## ACID, in practice

A marketing word as often as a technical one. **Two systems both calling themselves ACID can differ enormously.**

### A is abortability
- Atomicity is about **faults**, not other transactions
- If anything fails partway, every change is discarded. **You can retry**

### C is the odd one out
- Your invariants — *accounts sum to zero* — are a property of **your data**
- The database cannot know them. **Only your application defines C**
- It is in the acronym because ACID is easier to say than AID

### I and D
- **Isolation** — concurrent transactions do not tread on each other
- **Durability** — a commit survives a crash. Never absolute`,
  narration:
    "ACID stands for atomicity, consistency, isolation and durability, and it was coined in 1983 to give these guarantees a name. It has since become a marketing term, which means two databases that both claim to be ACID can differ enormously in what they actually provide. So let us take the letters apart. Atomicity does not mean what it means in concurrency, where an atomic operation is one other threads cannot see halfway through. In ACID, atomicity is about faults: if anything goes wrong partway — a crash, a constraint violation, a network failure — everything the transaction did is discarded. A better word would have been abortability, because that is the property, and its practical value is that a failed transaction is safe to retry. Consistency is the odd one out and does not really belong. It means your data satisfies your invariants — accounts sum to zero, every order has a customer. But the database has no idea what your invariants are. It can enforce a foreign key or a uniqueness constraint, and beyond that, only your application knows that debits must equal credits. So consistency is a property of your application that transactions help you preserve. Joe Hellerstein has noted the C was tossed in to make the acronym pronounceable, and AID is a worse word. Isolation means concurrently executing transactions do not step on each other. That is the genuinely deep one, it is the whole middle of this course, and as we will see it comes in levels rather than as a yes or no. Durability means once a transaction commits, its data survives a crash. On a single machine that means written to disk, usually via the write-ahead log from course two. In a replicated system it means written to some number of machines. And it is worth being honest that no technique gives absolute durability: disks fail, whole datacentres burn, and a bug in fsync handling has silently lost committed data in real production systems. Durability is a probability you increase, not a state you reach.",
}
