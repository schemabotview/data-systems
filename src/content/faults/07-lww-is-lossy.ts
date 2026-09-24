import type { Section } from '../types'

export const lwwIsLossy: Section = {
  id: 'lww-is-lossy',
  title: 'Last write wins, by the wrong clock',
  scene: 'lww-is-lossy',
  focus: 'drop',
  slide: `## Last write wins, by the wrong clock

Course 04 resolved conflicts with **last write wins** — highest timestamp keeps its value. §5 and §6 showed why that fails.

### The sequence
- Node A's clock is **5 ms ahead** — well inside a healthy NTP tolerance
- A writes, stamping it \`…00.105\`
- B writes **2 ms later**, genuinely after, stamping it \`…00.102\`
- LWW compares the numbers and **discards B's write**

### Why nothing catches it
- No error. Both nodes behaved correctly. The value is simply wrong
- Unreproducible — it depends on the skew at that instant

### The honest response
- **Version numbers, not timestamps** — a logical counter cannot skew`,
  narration:
    "Here is why the last two sections matter. In course four we resolved multi-leader write conflicts with last write wins: attach a timestamp to each write, and the highest timestamp keeps its value. That sounds reasonable, and now we can see the problem. Watch the sequence. Node A's clock is five milliseconds ahead of node B's. Five milliseconds is nothing — it is well inside what a perfectly healthy NTP setup produces, and no monitoring anywhere would flag it. Node A performs a write and stamps it with its own clock: ten o'clock, zero point one zero five seconds. Two milliseconds later in actual physical time, node B performs a write to the same key, and stamps it with its own clock: zero point one zero two. B's write really did happen after A's. But its number is smaller. So last write wins compares the two timestamps, concludes A's write is the later one, and silently discards B's. The most recent write to that key has been thrown away, and the database now holds the older value while believing it holds the newer one. Look at what does not happen. There is no error. No exception, no warning, no log line. Both nodes behaved exactly as designed, and both clocks were within tolerance. The data is simply wrong. And because it depends on the exact skew at one instant, it is completely unreproducible — you cannot write a test for it, and if you go looking afterwards the clocks will have resynchronised. So what should you do instead? The real answer is not to order events by physical time at all. Use version numbers — a logical counter that increments per write, which cannot skew because it is not measuring anything physical. That is what course eight is about, and it is why Lamport timestamps exist. The pragmatic answer is to use last write wins knowingly, for data where losing an occasional write genuinely does not matter — a cache entry, a presence indicator, a view count. Cassandra offers LWW as its conflict resolution, and its own documentation warns about precisely this scenario. Use it, but use it with your eyes open.",
}
