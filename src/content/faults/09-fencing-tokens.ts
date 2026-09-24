import type { Section } from '../types'

export const fencingTokens: Section = {
  id: 'fencing-tokens',
  title: 'Fencing tokens',
  scene: 'fencing-tokens',
  focus: 'reject',
  slide: `## Fencing tokens

The one genuine fix in this course. **Stop trying to make the confused node behave — let the resource refuse it.**

### The mechanism
- Every lock grant also returns a **number that only increases**
- A client must **send that token with every write**
- The storage layer remembers the **highest token seen**, and rejects anything lower

### Replay §8 with it
- The paused client holds token **33** and resumes, still certain
- The new leader holds **34** and has already written
- Token 33 is **rejected**. Still wrong, and now harmless

### The shape of the idea
- **Never trust a node about its own status.** Check at the resource
- The resource must **participate** — one that ignores the token gives you nothing`,
  narration:
    "Here is the fix, and it is one of the genuinely satisfying ideas in distributed systems, because it stops fighting the problem and sidesteps it. You cannot make the paused node realise it has stopped being the leader. So stop trying. Instead, make the resource — the storage system it wants to write to — capable of refusing it. It works like this. Every time the lock service grants the lock, it also returns a number, and that number only ever increases. Client one gets token thirty-three. When the lock is granted again, the next client gets thirty-four. Every write to the protected resource must carry the token that authorised it. And the resource keeps track of the highest token it has ever seen, rejecting any write carrying a lower one. Now replay the disaster from the last section. The paused client holds token thirty-three. While it was frozen, the lease expired and a new leader took the lock and got token thirty-four, and wrote something. Then the old client wakes up, still absolutely convinced it is the leader, and sends its write with token thirty-three. The storage system has already seen thirty-four, so it rejects the write. The client is still confused, still wrong, still convinced — and now completely harmless. Notice the shape of the idea, because it generalises well beyond locking. Do not trust a node's own assertion about its status; verify at the point where it matters. The check moves from the party that might be wrong to the party that can actually enforce it. You will meet this in real systems: ZooKeeper's transaction ID, the zxid, serves as a fencing token, and Kafka's leader epoch number does the same job for partition leadership. One practical caveat. This only works if the resource participates. If your storage system does not know about tokens, and just accepts whatever write arrives, you have no protection — and a distressing number of distributed lock implementations stop at handing out the lock and quietly assume everyone will behave. Checking that the resource actually enforces the token is the difference between having this protection and thinking you do.",
}
