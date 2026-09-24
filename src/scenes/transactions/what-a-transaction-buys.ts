import type { Scene } from '@graphlearning/flow'

// §1 — the argument for transactions is not that they are elegant, it is that the alternative is
// writing recovery code for each of these four cases by hand, in every feature, forever. The bottom
// card is the offer: all of it collapses into one decision that the database makes for you.
export const whatATransactionBuys: Scene = {
  id: 'what-a-transaction-buys',
  title: 'Four things that can go wrong halfway',
  flow: 'TB',
  nodes: [
    { id: 'op', label: 'One logical operation', sub: 'debit one account, credit another', pattern: 'user', icon: 'swap' },
    {
      id: 'risks',
      label: 'Where it can break',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'crash', label: 'Crash halfway', sub: 'debited, never credited', pattern: 'warn', icon: 'skull' },
        { id: 'net', label: 'Network fails', sub: 'the client never hears', pattern: 'warn', icon: 'plug' },
        { id: 'conc', label: 'Someone else writes', sub: 'between your read and write', pattern: 'warn', icon: 'users' },
        { id: 'partial', label: 'Half the rows land', sub: 'nothing says which half', pattern: 'warn', icon: 'scissors' },
      ],
    },
    { id: 'deal', label: 'Commit or abort', sub: 'all of it, or none of it', pattern: 'service', icon: 'shieldcheck' },
  ],
  edges: [
    { source: 'op', target: 'risks' },
    { source: 'risks', target: 'deal', label: 'one decision instead' },
  ],
}
