import type { Section } from '../types'

export const writeConflicts: Section = {
  id: 'write-conflicts',
  title: 'Handling write conflicts',
  scene: 'write-conflicts',
  focus: 'ways',
  slide: `## Handling write conflicts

Ada renames a page to *"Q3 plan"*; Ben renames it to *"Q3 roadmap"*; different regions, same second. **Both succeed.**

### Why not detect it synchronously
- Waiting for every leader to agree **is** single-leader replication with extra latency
- So the conflict is found on sync, and the goal becomes **convergence**: every replica ends up the same, whatever that costs

### The options, ordered by what they destroy
- **Last write wins.** One line, silent data loss — and "last" means *by clock*, which §07 shows you cannot trust
- **Highest replica id wins.** The same loss, less randomly
- **Keep both, ask the user.** Honest; needs UI nobody builds
- **CRDTs.** Types *designed* to merge: sets, counters, text`,
  narration:
    "So: Ada renames a page to Q3 plan in the European region. At almost the same moment Ben renames the same page to Q3 roadmap in Asia. Both writes are accepted locally, both users see success, and now the replicas disagree. You might ask why the system does not detect the conflict at write time and block one of them. It could — but waiting for all leaders to agree before accepting a write is exactly single-leader replication with extra latency, and it throws away the entire reason you went multi-leader. So the conflict is discovered later, during synchronisation, and the goal shifts. You are no longer trying to prevent conflicts. You are trying to guarantee convergence: that every replica ends up in the same final state, whatever that state turns out to be. Here are the options, ordered by how much they destroy. Last write wins: attach a timestamp to each write and keep the highest. It is one line of code, it converges, it is the most widely deployed option, and it silently throws away one user's work. Worse, last is defined by a clock, and course seven is largely about why you cannot trust clocks across machines to order events — so last write wins does not even reliably pick the genuinely later write. Second: give each replica an ID and let the highest one win. Same data loss, but deterministic rather than clock-dependent. Third: keep both versions and ask the user to resolve it. This is the honest option and it is what version control does. It needs interface work that most teams do not want to build, and for many kinds of data there is no sensible moment to ask. Fourth: merge automatically — concatenate the two titles, union the two sets. Only works if the data type has a meaningful merge. And fifth, the interesting one: conflict-free replicated data types. CRDTs are data structures designed from the start so that concurrent updates merge deterministically with no coordination at all — sets, counters, and ordered sequences of characters, which is how modern collaborative editors work. They are genuinely elegant and they only apply to types someone has designed a merge for. Which is the real conclusion: there is no strategy that is both fully automatic and lossless for arbitrary data. You are choosing which compromise you can live with.",
}
