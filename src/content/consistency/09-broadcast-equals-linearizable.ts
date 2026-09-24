import type { Section } from '../types'

export const broadcastEqualsLinearizable: Section = {
  id: 'broadcast-equals-linearizable',
  title: 'The two are equivalent',
  scene: 'broadcast-equals-linearizable',
  slide: `## The two are equivalent

Each can be built from the other. **So linearizable storage, total order broadcast and consensus are the same problem.**

### Linearizable storage from a log
1. **Append** your claim: *"I am taking this username"*
2. **Read the log back** until you see your own message
3. If no earlier claim exists, you won — and everyone reads the same order

You did **not** check-then-write. You **appended, then read back** — the general recipe for a distributed uniqueness constraint.

### A log from linearizable storage
- Take a linearizable **increment-and-get** counter
- Number every message, deliver strictly in number order
- A gap means one is missing — **wait**, do not skip

All three are equally expensive, and one gives you the others.`,
  narration:
    "Here is the deep result of this course, and it is genuinely elegant: total order broadcast and linearizable storage can each be built from the other, which means they are equivalent problems, which means they are both equivalent to consensus. Take the first direction. Suppose you have a log with total order broadcast, and you want a linearizable uniqueness constraint — a username that only one person can hold. Here is the recipe. Append a message to the log saying: I am claiming this username. Then read the log back, and wait until you see your own message come through. When it arrives, look at all the messages before it. If nobody else claimed that username earlier in the log, you won, and you can report success to the user. If someone else's claim appears before yours, you lost, and you tell the user to pick another. And because every node reads the log in the same order, every node reaches the same conclusion about who won. Nobody has to coordinate further. Now look carefully at the shape of that, because it is the reusable lesson. You did not check whether the username was free and then take it — that check-then-act pattern is precisely what does not work in a distributed system, and it is the phantom problem from course six all over again. You appended your intention first, and then read back to discover the outcome. Append-then-read-back is the general recipe for a distributed uniqueness constraint, and it is worth internalising because it comes up constantly. The other direction is easier. Suppose you have linearizable storage — specifically a register supporting increment-and-get. To send a message, increment the counter and attach the number you get back to your message. Every recipient delivers messages strictly in numerical order. If you have message four and message six but not five, you wait rather than skipping ahead, because five is out there and must come first. Since the counter is linearizable, the numbers are globally unique and correctly ordered, and you have total order broadcast. So the two are equivalent, and both are equivalent to consensus. Which has a practical consequence: they are all equally expensive, and a system that gives you any one of them can give you the others.",
}
