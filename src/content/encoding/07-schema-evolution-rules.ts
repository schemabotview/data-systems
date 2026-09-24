import type { Section } from '../types'

export const schemaEvolutionRules: Section = {
  id: 'schema-evolution-rules',
  title: 'Which changes are safe',
  scene: 'schema-evolution-rules',
  focus: 'rules',
  slide: `## Which changes are safe

The operational answer: one row per change you might make to a schema.

### The two that cause outages
- **Adding a required field** breaks old *writers* — they don't send it, and new readers reject the message
- **Removing a required field** breaks old *readers* — they demand it, and new writers stopped sending it
- Both are avoided by one habit: **every new field is optional, and has a default**

### Renames and types
- Tagged formats: rename freely, the **tag** is the identity
- Avro: only via an **alias**, because it matches by name
- **Widening** a type (int32 → int64) is safe one way only. Old readers truncate

### And the one that is never safe
- **Reusing a tag number.** Old data decodes into the wrong field, silently`,
  narration:
    "Here is the practical version: a table of the changes you might actually make, and whether each is safe. Adding an optional field is fine. Old readers meet a tag they do not know and skip it; new readers meeting old data find the field missing and use the default. That is the case everything is designed for. Adding a required field is not fine, and it breaks in a direction people find counterintuitive: it breaks old writers. An old node does not know about the field, so it does not send it, and a new reader that requires it rejects the message. Removing a required field breaks the other way — old readers demand a field new writers have stopped sending. Both of those are avoided by one habit, and it is the only rule you really have to remember: every new field is optional and has a default value. If you never add a required field after version one, most of this table stops mattering. Renames depend on the format, and this is the clearest difference between the two families. In Protobuf or Thrift, rename whatever you like, because the tag number is the identity and the name is just a label in your source. In Avro, names are the matching key, so a rename needs an alias declared in the reader's schema — which works, but it is something you have to remember to do. Type changes are a trap. Widening an int32 to an int64 is safe for new readers, because a small number fits in a big field. It is not safe for old readers, who will read a large value into a 32-bit field and truncate it. And the one that is never safe under any circumstances: reusing a tag number that some previous version used for something else. Old data still on disk will decode into the wrong field, with the wrong type or, much worse, a compatible type and a completely wrong meaning. Nothing will error. Reserve the number and move on.",
}
