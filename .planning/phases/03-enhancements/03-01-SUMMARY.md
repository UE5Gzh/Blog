---
phase: 03-enhancements
plan: 01
subsystem: infrastructure
tags:
  - enhancements
  - search
  - table-of-contents
  - reading-time
  - copy-button
dependency_graph:
  requires: []
  provides:
    - ENHANCE-01
    - ENHANCE-02
    - ENHANCE-03
    - ENHANCE-04
  affects:
    - PostLayout.astro
    - astro.config.mjs
tech_stack:
  added:
    - pagefind@^1.4.0
    - reading-time@^1.5.0
    - mdast-util-to-string@^4.0.0
  patterns:
    - remark plugin for build-time processing
    - Pagefind UI for static search
    - Clipboard API for copy functionality
key_files:
  created:
    - src/remark/reading-time.mjs
    - src/components/TableOfContents.astro
    - src/components/PostNavigation.astro
    - src/components/CopyButton.astro
    - src/components/Search.astro
  modified:
    - package.json
    - astro.config.mjs
decisions: []
metrics:
  duration: "~2 minutes"
  completed: "2026-03-28"
---

# Phase 3 Plan 1: Enhancement Infrastructure Summary

Set up infrastructure for all four enhancements: install dependencies, create the reading-time remark plugin, and build all UI components.

## One-liner

Pagefind search, reading-time plugin, TOC, post navigation, and copy button components created and integrated.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Install dependencies | ab0651b | package.json, package-lock.json |
| 2 | Create reading-time remark plugin | 7900704 | src/remark/reading-time.mjs |
| 3 | Create TableOfContents component | 848c6d3 | src/components/TableOfContents.astro |
| 4 | Create PostNavigation component | c583794 | src/components/PostNavigation.astro |
| 5 | Create CopyButton component | 2f906ef | src/components/CopyButton.astro |
| 6 | Create Search component | 07c24eb | src/components/Search.astro |
| 7 | Configure astro.config.mjs | 975d7c2 | astro.config.mjs |

## What Was Built

### Dependencies Installed
- **pagefind**: Static search library that indexes built HTML
- **reading-time**: Calculates estimated reading time from text
- **mdast-util-to-string**: Extracts text content from markdown AST

### Components Created

**src/remark/reading-time.mjs**
- Remark plugin that calculates reading time during markdown processing
- Stores result in `frontmatter.minutesRead`

**src/components/TableOfContents.astro**
- Renders navigable TOC from headings array
- Filters to H2/H3 only (H1 is post title)
- Dark theme styled with CSS variables

**src/components/PostNavigation.astro**
- Prev/next post navigation links
- Sorted by date (newest first)
- Card-style layout with dark theme

**src/components/CopyButton.astro**
- Provides `addCopyButtons()` function
- Adds copy buttons to all `article.post pre` elements
- Text-based feedback (Copy/Copied!/Error)

**src/components/Search.astro**
- Pagefind UI wrapper component
- Themed to match dark theme

### Integration
- `astro.config.mjs` updated with `remarkPlugins: [remarkReadingTime]`

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Verification

- All 7 tasks completed
- All commits verified in git log
- Dependencies appear in package.json
- All components export expected functions