import type { Scene } from '@graphlearning/flow'

// §2 — the central fact of the course, drawn as the ambiguity it is. Six genuinely different things
// may have happened, three of which mean the work was DONE; and the card at the bottom is everything
// the sender actually knows. Every mechanism in courses 04 and 09 is an attempt to act sensibly
// while holding that one bit of information.
export const unreliableNetworks: Scene = {
  id: 'unreliable-networks',
  title: 'No reply. Six things it could mean.',
  flow: 'TB',
  nodes: [
    { id: 'send', label: 'You send a request', sub: 'and wait', pattern: 'user', icon: 'share' },
    {
      id: 'cases',
      label: 'What may have happened',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'lost', label: 'Request lost', sub: 'never arrived', pattern: 'warn', icon: 'ban' },
        { id: 'queued', label: 'Request queued', sub: 'still in flight', pattern: 'warn', icon: 'clock' },
        { id: 'dead', label: 'Node crashed', sub: 'before doing it', pattern: 'warn', icon: 'skull' },
        { id: 'did', label: 'It did the work', sub: 'then crashed', pattern: 'warn', icon: 'circlecheck' },
        { id: 'replylost', label: 'Reply lost', sub: 'the work is done', pattern: 'warn', icon: 'ban' },
        { id: 'slow', label: 'Reply delayed', sub: 'arriving in a minute', pattern: 'warn', icon: 'gauge' },
      ],
    },
    { id: 'know', label: 'What you know', sub: 'no reply yet. That is all', pattern: 'storage', icon: 'search' },
  ],
  edges: [
    { source: 'send', target: 'cases' },
    { source: 'cases', target: 'know' },
  ],
}
