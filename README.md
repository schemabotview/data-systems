# data-systems

A GraphL concept app about how data systems actually work — storage engines, replication,
partitioning, transactions, consistency, consensus and the pipelines built on top of them.

Ten courses, 105 sections. Each section is one **scene** (a diagram, a code card or a table on the
left), one **slide** (markdown on the right) and one **narration** clip — which is also one segment
of the course video and one Short.

## What makes it different

Everything on the left pane is a **declarative graph**. Authors list nodes, edges and nesting; the
layout engine computes every position and size. Nobody writes an x or a y, so a scene renders
identically every time — which is what makes the screenshots reproducible and the videos
recordable. The engine is [`@graphlearning/flow`](https://github.com/schemabotview/ui-flow); the app
around it (router, slide panel, catalog, narration) is
[`@graphlearning/shell`](https://github.com/schemabotview/ui-shell). Both are consumed as published
packages, pinned by version, so an engine change can never break this site without an explicit
upgrade here.

## Running it

```sh
npm install
npm run dev          # http://localhost:5173
```

Routes are `#/<course>-<section>`, e.g. `#/models-many-to-many`. `#/` is the catalog.

## Verifying a change

There is no test runner. The bar is all four:

```sh
npm run build        # must be clean
npx tsc --noEmit     # must be clean
npm run check        # content budgets: card overflow, slide clipping, dead focus, missing wavs
```

…and **the section looked at in the browser**. The three commands pass on frames that are wrong —
`npm run check` models a card's rendered height, but nothing models an edge label landing on top of
a card. `CLAUDE.md` lists the scene-layout rules this repo has paid for so far.

## Authoring

- A scene goes in `src/scenes/<course>/`, registered in that folder's `index.ts`.
- A section goes in `src/content/<course>/NN-<id>.ts`, listed in that folder's `index.ts`.
- A section's markdown is the source of truth for both the slide (terse, for the eye) and the
  narration (flowing, for the ear).
- Narration audio is a Colab + Chatterbox pass over the `narration` fields, run separately; wavs
  land in `public/audio/<course>/<section-id>.wav`.

## Syllabus

`COURSE-PLAN.md` has the full section plot. The chapter ordering follows *Designing Data-Intensive
Applications*, used as a private syllabus only: the ideas are distilled in original words and
original diagrams, and none of the book's figures or prose are reproduced.
