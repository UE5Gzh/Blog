# Features Research — Personal Tech Blog

## Table Stakes (Must-Have or Users Leave)

### Content Creation
- **Markdown editor** — write posts in markdown with preview
- **Frontmatter support** — title, date, tags, categories, description
- **Draft mode** — work in progress posts not visible to public
- **Code block syntax highlighting** — multiple languages

### Content Display
- **Home page** — list of published posts, newest first
- **Post page** — single post with clean reading experience
- **Responsive design** — works on mobile and desktop
- **Fast loading** — static HTML, minimal JS

### Organization
- **Categories** — broad grouping (e.g., "Frontend", "Backend", "DevOps")
- **Tags** — granular labeling (e.g., "react", "typescript", "tutorial")
- **Archive** — posts organized by year/month

### Navigation
- **Navigation menu** — home, about, categories
- **Related posts** — suggested posts at end of article
- **Previous/Next navigation** — easy browsing between posts

## Differentiators (Competitive Advantage)

### Developer Experience
- **Local development** — git workflow, local preview
- **MDX support** — embed React components in markdown
- **Custom components** — callouts, code tabs, embedPens

### Content Features
- **Search** — full-text search across all posts
- **Table of contents** — auto-generated from headings
- **Reading time estimate** — "5 min read"
- **Copy code button** — one-click code copying

### Engagement
- **Newsletter signup** — email subscription (third-party like Mailchimp)
- **Comments** — via Disqus, Giscus, or utterances
- **Social sharing** — buttons for Twitter, LinkedIn, etc.

## Anti-Features (Deliberately NOT Building)

| Anti-Feature | Reason |
|--------------|--------|
| User authentication | Not a community blog, just personal |
| Multi-user support | One author (self) |
| Paid content | Personal documentation, not monetized |
| Analytics dashboard | Use external tools (Google Analytics, Plausible) |
| WYSIWYG editor | Markdown is better for developers |
| Drag-and-drop media | External image hosting (imgix, cloudinary, or just URLs) |

## Complexity Notes

| Feature | Complexity | Notes |
|---------|------------|-------|
| Markdown + syntax highlighting | Low | Built into Astro |
| Categories/Tags | Low | Frontmatter + template logic |
| Search | Medium | Pagefind adds complexity but worth it |
| Table of contents | Low | Auto-generated from headings |
| Newsletter | Medium | External service integration |
| Comments | Medium | Third-party integration complexity |
