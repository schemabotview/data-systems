import type { Scene } from '@graphlearning/flow'

// §7 — two rules and a tie-break, which is the whole algorithm, so it is worth showing as code. The
// `max` line is the one that matters: receiving a message drags your counter forward, which is
// exactly how "I have seen your causal history" gets encoded in a single integer. The last card is
// the limitation that makes §8 necessary.
export const lamportTimestamps: Scene = {
  id: 'lamport-timestamps',
  title: 'A counter that respects causality',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'lamport.py',
      label: `counter = 0

def local_event():
    global counter
    counter += 1

def on_receive(msg):
    global counter
    counter = max(counter, msg.ts) + 1

# order by (counter, node_id) — the id breaks ties`,
    },
    { id: 'gives', label: 'A total order', sub: 'and it respects causality', pattern: 'service', icon: 'sortarrows' },
    { id: 'cannot', label: 'Known only after', sub: 'too late to reject a claim', pattern: 'warn', icon: 'ban' },
  ],
  edges: [
    { source: 'code', target: 'gives' },
    { source: 'gives', target: 'cannot' },
  ],
}
