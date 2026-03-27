# Stack Research — Personal Tech Blog

## Recommended Stack

### Content Management
- **Markdown files** with frontmatter (YAML) for metadata
- Git-based workflow for content versioning

### Site Generation
- **Static Site Generator (SSG)** — pre-rendered HTML for fast loading
- Popular options: Hugo, Jekyll, Eleventy (11ty), Astro, Next.js

### Recommended Choice: **Astro**
- Modern, fast, and developer-friendly
- Excellent support for markdown/MDX
- Built-in syntax highlighting for code blocks
- Island architecture if interactive features needed later
- Version: Astro 4.x+

### Code Highlighting
- **Shiki** — accurate syntax highlighting (used by VS Code)
- Supports 100+ languages

### Styling
- **Tailwind CSS** or vanilla CSS with CSS variables
- Clean, typography-focused design

### Search
- **Pagefind** — static search built into SSG
- Fast, no server required

### Hosting
- **Vercel**, **Netlify**, or **GitHub Pages** — free hosting for static sites
- Custom domain support

## What NOT to Use and Why

| Avoid | Reason |
|-------|--------|
| WordPress | Over-engineered for simple blog, security issues |
| Drupal | Same as WordPress — too complex |
| Database-backed CMS | Unnecessary complexity, slower, security concerns |
| Heavy JS frameworks (React/Vue SPA) | SEO issues, slower initial load, over-kill for blog |

## Confidence Levels

| Technology | Confidence | Rationale |
|------------|------------|-----------|
| Astro | High | Modern, well-maintained, perfect for blogs |
| Markdown + Frontmatter | High | Industry standard for developer blogs |
| Shiki | High | Best syntax highlighting available |
| Pagefind | Medium | Relatively new but solid for static search |
