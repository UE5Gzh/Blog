# Requirements — Personal Tech Blog System

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONTENT-01 | Phase 1 | Complete |
| CONTENT-02 | Phase 1 | Complete |
| CONTENT-03 | Phase 1 | Complete |
| CONTENT-04 | Phase 1 | Complete |
| DISPLAY-01 | Phase 1 | Complete |
| DISPLAY-02 | Phase 1 | Complete |
| DISPLAY-03 | Phase 1 | Complete |
| ORG-01 | Phase 2 | Complete |
| ORG-02 | Phase 2 | Complete |
| ORG-03 | Phase 2 | Complete |
| ENHANCE-01 | Phase 3 | Complete |
| ENHANCE-02 | Phase 3 | Complete |
| ENHANCE-03 | Phase 3 | Complete |
| ENHANCE-04 | Phase 3 | Complete |

---

## v1 Requirements

### Content (CONTENT)

- [x] **CONTENT-01**: User can write blog posts using Markdown with YAML frontmatter (title, date, description)
- [x] **CONTENT-02**: User can embed code blocks with syntax highlighting for multiple programming languages (JS, Python, Go, Rust, etc.)
- [x] **CONTENT-03**: User can mark posts as drafts (not visible when published)
- [x] **CONTENT-04**: User can upload and reference images in posts

### Display (DISPLAY)

- [x] **DISPLAY-01**: User can view a home page listing all published posts, sorted by date (newest first)
- [x] **DISPLAY-02**: User can view a single post with clean, readable typography optimized for code content
- [x] **DISPLAY-03**: User can view the site on mobile and desktop with responsive design

### Organization (ORG)

- [x] **ORG-01**: User can organize posts by categories (e.g., Frontend, Backend, DevOps)
- [x] **ORG-02**: User can tag posts with multiple tags for granular labeling
- [x] **ORG-03**: User can view an archive of posts organized by year/month

---

## v2 Requirements (Deferred)

- **ENHANCE-01**: User can search across all posts using full-text search
- **ENHANCE-02**: Posts display a table of contents auto-generated from headings
- **ENHANCE-03**: Posts display reading time estimate ("X min read")
- **ENHANCE-04**: Code blocks have a copy-to-clipboard button

---

## Out of Scope

| Exclusion | Reason |
|-----------|--------|
| User authentication | Personal blog, single author |
| Multi-user support | Only self writing |
| Comments system | Use third-party (Giscus/Disqus) if needed later |
| Newsletter system | External service (Mailchimp, etc.) if needed later |
| Analytics dashboard | Use external tools (Plausible, GA) |
| Paid content | Not monetized |
| WYSIWYG editor | Markdown is preferred for developers |
| Database | Static markdown files are sufficient |
