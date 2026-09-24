import type { Section } from '../types'

export const whyReplicate: Section = {
  id: 'why-replicate',
  title: 'Why replicate at all',
  scene: 'why-replicate',
  focus: 'catch',
  slide: `## Why replicate at all

Keeping the same data on several machines. Three reasons — and they are **not the same requirement**.

### The three
- **Latency** — a copy geographically near the user
- **Availability** — a machine dies and you keep serving
- **Read capacity** — many machines answering many reads

### They pull in different directions
- Latency wants copies **far apart**; availability wants them **failure-independent**; throughput just wants **more**
- Which one you need decides which design in this course fits

### The whole difficulty, in one line
- If data never changed, replication would be a file copy
- It changes. So the copies can **disagree** — and every remaining section is about that`,
  narration:
    "Replication means keeping a copy of the same data on more than one machine. And before any of the mechanics, it is worth being clear that people do this for three quite different reasons, because the reason decides the design. The first is latency. If your users are in Sydney and your database is in Virginia, every query pays a couple of hundred milliseconds of round trip that no amount of optimisation will remove. Put a copy in Sydney and that disappears. The second is availability. If one machine holds your only copy, then that machine's failure is your outage. With a second copy you can keep serving. The third is read throughput. One machine has a finite number of disks and a finite amount of memory; ten copies can answer ten times the reads. Now notice those three do not want the same thing. Latency wants copies spread as far apart as possible. Availability wants copies that fail independently — which is related but not the same, because two machines in one rack share a power supply. And throughput does not care where they are, it just wants more of them. Which of the three you actually need is what should choose the design. And then here is the sentence that makes this a hard subject rather than an easy one. If your data never changed, replication would be a file copy and this course would be four minutes long. Data changes. And the moment there is more than one copy of something that changes, the copies can disagree with each other. Every remaining section is about managing that disagreement.",
}
