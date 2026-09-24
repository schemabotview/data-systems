import type { Section } from '../types'

export const binaryWithTags: Section = {
  id: 'binary-with-tags',
  title: 'Binary formats with field tags',
  scene: 'binary-with-tags',
  focus: 'wire',
  slide: `## Binary formats with field tags

Thrift and Protocol Buffers. You write a **schema**, a compiler generates the codec, and the field **names never go on the wire**.

### What travels instead
- A **tag number** from the schema, plus a type, plus the value
- \`user\` becomes tag 1. The string "user" is never sent
- Typically **half to a third** the size of the same JSON

### The rules that follow
- **Rename freely** — the tag is the identity, not the name
- **Never reuse a tag number.** Old data decodes into the wrong field
- An unknown tag is **skipped**, using its type bits — the one behaviour that makes forward compatibility possible

The cost: the schema is a **shared build artifact** now.`,
  narration:
    "Now the binary formats, and the first family is Thrift and Protocol Buffers. The workflow is different from JSON: you write a schema file describing your message, you run a compiler over it, and it generates encoding and decoding code in your language. That schema requirement is the price, and everything good here is bought with it. Look at what actually goes on the wire. The field is called user in the schema, and the string user does not appear in the bytes at all. What appears is the tag number — one — plus a few bits saying what type it is, plus the value. That is the entire encoding. And the saving is significant: typically a half to a third the size of the equivalent JSON, because you have stopped transmitting the same field names on every single record. Two rules fall straight out of this. Rename a field whenever you like: the tag number is the identity, the name is just documentation for humans, so renaming is a source-code change and nothing more. But never, ever reuse a tag number. If field seven used to be a customer ID and you now make it a discount code, old data in your database will decode into the wrong field, with the wrong meaning, and nothing will complain. Protobuf even has a reserved keyword so the compiler can stop you. And here is the behaviour that matters most, which we will come back to in section six. When a decoder meets a tag it has never heard of, it reads the type bits, uses them to work out how many bytes to skip, and moves on. It does not fail. That single design decision is what lets old code read data written by new code — which is the hard half of compatibility.",
}
