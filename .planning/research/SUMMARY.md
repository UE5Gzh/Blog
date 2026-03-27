# Research Summary — Personal Tech Blog System

## Key Findings

### Stack
- **Astro** is the recommended SSG — modern, fast, excellent markdown/code support
- **Markdown + YAML frontmatter** for content management
- **Shiki** for syntax highlighting (VS Code-quality)
- **Pagefind** for static search
- **Static hosting** on Vercel/Netlify/GitHub Pages

### Table Stakes
- Markdown-based content with syntax highlighting
- Clean, readable typography optimized for code
- Categories and tags for organization
- RSS feed and sitemap
- Responsive design (mobile-friendly)
- Fast loading (static HTML)

### Watch Out For
- **Over-engineering** — start simple, add complexity only when needed
- **Poor code display** — syntax highlighting is essential for dev blog
- **Slow pages** — static generation avoids this
- **Broken RSS** — easy to forget, readers depend on it
- **Missing search** — readers can't find old content

### Differentiators Worth Adding
- MDX support (embed components in markdown)
- Table of contents auto-generation
- Reading time estimate
- Copy code button
- Newsletter/social integration

### Anti-Features to Skip
- User authentication (personal blog, one author)
- Database-backed CMS (overkill)
- Multi-language support (not needed)
- Comments (use third-party if needed)

## Next Steps
Research feeds directly into requirements definition. Focus on table stakes for v1, differentiators for v2+.

---
*Synthesized from parallel research agents*
