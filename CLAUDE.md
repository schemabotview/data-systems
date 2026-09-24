# CLAUDE.md — data-systems (lean operational pointers)

The **Data Systems** concept app of GraphL. Workspace-wide invariants, the content model and the
working agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is
repo-specific.

## What this is

A standalone concept app: its own scenes + courses, rendered by **`@graphlearning/flow`** and shelled
by **`@graphlearning/shell`**, both pinned by version. Each **section** = `(scene, slide, narration)`;
left is a react-flow diagram, a code card or a table, right is markdown.

## The syllabus, and where it comes from

The course order is *Designing Data-Intensive Applications*' chapter order. That is the only thing
taken from it. **The book's name does not appear on the public surface** — no "Chapter 5", no
figures reproduced, no prose reproduced. Every section is published as a standalone mechanism with a
search-first title ("How leaderless replication survives a dead node"), which is also why the repo is
`data-systems` and not `ddia` or `system-design`. `scripts/titles.json` carries the publish titles.

Two chapters are deliberately **not** courses: ch. 1 (reliability/scalability/maintainability) is
prose and percentiles with no graph in it — its one usable idea opens `models`; ch. 12 is an essay,
and its "unbundling the database" half lands in `pipelines`.

## Course arc (10)

`models · storage · encoding · replication · partitioning · transactions · faults · consistency ·
consensus · pipelines`. Played in syllabus order. Full section plot: [`COURSE-PLAN.md`](./COURSE-PLAN.md).

## Layout

```
src/scenes/<course>/   scenes + registry (a scene can be shared across sections)
src/content/<course>/  NN-<section-id>.ts + registry
src/main.tsx           mounts <ConceptApp> — router, section view, slide panel, catalog and
                       narration are all @graphlearning/shell
src/theme.css          this repo's three brand tokens — its entire design surface
scripts/               check-content.mjs · concept.json · titles.json · colab notebook
public/audio/<course>/ narration wavs
```

## Build & verify

- `npm install` → `npm run dev`; the bar is **`npm run build` + `npx tsc --noEmit` + `npm run check`
  all clean, AND every new section seen in the browser**. The three checks pass on frames that are
  wrong — two of the four defects found in `models` were green on all three.
- Adding a scene: define in `src/scenes/<course>/`, register in that folder's `index.ts`.
- Adding content: add a `Section` under `src/content/<course>/`, list it in that folder's `index.ts`.

## Scene rules this repo learned on its own frames

The engine computes every position, so the only lever an author has is **how many ranks the graph
has and which nodes are in them**. Four rules, each paid for by a defect that built green:

1. **Four ranks is the practical ceiling.** The scene pane is roughly square (~840×840 at review
   size), so a six-rank `LR` chain fits to width and shrinks every card until its `sub` is
   unreadable. `graph-shape` was exactly this.
2. **Never let an edge skip a rank.** An edge's label rides its midpoint, and the midpoint of a
   rank-skipping edge is *on the card in between*. Fix it by re-ranking, not by moving the label.
3. **Three content-sized nodes in one row is too many.** Tables and code cards size themselves from
   their content, so a row of three sets a small common scale. Two ranks of 1–2 reads far bigger —
   `many-to-one` went from three tables in a line to one splitting into two.
4. **A container is a layout tool, not just a grouping one.** Nesting two peers with an edge between
   them puts that edge on its own internal axis, where nothing above or below can collide with it.
5. **Author slides to ~950 modelled px, not the guard's ceiling.** `check-content.mjs` here is set to
   1000, lowered from the 1100 the sibling repos carry: every `storage` slide first came in at
   1021–1096, passed at 1100, and clipped its last line in any review window shorter than 16:9. The
   `models` course sits at 753–904 and has never clipped. Two bullets is the whole cost.

## Working agreement

Author first, review on the rendered frames — see the workspace `CLAUDE.md`. Build the whole unit
(scenes, slides, narration), verify it, hand over a dev-server URL. No ASCII sketches, no stopping
for plan approval, no silent scaffolding.

## Narration

`.tts` → `.wav` is a **Colab + Chatterbox** pass, run by the owner (`scripts/colab_generate_audio.ipynb`).
Sections authored here ship with `narration` text and **no wav** until that pass runs; `npm run check`
stays quiet about a course with no audio at all and starts requiring every file the moment that
course has its first one.
