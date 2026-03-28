# Phase 2: Organization - Research

**Researched:** 2026-03-28
**Domain:** Astro content organization, RSS/sitemap generation, navigation patterns
**Confidence:** HIGH

## Summary

Phase 2 adds content discovery features: category pages, tag pages, archive page, RSS feed, and sitemap. All are well-supported by Astro's static generation model and ecosystem packages. The key technical decisions are using `@astrojs/rss` and `@astrojs/sitemap` for feed generation, dynamic routing with `getStaticPaths` for category/tag pages, and CSS-only dropdowns for navigation.

**Primary recommendation:** Use Astro's dynamic routing to generate one page per unique category/tag at build time, integrate `@astrojs/rss` and `@astrojs/sitemap` packages, and implement header dropdowns with pure CSS for zero-JS dependency.

## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-05:** Header dropdown menu for Categories, Tags, Archive navigation links
- **D-06:** Generate both RSS feed (/rss.xml) and sitemap.xml (/sitemap.xml)
- **D-07:** URL structure defaults to Astro conventions: /categories/[category], /tags/[tag], /archive

### Inherited from Phase 1
- D-01: Card-based layout (continues for listing pages)
- D-02: Dark theme (dark-plus code highlighting)
- D-03: Local image storage
- D-04: Dark mode only

### Claude's Discretion
- CSS implementation details for dropdown menus
- Specific grouping logic for archive page (year/month structure already decided, internal implementation open)

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ORG-01 | Category pages - clicking a category shows all posts in that category | Dynamic routing with `[category].astro`, `getCollection` filtering |
| ORG-02 | Tag pages - clicking a tag shows all posts with that tag | Dynamic routing with `[tag].astro`, `getCollection` filtering with `data.tags.includes()` |
| ORG-03 | Archive page - posts grouped by year/month | JavaScript grouping at build time, `reduce()` pattern |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 6.1.1 (project) | Framework | Project base |
| @astrojs/rss | 4.0.18 | RSS feed generation | Official Astro package |
| @astrojs/sitemap | 3.7.2 | Sitemap generation | Official Astro package |

### Installation
```bash
npm install @astrojs/rss @astrojs/sitemap
```

**Version verification:**
- @astrojs/rss: 4.0.18 (published ~late 2024)
- @astrojs/sitemap: 3.7.2 (published ~late 2024)
- astro: 6.1.1 (project uses 4.0.0+, works with both packages)

## Architecture Patterns

### Recommended Project Structure
```
src/
├── pages/
│   ├── index.astro
│   ├── archive.astro              # Archive page
│   ├── rss.xml.js                 # RSS feed endpoint
│   ├── categories/
│   │   └── [category].astro       # Dynamic category pages
│   ├── tags/
│   │   └── [tag].astro            # Dynamic tag pages
│   └── posts/
│       └── [slug].astro
├── components/
│   ├── Header.astro               # Extended with dropdowns
│   └── PostCard.astro             # Reused for all listings
```

### Pattern 1: Dynamic Category/Tag Pages
**What:** Generate static pages for each unique category and tag at build time
**When to use:** ORG-01 and ORG-02 requirements
**Example (category page):**
```astro
---
// src/pages/categories/[category].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const categories = [...new Set(posts.map(post => post.data.category).filter(Boolean))];

  return categories.map(category => ({
    params: { category },
    props: {
      category,
      posts: posts.filter(post => post.data.category === category)
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    },
  }));
}

const { category, posts } = Astro.props;
---
<BaseLayout title={`Category: ${category}`}>
  <h1>Category: {category}</h1>
  <div class="post-grid">
    {posts.map(post => <PostCard post={post} />)}
  </div>
</BaseLayout>
```
**Source:** Astro docs - dynamic routing patterns

**Example (tag page):**
```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];

  return tags.map(tag => ({
    params: { tag },
    props: {
      tag,
      posts: posts.filter(post => post.data.tags.includes(tag))
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    },
  }));
}

const { tag, posts } = Astro.props;
---
<BaseLayout title={`Tag: ${tag}`}>
  <h1>Tag: {tag}</h1>
  <div class="post-grid">
    {posts.map(post => <PostCard post={post} />)}
  </div>
</BaseLayout>
```
**Source:** Astro docs - content collection filtering

### Pattern 2: RSS Feed Endpoint
**What:** Generate `/rss.xml` with all published posts
**When to use:** D-06 requirement
**Example:**
```javascript
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return rss({
    title: 'Personal Tech Blog',
    description: 'Sharing programming tutorials and insights',
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
```
**Source:** Astro RSS docs - content collections pattern

**Note:** Requires `site` URL configured in `astro.config.mjs` for `context.site` to work.

### Pattern 3: Sitemap Integration
**What:** Auto-generate `/sitemap.xml` from all site pages
**When to use:** D-06 requirement
**Example (astro.config.mjs):**
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-blog-url.com',
  integrations: [mdx(), sitemap()],
});
```
**Source:** Astro sitemap docs

### Pattern 4: Archive Page with Year/Month Grouping
**What:** Group posts by year, then by month within each year
**When to use:** ORG-03 requirement
**Example:**
```astro
---
// src/pages/archive.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';

const allPosts = await getCollection('posts', ({ data }) => !data.draft);
const sortedPosts = allPosts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

// Group by year
const postsByYear = sortedPosts.reduce((acc, post) => {
  const year = post.data.date.getFullYear();
  if (!acc[year]) acc[year] = [];
  acc[year].push(post);
  return acc;
}, {});

// Then group each year by month
const archive = Object.entries(postsByYear).map(([year, yearPosts]) => ({
  year: parseInt(year),
  months: Object.entries(
    yearPosts.reduce((months, post) => {
      const month = post.data.date.getMonth();
      if (!months[month]) months[month] = [];
      months[month].push(post);
      return months;
    }, {})
  ).map(([month, monthPosts]) => ({
    month: parseInt(month),
    posts: monthPosts,
  })),
}));
---
<BaseLayout title="Archive">
  <h1>Archive</h1>
  {archive.map(yearData => (
    <section>
      <h2>{yearData.year}</h2>
      {yearData.months.map(({ month, posts }) => (
        <div class="month-group">
          <h3>{new Date(yearData.year, month).toLocaleDateString('en-US', { month: 'long' })}</h3>
          <ul>
            {posts.map(post => (
              <li><a href={`/posts/${post.slug}/`}>{post.data.title}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  ))}
</BaseLayout>
```
**Source:** Standard JavaScript reduce/grouping pattern adapted for Astro

### Pattern 5: Header Dropdown Navigation
**What:** CSS-only dropdown menus for Categories, Tags, Archive links
**When to use:** D-05 requirement
**Example (CSS-only, no JS):**
```css
/* Dropdown container */
.nav-item {
  position: relative;
}

.nav-item:hover .dropdown,
.nav-item:focus-within .dropdown {
  display: block;
}

/* Dropdown menu */
.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  min-width: 150px;
  z-index: 100;
}

.dropdown a {
  display: block;
  padding: var(--space-2) var(--space-4);
}
```
**Source:** Standard CSS dropdown pattern, no framework required

**Mobile consideration:** On mobile, dropdowns may need JS toggle or should stack as expandable sections. Mobile breakpoint at 640px (matches existing Header.astro).

### Pattern 6: PostCard with Category Link
**What:** Add category link to PostCard component for cross-navigation
**When to use:** Adding category/tag links to post listings (from ROADMAP key task)
**Example:**
```astro
<!-- Add to PostCard.astro after tags -->
{post.data.category && (
  <a href={`/categories/${post.data.category}`} class="category-link">
    {post.data.category}
  </a>
)}
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| RSS feed generation | Custom XML endpoint | @astrojs/rss | Handles RSS spec compliance, encoding, date formatting |
| Sitemap generation | Custom XML crawler | @astrojs/sitemap | Auto-discovers all pages, handles static generation |
| Category/tag path generation | Manual URL mapping | Dynamic routing with getStaticPaths | Astro handles param mapping automatically |

**Key insight:** RSS and sitemap formats have subtle compliance requirements (date formats, XML escaping, proper MIME types). Official packages handle these correctly.

## Common Pitfalls

### Pitfall 1: Filtering Drafts on Dynamic Routes
**What goes wrong:** Category/tag pages include draft posts because filter is applied incorrectly
**Why it happens:** `getStaticPaths` runs at build time without filter context
**How to avoid:** Always filter drafts inside `getStaticPaths`:
```astro
export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  // ... rest of paths
}
```
**Warning signs:** Draft posts appearing on category pages after build

### Pitfall 2: Missing `site` URL in astro.config
**What goes wrong:** RSS feed and sitemap fail to generate or use wrong URLs
**Why it happens:** `context.site` is undefined without `site:` in config
**How to avoid:** Always set `site: 'https://your-actual-url.com'` in astro.config.mjs before generating feeds
**Warning signs:** RSS items have `link: "/" ` instead of full URLs

### Pitfall 3: Optional Category Causes undefined Routes
**What goes wrong:** Posts without a category cause `undefined` in category pages
**Why it happens:** `post.data.category` is optional, and `[category].astro` tries to create a path for it
**How to avoid:** Filter out undefined/null categories when building paths:
```javascript
const categories = [...new Set(posts.map(post => post.data.category).filter(Boolean))];
```

### Pitfall 4: Tag Case Sensitivity
**What goes wrong:** Tags "Astro" and "astro" create separate tag pages
**Why it happens:** Tags are stored as-is from frontmatter, no normalization
**How to avoid:** Document tag conventions (lowercase recommended), or normalize during path generation:
```javascript
const tags = [...new Set(posts.flatMap(post =>
  post.data.tags.map(t => t.toLowerCase())
))];
```

## Code Examples

### Complete Category Page (src/pages/categories/[category].astro)
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const categories = [...new Set(
    posts.map(post => post.data.category).filter(Boolean)
  )];

  return categories.map(category => ({
    params: { category },
    props: {
      category,
      posts: posts
        .filter(post => post.data.category === category)
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
    },
  }));
}

const { category, posts } = Astro.props;
---

<BaseLayout title={`${category} | Categories`} description={`All posts in the ${category} category`}>
  <section class="category-header">
    <h1>Category: {category}</h1>
    <p class="post-count">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
  </section>

  <section class="posts-grid">
    {posts.map(post => <PostCard post={post} />)}
  </section>
</BaseLayout>
```

### Complete Tag Page (src/pages/tags/[tag].astro)
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];

  return tags.map(tag => ({
    params: { tag },
    props: {
      tag,
      posts: posts
        .filter(post => post.data.tags.includes(tag))
        .sort((a, b) => b.data.date.getTime() - a.data.date.getTime()),
    },
  }));
}

const { tag, posts } = Astro.props;
---

<BaseLayout title={`${tag} | Tags`} description={`All posts tagged with ${tag}`}>
  <section class="tag-header">
    <h1>Tag: {tag}</h1>
    <p class="post-count">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
  </section>

  <section class="posts-grid">
    {posts.map(post => <PostCard post={post} />)}
  </section>
</BaseLayout>
```

### RSS Feed Endpoint (src/pages/rss.xml.js)
```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Personal Tech Blog',
    description: 'Sharing programming tutorials and insights',
    site: context.site,
    items: sortedPosts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
```

### Sitemap Config (astro.config.mjs)
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-blog-url.com', // Required for sitemap
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      langs: ['javascript', 'python', 'go', 'rust', 'typescript', 'bash', 'json', 'yaml'],
    },
  },
});
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom RSS XML generation | @astrojs/rss package | ~2022 | RSS spec compliance, easier updates |
| Manual sitemap creation | @astrojs/sitemap integration | ~2022 | Auto-discovers all routes |
| JS dropdown menus | CSS-only dropdowns with :hover/:focus-within | ~2018+ | Zero JS dependency, better performance |

**Deprecated/outdated:**
- None relevant to this phase

## Open Questions

1. **Should category/tag pages be linked from the PostCard component?**
   - What we know: ROADMAP says "Add category/tag links to post listings"
   - Recommendation: Add category link (if present) and tag links to PostCard footer

2. **Should the Header dropdown show all categories/tags or just top-level links?**
   - What we know: D-05 says "dropdown menus" for Categories, Tags, Archive
   - Recommendation: Dropdown shows top categories/tags (first 5-10), Archive is a direct link since it's a single page

3. **Should the site URL in astro.config be validated/changed?**
   - What we know: Currently set to `https://your-blog-url.com` placeholder
   - This is a placeholder that must be updated for RSS/sitemap to work correctly

## Environment Availability

**Step 2.6: SKIPPED** - No external dependencies beyond npm packages. All required tools (Node.js, npm) are already verified by existing project setup.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None - manual verification |
| Config file | N/A |
| Quick run command | `npm run build` |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ORG-01 | Category pages generated | Build verification | `npm run build` | Need src/pages/categories/[category].astro |
| ORG-02 | Tag pages generated | Build verification | `npm run build` | Need src/pages/tags/[tag].astro |
| ORG-03 | Archive page with year/month | Manual | Navigate to /archive | Need src/pages/archive.astro |
| D-05 | Header dropdown menus | Manual | Click nav links | Need Header.astro update |
| D-06 | RSS at /rss.xml | Build verification | Check build output | Need src/pages/rss.xml.js |
| D-06 | Sitemap at /sitemap.xml | Build verification | Check build output | Need sitemap in astro.config |

### Wave 0 Gaps
- None - existing test infrastructure (astro build) covers all verification needs

## Sources

### Primary (HIGH confidence)
- Astro docs - Content Collections filtering (https://docs.astro.build/en/guides/content-collections/)
- Astro docs - Routing patterns (https://docs.astro.build/en/guides/routing/)
- Astro RSS package docs (fetched via WebFetch)
- Astro Sitemap package docs (fetched via WebFetch)

### Secondary (MEDIUM confidence)
- npm registry version checks (@astrojs/rss 4.0.18, @astrojs/sitemap 3.7.2)

### Tertiary (LOW confidence)
- CSS dropdown patterns - standard web technique, not Astro-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - official Astro packages, verified versions
- Architecture: HIGH - patterns from official Astro docs
- Pitfalls: MEDIUM - based on common Astro patterns, some from training data

**Research date:** 2026-03-28
**Valid until:** 2026-04-28 (30 days - Astro stable release cycle)
