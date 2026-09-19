I want to pivot the existing `mdx-graphs` project into a broader product called `mdxcn`.

The core idea is simple:

mdxcn is a curated collection of beautifully designed, Markdown-friendly React components.

Think of the positioning/model of:

- pdfcn → components for PDFs
- emailcn → components for emails
- mdxcn → components for Markdown / MDX

This should NOT become another generic UI component library.

The existing `mdx-graphs` project already has a distinctive visual identity and a collection of interesting chart/graph components. The goal is to evolve that project into mdxcn without throwing away what already works.

---

# 1. Product positioning

The product should be immediately understandable:

> mdxcn
> Markdown-friendly components.

or something in that general direction.

Keep the messaging simple.

Do NOT position it as:

- "a visual language for Markdown"
- "a new visual grammar"
- "information structures"
- "the future of Markdown"
- an overly abstract design philosophy

The design language should be visible through the actual components and website rather than explained with marketing jargon.

The mental model should be:

shadcn → UI components
pdfcn → PDF components
emailcn → Email components
mdxcn → Markdown components

The goal is to make Markdown/MDX significantly more expressive while still feeling like Markdown.

---

# 2. The most important principle: MDX-first, always

This is the biggest thing that needs to change from the current project.

The existing project has a lot of components that are essentially normal JSX/React components which happen to be rendered in the project.

That is not enough.

mdxcn must be genuinely MDX-first.

Do NOT build a generic React component and then ask:

> "How can we make this work in MDX?"

Instead, start with:

> "What would the ideal authoring experience look like inside an MDX document?"

Then design the component API around that.

For every component, ask:

- Does this make natural sense inside Markdown/MDX?
- Is the MDX syntax concise and readable?
- Can someone understand the component from the MDX source?
- Does it compose naturally with normal Markdown?
- Does it avoid unnecessary JavaScript/configuration?
- Would it actually be useful in documentation, technical writing, blogs, READMEs, changelogs, portfolios, etc.?
- Does it visually belong to mdxcn?

If not, the component probably shouldn't exist.

---

# 3. Fix the existing components

Do a proper audit of the existing `mdx-graphs` components.

Identify components that are:

- overly JSX-oriented
- configuration-heavy
- difficult to express naturally in MDX
- dependent on large JavaScript objects
- not composable
- effectively generic React components rather than Markdown-friendly components

Where appropriate:

- redesign the API
- simplify the API
- make the component composable
- make content declarative
- remove unnecessary configuration
- or remove the component entirely if it doesn't fit

For example, prefer APIs that can look naturally like:

```mdx
<Callout type="warning">This is a warning.</Callout>
```

or:

```mdx
<Stats>
  <Stat label="Revenue" value="$48K" />
  <Stat label="Users" value="12.4K" />
</Stats>
```

rather than forcing authors to construct large configuration objects.

The MDX source itself should remain readable.

Someone reading the source should be able to understand the content without knowing the implementation.

---

# 4. Markdown should remain the primary medium

mdxcn should enhance Markdown, not replace it.

A document should still feel like Markdown:

```mdx
## Performance

The new implementation significantly reduced latency.

<Metric value="42ms" label="p95 latency" />

The improvement came primarily from caching.

<Flow>...</Flow>

The result was a significantly faster application.
```

The components should sit naturally between normal Markdown content.

Avoid building components that require the entire page to become a giant JSX application.

Markdown is the foundation.

Components are enhancements.

---

# 5. Existing graphs are still important

Do NOT throw away the existing graph/chart work.

`mdx-graphs` should effectively become the first major category within mdxcn.

Preserve existing components where they already fit the philosophy, but make sure they are genuinely MDX-first.

Potential categories could include:

### Charts

- bar
- line
- area
- contribution
- sparkline
- heatmap
- etc.

### Data

- table
- stat
- metric
- meter
- progress
- ranking
- comparison
- etc.

### Diagrams

- flow
- tree
- timeline
- sequence
- architecture
- etc.

### Content

- callout
- quote
- steps
- changelog
- notice
- etc.

### Technical

- terminal
- code
- diff
- file tree
- browser
- device
- etc.

### Primitives

- frame
- divider
- grid
- label
- ASCII/text primitives
- etc.

This is only a starting point.

Do not blindly implement everything above.

Curate the library based on what genuinely makes sense for Markdown.

Do not create dozens of placeholder components just to make the categories look complete.

---

# 6. The design language

The existing mdx-graphs visual identity is the foundation of mdxcn.

Preserve it and expand it naturally.

Important characteristics include:

- dark editorial/technical aesthetic
- dotted grid/background construction
- thin dotted borders
- `[ TITLE ]` framed sections
- ASCII/text glyphs
- monospace data presentation
- restrained typography
- intentional accent colors
- terminal/technical feel
- strong spacing and composition
- minimal but expressive motion
- components that feel deliberately crafted rather than generic

The current visual system should feel like one coherent family.

Do NOT redesign this into:

- another modern SaaS dashboard
- a generic shadcn theme
- a glassmorphism UI kit
- a random collection of trendy components

The uniqueness should come from the actual visual design.

---

# 7. ASCII and text-native components

Keep the ASCII/text-based character of the original project.

This is one of the strongest parts of mdx-graphs and should become a major part of mdxcn.

Prefer components that can communicate information using:

- text
- glyphs
- ASCII-like structures
- borders
- grids
- symbols
- typography
- simple visual primitives

For example, things like:

```text
[ REQUEST FLOW ]

client ──→ edge ──→ api ──→ database
             │
             └──→ cache
```

or:

```text
[ PRODUCTION ]

● api          healthy       42ms
● web          healthy       81ms
● worker       degraded      210ms
```

These should feel native to the mdxcn aesthetic rather than being generic cards with monospace text inside them.

---

# 8. Curated, not massive

Do not optimize for having hundreds of components.

The goal is a small collection of things that are actually worth using.

I'd rather have:

> 40 extremely good Markdown components

than:

> 200 mediocre components.

Every component should earn its place.

The library should feel curated and opinionated.

---

# 9. shadcn-style installation

Keep the existing shadcn-style registry/install experience.

This is an important part of the product model.

Users should be able to install/copy components into their projects rather than adopting a giant runtime framework.

Preserve the existing registry architecture where possible.

Update the registry and installation references from `mdx-graphs` to `mdxcn` where appropriate.

Do not unnecessarily break existing components or installation flows.

---

# 10. Documentation

The documentation needs to reinforce the MDX-first philosophy.

Every component should show:

1. rendered preview
2. actual MDX source
3. installation command
4. relevant API/usage information

The MDX source should be a first-class part of the documentation.

Do not only show React/TSX examples.

For every component, the primary example should demonstrate how someone would actually use it in an MDX document.

The docs should make the following immediately obvious:

> "I can copy this component and use it in my Markdown/MDX content."

---

# 11. Rebrand the existing project

Rename/rebrand:

`mdx-graphs`

→

`mdxcn`

Update wherever appropriate:

- site title
- navbar
- logo/wordmark
- hero
- metadata
- OpenGraph metadata
- docs
- README
- registry references
- install commands
- package references
- GitHub references
- component navigation
- footer
- any remaining visible branding

Don't blindly rename internal identifiers if doing so would unnecessarily break things.

The goal is a coherent product rebrand, not a giant destructive refactor.

---

# 12. Landing page

The current landing page is too narrowly focused on charts and graphs.

Rework it so that the broader mdxcn concept is immediately clear.

The landing page should:

- introduce mdxcn immediately
- communicate "Markdown-friendly components"
- showcase the existing graph work
- introduce other types of Markdown-friendly components
- demonstrate the visual identity
- make installation/copying obvious
- feel like a curated design/product rather than a generic component documentation site

Keep the existing editorial/technical feel.

It should feel like:

> "Holy shit, these are really nice components for making Markdown interesting."

rather than:

> "Here is another component library with 70 cards."

---

# 13. Don't overbuild the pivot

Before making changes, inspect the existing project thoroughly.

Understand:

- current architecture
- component structure
- registry
- docs
- routing
- theme/token system
- typography
- existing design primitives
- landing page
- component APIs
- which components are genuinely MDX-friendly
- which components need redesign

Then make the smallest coherent changes required to evolve the project.

Reuse existing work aggressively.

Do not rewrite working components just because the branding changed.

Do not create an entirely new design system.

Do not turn this into a massive refactor.

The goal is:

mdx-graphs → mdxcn

not:

mdx-graphs → completely unrelated new product.

---

# 14. Final product philosophy

The simplest way to think about the project is:

> mdxcn is a curated collection of beautifully designed components that make Markdown and MDX more expressive.

The two constraints that should guide every decision are:

**Markdown-friendly.**

and

**Beautifully crafted.**

Everything else is secondary.

Most importantly:

**MDX-first, always.**
