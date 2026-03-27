# Pitfalls Research — Personal Tech Blog

## Common Mistakes to Avoid

### 1. Over-Engineering Early

**Warning signs:**
- Setting up user authentication before having any users
- Building a custom CMS when markdown works fine
- Adding database when flat files suffice
- Planning for "scale" with zero traffic

**Prevention:**
- Start simple, add complexity only when needed
- A blog with 10 posts doesn't need Redis
- Personal blogs rarely need more than static hosting

**Phase mapping:** Address in Phase 1 (Core Blog)

### 2. Ignoring Code Highlighting

**Warning signs:**
- Code blocks without syntax highlighting
- Code that breaks on mobile
- No line numbers when debugging
- Poor contrast in code blocks

**Prevention:**
- Use Shiki or Prism for syntax highlighting
- Test code display on mobile devices
- Include copy button for code blocks
- Support common languages (JS, Python, Go, Rust, etc.)

**Phase mapping:** Address in Phase 1 (Core Blog)

### 3. Poor Typography and Readability

**Warning signs:**
- Long lines of text (hard to read)
- Poor contrast between body text and background
- Code blocks that break out of container
- No proper spacing between sections

**Prevention:**
- Use readable fonts (system fonts or Google Fonts like Inter)
- Line length max 65-75 characters
- Adequate line height (1.6-1.8)
- Generous whitespace

**Phase mapping:** Address in Phase 1 (Core Blog)

### 4. Neglecting SEO

**Warning signs:**
- No meta descriptions on posts
- Missing sitemap
- No Open Graph tags for social sharing
- Duplicate content issues

**Prevention:**
- Add meta tags to every page
- Generate sitemap.xml
- Add Open Graph and Twitter Card tags
- Use semantic HTML (article, header, nav, etc.)

**Phase mapping:** Address in Phase 2 (Organization)

### 5. Missing Search Functionality

**Warning signs:**
- Readers can't find related content
- No way to search past posts
- Users leave after reading one post

**Prevention:**
- Implement site search (Pagefind is great for static)
- Add related posts at end of articles
- Category and tag pages help navigation
- RSS feed for returning readers

**Phase mapping:** Address in Phase 3 (Enhancements)

### 6. Slow Page Load Times

**Warning signs:**
- Large images not optimized
- Too many JavaScript libraries
- No lazy loading
- Render-blocking CSS/JS

**Prevention:**
- Use static site generation (pre-rendered HTML)
- Optimize images (WebP, lazy loading)
- Minimize JavaScript
- Use CDN for hosting

**Phase mapping:** Address in hosting deployment

### 7. Broken Links After Migration

**Warning signs:**
- Moving from WordPress/custom CMS
- Changing URL structure
- Links to old post URLs

**Prevention:**
- Set up redirects (Netlify/Vercel support this)
- Keep URL structure stable
- Use 301 redirects for moved content
- Update internal links during migration

**Phase mapping:** Address during migration/setup

### 8. Forgetting RSS

**Warning signs:**
- No RSS feed available
- Feed doesn't include full content
- Feed is broken or invalid

**Prevention:**
- Most SSGs have RSS plugins (Astro does)
- Include full content in RSS, not just excerpt
- Validate RSS feed periodically

**Phase mapping:** Address in Phase 2 (Organization)

## Quick Wins to Include Early

| Win | Impact | Effort |
|-----|--------|--------|
| Syntax highlighting | High | Low |
| Responsive design | High | Low |
| RSS feed | Medium | Low |
| Open Graph tags | Medium | Low |
| Sitemap | Medium | Low |
| Clean typography | High | Medium |
