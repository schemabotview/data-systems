import type { Scene } from '@graphlearning/flow'

// §11 — the same rows, twice, and the only difference is what is ADJACENT to what. Read the two code
// cards as bytes in order on a disk: on the left a row's fields are neighbours, on the right a
// column's values are. Everything else on the board follows from that one choice, including the
// compression — the right-hand card has long runs of repeats in it because sorted columns do.
export const columnStore: Scene = {
  id: 'column-store',
  title: 'Same table, two ways to lay it on disk',
  cols: 2,
  nodes: [
    {
      id: 'roworiented',
      label: 'Row-oriented — built for one row at a time',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'row-bytes',
          kind: 'code',
          filename: 'rows.dat',
          hug: true,
          label: `140102 | 69 | 4 | 1 | 13.99
140102 | 69 | 4 | 3 | 41.97
140102 | 74 | 4 | 1 |  2.49`,
        },
        { id: 'row-fetch', label: 'One order: one read', sub: 'every field is a neighbour', pattern: 'service', icon: 'zap' },
        { id: 'row-scan', label: 'One column: read it all', sub: '100 columns fetched to sum 1', pattern: 'warn', icon: 'search' },
      ],
      edges: [
        { source: 'row-bytes', target: 'row-fetch' },
        { source: 'row-fetch', target: 'row-scan' },
      ],
    },
    {
      id: 'coloriented',
      label: 'Column-oriented — built for one column at a time',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'col-bytes',
          kind: 'code',
          filename: 'columns/',
          hug: true,
          label: `date_key:   140102 140102 140102
product_sk:     69     69     74
quantity:        1      3      1
price:       13.99  41.97   2.49`,
        },
        { id: 'col-scan', label: 'Sum one column', sub: 'read one file, skip 99', pattern: 'service', icon: 'sigma' },
        { id: 'col-comp', label: 'Repeats compress', sub: 'a sorted column is long runs', pattern: 'service', icon: 'package' },
      ],
      edges: [
        { source: 'col-bytes', target: 'col-scan' },
        { source: 'col-scan', target: 'col-comp' },
      ],
    },
  ],
  edges: [],
}
