import type { Section } from '../types'

export const avro: Section = {
  id: 'avro',
  title: 'Avro: two schemas, matched by name',
  scene: 'avro',
  focus: 'resolve',
  slide: `## Avro: two schemas, matched by name

Avro goes further: **no tag numbers either**. The bytes are values, concatenated — nothing says where a field ends.

### So the reader must know the writer's schema
- Not a compatible one — **the exact one**
- **Writer's schema**: what the bytes were written with
- **Reader's schema**: what your code expects
- They need not match. Avro **resolves** them, by field **name**

### The resolution rules
- In both → copy · **reader only** → its default · **writer only** → skip

### How the reader gets it
- A **file header**, written once for millions of records
- Or a **registry**: send an ID, look it up, cache forever
- Dynamically generated schemas fall out free — nobody assigns tags`,
  narration:
    "Avro takes the same idea one step further, and the step is surprising. There are no tag numbers either. If you look at Avro-encoded bytes, they are just values, concatenated — a length, some characters, a number, and so on. There is nothing in them identifying which field is which, and nothing marking where one field ends and the next begins. Which means you cannot parse Avro at all without knowing the exact schema it was written with. Not a compatible schema, the precise one. That sounds like a step backwards, and it is the cleverest part of the design. Avro distinguishes two schemas. The writer's schema is what the data was written with. The reader's schema is what your code expects. And they do not have to be the same — Avro's job at decode time is to resolve one against the other, field by field, matched by name. If a field is in both, the value is copied across, and Avro will translate the order of fields and widen compatible types for you. If a field is only in the reader's schema, the reader uses the default value it declared — which is why every field you add must have a default. And if a field is only in the writer's schema, the reader simply skips it. Now, how does the reader get the writer's schema? Two answers. In a big file of many records, the schema is written once in the header, so the cost is amortised over millions of rows. In a message stream or an RPC, you send a small schema ID and look it up in a schema registry, caching it forever. And there is a bonus that falls out of having no tag numbers: you can generate a schema dynamically at runtime — say, from a database table's columns — because nothing requires a human to assign and remember tag numbers. With Protobuf, a column rename would silently change the tag assignment. With Avro it just works.",
}
