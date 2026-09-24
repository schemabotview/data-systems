import type { Section } from '../types'

export const sortMergeJoin: Section = {
  id: 'sort-merge-join',
  title: 'The join is the shuffle',
  scene: 'sort-merge-join',
  focus: 'merge',
  slide: `## The join is the shuffle

A billion click events keyed by \`user_id\`, and a user table. You want the user's age on every event.

### Why the obvious way fails
- For each event, query the user database
- **A billion random reads**, over a network, against a live production database
- It would take days, and take your database down with it

### What a batch system does instead
- Extract a **copy** of the user table into the job's input
- **Partition both sides by the same key**, so one reducer sees every event *and* the user record for that \`user_id\`
- Both arrive **sorted**, so the join is a sequential merge

### The idea to carry away
- A join is **not a lookup** — it is a shuffle`,
  narration:
    "Here is a very ordinary requirement. You have a billion click events, each with a user ID. You have a user table with ages. You want to know the age distribution of people clicking on things, so you need the user record attached to each event. The obvious implementation is to loop over the events and, for each one, query the user database by ID. And it is a disaster. That is a billion random reads, each crossing the network, each hitting a database that is also serving live production traffic. At a millisecond apiece it is eleven days, and long before that the extra load will have taken your database down. And there is a second problem people miss: the user table is changing while you run, so records read at the start reflect a different moment from records read at the end, and your job is not deterministic — rerun it and get a different answer, which destroys the safety property from the last two sections. So batch systems do something different. First, take a copy of the user table — a dump from the database, or an extract from the CDC stream we will meet shortly — and put it in the job's input alongside the events. Now both datasets are in the same place, frozen at the same moment. Then partition both by the same key. All the click events for user twelve go to one reducer, and the user record for user twelve goes to that same reducer, because the same hash function decides both. That reducer now has everything it needs locally, with no network calls at all. And because the shuffle sorts by key, both streams arrive in key order, so the reducer can walk them together the way mergesort merges two sorted lists — constant memory, sequential reads, and it works for datasets far larger than RAM. That is the sort-merge join. The idea worth carrying away, because it explains the performance of every batch system you will ever use, is that in a batch context a join is not a lookup. A join is a shuffle. Which is why a job that appears to just do a join spends most of its time moving the whole dataset across the network before any joining happens.",
}
