***

phase: 01-core-blog
plan: 01
type: execute
wave: 1
depends\_on: \[]
files\_modified:

- src/content/config.ts
- astro.config.mjs
- package.json
- src/layouts/BaseLayout.astro
- src/styles/global.css
  autonomous: true
  requirements:
- CONTENT-01
- CONTENT-02
- CONTENT-03
- CONTENT-04
- DISPLAY-01
- DISPLAY-02
- DISPLAY-03

must\_haves:
truths:
\- "Author can create a markdown post in src/content/posts/ with YAML frontmatter and it appears on home page after build"
\- "Code blocks display with VS Code Dark+ syntax highlighting for JS, Python, Go, Rust"
\- "Posts with draft: true in frontmatter do not appear on home page or in builds"
\- "Images referenced in markdown render correctly when stored in posts/ directory"
\- "Home page and post pages are readable on 375px wide mobile screen"
artifacts:
\- path: "src/content/config.ts"
provides: "Content collection schema with title, date, description, draft, tags, category"
contains: "defineCollection.\*posts"
\- path: "astro.config.mjs"
provides: "Shiki syntax highlighting with dark+ theme, image support"
contains: "shiki.\*dark-plus"
\- path: "src/layouts/BaseLayout.astro"
provides: "HTML shell with navigation and footer"
min\_lines: 30
\- path: "src/pages/index.astro"
provides: "Home page listing published posts"
contains: "getCollection.\*posts"
\- path: "src/pages/posts/\[slug].astro"
provides: "Single post page with dynamic routing"
contains: "getStaticPaths.\*slug"
key\_links:
\- from: "src/pages/index.astro"
to: "src/content/config.ts"
via: "getCollection('posts') with filter for draft: false"
pattern: "getCollection.\*draft.*false"
\- from: "src/content/posts/*.md"
to: "astro.config.mjs"
via: "Shiki transformer at build time"
pattern: "shiki.\*theme.*dark-plus"
\- from: "src/content/posts/*.md"
to: "src/pages/posts/\[slug].astro"
via: "Dynamic route rendering"
pattern: "getStaticPaths"

***

<objective>
Set up the foundational Astro blog project with content collection schema, base layout, and Shiki syntax highlighting configured. This establishes the project structure and dark theme that all subsequent work builds upon.
</objective>

<context>
@.planning/research/STACK.md
@.planning/research/ARCHITECTURE.md
@.planning/phases/01-core-blog/01-CONTEXT.md

Key decisions from CONTEXT.md:

- D-01: Card-based layout for home page post listing
- D-02: VS Code Dark+ theme for syntax highlighting (not twilight, monokai, etc.)
- D-03: Local image storage in posts/ directory

<tasks>

<task type="auto">
  <name>Task 1: Initialize Astro project with dependencies</name>
  <files>
    - package.json
    - astro.config.mjs
    - tsconfig.json
    - src/env.d.ts
  </files>
  <read_first>
    - https://docs.astro.build/en/install-and-setup/ (Astro initialization)
    - https://docs.astro.build/en/guides/images/ (Astro image handling)
  </read_first>
  <action>
    Create package.json with:
    - astro: ^4.0.0
    - @astrojs/mdx (for MDX support)
    - sharp (for image optimization)

```
Create astro.config.mjs with:
- site: 'https://your-blog-url.com' (placeholder, user will update)
- integrations: [@astrojs/mdx()]
- markdown.shikiConfig.theme: 'dark-plus' (VS Code Dark+ per D-02)
- markdown.shikiConfig.langs: ['javascript', 'python', 'go', 'rust', 'typescript', 'bash', 'json', 'yaml']
- image.remotePatterns: for local images in public/

Create tsconfig.json with strict mode enabled
```

  </action>
  <verify>
    <automated>grep -l "astro" package.json && grep "dark-plus" astro.config.mjs</automated>
  </verify>
  <done>
    Astro project initializes with npm create astro, all dependencies installed, dark-plus theme configured in shiki settings, MDX integration added
  </done>
</task>

<task type="auto">
  <name>Task 2: Configure content collection schema for posts</name>
  <files>
    - src/content/config.ts
    - src/content/posts/.gitkeep
  </files>
  <read_first>
    - https://docs.astro.build/en/guides/content-collections/ (Content Collections API)
  </read_first>
  <action>
    Create src/content/config.ts with:

````
```typescript
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

This schema addresses CONTENT-01 (frontmatter), CONTENT-03 (draft field), and provides structure for CONTENT-04 (heroImage) and tags/category for future phases.
````

  </action>
  <verify>
    <automated>grep "defineCollection" src/content/config.ts && grep "draft.*boolean" src/content/config.ts</automated>
  </verify>
  <done>
    Content collection schema defined with title (string), date (date), description (string), draft (boolean default false), tags (string array), category (optional string), heroImage (optional string)
  </done>
</task>

<task type="auto">
  <name>Task 3: Create base layout with navigation and footer</name>
  <files>
    - src/layouts/BaseLayout.astro
    - src/styles/global.css
    - src/components/Header.astro
    - src/components/Footer.astro
  </files>
  <read_first>
    - https://docs.astro.build/en/basics/layouts/ (Astro layouts)
  </read_first>
  <action>
    Create src/layouts/BaseLayout.astro with:
    - HTML5 doctype, lang="en"
    - <meta charset="UTF-8">, viewport meta tag
    - <title> with slot for page-specific titles
    - Google Font import for Inter or system font stack (dark theme, monospace for code)
    - Dark background (#0d1117 or similar GitHub-dark style) per D-04
    - Light text (#c9d1d9) for contrast
    - <Header> component with blog name and nav links (Home, About)
    - <slot /> for main content
    - <Footer> with copyright and links
    - Global CSS import

```
Create src/styles/global.css with:
- CSS custom properties for colors (--bg-primary, --bg-secondary, --text-primary, --text-secondary, --accent)
- Dark theme colors per D-02 and D-04:
  - Background: #0d1117
  - Card bg: #161b22
  - Text: #c9d1d9
  - Accent: #58a6ff (GitHub blue)
  - Code bg: #1f2937
- CSS reset (box-sizing, margin 0)
- Base typography (font-family, line-height 1.6)
- Mobile-first responsive variables

Create src/components/Header.astro with:
- Blog title as <a href="/">
- Navigation: Home, About links
- Dark background matching layout

Create src/components/Footer.astro with:
- Copyright line
- Minimal styling
```

  </action>
  <verify>
    <automated>grep "BaseLayout" src/layouts/BaseLayout.astro && grep "dark-plus\|#0d1117" src/styles/global.css</automated>
  </verify>
  <done>
    BaseLayout.astro renders with header, footer, slot for content; global.css defines dark theme CSS variables; Header and Footer components exist and are imported in BaseLayout
  </done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- `npm run dev` starts successfully
- `grep -r "dark-plus" .` finds shiki theme configuration
- `grep -r "defineCollection" src/content/` finds posts collection schema
</verification>

\<success\_criteria>

- Astro project builds successfully with `npm run build`
- Content collection schema accepts posts with title, date, description, draft, tags, category, heroImage
- Base layout applies dark theme (#0d1117 background, #c9d1d9 text)
- Shiki configured with dark-plus theme for code highlighting
- MDX integration enabled for enhanced markdown
  \</success\_criteria>

<output>
After completion, create `.planning/phases/01-core-blog/01-PLAN-SUMMARY.md` with task outcomes and any implementation notes.
</output>
---

***

phase: 01-core-blog
plan: 02
type: execute
wave: 2
depends\_on: \["01-core-blog/01-PLAN"]
files\_modified:

- src/pages/index.astro
- src/pages/posts/\[slug].astro
- src/layouts/PostLayout.astro
- src/styles/global.css
- src/styles/cards.css
- src/components/PostCard.astro
- src/content/posts/first-post.md
- src/content/posts/code-example.md
  autonomous: true
  requirements:
- CONTENT-01
- CONTENT-02
- CONTENT-03
- CONTENT-04
- DISPLAY-01
- DISPLAY-02
- DISPLAY-03

must\_haves:
truths:
\- "Home page displays only published posts (draft: false) sorted by date descending"
\- "Post cards show title, date, description, and tags"
\- "Single post page renders markdown with proper typography and code highlighting"
\- "Code blocks show VS Code Dark+ highlighting for JS, Python, Go, Rust"
\- "Images in posts/ directory render correctly"
\- "Layout works on 375px mobile screens"
artifacts:
\- path: "src/pages/index.astro"
provides: "Home page with card-based post list"
contains: "getCollection.\*posts.\*draft.\*false"
\- path: "src/pages/posts/\[slug].astro"
provides: "Single post page with dynamic routing"
contains: "render.\*Content"
\- path: "src/components/PostCard.astro"
provides: "Card component for post listing"
min\_lines: 15
\- path: "src/content/posts/first-post.md"
provides: "Sample post demonstrating markdown features"
contains: "title.\*date.*draft"
key\_links:
\- from: "src/pages/index.astro"
to: "src/content/posts/*.md"
via: "getCollection('posts') filtered and sorted"
pattern: "filter.\*draft.\*sort.\*date"
\- from: "src/pages/posts/\[slug].astro"
to: "src/layouts/PostLayout.astro"
via: "Layout assignment"
pattern: "layout.*PostLayout"
\- from: "src/pages/posts/\[slug].astro"
to: "src/content/posts/*.md"
via: "entry.render(RemarkPlugins)"
pattern: "render.\*Content"
---------------------------

<objective>
Implement the home page with card-based post listing, single post page template with code highlighting, responsive CSS, and sample posts demonstrating all features. This delivers the complete user-facing blog experience.
</objective>

<context>
@.planning/phases/01-core-blog/01-PLAN-SUMMARY.md
@.planning/phases/01-core-blog/01-CONTEXT.md

Key from plan 01:

- Astro project initialized with dark-plus theme
- Content collection schema defined in src/content/config.ts
- BaseLayout.astro created with dark theme CSS variables

Implementation decisions:

- D-01: Card-based layout (PostCard.astro with hover states, shadow)
- D-02: VS Code Dark+ theme already configured in Wave 1
- D-03: Local images in posts/ directory (relative paths in markdown)

<tasks>

<task type="auto">
  <name>Task 4: Create home page with card-based post listing</name>
  <files>
    - src/pages/index.astro
    - src/components/PostCard.astro
    - src/styles/cards.css
  </files>
  <read_first>
    - src/layouts/BaseLayout.astro
    - src/content/config.ts
  </read_first>
  <action>
    Create src/pages/index.astro that:
    - Imports BaseLayout
    - Uses getCollection('posts') to fetch all posts
    - Filters to only published posts: posts.filter(post => !post.data.draft)
    - Sorts by date descending: sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    - Maps over posts to render PostCard components
    - Renders empty state if no posts (per DISPLAY-01)

```
Create src/components/PostCard.astro that (per D-01):
- Accepts post prop with title, date, description, tags
- Renders card with:
  - Title as link to /posts/[slug]
  - Date formatted as "Month DD, YYYY"
  - Description as excerpt
  - Tags as small pill badges
- CSS: card styling with bg #161b22, border-radius 8px, padding 1.5rem, hover shadow
- Mobile: full-width cards with appropriate padding

Create src/styles/cards.css with:
- .card-grid: CSS grid with responsive columns
  - 1 column on mobile (<640px)
  - 2 columns on tablet (640px-1024px)
  - 3 columns on desktop (>1024px)
- .card: background, border-radius, padding, hover effects
- .card-title: link styling with accent color on hover
- .card-meta: date and tags styling
- .card-tags: flex layout, gap, pill styling

Addresses: DISPLAY-01, DISPLAY-03 (mobile), CONTENT-03 (draft filter)
```

  </action>
  <verify>
    <automated>grep "getCollection.*posts" src/pages/index.astro && grep "draft.*false" src/pages/index.astro && grep "PostCard" src/pages/index.astro</automated>
  </verify>
  <done>
    Home page shows only published posts sorted by date descending; cards display title, date, description, tags; grid is responsive (1 col mobile, 2 col tablet, 3 col desktop)
  </done>
</task>

<task type="auto">
  <name>Task 5: Create single post page template with typography</name>
  <files>
    - src/pages/posts/[slug].astro
    - src/layouts/PostLayout.astro
    - src/styles/post.css
  </files>
  <read_first>
    - src/layouts/BaseLayout.astro
    - src/content/config.ts
  </read_first>
  <action>
    Create src/pages/posts/[slug].astro that:
    - Defines getStaticPaths() using getCollection('posts')
    - For each post, returns params: { slug: entry.slug } and props: { entry }
    - Exports const { entry } = Astro.props
    - Calls const { Content } = await entry.render()
    - Passes Content to PostLayout as layout prop or renders inline
    - Displays post title from entry.data.title
    - Displays formatted date from entry.data.date
    - Displays tags from entry.data.tags
    - Renders <Content /> component

```
Create src/layouts/PostLayout.astro that:
- Extends BaseLayout (imports and uses it)
- Accepts title, date, description, tags, heroImage props
- Renders article with proper HTML semantics (<article>, <header>, <time>)
- Applies post-specific typography (large headings, readable body text)
- If heroImage exists, renders it at top of post
- Renders <slot /> for Content

Create src/styles/post.css with:
- Article typography: max-width 65ch for readability, line-height 1.7
- Headings: clear hierarchy (h1 2.5rem, h2 1.75rem, h3 1.25rem)
- Paragraph spacing
- Link styling with accent color
- Blockquote styling (left border, italic)
- List styling (proper padding)
- Code inline styling (monospace, bg color, padding, border-radius)
- Image styling (max-width 100%, border-radius, shadow)
- Mobile: appropriate font sizes, padding

Addresses: DISPLAY-02 (clean typography), CONTENT-04 (heroImage)
```

  </action>
  <verify>
    <automated>grep "getStaticPaths" src/pages/posts/\[slug\].astro && grep "getCollection.*posts" src/pages/posts/\[slug\].astro && grep "render" src/pages/posts/\[slug\].astro</automated>
  </verify>
  <done>
    Single post page renders at /posts/[slug] with proper typography, title, date, tags displayed; markdown content rendered with Content component
  </done>
</task>

<task type="auto">
  <name>Task 6: Create sample posts demonstrating features</name>
  <files>
    - src/content/posts/first-post.md
    - src/content/posts/code-example.md
    - src/content/posts/hello-world.md
  </files>
  <read_first>
    - src/content/config.ts
  </read_first>
  <action>
    Create src/content/posts/first-post.md (published post):
    ---
    title: "Welcome to My Tech Blog"
    date: 2026-03-28
    description: "An introduction to my new technical blog where I'll share insights about software development."
    draft: false
    tags: ["announcement", "meta"]
    category: "General"
    ---

````
# Welcome!

This is my new tech blog. I'll be writing about:
- JavaScript and TypeScript
- Python for automation
- Go and Rust for systems programming
- DevOps and infrastructure

Stay tuned for more content!

Create src/content/posts/code-example.md (published post with code):
---
title: "Code Syntax Highlighting Test"
date: 2026-03-27
description: "Testing syntax highlighting for multiple programming languages."
draft: false
tags: ["code", "testing"]
category: "Development"
---

# JavaScript Example

```javascript
const greeting = (name) => {
  return `Hello, ${name}!`;
};

console.log(greeting('World'));
```

# Python Example

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))
```

# Go Example

```go
package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    println(greet("World"))
}
```

# Rust Example

```rust
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("World"));
}
```

Create src/content/posts/hello-world.md (draft post):
---
title: "Hello World Draft"
date: 2026-03-26
description: "This is a draft post that should not appear on the home page."
draft: true
tags: ["draft"]
category: "Testing"
---

# Draft Post

This post has draft: true and should NOT appear on the home page or in builds.

Addresses: CONTENT-01, CONTENT-02, CONTENT-03
````

  </action>
  <verify>
    <automated>grep "draft: false" src/content/posts/*.md && grep "draft: true" src/content/posts/*.md && grep "```javascript" src/content/posts/code-example.md</automated>
  </verify>
  <done>
    Three sample posts exist: first-post.md (published), code-example.md (published with 4 code blocks in JS/Python/Go/Rust), hello-world.md (draft: true)
  </done>
</task>

</tasks>

<verification>
- Home page lists only first-post.md and code-example.md (not hello-world.md which has draft: true)
- Code blocks in code-example.md render with syntax highlighting
- Posts with heroImage reference images that exist in posts/ directory
- Site builds successfully with `npm run build`
</verification>

\<success\_criteria>

- `npm run build` completes successfully
- Home page shows 2 published posts (first-post, code-example) sorted by date
- Draft post (hello-world) does NOT appear on home page
- Code blocks display VS Code Dark+ syntax highlighting
- All pages responsive on 375px mobile viewport
- Post page renders with proper typography and readable layout
  \</success\_criteria>

<output>
After completion, create `.planning/phases/01-core-blog/01-PLAN-SUMMARY.md` (update) with final outcomes and links to created files.
</output>
