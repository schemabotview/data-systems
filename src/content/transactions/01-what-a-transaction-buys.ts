import type { Section } from '../types'

export const whatATransactionBuys: Section = {
  id: 'what-a-transaction-buys',
  title: 'What a transaction buys you',
  scene: 'what-a-transaction-buys',
  focus: 'deal',
  slide: `## What a transaction buys you

A transaction groups several reads and writes into **one logical operation**, which either fully succeeds or fully fails.

### Four ways a multi-step operation breaks
- The process **crashes** halfway — debited, never credited
- The **network** fails, so the client never learns the outcome
- **Another transaction** writes between your read and your write
- Some rows land and some don't, and **nothing records which**

### The offer
- **Commit**, and every change is durable
- **Abort**, and it is as if nothing happened. Safe to retry
- The point is not elegance — it is **not writing that recovery code yourself**, in every feature, forever`,
  narration:
    "A transaction groups several reads and writes into one logical operation, which either entirely succeeds or entirely fails. That is the definition, and the interesting question is why it is worth having, because transactions are not free. Think about what happens without them. You want to move money between two accounts, which means a debit and a credit. Four things can go wrong. The process can crash between the two, leaving money debited and never credited. The network can fail after the database did the work but before the client heard, so the client does not know whether to retry — and retrying might do it twice. Another transaction can write to the same row between your read and your write, so your update is based on a value that is already stale. And if you were writing many rows, some can land and some not, with nothing anywhere recording which. Without transactions, you have to handle every one of those, by hand, in every feature you ever write. And you have to handle them correctly in the presence of partial failure, which as course seven will show is where almost all the difficulty lives. With transactions, all four collapse into one decision. Either the transaction commits, and every change it made is durable, or it aborts, and it is exactly as though it never happened — which means you can simply retry it. That safety is what you are buying. And it is worth saying: not every application needs it. Transactions have a real performance and availability cost, and many systems in the NoSQL era dropped them for exactly that reason. But dropping them does not delete the problem. It moves the problem into your application code, where it is usually solved worse.",
}
