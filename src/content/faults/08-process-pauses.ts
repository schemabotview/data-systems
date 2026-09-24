import type { Section } from '../types'

export const processPauses: Section = {
  id: 'process-pauses',
  title: 'Process pauses',
  scene: 'process-pauses',
  focus: 'write',
  slide: `## Process pauses

Nothing to do with the network. **A healthy node can stop executing for tens of seconds** and not notice.

### What stops the world
- A **garbage collection** pause — minutes, on a large heap
- **VM migration**, suspended on one host and resumed on another
- **Paging**, where one memory access hits disk and thrashes

### The failure
- A node takes a lease: *"I am the leader until 10:00:10"*
- It pauses at 10:00:05 and resumes at 10:00:25
- **It has no idea any time passed** — and writes as the leader

### Why checking is not the fix
- The lease can expire **between the check and the write**`,
  narration:
    "This failure has nothing to do with the network, and it catches people out because the node is completely healthy. A running process can be stopped, entirely, for a long time. The most famous cause is garbage collection: a stop-the-world GC pause freezes every thread in the process, and on a large heap that can be minutes, not milliseconds. But there are plenty of others. In a virtualised environment the whole VM can be suspended and migrated to another host, which takes as long as it takes. Operating system paging: if the machine is short of memory, a single memory access can trigger a disk read, and under thrashing very little progress gets made at all. A laptop closing its lid. Someone sending SIGSTOP from a shell. In every case the process stops executing between one instruction and the next, and resumes later without any indication that time passed. Now the failure, and this is the important one. A node takes out a lease on being the leader — it holds the lease until ten o'clock and ten seconds, after which it must renew or stop. At five past ten it pauses. At twenty-five past ten it resumes. From its own perspective, nothing happened; it continues from exactly where it stopped, still holding what it believes is a valid lease, and proceeds to write to shared storage as the leader. But it stopped being the leader fifteen seconds ago, and by now another node has been elected and is also writing. Two leaders, both convinced, both writing. Now, the instinct is to say: just check the clock before writing. And that does not work, for a reason worth being precise about. Between the check and the write there are more instructions, and the pause can happen there. You check at ten point zero, you are satisfied, you pause for twenty seconds, you resume and perform the write. There is no sequence of checks that closes this, because there is no way to make the check and the write a single indivisible act across a network. Which means the node cannot be made trustworthy about its own status. The fix has to be somewhere else entirely, and that is the next section.",
}
