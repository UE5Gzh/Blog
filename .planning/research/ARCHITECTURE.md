# Architecture Research — Personal Tech Blog

## System Overview

Static site architecture with markdown-based content.

```
┌─────────────────────────────────────────────────────────────┐
│                      SOURCE CONTENT                         │
│  Markdown files with YAML frontmatter                      │
│  (posts/, pages/, assets/)                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   BUILD PROCESS                             │
│  Static Site Generator (Astro)                             │
│  - Markdown → HTML                                          │
│  - Syntax highlighting (Shiki)                              │
│  - Asset optimization                                       │
│  - Search index (Pagefind)                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    OUTPUT                                  │
│  Static HTML/CSS/JS files                                   │
│  - index.html, about.html, posts/*                         │
│  - CSS bundle                                               │
│  - Search index                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    HOSTING                                 │
│  CDN-backed static hosting (Vercel/Netlify/GitHub Pages)   │
└─────────────────────────────────────────────────────────────┘
```

## Major Components

### 1. Content Layer
- **posts/** — blog post markdown files
- **pages/** — static pages (about, 404)
- **assets/** — images, downloadable files
- **content config** — defines collection schemas

### 2. Layout/Template Layer
- **Base layout** — HTML shell with head, nav, footer
- **Post layout** — article-specific layout with TOC, sharing
- **Page layouts** — for static pages

### 3. Build/Generation Layer
- **Astro config** — site configuration, integrations
- **Build scripts** — generate search index, sitemaps

### 4. Styling Layer
- **Global CSS** — variables, typography, reset
- **Component styles** — scoped CSS for components
- **Responsive breakpoints** — mobile-first

## Data Flow

### Content Creation Flow
1. Author writes markdown file in `posts/`
2. Adds frontmatter (title, date, tags)
3. Commits to git
4. CI/CD triggers rebuild

### Page Generation Flow
1. SSG reads all markdown files
2. Parses frontmatter
3. Renders markdown to HTML
4. Applies syntax highlighting
5. Generates page with layout
6. Outputs static HTML

### Reader Flow
1. User visits URL
2. CDN serves static HTML (fast)
3. Browser renders page
4. No database calls, no server rendering

## Suggested Build Order

### Phase 1: Core Blog
1. Project setup (Astro)
2. Basic layout (nav, footer, base)
3. Post collection schema
4. Single post page template
5. Home page with post list
6. Syntax highlighting for code

### Phase 2: Organization
1. Category pages
2. Tag pages
3. Archive by date
4. RSS feed
5. Sitemap

### Phase 3: Enhancements
1. Search integration (Pagefind)
2. Table of contents
3. Reading time
4. Social sharing
5. Newsletter integration

## Build Dependencies

```
posts/*.md
    │
    ▼
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Astro     │────▶│   Shiki      │────▶│   HTML      │
│   Markdown  │     │   Highlight  │     │   + CSS     │
└─────────────┘     └──────────────┘     └─────────────┘
                                              │
                                              ▼
                                         ┌─────────────┐
                                         │  Pagefind   │
                                         │  (search)   │
                                         └─────────────┘
```
