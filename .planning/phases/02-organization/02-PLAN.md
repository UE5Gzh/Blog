---
phase: 02-organization
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - astro.config.mjs
  - src/pages/rss.xml.js
  - src/components/Header.astro
autonomous: false
requirements:
  - ORG-01
  - ORG-02
  - ORG-03
  - D-05
  - D-06
  - D-07
must_haves:
  truths:
    - "User can access RSS feed at /rss.xml with all published posts"
    - "Sitemap generated at /sitemap.xml"
    - "Header shows dropdown for Categories, Tags, and Archive link"
    - "Dropdown menus display on hover without JavaScript"
  artifacts:
    - path: "src/pages/rss.xml.js"
      provides: "RSS feed endpoint"
      min_lines: 20
    - path: "astro.config.mjs"
      provides: "Sitemap integration and site URL"
      contains: "sitemap()"
    - path: "src/components/Header.astro"
      provides: "Dropdown navigation"
      contains: ".dropdown"
  key_links:
    - from: "Header.astro"
      to: "/categories/[category]"
      via: "dropdown menu link"
    - from: "Header.astro"
      to: "/tags/[tag]"
      via: "dropdown menu link"
    - from: "Header.astro"
      to: "/archive"
      via: "nav link"
---

<objective>
Establish the navigation foundation (header dropdowns, RSS, sitemap) that enables content discovery. This wave handles the infrastructure pieces: installing packages, configuring the site URL, creating the RSS endpoint, and adding dropdown navigation to the header.
</objective>

<context>
@.planning/phases/02-organization/02-CONTEXT.md
@.planning/phases/02-organization/02-RESEARCH.md
@src/components/Header.astro
@src/content/config.ts
@src/styles/cards.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install RSS and Sitemap Packages</name>
  <files>
    - package.json
  </files>
  <read_first>
    package.json
  </read_first>
  <action>
Install @astrojs/rss and @astrojs/sitemap packages:

```bash
npm install @astrojs/rss @astrojs/sitemap
```

Verify installations by checking package.json devDependencies.
  </action>
  <verify>
    <automated>grep -E "@astrojs/rss|@astrojs/sitemap" package.json</automated>
  </verify>
  <done>@astrojs/rss and @astrojs/sitemap added to package.json dependencies</done>
</task>

<task type="auto">
  <name>Task 2: Configure Sitemap and Site URL</name>
  <files>
    - astro.config.mjs
  </files>
  <read_first>
    astro.config.mjs
  </read_first>
  <action>
Update astro.config.mjs to:
1. Add sitemap integration: `import sitemap from '@astrojs/sitemap';`
2. Add sitemap() to integrations array
3. Set site URL to `https://your-blog-url.com` (placeholder that user should update)

Current config likely has:
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  // site is missing - add it
});
```

Update to:
```javascript
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-blog-url.com',
  integrations: [mdx(), sitemap()],
});
```
  </action>
  <verify>
    <automated>grep -E "sitemap\(\)|site:" astro.config.mjs</automated>
  </verify>
  <done>astro.config.mjs has sitemap integration and site URL configured</done>
</task>

<task type="auto">
  <name>Task 3: Create RSS Feed Endpoint</name>
  <files>
    - src/pages/rss.xml.js
  </files>
  <read_first>
    src/content/config.ts
  </read_first>
  <action>
Create src/pages/rss.xml.js with RSS feed generation using @astrojs/rss.

The file should:
1. Import rss from '@astrojs/rss' and getCollection from 'astro:content'
2. Export GET function that returns rss() with:
   - title: 'Personal Tech Blog'
   - description: 'Sharing programming tutorials and insights'
   - site: context.site
   - items: all published posts mapped to RSS items (title, pubDate, description, link)
   - customData: `<language>en-us</language>`

Reference the existing PostCard pattern for how posts are queried and filtered (drafts excluded).

Note: context.site comes from the site URL configured in astro.config.mjs, which is why Task 2 must be completed first.
  </action>
  <verify>
    <automated>ls src/pages/rss.xml.js && grep -l "export async function GET" src/pages/rss.xml.js</automated>
  </verify>
  <done>RSS feed endpoint exists at /rss.xml, generates valid RSS XML</done>
</task>

<task type="auto">
  <name>Task 4: Update Header with Dropdown Navigation</name>
  <files>
    - src/components/Header.astro
  </files>
  <read_first>
    src/components/Header.astro
  </read_first>
  <action>
Extend Header.astro with CSS-only dropdown menus for Categories, Tags, plus direct Archive link.

Current header has:
```astro
<nav class="nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
```

Update to add:
1. Categories dropdown with hover-triggered menu showing category links (will link to /categories/[category])
2. Tags dropdown with hover-triggered menu showing tag links (will link to /tags/[tag])
3. Archive as a direct nav link to /archive

CSS requirements (per D-05):
- Use :hover and :focus-within to show/hide dropdowns
- Dropdown positioning: position: absolute on .dropdown
- Dropdown styling: match card colors (#161b22 bg, #58a6ff accent on hover)
- Mobile: at 640px breakpoint, stack nav items vertically

The dropdown links are stubs at this point (Categories and Tags pages don't exist yet) - this is intentional. Wave 2 will create those pages. Archive link will work in Wave 2 when archive.astro is created.

For the dropdown items, you can hardcode sample categories/tags from the sample posts (first-post.md has category: "General", tags: ["announcement", "meta"]; code-example.md has category: "Development", tags: ["code", "testing"]).
  </action>
  <verify>
    <automated>grep -E "dropdown|Categories|Tags|Archive" src/components/Header.astro</automated>
  </verify>
  <done>Header shows dropdown menus for Categories and Tags, Archive link present</done>
</task>

<task type="auto">
  <name>Task 5: Verify Wave 1 Build</name>
  <files>
    - dist/rss.xml
    - dist/sitemap.xml
  </files>
  <read_first>
    astro.config.mjs
    src/pages/rss.xml.js
  </read_first>
  <action>
Run `npm run build` to verify:
1. RSS feed generates at dist/rss.xml
2. Sitemap generates at dist/sitemap.xml
3. No build errors from new code
4. All existing pages still build correctly

After build, verify:
- `ls dist/rss.xml` exists
- `ls dist/sitemap.xml` exists
- `grep -c "url>" dist/sitemap.xml` shows URLs for home, posts, etc.
  </action>
  <verify>
    <automated>npm run build 2>&1 | tail -20</automated>
  </verify>
  <done>Build succeeds with RSS and sitemap generated</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Checkpoint: Human Verify Header Navigation</name>
  <what-built>Wave 1 foundational work: RSS feed, sitemap, header with dropdown navigation</what-built>
  <how-to-verify>
1. Run `npm run build && npm run preview`
2. Visit http://localhost:4321
3. Hover over "Categories" in header - should see dropdown appear
4. Hover over "Tags" in header - should see dropdown appear
5. Click "Archive" link - should navigate to /archive (will show "not found" since Wave 2 creates the page)
6. Visit http://localhost:4321/rss.xml - should show RSS XML
7. Visit http://localhost:4321/sitemap.xml - should show sitemap XML
  </how-to-verify>
  <resume-signal>Type "approved" or describe issues</resume-signal>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- RSS feed generates at dist/rss.xml
- Sitemap generates at dist/sitemap.xml
- Header has dropdown CSS classes
</verification>

<success_criteria>
- ORG-01, ORG-02, ORG-03: All content pages will be built in Wave 2
- D-05: Header dropdown navigation implemented (CSS-only, no JS)
- D-06: RSS feed at /rss.xml with all published posts
- D-07: Sitemap at /sitemap.xml auto-generated
</success_criteria>

---

phase: 02-organization
plan: 02
type: execute
wave: 2
depends_on: ["02-organization/01-PLAN"]
files_modified:
  - src/pages/categories/[category].astro
  - src/pages/tags/[tag].astro
  - src/pages/archive.astro
autonomous: true
requirements:
  - ORG-01
  - ORG-02
  - ORG-03
must_haves:
  truths:
    - "Category pages display all posts in that category"
    - "Tag pages display all posts with that tag"
    - "Archive page displays posts grouped by year and month"
  artifacts:
    - path: "src/pages/categories/[category].astro"
      provides: "Dynamic category pages"
      contains: "getStaticPaths"
    - path: "src/pages/tags/[tag].astro"
      provides: "Dynamic tag pages"
      contains: "getStaticPaths"
    - path: "src/pages/archive.astro"
      provides: "Archive page with year/month grouping"
      contains: "getFullYear"
  key_links:
    - from: "src/pages/categories/[category].astro"
      to: "src/components/PostCard.astro"
      via: "PostCard component usage"
    - from: "src/pages/tags/[tag].astro"
      to: "src/components/PostCard.astro"
      via: "PostCard component usage"
---

<objective>
Create the category, tag, and archive pages that enable content discovery. Each page reuses the PostCard component for consistent card-based listings.
</objective>

<context>
@src/pages/index.astro
@src/components/PostCard.astro
@src/styles/cards.css
@src/content/config.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Category Pages</name>
  <files>
    - src/pages/categories/[category].astro
  </files>
  <read_first>
    src/pages/index.astro
    src/components/PostCard.astro
    src/styles/cards.css
  </read_first>
  <action>
Create src/pages/categories/[category].astro with dynamic routing.

Implementation (per ORG-01 and D-07):
1. Export getStaticPaths() that:
   - Gets all posts with `getCollection('posts', ({ data }) => !data.draft)`
   - Extracts unique categories from all posts: `[...new Set(posts.map(post => post.data.category).filter(Boolean))]`
   - Returns one params object per category with posts filtered to that category
   - Sorts posts by date descending

2. Page template:
   - Page title: "Category: {category}"
   - Shows post count: "{posts.length} post(s)"
   - Uses PostCard component for each post
   - Uses cards.css for responsive grid layout

Reference existing src/pages/index.astro for the filtering/sorting pattern.
Reference PostCard.astro for how to render posts.
  </action>
  <verify>
    <automated>ls src/pages/categories/[category].astro && grep -l "getStaticPaths" src/pages/categories/[category].astro</automated>
  </verify>
  <done>Category pages generate for each unique category, listing posts with PostCard</done>
</task>

<task type="auto">
  <name>Task 2: Create Tag Pages</name>
  <files>
    - src/pages/tags/[tag].astro
  </files>
  <read_first>
    src/pages/categories/[category].astro
    src/components/PostCard.astro
  </read_first>
  <action>
Create src/pages/tags/[tag].astro with dynamic routing.

Implementation (per ORG-02 and D-07):
1. Export getStaticPaths() that:
   - Gets all posts with `getCollection('posts', ({ data }) => !data.draft)`
   - Extracts unique tags from all posts: `[...new Set(posts.flatMap(post => post.data.tags))]`
   - Returns one params object per tag with posts filtered to that tag (using post.data.tags.includes(tag))
   - Sorts posts by date descending

2. Page template:
   - Page title: "Tag: {tag}"
   - Shows post count: "{posts.length} post(s)"
   - Uses PostCard component for each post
   - Uses cards.css for responsive grid layout

This is nearly identical to category pages but with tags instead of category. Reuse the same structure.
  </action>
  <verify>
    <automated>ls src/pages/tags/[tag].astro && grep -l "getStaticPaths" src/pages/tags/[tag].astro</automated>
  </verify>
  <done>Tag pages generate for each unique tag, listing posts with PostCard</done>
</task>

<task type="auto">
  <name>Task 3: Create Archive Page</name>
  <files>
    - src/pages/archive.astro
  </files>
  <read_first>
    src/pages/index.astro
    src/styles/cards.css
  </read_first>
  <action>
Create src/pages/archive.astro with year/month grouping.

Implementation (per ORG-03):
1. Get all published posts, sorted by date descending
2. Use reduce() pattern to group posts by year:
   ```javascript
   const postsByYear = sortedPosts.reduce((acc, post) => {
     const year = post.data.date.getFullYear();
     if (!acc[year]) acc[year] = [];
     acc[year].push(post);
     return acc;
   }, {});
   ```
3. For each year, group posts by month
4. Display structure:
   - Year as H2
   - Month name as H3 (use toLocaleDateString with month: 'long')
   - List of post titles as links to /posts/[slug]

The archive page does NOT need to use PostCard - a simple list format is appropriate for archive view. However, it should still use BaseLayout for consistency.
  </action>
  <verify>
    <automated>ls src/pages/archive.astro && grep -E "getFullYear|getMonth" src/pages/archive.astro</automated>
  </verify>
  <done>Archive page displays posts grouped by year and month</done>
</task>

<task type="auto">
  <name>Task 4: Final Build Verification</name>
  <files>
    - dist/
  </files>
  <read_first>
    astro.config.mjs
    src/pages/rss.xml.js
  </read_first>
  <action>
Run `npm run build` to verify:
1. Category pages generate at /categories/[category]
2. Tag pages generate at /tags/[tag]
3. Archive page generates at /archive
4. RSS feed still generates at /rss.xml
5. Sitemap still generates at /sitemap.xml
6. All existing pages still build correctly

Check build output for correct page counts.
  </action>
  <verify>
    <automated>npm run build 2>&1 | grep -E "pages built|pages generate"</automated>
  </verify>
  <done>Build succeeds with all phase 2 pages generated</done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- Category pages exist at /categories/General and /categories/Development
- Tag pages exist for announcement, meta, code, testing tags
- Archive page at /archive shows year/month grouping
</verification>

<success_criteria>
- ORG-01: Category pages work - clicking category shows all posts in that category
- ORG-02: Tag pages work - clicking tag shows all posts with that tag
- ORG-03: Archive accessible - archive page shows posts grouped by year/month
- D-05: Navigation clear - dropdowns work on hover, Archive link present
- D-06: RSS generated - /rss.xml contains all published posts
- D-07: URL structure - /categories/[category], /tags/[tag], /archive
</success_criteria>

<output>
After completion, create `.planning/phases/02-organization/02-PLAN-SUMMARY.md`
</output>
