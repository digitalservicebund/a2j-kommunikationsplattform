# Documentation Guidelines

This document contains guidelines regarding the technical documentation in this repository.

## Audience

- Assume a reader **familiar with common software engineering terminology**, but not necessarily with frontend web development and the particular technologies used in this project.

- Make the **first mention of a technology** (e.g., a framework, library or protocol) a **link to its homepage** so that the reader can easily read up on it. You can make exceptions for technologies that are very widely known, such as HTML and CSS; however, if in doubt, it is better to add a link than to omit it.

## Language

- Our technical documentation language is **English** with **American spelling**.

- **Domain terms** like _Verfahren_ (court case / proceedings) should be **left in German**; they often have precise legally defined meanings that are not preserved in translation.

- To help readers, **make German terms _italic_** so that they can easily be distinguished from the surrounding English prose, and **add a (rough) translation in parentheses on first use** in a document, as done for _Verfahren_ above. (Using the translation in the main text and putting the German term in parentheses is also fine.)

- Use the **German plurals for German terms** instead of English ones, e.g., _Dokumente_ instead of _Dokuments_ or similar.

- **Make newly introduced terms bold on first use** so that the defining passage can be easily found.

## Content & Tone

- **Explain the "why", not just the "what"**: state the reasoning behind decisions and link to the relevant [Architecture Decision Records][adr].

- **Clearly mark temporary circumstances** with phrases like "for the time being" or "in the future" so that readers know which statements may become outdated.

- **Use "we" for team decisions** and the **present tense** for describing how the system works.

[adr]: ./adr/README.md

## Structure

- In each document, open with a **one-sentence purpose statement** right after the title, e.g., "This document explains…" or "This document gives an overview of…".

- Use **"Title Case" for headings**, and prefer "&" to "and".
  - As an exception, Architecture Decision Record titles use "Sentence case" instead, for consistency with the `adr-tools` standard format.

- Consider ending documents with a **"Further Reading" section** with links to related docs.

## Diagrams & Images

- Use [**Mermaid**][mermaid] for diagrams, embedding them directly into the document as `mermaid` code blocks. For accessibility, **always explain a diagram in the surrounding prose**; a diagram should not be the only place where information is conveyed.

- **Store images in `doc/assets/`** and embed them using a `<figure>` element with meaningful **`alt` text** and a **`<figcaption>`**.

[mermaid]: https://mermaid.js.org/

## Links

- Within paragraphs, **prefer reference-style links** (e.g., `[React][react]`) to inline ones, with the definitions (e.g., `[react]: https://react.dev/`) placed at the end of the first section that uses them. This makes it easier to read documents in their plain-text form. Inline links to other files in the repository are fine as long as they are short (e.g., `See the [architecture overview](../architecture.md)`).
