import type { Section } from '../types'

export const timeOfDayClocks: Section = {
  id: 'time-of-day-clocks',
  title: 'The wall clock can go backwards',
  scene: 'time-of-day-clocks',
  focus: 'useless',
  slide: `## The wall clock can go backwards

Quartz is not accurate, so clocks are synchronised to an external authority — which means **corrected**.

### Three ways the number moves oddly
- **NTP steps it.** Far enough off, it jumps — possibly **backwards**
- **Leap seconds.** A minute with 61 seconds. This crashed a lot of the internet in 2012
- **Drift.** Unsynchronised quartz wanders **seconds a day**, with temperature

### And NTP itself is not reliable
- It arrives over the unreliable network of §2
- A blocked NTP port, or a VM resumed from a snapshot, gives a clock that is wildly wrong and **reports no error**

### The conclusion
- Fine for *"roughly when did this happen"*
- **Not** fine for *"which of these two events came first"*`,
  narration:
    "Now clocks, which are a much bigger problem than most people expect. Every computer has a quartz crystal oscillator, and it is not accurate. It drifts, and it drifts differently depending on temperature. So machines synchronise their clocks to an external authority using the Network Time Protocol, which sets the local clock from a server that is ultimately traceable to an atomic clock. That synchronisation is what makes the clock roughly right, and it is also what makes it unreliable in a very specific way. First: NTP corrects the clock, and if the local clock is far enough adrift, it does not gently ease it into place — it steps it, jumping the value forwards or, critically, backwards. So code that reads the time, does some work, reads the time again, and subtracts can get a negative duration. That is not a hypothetical; it is a well-known source of bugs. Second: leap seconds. Occasionally a minute has sixty-one seconds in it, to keep clock time aligned with the Earth's rotation, which is gradually slowing. Many systems were never written to expect a sixty-first second, and the 2012 leap second caused simultaneous crashes across a lot of the internet — Reddit, Mozilla, Qantas. Some operators now smear the extra second across a whole day rather than let the kernel see it. Third: drift. Left unsynchronised, quartz clocks wander by seconds per day, and the rate depends on temperature, so the machines in a hot rack drift differently from the ones near the air conditioning. And all of this assumes NTP is working. NTP is delivered over the same unreliable network from section two, so it is subject to the same congestion and packet loss. A misconfigured NTP server, a firewall quietly dropping NTP, or a VM resuming from a snapshot with an old clock all produce machines whose time is wildly wrong — and none of them report an error. The machine happily tells you it is ten in the morning when it is half past four. So a wall-clock timestamp is perfectly good for recording roughly when something happened, for a human to read in a log. It is not good for deciding which of two events happened first. And the next section explains what to use instead.",
}
