import type { Section } from '../types'

export const notLinearizable: Section = {
  id: 'not-linearizable',
  title: 'Histories that fail the test',
  scene: 'not-linearizable',
  focus: 'cases',
  slide: `## Histories that fail the test

*"Behaves like one copy"* is not directly checkable, so you test it against **histories** — who read what, and when.

### The register starts at 0, and a write sets it to 1
- **B reads 1, then later C reads 0** — illegal. The value went backwards
- **B reads 0 after the write returned** — illegal. The write completed
- **B reads 0 while the write is in flight** — *legal*. Not settled yet
- **B reads 1 mid-flight, then C reads 0** — illegal. 1 was observed

### The rule the four share
- A read that **overlaps** a write may return either value
- But once **anyone** observes the new one, **there is no going back**

Checking it means searching for a valid serial order — **NP-hard**, which is why Jepsen exists and why it finds so much.`,
  narration:
    "So how do you actually determine whether a system is linearizable? Looks like one copy is not a property you can check by inspection. What you do instead is record a history: every operation, who issued it, when it was sent, when it returned, and what it said. Then you ask whether there exists some single serial ordering of those operations that is consistent with what everybody observed. Take a register that starts at zero, and a write that sets it to one. Case one. Client B reads and gets one. Later — strictly after B's read has returned — client C reads and gets zero. That is illegal. B already observed the new value, so the flip has happened, and C reading zero means the value moved backwards in time. There is no single-copy story that explains it. Case two. The write has completed and returned success. After that, B reads and gets zero. Illegal, for the same underlying reason: the operation finished, so its effect is visible, and returning the old value contradicts that. Case three, and this is the one people get wrong. B reads while the write is still in flight — the write has been sent but has not yet returned — and gets zero. That is perfectly legal. The write has not taken effect yet as far as anyone can tell, and linearizability allows an operation to take effect at any instant between its start and its finish. So a read that overlaps a write may legitimately return either value. Case four sharpens that. B reads mid-flight and gets one. Then C reads and gets zero. Now it is illegal, even though both reads overlap the write, because the moment B observed the new value the flip was decided, and every later read must agree. Those four cases share one rule, and it is the rule worth remembering. An overlapping read may return either value; but as soon as anybody observes the new value, it is settled for everyone, and there is no going back. Checking this on a real system means recording the history and searching for a valid serial order, which is NP-hard in general — the search space is enormous. That is exactly what Kyle Kingsbury's Jepsen tooling does, and it is worth knowing that it has found violations in a very large fraction of the databases it has been pointed at, including many that advertised strong consistency.",
}
