import type { Section } from '../types'

export const addingAFollower: Section = {
  id: 'adding-a-follower',
  title: 'Adding a follower',
  scene: 'adding-a-follower',
  focus: 'ask',
  slide: `## Adding a follower

You need a new replica — for capacity, or to replace a dead one — and **you cannot stop the database to make it**.

### The procedure
1. Take a **consistent snapshot** of the leader. No lock: MVCC gives a point-in-time view while writes continue
2. **Copy it** across. Minutes, hours — nobody is waiting
3. Ask the leader for **every change since the snapshot's position**
4. Apply the backlog, catch up, become an ordinary follower

### The load-bearing detail
- The snapshot is stamped with its **position in the log** — a log sequence number, a binlog coordinate
- Without it you either **miss writes** or **replay** them
- Which is why applying a change must be **idempotent** anyway`,
  narration:
    "At some point you need a new replica — to add read capacity, or to replace one that died — and you obviously cannot take the database offline to make it. Copying the files while writes are happening gives you a torn, inconsistent mess. So here is the procedure, and it is the same shape in every system that does this. Step one: take a consistent snapshot of the leader, at a moment in time. In most modern databases this needs no lock at all, because the multi-version concurrency control we will meet in course six already lets a reader see a frozen point-in-time view while writes continue around it. Step two: copy that snapshot to the new node. This can take minutes or hours for a large dataset, and that is fine, because nothing is blocked while it happens. Step three — and this is the load-bearing part — the new node connects to the leader and asks for every change since the snapshot was taken. Which it can only do because the snapshot was stamped with its exact position in the replication log. Postgres calls that a log sequence number; MySQL calls it a binlog coordinate. Without that stamp there is no safe place to start: begin too late and you have permanently missed some writes, begin too early and you replay changes the snapshot already contains. Step four: the new node applies that backlog, which may be a large amount of accumulated change, catches up to the present, and then just carries on as an ordinary follower. Notice what step three implies. Replaying a change that the snapshot already reflected has to be harmless, because the boundary is never going to be perfectly precise. That property is idempotence, it showed up in the write-ahead log in course two, and it is going to show up in every single course from here on.",
}
