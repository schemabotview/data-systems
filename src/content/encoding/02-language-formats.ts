import type { Section } from '../types'

export const languageFormats: Section = {
  id: 'language-formats',
  title: 'The built-in serializer',
  scene: 'language-formats',
  focus: 'rce',
  slide: `## The built-in serializer

Python has \`pickle\`, Java has \`Serializable\`, Ruby has \`Marshal\`. One line, any object. **Use none of them for anything that leaves the process.**

### Four reasons
- **Tied to one language.** The reader must be the same runtime — you have just decided your architecture
- **Decoding runs code.** These formats can instantiate arbitrary classes, so decoding untrusted bytes is remote code execution. This is a CVE in *every* language that offers it
- **No versioning story.** Evolution was not designed in, so it is bolted on badly or not at all
- **Slow and large.** Java's is notorious; efficiency was never the goal

### The one legitimate use
- A **transient** cache you own both ends of, and would throw away anyway`,
  narration:
    "Every language ships a serializer. Python has pickle, Java has Serializable, Ruby has Marshal. One line of code, any object, done — and that convenience is exactly why they get used for things they should never be used for. Four problems. First, the encoding is tied to that one language. If you pickle something, the reader must be Python. You have just decided, as a side effect of a convenience call, that no service in your architecture will ever be written in Go. Second, and this is the serious one: decoding these formats can instantiate arbitrary classes, which means it can run arbitrary code. If an attacker can get bytes into your decoder, they can generally get code execution. This is not theoretical and it is not a bug in one implementation — it is a design consequence, and it has been a serious CVE in Java, in Python, in Ruby, and in PHP. Never deserialize a language-native format from a source you do not fully trust. Third, versioning. Because these were built for convenience, evolution was an afterthought, so compatibility across versions is either awkward or absent — and by the last section you will see why that alone disqualifies them. Fourth, they are slow and they produce large output, because performance was never a design goal. Java's built-in serialization is famously bad on both counts. There is one case where they are fine: a transient cache that you own both ends of, that lives in one process, and that you would happily throw away and rebuild. Anything that crosses a service boundary or lands in a database needs a real format.",
}
