import type { Section } from '../types'

export const jsonAndFriends: Section = {
  id: 'json-and-friends',
  title: 'JSON, XML and CSV',
  scene: 'json-and-friends',
  focus: 'issues',
  slide: `## JSON, XML and CSV

Text formats, readable by anyone, supported everywhere. **A good default — with sharp edges worth naming.**

### The number problems
- JSON doesn't distinguish **integers from floats**, or fix precision
- JavaScript parses every number as a double, so anything past **2⁵³** silently rounds. Twitter returns tweet IDs **twice**, once as a string, for exactly this
- No decimal type — \`0.1\` is an approximation. Never money

### The rest
- **No binary type.** Base64 works and costs **33%** more bytes
- **CSV** has no types and no real escaping standard

### Why it still wins
- Zero coordination: anyone can read it with no build step
- For a public API that is worth more than the bytes`,
  narration:
    "So: standardised formats. JSON, XML and CSV are the text ones — readable by a human, supported by every language, and a perfectly reasonable default. But there are sharp edges, and they are worth naming precisely because the format looks so simple. Start with numbers, where most of the damage is. JSON does not distinguish an integer from a floating-point number, and it says nothing about precision. That is tolerable until you remember that JavaScript parses every number as a double, which means integers above two to the fifty-three lose precision — silently, with no error. This is not a hypothetical: Twitter's API returns every tweet ID twice, once as a number and once as a decimal string, purely because the number was being corrupted in browsers. If you are sending 64-bit IDs as JSON numbers, you have this bug. Relatedly, there is no decimal type, so nought point one is an approximation, and you should never represent money as a JSON number. Then: there is no binary type at all. So images and encrypted blobs get base64-encoded, which works and costs you a third more bytes. XML has similar number ambiguity, and CSV is vaguer than either — no types whatsoever, and no properly standardised escaping, so a comma inside a field is a genuine source of production incidents. All three have optional schema languages, which almost nobody uses. And yet JSON is still the right default for a public API, and the reason is coordination cost. Anyone can consume it with no build step, no code generation and no shared artifact. For an internal service where both ends are yours, that is worth much less — and the next two sections are what you get in exchange for giving it up.",
}
