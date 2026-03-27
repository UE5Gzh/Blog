# Roadmap — Personal Tech Blog System

**3 phases** | **11 requirements mapped** | All v1 requirements covered ✓

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Core Blog | 1/1 | Complete   | 2026-03-27 |
| 2 | Organization | Content discovery and navigation | ORG-01, ORG-02, ORG-03 | 4 |
| 3 | Enhancements | User experience improvements | ENHANCE-01, ENHANCE-02, ENHANCE-03, ENHANCE-04 | 4 |

---

## Phase 1: Core Blog

**Goal:** A working blog where I can write, publish, and read posts with excellent code presentation.

**Requirements:** CONTENT-01, CONTENT-02, CONTENT-03, CONTENT-04, DISPLAY-01, DISPLAY-02, DISPLAY-03

### Success Criteria

1. **Write markdown posts** — Author creates a new post in `posts/` directory with markdown and frontmatter, and it appears on the home page after build
2. **Code highlighting works** — Code blocks in posts display with proper syntax highlighting for at least JS, Python, Go, Rust
3. **Drafts hidden** — Posts marked as draft in frontmatter do not appear on the home page or in builds
4. **Images display** — Author references an image in markdown, and it renders correctly in the published post
5. **Responsive on mobile** — Home page and post pages are readable and well-formatted on a 375px wide mobile screen

### Key Tasks

- Set up Astro project with blog template
- Configure content collection schema (title, date, description, draft, tags, category)
- Create base layout with navigation and footer
- Implement home page with post list
- Create single post page template
- Add Shiki syntax highlighting
- Add responsive CSS (mobile-first)
- Configure image handling

**Plans:** 1/1 plans complete

**Plan list:**
- [x] 01-core-blog/01-PLAN.md -- Foundation: Astro project setup, content schema, base layout
- [x] 01-core-blog/02-PLAN.md -- Feature implementation: Home page cards, post page, code highlighting, responsive CSS

---

## Phase 2: Organization

**Goal:** Help readers discover and navigate content through categories, tags, and archives.

**Requirements:** ORG-01, ORG-02, ORG-03

### Success Criteria

1. **Category pages work** — Clicking a category shows all posts in that category
2. **Tag pages work** — Clicking a tag shows all posts with that tag
3. **Archive accessible** — Archive page shows posts grouped by year and month
4. **Navigation clear** — Readers can find category/tag/archive links from any page

### Key Tasks

- Create category pages (one per unique category)
- Create tag pages (one per unique tag)
- Create archive page with year/month grouping
- Add category/tag links to post listings
- Add navigation links to header/footer
- Generate RSS feed with all published posts
- Generate sitemap.xml

---

## Phase 3: Enhancements

**Goal:** Improve reader experience with search, navigation aids, and sharing options.

**Requirements:** ENHANCE-01, ENHANCE-02, ENHANCE-03, ENHANCE-04

### Success Criteria

1. **Search finds posts** — Reader types a query and sees matching posts within 500ms
2. **TOC navigable** — Long posts show a table of contents that scrolls to correct heading when clicked
3. **Reading time shown** — Each post displays estimated reading time (e.g., "5 min read")
4. **Code copyable** — Reader clicks copy button on code block and content is copied to clipboard

### Key Tasks

- Integrate Pagefind for full-text search
- Auto-generate table of contents from headings (H2, H3)
- Calculate and display reading time per post
- Add copy-to-clipboard button to code blocks
- Add social sharing buttons (Twitter, LinkedIn)
- Add "previous/next post" navigation

---

## Phase Completion Criteria

Each phase is complete when:
- All requirements are implemented
- All success criteria verified
- Code is committed to git
- No blocking issues remain
