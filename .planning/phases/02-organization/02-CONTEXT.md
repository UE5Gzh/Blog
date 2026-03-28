# Phase 2: Organization - Context

**Gathered:** 2026-03-28
**Status:** Ready for planning

<domain>
## Phase Boundary

Help readers discover and navigate content through categories, tags, and archives. This phase adds content organization features: category pages, tag pages, archive page, and RSS/sitemap generation.
</domain>

<decisions>
## Implementation Decisions

### Navigation Link Placement
- **D-05:** Header dropdown menu — Navigation links (Categories, Tags, Archive) placed in header navigation bar as dropdown menus

### RSS and Sitemap
- **D-06:** Generate both RSS feed and sitemap.xml — RSS feed at /rss.xml, sitemap.xml at /sitemap.xml

### URL Structure
- **D-07:** URL structure defaults to Astro conventions:
  - Categories: /categories/[category]
  - Tags: /tags/[tag]
  - Archive: /archive

### Inherited from Phase 1
- D-01: Card-based layout (continues for listing pages)
- D-02: Dark theme (dark-plus code highlighting)
- D-03: Local image storage
- D-04: Dark mode only

</decisions>

<canonical_refs>
## Canonical References

### Project Documents
- `.planning/PROJECT.md` — Personal tech blog vision and scope
- `.planning/REQUIREMENTS.md` — Organization requirements (ORG-01, ORG-02, ORG-03)
- `.planning/ROADMAP.md` — Phase 2 goals and success criteria
- `.planning/phases/01-core-blog/01-CONTEXT.md` — Phase 1 decisions (inherit dark theme, card layout)

### Existing Code
- `src/content/config.ts` — Schema with category (optional string) and tags (string array)
- `src/components/Header.astro` — Navigation component to extend with dropdown
- `src/layouts/BaseLayout.astro` — Base layout for all pages

### Sample Data
- `src/content/posts/first-post.md` — category: "General", tags: ["announcement", "meta"]
- `src/content/posts/code-example.md` — category: "Development", tags: ["code", "testing"]

</canonical_refs>

<codebase_context>
## Existing Code Insights

### Project Status
- Phase 1 complete — basic blog functional
- Astro framework with content collections
- Dark theme CSS variables defined in global.css
- PostCard component available for reuse on listing pages

### Established Patterns
- Dynamic routes: src/pages/posts/[slug].astro
- Content collection queries via getCollection('posts')
- Filtering drafts: posts.filter(post => !post.data.draft)
- Sorting by date descending

### Integration Points
- Header.astro — add dropdown navigation here
- New pages: /categories, /tags, /archive, /rss.xml, /sitemap.xml

</codebase_context>

<specifics>
## Specific Ideas

- Category/tag listing pages should reuse PostCard component for consistency
- Archive page groups posts by year then month
- RSS feed includes all published posts (not drafts)
- Sitemap includes all published post URLs

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 2 scope.

</deferred>

---

*Phase: 02-organization*
*Context gathered: 2026-03-28*
