import type { Section } from '../types'

export const byKeyRange: Section = {
  id: 'by-key-range',
  title: 'Partitioning by key range',
  scene: 'by-key-range',
  focus: 'bad',
  slide: `## Partitioning by key range

Assign each partition a **contiguous range of keys**, like volumes of an encyclopaedia.

### The boundaries are not evenly spaced
- \`S\` holds far more surnames than \`X\`. Evenly-cut ranges give wildly uneven partitions
- So boundaries are chosen — or adjusted automatically — to **balance volume, not alphabet**

### What it buys
- Keys stay **in order within a partition**, so range scans are one machine's work
- *"All readings from this sensor, last Tuesday"* is a sequential read

### The failure, which is the same property
- Make the key a **timestamp** and every write today lands on **one partition**
- That partition is saturated while the rest idle — and tomorrow it moves to the next one
- Fix: **prefix the key** with something that varies — sensor id, then time`,
  narration:
    "The first way to decide which partition a key belongs to is to give each partition a contiguous range of keys — like the volumes of a printed encyclopaedia, where volume one is A to B and volume twelve is S to T. The first thing to say is that those boundaries are not evenly spaced, and cannot be. If you cut the alphabet into twenty-six equal partitions, the one holding S gets vastly more surnames than the one holding X. So the boundaries are chosen — either by an administrator, or automatically by the database as it observes the data — to balance the actual volume rather than the alphabet. Now, what this buys you is ordering. Within a partition, keys are stored in sorted order, which means a range scan is one machine's sequential read. If your key is a sensor reading timestamped by the minute, then all the readings from last Tuesday are physically adjacent, and fetching them is one efficient scan rather than a query to every machine in the cluster. That is a real advantage and it is why range partitioning exists. And now the failure, which is not a separate flaw — it is the exact same property, seen from the other side. Suppose your key is a timestamp. Everything written today falls in one narrow range, so every single write goes to one partition. That partition is saturated while the other nine sit idle, and you have bought yourself a cluster's worth of hardware for one machine's worth of write throughput. Tomorrow the hot spot moves to the next partition, which does not help at all. The standard fix is to prefix the key with something that varies — put the sensor ID first and the timestamp second. Now the thousand sensors spread across the partitions, and within each one you keep the time ordering, so range scans per sensor still work. You have to know to do that in advance, which is the recurring theme of this course.",
}
