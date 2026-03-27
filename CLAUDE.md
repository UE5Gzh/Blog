<!-- GSD:project-start source:PROJECT.md -->
## Project

**个人技术博客系统 (Personal Tech Blog System)**

A personal technical blog system for sharing programming tutorials, code insights, and tech learnings. Built for developers who want to document and share their technical journey.

**Core Value:** A clean, developer-focused blog platform that makes it easy to write, organize, and share technical content with good code presentation.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
