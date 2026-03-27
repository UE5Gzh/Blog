# Phase 1: Core Blog - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

A working blog where the user can write, publish, and read posts with excellent code presentation. This phase establishes the foundational blog infrastructure: post creation, code highlighting, and basic display.
</domain>

<decisions>
## Implementation Decisions

### Layout Style
- **D-01:** Card-based layout for home page post listing — posts displayed as cards with title, date, and summary (Medium/Notion style)

### Code Highlighting
- **D-02:** Dark theme for syntax highlighting — VS Code Dark+ style, suitable for developer audience

### Image Management
- **D-03:** Local image storage — images stored in `posts/` directory alongside markdown files

### Color Scheme
- **D-04:** Dark mode only — dark background with appropriate contrast for code and text content

### Claude's Discretion
- Typography choices, CSS implementation details, Astro component structure — deferred to planner/researcher

</decisions>

<canonical_refs>
## Canonical References

### Project Documents
- `.planning/PROJECT.md` — Personal tech blog vision and scope
- `.planning/REQUIREMENTS.md` — Content and Display requirements (CONTENT-01 through CONTENT-04, DISPLAY-01 through DISPLAY-03)
- `.planning/ROADMAP.md` — Phase 1 goals and success criteria

### Research Documents
- `.planning/research/STACK.md` — Recommended Astro + Shiki + Pagefind stack
- `.planning/research/ARCHITECTURE.md` — Static site architecture
- `.planning/research/FEATURES.md` — Table stakes vs differentiators

</canonical_refs>

<codebase_context>
## Existing Code Insights

### Project Status
- Fresh project — no existing code
- Using Astro framework (from research recommendations)
- Static site generation approach

### Established Patterns
- Markdown-based content with frontmatter
- Shiki for syntax highlighting
- Static pages with Astro Content Collections

### Integration Points
- Posts directory: `src/content/posts/`
- Astro pages: `src/pages/`
- Components: `src/components/`

</codebase_context>

<specifics>
## Specific Ideas

- Clean, developer-focused typography
- Posts sorted by date (newest first)
- Draft posts hidden from public view

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 1 scope.

</deferred>

---

*Phase: 01-core-blog*
*Context gathered: 2026-03-28*
