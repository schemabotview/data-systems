import type { Section } from '../types'

export const backwardForward: Section = {
  id: 'backward-forward',
  title: 'Backward and forward compatibility',
  scene: 'backward-forward',
  focus: 'hard',
  slide: `## Backward and forward compatibility

Two words that get swapped constantly. Name them **by who is doing the reading**.

### Backward compatible — new code reads old data
- You need this **always**. Old data is still in the database
- It is the easy one: you wrote the new code, you know the old format

### Forward compatible — old code reads new data
- Sounds exotic. It happens on **every single deploy**
- A rolling upgrade means v1 and v2 nodes run **side by side**, both directions
- A mobile client may stay on v1 for **months**

### Why forward is the hard one
- You are asking code to tolerate something **that did not exist when it was written**
- Only one behaviour makes it possible: **unknown fields are skipped, not rejected**
- Which is why tags and defaults exist at all`,
  narration:
    "Two terms, constantly mixed up, and the trick is to name them by who is doing the reading. Backward compatible means new code can read data written by old code. You need this always, without exception, because your database is full of rows written by every version of your application that has ever run, and they are not going to rewrite themselves. It is also the easier of the two, because when you write the new code you already know what the old format looked like. Forward compatible means old code can read data written by new code. That one sounds exotic, and it is not — it happens on every deploy you have ever done. Roll out a new version across ten nodes, and for the duration of the rollout you have v1 and v2 running at the same time, sending each other requests in both directions. A v1 node is going to receive a payload written by a v2 node that was upgraded ninety seconds ago. If v1 rejects it, your deploy is an outage. And it gets much worse with clients you do not control: a mobile app may sit on version one for months because users do not update, so your servers are writing new-format data that old app installs have to survive. Forward compatibility is genuinely harder, because you are asking code to cope with something that did not exist when it was written. There is exactly one behaviour that makes it possible, and we already saw it: when a decoder meets a field it does not recognise, it must skip it rather than fail. Everything in the last two sections — the tag numbers, the type bits, the defaults — exists to make that skip safe.",
}
