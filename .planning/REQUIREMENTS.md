# Requirements — Personal Tech Blog System

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CONTENT-01 | Phase 1 | Pending |
| CONTENT-02 | Phase 1 | Pending |
| CONTENT-03 | Phase 1 | Pending |
| CONTENT-04 | Phase 1 | Pending |
| DISPLAY-01 | Phase 1 | Pending |
| DISPLAY-02 | Phase 1 | Pending |
| DISPLAY-03 | Phase 1 | Pending |
| ORG-01 | Phase 2 | Pending |
| ORG-02 | Phase 2 | Pending |
| ORG-03 | Phase 2 | Pending |
| ENHANCE-01 | Phase 3 | Pending |
| ENHANCE-02 | Phase 3 | Pending |
| ENHANCE-03 | Phase 3 | Pending |
| ENHANCE-04 | Phase 3 | Pending |

---

## v1 Requirements

### Content (CONTENT)

- [ ] **CONTENT-01**: User can write blog posts using Markdown with YAML frontmatter (title, date, description)
- [ ] **CONTENT-02**: User can embed code blocks with syntax highlighting for multiple programming languages (JS, Python, Go, Rust, etc.)
- [ ] **CONTENT-03**: User can mark posts as drafts (not visible when published)
- [ ] **CONTENT-04**: User can upload and reference images in posts

### Display (DISPLAY)

- [ ] **DISPLAY-01**: User can view a home page listing all published posts, sorted by date (newest first)
- [ ] **DISPLAY-02**: User can view a single post with clean, readable typography optimized for code content
- [ ] **DISPLAY-03**: User can view the site on mobile and desktop with responsive design

### Organization (ORG)

- [ ] **ORG-01**: User can organize posts by categories (e.g., Frontend, Backend, DevOps)
- [ ] **ORG-02**: User can tag posts with multiple tags for granular labeling
- [ ] **ORG-03**: User can view an archive of posts organized by year/month

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
