import type { Section } from '../types'

export const whyEncodingMatters: Section = {
  id: 'why-encoding-matters',
  title: 'Why encoding is a hard problem',
  scene: 'encoding-round-trip',
  focus: 'skew',
  slide: `## Why encoding is a hard problem

An object in memory is a web of **pointers**, and a pointer means nothing outside the process that made it. Crossing any boundary means flattening to bytes and rebuilding.

### Two words for it
- **Encoding** — object → bytes. Also *serialization*, *marshalling*
- **Decoding** — bytes → object. Also *parsing*, *unmarshalling*

### What makes it hard isn't the flattening
- The two ends are **running different code**, essentially always
- A rolling deploy means old and new run **side by side**
- A database row outlives every version of the code that touches it
- So the format has to work when writer and reader **disagree about the schema**`,
  narration:
    "Any time data leaves a process, it changes form. Inside your program an object is a web of pointers — this field points at that string, that list points at those elements — and the whole arrangement is optimised for the CPU to chase quickly. But a pointer is a memory address, and a memory address means absolutely nothing to any other process, let alone another machine. So to send that object anywhere, or to store it anywhere, it has to be flattened into a self-contained sequence of bytes, and rebuilt on the other side. Going one way is called encoding, or serialization, or marshalling — three words for the same thing. Coming back is decoding, or parsing, or unmarshalling. And here is the part that makes this an actual engineering problem rather than a library call. The code doing the encoding and the code doing the decoding are almost never the same version. When you deploy a new release across a fleet, you do it gradually — a rolling upgrade — so for a period of minutes or hours, some nodes are running the new version and some are running the old, and they are talking to each other in both directions. If it is a mobile app, some users will not upgrade for months. And if the bytes went into a database rather than over a wire, they might be read back in five years by code nobody has written yet. So the real question of this course is not how to turn an object into bytes. It is: how do you choose a format so that the writer and the reader can disagree about the schema and nothing breaks?",
}
