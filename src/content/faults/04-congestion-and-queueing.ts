import type { Section } from '../types'

export const congestionAndQueueing: Section = {
  id: 'congestion-and-queueing',
  title: 'Where the delay actually comes from',
  scene: 'congestion-and-queueing',
  focus: 'load',
  slide: `## Where the delay actually comes from

Network variability is almost never the wire. **It is queueing** — and there are four queues in the path.

### The four
- **The switch.** Several senders, one destination port; a full buffer **drops** packets
- **The receiver's OS.** All cores busy, so the packet waits in a kernel queue
- **The hypervisor.** Your VM paused while a neighbour runs — invisible from inside
- **TCP itself.** A retransmit costs a whole extra round trip

### The shape this gives you
- All four worsen under load, so **latency spreads exactly when you least want it to**
- In a **shared** environment the variance is far higher
- Which is why a timeout tuned on a quiet Tuesday fails on a busy Friday`,
  narration:
    "If network delay is so variable, where does the variability come from? Almost never the wire. Light in fibre is fast and consistent. It is queueing, and there are four separate queues between your request and its answer. First, the network switch. If several machines send to the same destination port at once, the switch queues the packets and sends them one at a time. If that queue fills, packets are dropped and must be retransmitted, which is a very expensive delay. Second, the receiving machine's operating system. If all CPU cores are busy, an arriving packet waits in a kernel queue until the OS has time to hand it to your process — and under load that wait can be significant. Third, virtualisation. On a virtual machine, your entire operating system can be paused for tens of milliseconds while another tenant's VM uses the CPU. From inside your VM this is completely invisible; time simply jumps forward. Fourth, TCP itself. A lost packet is retransmitted, which costs an extra round trip before your application sees anything. And TCP also does flow control at the sender, so packets queue in your own machine before they even reach the network. Note that TCP is hiding all of this from you: from your application's point of view there was no packet loss and no retransmission, just a request that took unusually long. Now, the shape all this gives you. Every one of the four gets worse as load increases, which means your latency distribution spreads out exactly when your system is busiest — precisely when you would most like it to be predictable. And in a shared environment, which is to say any public cloud, the variance is much higher, because you are queueing behind other people's workloads that you cannot see or control. This is the concrete reason a fixed timeout tuned during a quiet week fails during a busy one. The machine is not broken; there are just more queues in front of it.",
}
