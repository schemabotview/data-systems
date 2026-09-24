import type { Section } from '../types'

export const queryLanguages: Section = {
  id: 'query-languages',
  title: 'Declarative beats imperative',
  scene: 'query-languages',
  slide: `## Declarative beats imperative

Both snippets return the same rows. One of them left the database **room to do it better**.

### The loop pins the plan
- You chose a **full scan**, in **insertion order**, on **one core**
- That choice is now in your source, where no optimiser can reach it
- Build an index tomorrow and the loop **still scans**

### The query left it open
- It names the result, not the route
- The planner may use an index, reorder joins, **run it in parallel**
- Same SQL gets faster on a new release — you changed nothing
- This is also why **MapReduce** and dataframe APIs grew SQL layers`,
  narration:
    "These two snippets return exactly the same rows, and the difference between them is not syntax — it is who owns the strategy. Look at the loop. It says: walk every user, in the order they happen to be stored, on one core, testing each one. Every part of that is a decision you made. It is a full scan because you wrote a full scan. It is single-threaded because you wrote a for loop. And crucially, all of those decisions now live in your source code, which means nothing outside your source code can change them. Build a perfect index on city tomorrow, and this loop will still scan every row, because it was never asking for users in city forty-two — it was asking to walk an array. The SQL says what the result should be and stays silent on how to get it. That silence is the whole feature. The query planner is free to use an index if one exists, to choose the join order from statistics it gathered last night, to split the work across eight cores, or to use an algorithm that did not exist when you wrote the query. You upgrade the database, the same query gets faster, and you changed nothing. This is a general pattern, not a SQL one. It is why MapReduce, which started out as two functions you wrote yourself, ended up with Hive and Spark SQL on top — because once you hand over the how, somebody else can keep improving it.",
}
