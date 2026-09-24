import type { Section } from '../types'

export const unixPipeline: Section = {
  id: 'unix-pipeline',
  title: 'The Unix pipeline',
  scene: 'unix-pipeline',
  focus: 'code',
  slide: `## The Unix pipeline

The five most-requested URLs in a log, in one line. **This is MapReduce, forty years earlier, and the design decisions are the same ones.**

### Why it composes
- **One interface: a stream of bytes.** Every tool reads it and writes it, so any tool connects to any other
- **No hidden state.** Stdin in, stdout out. Nothing global to coordinate
- **The input is never modified**, so you can rerun it as many times as you like while getting the pipeline right
- **\`sort\` streams to disk**, so it handles files far larger than memory — which is exactly the merge from course 02 §4

### And the limit
- It runs on **one machine**
- Everything in the rest of this course is these four properties, on a thousand machines`,
  narration:
    "Before the distributed systems, here is a pipeline that finds the five most requested URLs in a web server log. Cat the file, awk out the seventh field, sort it, uniq minus c to count adjacent duplicates, sort numerically in reverse, take the top five. One line, and it will happily process a file of several gigabytes on a laptop. This is MapReduce, about forty years earlier, and the design decisions that make it work are the same ones. First: there is exactly one interface, a stream of bytes. Every tool reads bytes on standard input and writes bytes on standard output, which means any tool composes with any other tool, including tools written decades apart by people who never met. Uniformity of interface is what makes composition possible at all, and it is the thing most software architectures fail at. Second: no hidden state. Each program reads its input and writes its output, and it has no global variables, no shared database, nothing to coordinate with its neighbours. So you can reason about each stage independently. Third: the input file is never modified. Which means you can run the pipeline, look at the output, realise the awk field number is wrong, fix it and run again — as many times as it takes. That freedom to iterate is enormously valuable and it comes entirely from not touching the input. Fourth, and this is the one that makes it scale: sort does not load the file into memory. It reads chunks, sorts them, writes them to temporary files on disk, and merges the sorted runs — which is exactly the streaming merge from course two, section four, the same algorithm that lets an SSTable merge files bigger than RAM. Sorting is also what makes the next stage trivial: once equal lines are adjacent, counting them is a single pass with no memory at all. And the limit, of course, is that it runs on one machine. The rest of this course is these four properties, on a thousand machines.",
}
