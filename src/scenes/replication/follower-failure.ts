import type { Scene } from '@graphlearning/flow'

// §5 — the easy failure, and it is worth doing precisely because it costs nothing: the follower's
// own log already records where it got to, so recovery is the last two steps of §4 with the copy
// skipped. Nothing is coordinated, nothing is elected, no client notices. §6 is the other one.
export const followerFailure: Scene = {
  id: 'follower-failure',
  title: 'A follower dies — nobody notices',
  flow: 'TB',
  nodes: [
    { id: 'crash', label: 'Follower crashes', sub: 'or the network drops for an hour', pattern: 'warn', icon: 'skull' },
    { id: 'local', label: 'Its own log survives', sub: 'the last transaction it applied', pattern: 'storage', icon: 'scroll' },
    { id: 'reconnect', label: 'Reconnect and ask', sub: '"everything since position N"', pattern: 'service', icon: 'repeat' },
    { id: 'back', label: 'Caught up', sub: 'no election, no client impact', pattern: 'service', icon: 'circlecheck' },
  ],
  edges: [
    { source: 'crash', target: 'local' },
    { source: 'local', target: 'reconnect' },
    { source: 'reconnect', target: 'back' },
  ],
}
