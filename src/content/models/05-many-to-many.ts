import type { Section } from '../types'

export const manyToMany: Section = {
  id: 'many-to-many',
  title: 'Many-to-many: where the tree breaks',
  scene: 'many-to-many',
  focus: 'memberships',
  slide: `## Many-to-many: where the tree breaks

A user is on many teams; a team has many users. The membership belongs to **both sides — so it belongs to neither**.

### The relational answer
- A third table holding the **two IDs and nothing else's business**
- Facts about the pairing live there: role, joined date
- Either direction is the **same query**, just a different key

### The document problem
- A tree has one parent, so you must **pick an owner**
- Nest under the user and *"who is on this team"* becomes a **full scan**
- Duplicate into both and you now own **keeping them equal**
- This is the whole reason relational databases won in the 1980s`,
  narration:
    "Now the case that breaks the document model, and it is not an edge case — it is most of the interesting data you will ever store. A user belongs to many teams. A team contains many users. That is many-to-many, and the important detail is that the membership is not a fact about the user and it is not a fact about the team. It is a fact about the pair. So where does it live? The relational answer is a third table that holds nothing but the two IDs, plus anything true about the pairing — the role, the date they joined. And because it sits between the two, asking which teams a user is on and asking which users are on a team are the same query with a different key. Now try that in a tree. A tree has exactly one parent, so you are forced to choose. Nest memberships under the user, and finding everyone on a team means scanning every user in the database. Nest them under the team and the reverse is now the scan. Duplicate into both, and you have just made yourself responsible for keeping two copies equal, forever, including when one write succeeds and the other does not. This is not a new discovery. It is exactly why relational databases displaced the hierarchical ones in the first place.",
}
