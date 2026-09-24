import type { Scene } from '@graphlearning/flow'

// §8 — the primitive that fixes §7's limitation: order is decided AS messages are delivered, not
// reconstructed later. The two guarantees are the whole definition, and they are what makes a log
// the natural implementation — a log is exactly a sequence everyone agrees on, which is why Kafka
// and a replicated state machine are the same shape.
export const totalOrderBroadcast: Scene = {
  id: 'total-order-broadcast',
  title: 'One sequence, agreed as it happens',
  flow: 'TB',
  nodes: [
    {
      id: 'senders',
      label: 'Messages from anywhere',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 's1', label: 'Node A sends', sub: 'set x = 1', pattern: 'user', icon: 'pencil' },
        { id: 's2', label: 'Node B sends', sub: 'set y = 2', pattern: 'user', icon: 'pencil' },
        { id: 's3', label: 'Node C sends', sub: 'set x = 3', pattern: 'user', icon: 'pencil' },
      ],
    },
    { id: 'log', label: 'One agreed sequence', sub: 'appended to, never reordered', pattern: 'storage', icon: 'scroll' },
    {
      id: 'guarantees',
      label: 'Two guarantees, and that is the definition',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'reliable', label: 'No message lost', sub: 'every node gets every one', pattern: 'service', icon: 'shieldcheck' },
        { id: 'same', label: 'Same order, everywhere', sub: 'and it is fixed at delivery', pattern: 'service', icon: 'sortarrows' },
      ],
    },
  ],
  edges: [
    { source: 'senders', target: 'log' },
    { source: 'log', target: 'guarantees' },
  ],
}
