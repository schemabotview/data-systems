import type { Section } from '../types'

export const readYourWrites: Section = {
  id: 'read-your-writes',
  title: 'Read-your-writes',
  scene: 'read-your-writes',
  focus: 'refresh',
  slide: `## Read-your-writes

Followers lag — usually milliseconds, occasionally seconds. Users notice in a very specific way.

### The bug they report
- A user posts a comment; the write lands on the **leader**
- The page reloads from a **follower a second behind**
- Their own comment is missing. To them, **the site lost it**
- Everything here is working exactly as designed

### The guarantee
- **Read-your-writes**: a user always sees *their own* writes
- It says nothing about other people's, which is usually fine

### Three ways to get it
- Read what **the user could have modified** from the leader
- Track their **last write**; use a replica past it
- Keep the write client-side and serve it locally`,
  narration:
    "With asynchronous replication, followers are behind. Usually by milliseconds, which nobody perceives. But under load, or during a big batch job, or across a congested link, the lag can stretch to seconds or minutes, and at that point users start noticing — in a very particular way. Here is the scenario. A user writes a comment. That write goes to the leader, is committed, and is acknowledged. The page reloads, and the read is served by a follower that happens to be a second behind. The comment is not there. From the user's point of view, they typed something, hit submit, watched it succeed, and the site threw it away. That is a support ticket, and possibly a second identical comment as they try again. And notice: nothing is broken. The leader has the data, the follower is doing exactly what it is designed to do, and the lag will resolve itself in a second. The guarantee you want here has a name: read-your-writes consistency, sometimes read-after-write. It promises that any user, reading their own data, always sees their own writes. It is worth being precise about what it does not promise — it says nothing about other users' writes, so Ada may still not see Ben's comment for another second. That is usually fine. Users are far more forgiving of other people's data being slightly stale than of their own disappearing. Three ways to implement it. The simplest: for anything the user could have modified, read from the leader. Their own profile, their own posts. You need a rule to know what that is, and for a social profile that is easy — read the user's own from the leader and everyone else's from a replica. Second: track the timestamp of the user's most recent write, and when they read, only use a replica that has caught up past it, waiting or redirecting to the leader if none has. Third: keep the write client-side for a minute and merge it into whatever you render. Each of these gets harder if the user is on two devices, or if your replicas are in several datacentres — which is a good warning that this guarantee is easier to state than to ship.",
}
