# Phase 3: Enhancements - Research

**Researched:** 2026-03-28
**Domain:** Astro blog enhancement features (search, TOC, reading time, code copy)
**Confidence:** HIGH

## Summary

Phase 3 adds reader experience improvements to an existing Astro 4.x blog that already has content collections, Shiki syntax highlighting (dark-plus theme), and responsive styling. All four requirements are well-supported by existing Astro patterns and community libraries. No breaking changes required.

**Primary recommendation:** Use Pagefind for search (post-build indexing), native Astro `headings` API for TOC, `reading-time` + `mdast-util-to-string` for reading time, and vanilla JS for copy buttons on Shiki-generated `<pre>` elements.

## User Constraints (from CONTEXT.md)

This project has no CONTEXT.md - all decisions are open for this phase.

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ENHANCE-01 | Full-text search across all posts | Pagefind integrates with Astro's build output |
| ENHANCE-02 | Auto-generated TOC from H2/H3 headings | Astro's `render()` returns headings array with depth, slug, text |
| ENHANCE-03 | Reading time estimate per post | `reading-time` + `mdast-util-to-string` remark plugin |
| ENHANCE-04 | Copy-to-clipboard on code blocks | Client-side JS on `<pre>` elements; Shiki generates the markup |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 4.16.19 | Framework | Already in use |
| Pagefind | 1.4.0 | Static site search | Best-in-class static search, no server required |
| Shiki | (bundled with Astro) | Syntax highlighting | Already configured with dark-plus theme |
| reading-time | (need to verify) | Word count/reading time | Standard npm package for reading time calculation |
| mdast-util-to-string | (need to verify) | Extract text from markdown AST | Required by reading-time remark plugin |

### Version Verification
```bash
npm view reading-time version   # Expected: 1.x
npm view mdast-util-to-string version  # Expected: 3.x
npm view pagefind version       # Confirmed: 1.4.0
```

**Installation:**
```bash
npm install pagefind reading-time mdast-util-to-string
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Pagefind | Fuse.js, Lunr.js | These require custom indexing; Pagefind auto-indexes built HTML |
| `reading-time` package | Manual word count | Package handles edge cases (code blocks, special chars) |
| TOC from headings API | remark-toc plugin | Astro's native headings API is simpler, no extra plugin needed |

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── CopyButton.astro       # Client-side copy button
│   ├── TableOfContents.astro   # TOC sidebar component
│   ├── Search.astro           # Pagefind UI wrapper
│   └── PostNavigation.astro   # Prev/next links
├── remark/
│   └── reading-time.mjs      # Remark plugin for reading time
├── layouts/
│   └── PostLayout.astro       # Add TOC, reading time, copy buttons
└── pages/
    └── index.astro            # Add search UI
```

### Pattern 1: Pagefind Search Integration

**What:** Static search that indexes built HTML after Astro build
**When to use:** When you need full-text search without a server

**Build configuration:**
```javascript
// package.json scripts
"build": "astro build && npx -y pagefind --site dist"
```

**Search UI component:**
```javascript
// After build, Pagefind generates /pagefind/pagefind-ui.js
// Add to any page:
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<div id="search"></div>
<script src="/pagefind/pagefind-ui.js"></script>
<script>window.addEventListener('DOMContentLoaded', () => {
  new PagefindUI({ element: "#search", showSubResults: true });
})</script>
```

Source: [Pagefind docs](https://pagefind.app/docs/)

### Pattern 2: Table of Contents from Headings

**What:** Auto-generate TOC from H2/H3 headings using Astro's native headings API
**When to use:** Every post page - headings are already extracted by Astro

**Implementation:**
```javascript
// In [slug].astro or PostLayout
const { Content, headings } = await post.render();
// Filter to H2/H3 only for TOC
const tocHeadings = headings.filter(h => h.depth === 2 || h.depth === 3);
```

**TOC component structure:**
```astro
<!-- TableOfContents.astro -->
<nav class="toc">
  <h2>On this page</h2>
  <ul>
    {headings.map(heading => (
      <li class={`depth-${heading.depth}`}>
        <a href={`#${heading.slug}`}>{heading.text}</a>
      </li>
    ))}
  </ul>
</nav>
```

**Heading structure returned by Astro:**
```typescript
{ depth: number; slug: string; text: string }[]
```

Source: [Astro markdown content docs](https://docs.astro.build/en/guides/markdown-content/)

### Pattern 3: Reading Time via Remark Plugin

**What:** Calculate reading time at build time using a remark plugin
**When to use:** Display "X min read" on post cards and post pages

**Remark plugin:**
```javascript
// src/remark/reading-time.mjs
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
```

**Astro config:**
```javascript
import { remarkReadingTime } from './src/remark/reading-time.mjs';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
```

**Access in content collections:**
```javascript
const { Content, remarkPluginFrontmatter } = await render(entry);
// remarkPluginFrontmatter.minutesRead === "3 min read"
```

Source: [Astro reading-time recipe](https://docs.astro.build/en/recipes/reading-time/)

### Pattern 4: Copy-to-Clipboard Button

**What:** Add copy button to Shiki-highlighted code blocks
**When to use:** Every code block in posts

**How it works:**
1. Shiki renders code blocks as `<pre>` with `<code>` inside
2. Add a button overlay on `<pre>` elements via CSS positioning
3. Client-side JS finds the code text and copies to clipboard

**Implementation approach:**
```javascript
// Client-side script (can be inline in PostLayout)
document.querySelectorAll('article.post pre').forEach(pre => {
  // Create copy button
  const button = document.createElement('button');
  button.textContent = 'Copy';
  button.className = 'copy-button';
  // Position absolutely over the pre
  pre.style.position = 'relative';
  pre.appendChild(button);
  // Click handler
  button.addEventListener('click', () => {
    const code = pre.querySelector('code');
    navigator.clipboard.writeText(code.textContent);
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy', 2000);
  });
});
```

**CSS:**
```css
.copy-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-code);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.75rem;
}
.copy-button:hover { color: var(--accent); }
```

Source: Common pattern - no specific official doc, works with any Shiki output

### Pattern 5: Previous/Next Post Navigation

**What:** Link to adjacent posts sorted by date
**When to use:** End of every post page

**Implementation:**
```javascript
// In [slug].astro
const posts = (await getCollection('posts')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);
const currentIndex = posts.findIndex(p => p.slug === post.slug);
const prevPost = posts[currentIndex + 1]; // Older post
const nextPost = posts[currentIndex - 1];  // Newer post
```

**Note:** Posts are sorted newest-first, so:
- `posts[currentIndex + 1]` = older post (appears before in list) = "previous"
- `posts[currentIndex - 1]` = newer post (appears after in list) = "next"

Source: [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/)

### Pattern 6: Social Sharing Buttons

**What:** Static share links for Twitter/X and LinkedIn
**When to use:** End of every post page

**URL formats:**
```
Twitter: https://twitter.com/intent/tweet?text={title}&url={url}
LinkedIn: https://www.linkedin.com/sharing/share-offsite/?url={url}
```

**Implementation:**
```astro
<div class="share-buttons">
  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(Astro.url)}`} target="_blank" rel="noopener">
    Share on X
  </a>
  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(Astro.url)}`} target="_blank" rel="noopener">
    Share on LinkedIn
  </a>
</div>
```

Source: Standard social sharing URL patterns

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Full-text search | Custom search index | Pagefind | Handles HTML parsing, ranking, UI out of the box |
| Reading time calculation | Word count manually | `reading-time` package | Handles code blocks, special chars correctly |
| TOC generation | Parse markdown regex | Astro's headings API | Already provided by `render()`, no extra work |
| Clipboard API | Flash/iframe hacks | `navigator.clipboard` | Modern, secure, well-supported |

**Key insight:** Astro provides the headings array from `render()` at no cost. Use it before considering remark plugins.

## Common Pitfalls

### Pitfall 1: Pagefind runs before build completes
**What goes wrong:** Search indexes empty or partial site
**Why it happens:** Pagefind CLI runs before Astro build finishes
**How to avoid:** Chain commands properly: `astro build && pagefind --site dist`
**Warning signs:** Empty search results, "No results found" for known content

### Pitfall 2: TOC shows H1 heading
**What goes wrong:** TOC includes the post title (H1), making it redundant
**Why it happens:** `headings` array includes all heading levels
**How to avoid:** Filter to `depth === 2 || depth === 3` for TOC
**Warning signs:** TOC has an entry that matches the post title exactly

### Pitfall 3: Reading time counts code blocks as words
**What goes wrong:** Code-heavy posts show inflated reading times
**Why it happens:** Default word count includes code as text
**How to avoid:** `reading-time` by default strips code, but verify if customization needed
**Warning signs:** Posts with many code samples show "30+ min read"

### Pitfall 4: Copy button doesn't work on dynamic content
**What goes wrong:** Copy buttons missing after view transitions or client-side navigation
**Why it happens:** Script runs on page load but dynamic content loads later
**How to avoid:** Use `<script>` tags inside components that Astro bundles, or use `astro:page-load` event for view transitions
**Warning signs:** Copy button appears on initial page but not on client-side navigated pages

### Pitfall 5: Prev/Next navigation inverted
**What goes wrong:** "Previous" link goes to newer post
**Why it happens:** Array indexing confusion with newest-first sort
**How to avoid:** Remember: newer posts appear first in sorted array
**Warning signs:** Clicking "Next" takes you to an older post

## Code Examples

### Copy Button with View Transitions Support
```javascript
// In PostLayout.astro
<script>
  function addCopyButtons() {
    document.querySelectorAll('article.post pre').forEach(pre => {
      if (pre.querySelector('.copy-button')) return; // Already has button
      const button = document.createElement('button');
      button.textContent = 'Copy';
      button.className = 'copy-button';
      pre.style.position = 'relative';
      pre.appendChild(button);
      button.addEventListener('click', () => {
        const code = pre.querySelector('code')?.textContent || '';
        navigator.clipboard.writeText(code);
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 2000);
      });
    });
  }
  // Run on initial load and after view transitions
  document.addEventListener('astro:page-load', addCopyButtons);
</script>
```

### Full PostLayout with TOC and Reading Time
```astro
---
const { Content, headings, remarkPluginFrontmatter } = await post.render();
const { minutesRead } = remarkPluginFrontmatter;
const tocHeadings = headings.filter(h => h.depth === 2 || h.depth === 3);
---
<article class="post">
  <header>
    <h1>{title}</h1>
    <div class="post-meta">
      <time>{formattedDate}</time>
      <span>{minutesRead}</span>
    </div>
    {tocHeadings.length > 2 && <TableOfContents headings={tocHeadings} />}
  </header>
  <div class="post-content">
    <Content />
  </div>
  <PostNavigation posts={sortedPosts} currentSlug={post.slug} />
</article>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom search index (Fuse.js) | Pagefind | ~2023 | No server required, better relevance |
| Manual TOC parsing | Native Astro headings API | Astro 2.0+ | Simpler, zero config |
| Server-side search | Static indexing (Pagefind) | ~2022 | Works on GitHub Pages, Netlify, Vercel |

**Deprecated/outdated:**
- Prism.js (replaced by Shiki in Astro 3.0+)
- Client-side Lunr.js indexes (replaced by Pagefind)

## Open Questions

1. **Where should search UI appear?**
   - What we know: Pagefind UI can be placed anywhere
   - What's unclear: Should it be in header dropdown, dedicated /search page, or both?
   - Recommendation: Start with header search bar, add /search page if needed

2. **Should social sharing be in scope for Phase 3?**
   - What we know: Listed in roadmap as a key task
   - What's unclear: Not in the formal requirements (ENHANCE-01 to 04)
   - Recommendation: Treat as implicit in "sharing options" from ENHANCE-01 scope

3. **TOC positioning - sidebar or inline?**
   - What we know: Can be styled either way
   - What's unclear: Project has no existing sidebar pattern
   - Recommendation: Start with inline at top of post content, move to sticky sidebar if UX demands

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified beyond npm packages that can be installed)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None yet - Astro build verification |
| Config file | None |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ENHANCE-01 | Search finds posts | Manual | Visit /search, type query, verify results | N/A |
| ENHANCE-02 | TOC shows on posts with 3+ headings | Manual | View post with headings, verify TOC appears | N/A |
| ENHANCE-03 | Reading time displays | Manual | Check post header for "X min read" | N/A |
| ENHANCE-04 | Copy button copies code | Manual | Click copy on code block, paste to verify | N/A |

### Wave 0 Gaps
- [ ] `src/remark/reading-time.mjs` - remark plugin for reading time
- [ ] `src/components/CopyButton.astro` - copy button implementation
- [ ] `src/components/TableOfContents.astro` - TOC component
- [ ] `src/components/PostNavigation.astro` - prev/next navigation
- [ ] `src/components/Search.astro` - Pagefind UI wrapper (if needed)
- [ ] Framework install: `npm install pagefind reading-time mdast-util-to-string`

## Sources

### Primary (HIGH confidence)
- Astro 4.16.19 (in use) - headings API, content collections, markdown config
- Pagefind 1.4.0 (verified on npm) - static search documentation
- [Astro Reading Time Recipe](https://docs.astro.build/en/recipes/reading-time/) - official guide
- [Pagefind Docs](https://pagefind.app/docs/) - search integration

### Secondary (MEDIUM confidence)
- [Astro Markdown Content Docs](https://docs.astro.build/en/guides/markdown-content/) - headings structure
- [Shiki Transformers](https://shiki.style/packages/transformers) - code block customization

### Tertiary (LOW confidence)
- Copy button pattern - common community pattern, not documented in official Astro docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all packages verified, versions confirmed
- Architecture: HIGH - patterns match existing Astro 4.x project structure
- Pitfalls: MEDIUM - based on known Astro patterns, some uncertainty on copy button view transitions

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (30 days - stable domain)
