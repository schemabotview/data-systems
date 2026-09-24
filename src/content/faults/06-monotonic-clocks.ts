import type { Section } from '../types'

export const monotonicClocks: Section = {
  id: 'monotonic-clocks',
  title: 'Monotonic clocks',
  scene: 'monotonic-clocks',
  focus: 'table',
  slide: `## Monotonic clocks

Two clocks, two jobs. **A monotonic clock only moves forwards**, because it measures elapsed time rather than calendar time.

### What it is
- A counter since some arbitrary point, usually boot
- The **absolute value is meaningless.** Only differences mean anything
- \`System.nanoTime()\`, \`clock_gettime(CLOCK_MONOTONIC)\`, \`time.monotonic()\`

### What it is for
- **Timeouts, latency, backoff, rate limits** — anything that is a *duration*
- NTP can adjust its rate; it can never make it jump backwards

### The rule, and the trap
- **Duration → monotonic. Date → wall clock**
- Comparing one machine's monotonic reading with another's is not inaccurate, it is **meaningless**`,
  narration:
    "So computers actually have two clocks, and confusing them is the source of a whole class of bugs. The first is the time-of-day clock from the last section: seconds since 1970, synchronised to the outside world, and therefore subject to being corrected, stepped, and occasionally moved backwards. The second is the monotonic clock. It counts elapsed time since some arbitrary point, usually when the machine booted, and it only ever moves forwards. Its absolute value is meaningless — a reading of forty billion nanoseconds tells you nothing on its own. Only differences between two readings mean anything, and a difference is exactly what you usually want. In Java that is System dot nanoTime; in Linux, clock_gettime with CLOCK_MONOTONIC; in Python, time dot monotonic. Use it for anything that is a duration. How long did this request take. Has this timeout expired. How long until the next retry. Am I over the rate limit. NTP may adjust the rate at which a monotonic clock advances — speeding it up or slowing it down slightly if it notices the crystal is off — but it will never make it jump, and it will never make it go backwards. So the duration you compute is always non-negative and always sensible. The rule is short enough to remember: if you are measuring a duration, use the monotonic clock. If you are recording a moment for a human, or for comparison with another machine, use the wall clock and accept it is approximate. And now the trap, which is the important part for this course. Because a monotonic clock starts from an arbitrary point on each machine, comparing one machine's monotonic reading with another's is not merely inaccurate — it is meaningless. There is no relationship between the two numbers at all. So neither clock lets you order events across machines: the wall clock is comparable but wrong, and the monotonic clock is right but not comparable. The next section is what that costs you.",
}
