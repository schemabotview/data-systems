import type { Section } from '../types'

export const twoPhaseCommit: Section = {
  id: 'two-phase-commit',
  title: 'Two-phase commit',
  scene: 'two-phase-commit',
  focus: 'point',
  slide: `## Two-phase commit

A **coordinator** asks everyone whether they can commit, then tells them the answer. Not 2PL from course 06 — different mechanism, unfortunate initials.

### Phase 1 — prepare
- *"Can you commit this?"*
- A node answering **yes** is making a **binding promise**: everything is on its own disk, and it **will** commit if asked, whatever happens next
- It has **given up the right to abort**. That is the real content of the phase

### The commit point
- The coordinator writes its decision **to its own disk**
- **That write is the commit point.** Before it anyone may abort; after it nobody may

### Phase 2 — tell everyone
- Send the decision; if a node is unreachable, **retry forever**
- There is no abort path here`,
  narration:
    "The classic algorithm is two-phase commit, and before anything else: this is not two-phase locking from course six. Completely different mechanism, same initials, endless confusion. There is a coordinator — sometimes a separate service, more often just a library inside the application that started the transaction. And there are two phases, hence the name. Phase one is prepare. The coordinator sends every participant a message asking: can you commit this transaction? And a participant answering yes is doing something much stronger than expressing an opinion. It is making a binding promise. It has written everything the transaction needs to its own log, checked its constraints, verified there are no conflicts, and it is now guaranteeing that it will be able to commit if asked — even if it crashes and restarts in between, because the promise is durable on disk. And crucially, by saying yes it has surrendered its own right to abort. That is the actual content of phase one, and it is why the protocol works at all. Then the coordinator collects the answers. If everyone said yes, it makes the decision to commit; if anyone said no, it decides to abort. And then it writes that decision to its own log on its own disk. That write — and this is the one detail to carry away from the whole section — is the commit point. Before it, the transaction can still be aborted by anyone. After it, the transaction is committed, irrevocably, and the only thing left is telling people. Phase two is exactly that: send the decision to every participant, and each one applies it. If a participant is unreachable, the coordinator retries, and it keeps retrying forever, because there is no alternative. The decision is already made and recorded; the coordinator cannot change its mind because one node is slow. If the coordinator itself crashes, it reads its log on restart and resumes sending. Which is a reasonable protocol. And the next section is where it breaks.",
}
